<template>
    <div class="course-creation-form-container">
        <div>
            <div class="page-title">
                Veranstaltung erstellen
            </div>

            <form @submit.prevent="create">
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
                        @click.stop="$router.push('/')"
                        class="button secondary"
                    >
                        ABBRECHEN
                    </button>
                    <button class="button primary">
                        ERSTELLEN
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { createCourse } from '@/services/BackendService';
import CourseInputForm from '@/components/CourseInputForm';

export default {
    name: 'CourseCreationForm',
    components: { CourseInputForm },
    data: function() {
        return {
            isValid: false,
            hasError: false,
            course: {
                title: null,
                trainer: null,
                contactPerson: null,
                startDate: null,
                endDate: null,
                courseType: null,
                courseForm: null,
                executionType: null,
                price: null,
                address: null,
                targetAudience: null,
                description: null,
                link: null
            }
        };
    },
    methods: {
        create: function() {
            this.$refs.courseForm.touch();

            this.$nextTick(() => {
                if (!this.isValid) {
                    return false;
                }

                createCourse(this.course)
                    .then(response => {
                        const createdCourse = response.data;
                        this.$router.push({
                            name: 'courseDetails',
                            params: { courseId: createdCourse.id }
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
        }
    }
};
</script>

<style lang="scss" scoped>
.course-creation-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.form-footer {
    margin-top: $space-xl;
    margin-right: $space-xs;
    display: flex;
    justify-content: flex-end;

    button {
        margin-left: $space-s;
    }
}

.page-title {
    font-size: $font-l;
    font-weight: $normal;
    margin-left: $space-xs;
    margin-bottom: $space-l;
}
</style>
