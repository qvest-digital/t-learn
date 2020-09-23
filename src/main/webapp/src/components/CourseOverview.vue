<template>
    <div>
        <div class="page-title">Übersicht über alle Veranstaltungen</div>

        <div v-for="(course, index) in courses" :key="course.id">
            <ConfirmModal
                @cancel="showModal = false"
                @confirm="deleteCourse(course)"
                v-if="showModal"
                confirmButtonTitle="Löschen"
                cancelButtonTitle="Abbrechen"
                modalTitle="Veranstaltung löschen"
                :text="
                    `Möchtest Du die Veranstaltung &quot;${course.title}&quot; wirklich löschen?`
                "
            />
            <div class="course-card">
                <div class="course-card-title">
                    {{ course.title }}
                </div>
                <div
                    @click="
                        $router.push({
                            name: 'courseDetails',
                            params: { courseId: course.id }
                        })
                    "
                    class="course-card-image-container"
                >
                    <img
                        class="course-img"
                        :src="cardimage(course)"
                        :alt="course.title"
                    />
                </div>

                <span
                    class="course-card-text"
                    v-if="course.location === 'ONSITE'"
                >
                    Präsenz
                </span>
                <span
                    class="course-card-text"
                    v-if="course.location === 'REMOTE'"
                >
                    Remote
                </span>
                <span class="course-card-description">{{
                    course.targetAudience
                }}</span>

                <div>
                    <button
                        :id="`course-card-${index}-delete-button`"
                        class="course-card-delete-button"
                        @click="showModal = true"
                    >
                        Löschen
                    </button>
                </div>
            </div>

            <router-link
                :to="{
                    name: 'courseDetails',
                    params: { courseId: course.id }
                }"
                class="stretched-link"
            ></router-link>
        </div>
    </div>
</template>

<script>
import coffeeImg from '../assets/coffee.jpg';
import signsImg from '../assets/signs.jpg';
import { deleteCourse, getCourses } from '@/services/BackendService';
import ConfirmModal from './ConfirmModal';

export default {
    name: 'CourseOverview',
    components: {
        ConfirmModal
    },
    data: function() {
        return {
            courses: [],
            showModal: false
        };
    },
    methods: {
        cardimage: function(course) {
            switch (course.courseType) {
                case 'EXTERNAL':
                    return signsImg;
                case 'INTERNAL':
                default:
                    return coffeeImg;
            }
        },
        deleteCourse: function(course) {
            deleteCourse(course.id)
                .then(
                    () =>
                        (this.courses = this.courses.filter(
                            elem => elem.id !== course.id
                        ))
                )
                .catch(() =>
                    console.error(`${course.id} could not be deleted)`)
                );
            this.showModal = false;
        }
    },
    mounted: function() {
        getCourses()
            .then(response => (this.courses = response.data))
            .catch(() => (this.courses = []));
    }
};
</script>

<style scoped>
.card .btn {
    z-index: 2;
    position: relative;
}
</style>
