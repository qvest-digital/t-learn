<template>
    <div>
        <h2>Anlegen einer neuen Veranstaltung</h2>
        <b-form @submit.prevent="create">
            <div
                v-show="hasError"
                style="color: darkred"
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

            <b-row class="mb-3">
                <b-col>
                    <b-button type="submit" variant="primary">
                        Erstellen
                    </b-button>
                </b-col>
            </b-row>
        </b-form>
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
                        this.$root.$bvToast.toast(
                            'Veranstaltung wurde erfolgreich angelegt',
                            {
                                variant: 'success',
                                isStatus: true,
                                noCloseButton: true,
                                solid: true,
                                autoHideDelay: 2000
                            }
                        );
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

<style scoped></style>
