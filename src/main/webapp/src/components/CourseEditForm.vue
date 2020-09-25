<template>
    <div class="course-edit-form-container">
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
                        c
                        class="button secondary"
                        @click="
                            $router.push({
                                name: 'courseDetails',
                                params: { courseId }
                            })
                        "
                    >
                        ABBRECHEN
                    </button>
                    <button type="submit" class="button primary">
                        SPEICHERN
                    </button>
                </div>
            </form>
        </div>
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

<style lang="scss" scoped>
.course-edit-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.form-footer {
    margin-top: $xl-space;
    margin-right: $xs-space;
    display: flex;
    justify-content: flex-end;

    button {
        margin-left: $s-space;
    }
}

.page-title {
    text-align: left;
    font-size: $l-font;
    font-weight: $normal;
    margin-left: $xs-space;
    margin-bottom: $l-space;
}
</style>
