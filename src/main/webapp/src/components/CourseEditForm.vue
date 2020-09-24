<template>
    <div>
        <div class="page-title">
            Editieren einer Veranstaltung
        </div>
        <form @submit.prevent="update">
            <div
                v-show="hasError"
                class="form-error-text"
                data-testid="errorMsg"
            >
                Ein Fehler ist aufgetreten, bitte versuchen Sie es später
                erneut.
            </div>

            <CourseInputForm
                ref="courseForm"
                :course="course"
                @ready="isReady => (isValid = isReady)"
            />

            <div class="form-footer">
                <button
                    type="button"
                    class="form-cancel-button"
                    @click="
                        $router.push({
                            name: 'courseDetails',
                            params: { courseId }
                        })
                    "
                >
                    Abbrechen
                </button>
                <button type="submit" class="form-submit-button">
                    Speichern
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { getCourse, updateCourse } from '@/services/BackendService';
import CourseInputForm from '@/components/CourseInputForm';
import handleError from '@/components/handleError';

export default {
    name: 'CourseEditForm',
    components: { CourseInputForm },
    data: function() {
        return {
            isValid: true,
            hasError: false,
            course: {}
        };
    },
    props: {
        courseId: {
            type: Number
        }
    },
    watch: {
        courseId: function(courseId) {
            this.loadCourse(courseId);
        }
    },
    methods: {
        update: function() {
            this.$refs.courseForm.touch();

            this.$nextTick(() => {
                if (!this.isValid) {
                    return false;
                }

                const id = this.courseId;
                updateCourse(this.course)
                    .then(() => {
                        this.$router.push({
                            name: 'courseDetails',
                            params: { courseId: id }
                        });
                    })
                    .catch(this.handleError);
            });
        },
        handleError: function(error) {
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(
                    'an error has occurred when trying to send data to server.'
                );
            }
            this.hasError = true;
        },
        loadCourse: function(courseId) {
            getCourse(courseId)
                .then(response => {
                    this.course = response.data;
                })
                .catch(error => handleError(this, error));
        }
    },
    mounted: function() {
        this.loadCourse(this.courseId);
    }
};
</script>

<style scoped></style>
