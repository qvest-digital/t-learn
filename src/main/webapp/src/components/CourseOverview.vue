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

                        <div class="icon-container delete-course-icon">
                            <img
                                @click.stop="onDeleteCourse(course)"
                                class="course-icon"
                                data-testid="deleteCourseIcon"
                                title="Veranstaltung löschen"
                                src="../assets/images/trash.svg"
                            />
                        </div>
                        <div class="icon-container edit-course-icon">
                            <img
                                @click.stop="
                                    $router.push({
                                        name: 'courseEdit',
                                        params: { courseId: course.id }
                                    })
                                "
                                data-testid="editCourseIcon"
                                class="course-icon"
                                title="Veranstaltung editieren"
                                src="../assets/images/pencil.svg"
                            />
                        </div>
                    </div>
                    <div class="course-card-date">
                        {{ course.startDate | formatDate }}
                    </div>
                    <div :title="course.title" class="course-card-title">
                        {{ course.title }}
                    </div>

                    <div class="course-card-text">
                        <span v-if="course.executionType">
                            {{
                                course.executionType === 'REMOTE'
                                    ? 'Remote'
                                    : 'Präsenz'
                            }}
                        </span>
                        <span v-if="course.courseForm">
                            {{
                                course.courseForm === 'MEETUP'
                                    ? 'MeetUp'
                                    : course.courseForm === 'CONFERENCE'
                                    ? 'Barcamp/Konferenz'
                                    : course.courseForm === 'LANGUAGE_COURSE'
                                    ? 'Sprachkurs'
                                    : course.courseForm === 'CERTIFICATION'
                                    ? 'Zertifizierung'
                                    : course.courseForm === 'STUDY_GROUP'
                                    ? 'Lerngruppe'
                                    : course.courseForm === 'LECTURE'
                                    ? 'Vortrag'
                                    : course.courseForm === 'SEMINAR'
                                    ? 'Seminar'
                                    : course.courseForm === 'WORKSHOP'
                                    ? 'Workshop'
                                    : ''
                            }}
                        </span>
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
        .icon-container {
            display: block;
        }
    }
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

// card images
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
.icon-container {
    border-radius: $border-radius-l;
    width: 32px;
    height: 32px;
    background: $white;
    position: absolute;
    display: none;
    top: $space-xs;
    cursor: pointer;

    .course-icon {
        width: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
    }
}
.edit-course-icon {
    right: $space-xs;
}
.delete-course-icon {
    right: $space-xxl;
}
</style>
