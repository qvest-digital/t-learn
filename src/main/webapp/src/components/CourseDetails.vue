<template>
    <div>
        <ConfirmModal
            @cancel="showModal = false"
            @confirm="deleteCourse(course.id)"
            v-if="showModal"
            confirmButtonTitle="Löschen"
            cancelButtonTitle="Abbrechen"
            :text="
                `Möchtest Du die Veranstaltung &quot;${course.title}&quot; wirklich löschen?`
            "
        />
        <div class="page-title">
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
                    <span class="course-details-content-label">Typ:</span>
                    <span
                        id="course-details-text-course-type"
                        class="course-details-content-text"
                        >{{
                            course.courseType == 'EXTERNAL'
                                ? 'Extern'
                                : 'Intern'
                        }}</span
                    >
                </div>
                <div class="course-details-content" v-if="course.location">
                    <span class="course-details-content-label">Ort:</span>
                    <span
                        id="course-details-text-course-location"
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
                    <span class="course-details-content-label">Start:</span>
                    <span
                        id="course-details-text-course-start-date"
                        class="course-details-content-text"
                        >{{ course.startDate | formatDate }}
                    </span>
                </div>
                <div class="course-details-content" v-if="course.endDate">
                    <span class="course-details-content-label">Ende:</span>
                    <span
                        id="course-details-text-course-end-date"
                        class="course-details-content-text"
                        >{{ course.endDate | formatDate }}
                    </span>
                </div>
                <div class="course-details-content" v-if="course.address">
                    <span class="course-details-content-label">Adresse:</span>
                    <span
                        id="course-details-text-course-address"
                        class="course-details-content-text"
                        >{{ course.address }}
                    </span>
                </div>
                <div class="course-details-content" v-if="course.organizer">
                    <span class="course-details-content-label"
                        >Organisator:</span
                    >
                    <span
                        id="course-details-text-course-organizer"
                        class="course-details-content-text"
                        >{{ course.organizer }}
                    </span>
                </div>
                <div class="course-details-content" v-if="course.trainer">
                    <span class="course-details-content-label">Trainer:</span>
                    <span
                        id="course-details-text-course-trainer"
                        class="course-details-content-text"
                    >
                        {{ course.trainer }}
                    </span>
                </div>
                <div class="course-details-content" v-if="course.link">
                    <span class="course-details-content-label">Link:</span>
                    <span
                        id="course-details-text-course-link"
                        class="course-details-content-text"
                    >
                        <a :href="course.link">{{ course.link }}</a>
                    </span>
                </div>
            </div>
            <div class="course-details-target-audiance">
                {{ course.targetAudience }}
            </div>
            <div class="course-details-nav">
                <div>
                    <button @click="$router.push('/')">
                        Zurück
                    </button>
                    <button
                        @click="
                            $router.push({
                                name: 'courseEdit',
                                params: { courseId }
                            })
                        "
                    >
                        Bearbeiten
                    </button>
                    <button
                        data-testid="course-details-delete-button"
                        @click="showModal = true"
                    >
                        Löschen
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import coffeeImg from '@/assets/coffee.jpg';
import signsImg from '@/assets/signs.jpg';
import { deleteCourse, getCourse } from '@/services/BackendService';
import ConfirmModal from './ConfirmModal';
// import handleError from '@/components/handleError';

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
                .catch(error => console.error(error));
            // .catch(error => handleError(this, error));
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
