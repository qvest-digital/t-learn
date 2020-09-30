<template>
    <div>
        <div class="course-overview-title">
            Übersicht aller Verstanstaltungen
        </div>
        <ConfirmModal
            @cancel="showModal = false"
            @confirm="deleteCourse(selectedCourse)"
            v-if="showModal"
            confirmButtonTitle="LÖSCHEN"
            cancelButtonTitle="ABBRECHEN"
            modalTitle="Veranstaltung löschen - "
            :extraTitle="selectedCourse.title"
            text="Möchtest Du die Veranstaltung wirklich löschen?"
        />
        <div class="course-overview-container">
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
                    <div class="course-card-image-container">
                        <img
                            class="course-img"
                            :src="cardimage(course)"
                            :alt="course.title"
                            title="Veranstaltung Details"
                        />
                        <img
                            @click.stop="onDeleteCourse(course)"
                            class="delete-course-icon"
                            data-testid="deleteCourseIcon"
                            title="Veranstaltung löschen"
                            src="../assets/images/trash-white-bg.svg"
                        />
                        <img
                            @click.stop="
                                $router.push({
                                    name: 'courseEdit',
                                    params: { courseId: course.id }
                                })
                            "
                            data-testid="editCourseIcon"
                            class="edit-course-icon"
                            title="Veranstaltung editieren"
                            src="../assets/images/edit-white-bg.svg"
                        />
                    </div>
                    <div class="course-card-date">
                        {{ course.startDate | formatDate }}
                    </div>
                    <div :title="course.title" class="course-card-title">
                        {{ course.title }}
                    </div>

                    <div
                        class="course-card-text"
                        v-if="course.location === 'ONSITE'"
                    >
                        Präsenz
                    </div>
                    <div
                        class="course-card-text"
                        v-if="course.location === 'REMOTE'"
                    >
                        Remote
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import coffeeImg from '../assets/images/coffee.jpg';
import signsImg from '../assets/images/signs.jpg';
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
            selectedCourse: {},
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
        onDeleteCourse: function(course) {
            this.showModal = true;
            this.selectedCourse = course;
        },
        deleteCourse: function(selectedCourse) {
            deleteCourse(selectedCourse.id)
                .then(
                    () =>
                        (this.courses = this.courses.filter(
                            course => course.id !== selectedCourse.id
                        ))
                )
                .catch(() =>
                    console.error(`${selectedCourse.id} could not be deleted)`)
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

<style lang="scss" scoped>
.course-overview-title {
    display: block;
    font-size: $font-l;
    font-weight: $normal;
    margin-bottom: $space-l;
    margin-left: $space-xl + $space-l;
}
.course-overview-container {
    display: flex;
    padding: 0 $space-xxl;
    flex-wrap: wrap;
}
.course-card {
    width: 260px;
    padding: $space-m;
    &:hover {
        .edit-course-icon,
        .delete-course-icon {
            display: block;
        }
    }
}
.course-card-image-container {
    position: relative;
    margin-bottom: $space-s;
    width: 260px;
    min-height: 120px;
    max-height: auto;
}
.course-img {
    max-width: 100%;
    height: auto;
}
.edit-course-icon,
.delete-course-icon {
    position: absolute;
    top: $space-xs;
    display: none;
    cursor: pointer;
}
.edit-course-icon {
    right: $space-xs;
}
.delete-course-icon {
    right: $space-xxl;
}
.course-card-date {
    font-size: $font-s;
    color: $dark-grey;
    margin-bottom: $space-xs;
}
.course-card-title {
    font-size: $font-m;
    font-weight: $bold;
    line-height: 1.5;
    margin-bottom: $space-xs;
    word-break: break-word;
}
.course-card-text {
    margin-bottom: $space-m;
}
</style>
