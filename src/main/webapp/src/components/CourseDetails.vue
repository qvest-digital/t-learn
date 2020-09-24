<template>
    <div>
        <ConfirmModal
            @cancel="showModal = false"
            @confirm="deleteCourse(course.id)"
            v-if="showModal"
            confirmButtonTitle="LÖSCHEN"
            cancelButtonTitle="ABBRECHEN"
            modalTitle="Veranstaltung löschen"
            :text="
                `Möchtest Du die Veranstaltung &quot;${course.title}&quot; wirklich löschen?`
            "
        />
        <div data-testid="courseDetailsTitle" class="page-title">
            {{ course.title }}
        </div>
        <div>
            <div class="course-details-image-container">
                <img
                    class="course-img"
                    :src="cardimage(course)"
                    :alt="course.title"
                />
            </div>

            <div class="course-details-content-container">
                <div class="course-details-content" v-if="course.courseType">
                    <span id="courseType" class="course-details-content-label"
                        >Typ:</span
                    >
                    <span
                        aria-labelledby="courseType"
                        class="course-details-content-text"
                        >{{
                            course.courseType === 'EXTERNAL'
                                ? 'Extern'
                                : 'Intern'
                        }}</span
                    >
                </div>
                <div class="course-details-content" v-if="course.location">
                    <span id="location" class="course-details-content-label"
                        >Ort:</span
                    >
                    <span
                        aria-labelledby="location"
                        class="course-details-content-text"
                    >
                        {{
                            course.location == 'REMOTE'
                                ? 'Remoteveranstaltung'
                                : 'Präsenzveranstaltung'
                        }}
                    </span>
                </div>
                <div class="course-details-content" v-if="course.startDate">
                    <span id="startDate" class="course-details-content-label"
                        >Start:</span
                    >
                    <span
                        aria-labelledby="startDate"
                        class="course-details-content-text"
                        >{{ course.startDate | formatDate }}
                    </span>
                </div>
                <div class="course-details-content" v-if="course.endDate">
                    <span id="endDate" class="course-details-content-label"
                        >Ende:</span
                    >
                    <span
                        aria-labelledby="endDate"
                        class="course-details-content-text"
                        >{{ course.endDate | formatDate }}
                    </span>
                </div>
                <div class="course-details-content" v-if="course.address">
                    <span id="address" class="course-details-content-label"
                        >Adresse:</span
                    >
                    <span
                        aria-labelledby="address"
                        class="course-details-content-text"
                        >{{ course.address }}
                    </span>
                </div>
                <div class="course-details-content" v-if="course.organizer">
                    <span id="organizer" class="course-details-content-label"
                        >Ansprechpartner*in:</span
                    >
                    <span
                        aria-labelledby="organizer"
                        class="course-details-content-text"
                        >{{ course.organizer }}
                    </span>
                </div>
                <div class="course-details-content" v-if="course.trainer">
                    <span id="trainer" class="course-details-content-label"
                        >Veranstalter*in:</span
                    >
                    <span
                        aria-labelledby="trainer"
                        class="course-details-content-text"
                    >
                        {{ course.trainer }}
                    </span>
                </div>
                <div class="course-details-content" v-if="course.link">
                    <span id="link" class="course-details-content-label"
                        >Link:</span
                    >
                    <span
                        aria-labelledby="link"
                        class="course-details-content-text"
                    >
                        <a :href="course.link">{{ course.link }}</a>
                    </span>
                </div>
            </div>
            <div class="course-details-target-audiance">
                {{ course.targetAudience }}
            </div>
            <div class="course-details-description">
                {{ course.description }}
            </div>
            <div class="course-details-nav">
                <div>
                    <button @click="$router.push('/')">
                        ZURÜCK
                    </button>
                    <button
                        @click="
                            $router.push({
                                name: 'courseEdit',
                                params: { courseId }
                            })
                        "
                    >
                        BEARBEITEN
                    </button>
                    <button @click="showModal = true">
                        LÖSCHEN
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import coffeeImg from '@/assets/images/coffee.jpg';
import signsImg from '@/assets/images/signs.jpg';
import { deleteCourse, getCourse } from '@/services/BackendService';
import ConfirmModal from './ConfirmModal';
import handleError from '@/components/handleError';

export default {
    name: 'CourseDetails',
    components: { ConfirmModal },
    data: function() {
        return {
            course: {},
            showModal: false
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
        cardimage: function(course) {
            switch (course.courseType) {
                case 'EXTERNAL':
                    return signsImg;
                case 'INTERNAL':
                default:
                    return coffeeImg;
            }
        },
        loadCourse: function(courseId) {
            getCourse(courseId)
                .then(response => {
                    this.course = response.data;
                })
                .catch(error => handleError(this, error));
        },
        deleteCourse: function(courseId) {
            deleteCourse(courseId)
                .then(() => {
                    this.showModal = false;
                    this.$router.push('/');
                })
                .catch(() =>
                    console.error(`${courseId} could not be deleted)`)
                );
        }
    },
    mounted: function() {
        this.loadCourse(this.courseId);
    }
};
</script>

<style scoped>
.label {
    width: 7rem;
    font-weight: 700 !important;
    float: left !important;
}

.detailThumbnail {
    max-width: 20rem;
}

.abbreviation {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% - 7rem);
}
</style>
