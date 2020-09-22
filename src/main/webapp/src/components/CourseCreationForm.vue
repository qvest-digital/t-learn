<template>
    <div>
        <div class="page-title">
            Anlegen einer neuen Veranstaltung
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
                <button class="form-submit-button">
                    Erstellen
                </button>
            </div>
        </form>
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
                organizer: null,
                startDate: null,
                endDate: null,
                courseType: null,
                location: null,
                address: null,
                targetAudience: null,
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
                    .then(() => {
                        this.$router.push('/');
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

<style scoped></style>
