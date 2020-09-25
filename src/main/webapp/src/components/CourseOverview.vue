<template>
    <div>
        <div class="course-overview-title">
            Übersicht über alle Veranstaltungen
        </div>
        <div class="course-overview-container">
            <div v-for="course in courses" :key="course.id">
                <ConfirmModal
                    @cancel="showModal = false"
                    @confirm="deleteCourse(course)"
                    v-if="showModal"
                    confirmButtonTitle="LÖSCHEN"
                    cancelButtonTitle="ABBRECHEN"
                    modalTitle="Veranstaltung löschen - "
                    :extraTitle="course.title"
                    text="Möchtest Du die Veranstaltung wirklich löschen?"
                />

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
                        />
                        <img
                            @click.stop="showModal = true"
                            class="delete-course-icon"
                            data-testid="deleteCourseIcon"
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
                            src="../assets/images/edit-white-bg.svg"
                        />
                    </div>
                    <div class="course-card-date">
                        {{ course.startDate | formatDate }}
                    </div>
                    <div class="course-card-title">
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

<style lang="scss" scoped>
.course-overview-title {
    display: block;
    font-size: $l-font;
    font-weight: $normal;
    margin-bottom: $l-space;
    margin-left: $xl-space + $l-space;
}
.course-overview-container {
    display: flex;
    padding: 0 $xxl-space;
    flex-wrap: wrap;
}
.course-card {
    width: 260px;
    padding: $m-space;
    &:hover {
        .edit-course-icon,
        .delete-course-icon {
            display: block;
        }
    }
}
.course-card-image-container {
    position: relative;
    margin-bottom: $s-space;
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
    top: $xs-space;
    display: none;
    cursor: pointer;
}
.edit-course-icon {
    right: $xs-space;
}
.delete-course-icon {
    right: $xxl-space;
}
.course-card-date {
    font-size: $s-font;
    color: $dark-grey;
    margin-bottom: $xs-space;
}
.course-card-title {
    font-size: $m-font;
    font-weight: $bold;
    margin-bottom: $xs-space;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.course-card-text {
    margin-bottom: $m-space;
}
</style>
