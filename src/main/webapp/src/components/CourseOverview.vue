<template>
    <div>
        <div class="page-title">Übersicht über alle Veranstaltungen</div>
        <div v-for="course in courses" :key="course.id">
            <div
                class="course-card"
                @click="
                    $router.push({
                        name: 'courseDetails',
                        params: { courseId: course.id }
                    })
                "
            >
                <div class="course-card-title">
                    {{ course.title }}
                </div>
                <div class="course-card-image-container">
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
                        class="course-card-delete-button"
                        @click="deleteCourse(course)"
                        type="submit"
                        variant="primary"
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
// import deleteCourseModal from './deleteCourseModal';

export default {
    name: 'CourseOverview',
    data: function() {
        return {
            courses: []
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
            // deleteCourseModal(this, course.title, () => {
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
            // });
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
