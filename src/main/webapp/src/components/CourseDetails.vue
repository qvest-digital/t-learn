<template>
    <div class="course-details-container">
        <ConfirmModal
            @cancel="showConfirmDeleteModal = false"
            @confirm="deleteCourse(course.id)"
            v-if="showConfirmDeleteModal"
            confirmButtonTitle="LÖSCHEN"
            cancelButtonTitle="ABBRECHEN"
            modalTitle="Veranstaltung löschen - "
            :extraTitle="course.title"
        >
            <div>
                Möchtest Du die Veranstaltung wirklich löschen?
            </div>
        </ConfirmModal>

        <ConfirmModal
            @cancel="showFeedbackModal = false"
            @confirm="addFeedback(course.id)"
            v-if="showFeedbackModal"
            confirmButtonTitle="SPEICHERN"
            cancelButtonTitle="ABBRECHEN"
            modalTitle="Veranstaltung löschen - "
            :extraTitle="course.title"
        >
            <FeedbackQuestions @feedback="setFeedback" />
        </ConfirmModal>
        <div class="course-details-nav">
            <div class="nav-item">
                <button class="button with-icon" @click="$router.push('/')">
                    <img
                        class="button-icon"
                        src="../assets/images/arrow-left.svg"
                    />
                    ZURÜCK
                </button>
            </div>
            <div class="nav-item">
                <button
                    class="button with-icon"
                    @click="showFeedbackModal = true"
                >
                    <img
                        class="button-icon"
                        src="../assets/images/chat-text.svg"
                    />FEEDBACK
                </button>
                <button
                    class="button with-icon"
                    @click="
                        $router.push({
                            name: 'courseEdit',
                            params: { courseId }
                        })
                    "
                >
                    <img
                        class="button-icon"
                        src="../assets/images/pencil.svg"
                    />
                    BEARBEITEN
                </button>
                <button
                    class="button with-icon"
                    @click="showConfirmDeleteModal = true"
                >
                    <img
                        class="button-icon"
                        src="../assets/images/trash.svg"
                    />LÖSCHEN
                </button>
            </div>
        </div>
        <div class="course-details-main-container">
            <div class="course-details-content-container">
                <div class="course-details-image-container">
                    <img
                        class="course-img"
                        :src="cardimage(course)"
                        :alt="course.title"
                    />
                </div>
                <div
                    data-testid="courseDetailsTitle"
                    class="course-details-content-title"
                    :title="course.title"
                >
                    {{ course.title }}
                </div>
                <div
                    class="course-details-content-category-container"
                    data-testid="categories"
                >
                    <div
                        v-for="category in course.categoryNames"
                        :key="category"
                        class="course-details-content-category"
                    >
                        {{ category }}
                    </div>
                </div>
                <div
                    v-if="course.targetAudience"
                    class="course-details-content-subtitle"
                >
                    Zielgruppe
                </div>
                <p class="course-details-content-text">
                    {{ course.targetAudience }}
                </p>
                <div
                    data-testid="beschreibung"
                    class="course-details-content-subtitle"
                    v-if="course.description"
                >
                    Beschreibung
                </div>
                <p class="course-details-content-text">
                    {{ course.description }}
                </p>
            </div>

            <div class="course-details-summary-container">
                <div class="course-details-summary-title">
                    Steckbrief
                </div>
                <div
                    id="organizer"
                    v-if="course.organizer"
                    class="course-details-summary-label"
                >
                    Veranstalter*in:
                </div>
                <div
                    data-testid="organizer"
                    class="course-details-summary-text"
                    :title="course.organizer"
                    v-if="course.organizer"
                >
                    {{ course.organizer }}
                </div>

                <div
                    v-if="course.address"
                    id="address"
                    class="course-details-summary-label"
                >
                    Ort:
                </div>
                <div
                    v-if="course.address"
                    :title="course.address"
                    data-testid="address"
                    class="course-details-summary-text"
                >
                    <address>
                        {{ course.address }}
                    </address>
                </div>

                <div
                    v-if="course.contactPerson"
                    id="contactPerson"
                    class="course-details-summary-label"
                >
                    Ansprechpartner*in:
                </div>
                <div
                    v-if="course.contactPerson"
                    :title="course.contactPerson"
                    data-testid="contactPerson"
                    class="course-details-summary-text"
                >
                    {{ course.contactPerson }}
                </div>

                <div
                    v-if="course.link"
                    id="link"
                    class="course-details-summary-label"
                >
                    Link:
                </div>
                <div
                    v-if="course.link"
                    :title="course.link"
                    data-testid="link"
                    class="course-details-summary-text"
                >
                    <a :href="course.link">{{ course.link }}</a>
                </div>

                <div
                    v-if="course.startDate || course.endDate"
                    class="course-details-summary-with-icon"
                >
                    <img
                        class="course-details-summary-icon"
                        src="../assets/images/clock.svg"
                    />
                    <span
                        v-if="course.startDate"
                        data-testid="startDateSummary"
                        class="course-details-summary-icon-text"
                        >{{ course.startDate | formatDate }}
                    </span>
                    <span class="hyphen" v-if="course.endDate">-</span>
                    <span
                        v-if="course.endDate"
                        data-testid="endDate"
                        class="course-details-summary-icon-text"
                        >{{ course.endDate | formatDate }}
                    </span>
                </div>

                <div class="course-details-summary-with-icon">
                    <img
                        class="course-details-summary-icon"
                        src="../assets/images/camera-video.svg"
                    />
                    <span
                        v-if="course.courseType"
                        data-testid="courseType"
                        class="course-details-summary-icon-text"
                    >
                        {{
                            course.courseType === 'EXTERNAL'
                                ? 'Extern'
                                : 'Intern'
                        }}
                    </span>
                    <span class="comma" v-if="course.courseForm">,</span>
                    <span
                        v-if="course.courseForm"
                        data-testid="courseForm"
                        class="course-details-summary-icon-text"
                    >
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
                    <span class="comma" v-if="course.executionType">,</span>
                    <span
                        v-if="course.executionType"
                        data-testid="executionType"
                        class="course-details-summary-icon-text"
                    >
                        {{
                            course.executionType === 'REMOTE'
                                ? 'Remote'
                                : 'Präsenz'
                        }}
                    </span>
                </div>

                <div class="course-details-summary-with-icon">
                    <img
                        v-if="course.price"
                        class="course-details-summary-icon"
                        src="../assets/images/cash.svg"
                    />
                    <span
                        v-if="course.price"
                        data-testid="price"
                        class="course-details-summary-icon-text"
                    >
                        {{ course.price }}
                    </span>
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
import FeedbackQuestions from './FeedbackQuestions';
import handleError from '@/components/handleError';

export default {
    name: 'CourseDetails',
    components: { ConfirmModal, FeedbackQuestions },
    data: function() {
        return {
            course: {},
            showConfirmDeleteModal: false,
            showFeedbackModal: false,
            feedback: {}
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
                    this.showConfirmDeleteModal = false;
                    this.$router.push('/');
                })
                .catch(() =>
                    console.error(`${courseId} could not be deleted)`)
                );
        },
        setFeedback: function(feedback) {
            this.feedback = feedback;
        },
        addFeedback: function(/*courseId*/) {
            //TODO: send payload to backend
            // createFeedback(courseId, this.feedback)
            //     .then(response => {
            //         this.feedback = response.data;
            //     })
            //     .catch(error => handleError(this, error));
        }
    },
    mounted: function() {
        this.loadCourse(this.courseId);
    }
};
</script>

<style lang="scss" scoped>
// page container
.course-details-container {
    margin: auto;
    max-width: $container-xl;
}
.course-details-main-container {
    display: flex;
    justify-content: space-between;
}
// buttons container
.course-details-nav {
    margin-bottom: $space-xxl;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nav-item > button:not(:last-child) {
    margin-right: $space-s;
}

// course content
.course-details-content-container {
    max-width: $container-m;
}
.course-details-image-container {
    margin-bottom: $space-l;
    width: $container-m;
    min-height: 120px;
    max-height: fit-content;
    padding: 3px;
}
.course-img {
    max-width: 100%;
    height: auto;
}
.course-details-content-date {
    margin-bottom: $space-xs;
}
.course-details-content-title {
    font-size: $font-xl;
    font-weight: $normal;
    margin-bottom: $space-l;
    word-break: break-word;
}
.course-details-content-category-container {
    display: flex;
    margin-bottom: $space-xl;
    flex-wrap: wrap;
}
.course-details-content-category {
    background: $light-grey;
    padding: 0 $space-xs;
    font-size: $font-s;
    font-weight: $bold;
    line-height: $space-l;
    border-radius: $border-radius-xs;
    margin: 0 $space-xs $space-xs 0;
    height: $space-l;
}
.course-details-content-subtitle {
    font-size: $font-l;
    font-weight: $normal;
    margin-bottom: $space-m;
}
.course-details-content-text {
    font-size: $font-s;
    line-height: 1.57;
    margin-bottom: $space-m;
}
// course summary
.course-details-summary-container {
    background: $light-grey;
    padding: $space-m;
    text-align: left;
    width: $container-xs;
    align-self: start;
}

.course-details-summary-title {
    font-size: $font-l;
    font-weight: $normal;
    margin-bottom: $space-m;
}
.course-details-summary-label {
    font-size: $font-m;
    font-weight: $normal;
    margin-bottom: $space-xs;
}
.course-details-summary-text {
    font-size: $font-s;
    font-weight: initial;
    line-height: 1.57;
    margin-bottom: $space-xs;
    word-break: break-word;
}
.course-details-summary-icon-text {
    font-size: $font-s;
    font-weight: initial;
}
.course-details-summary-icon {
    margin-right: $space-s;
}
.course-details-summary-with-icon {
    display: flex;
    align-items: center;
    .comma {
        margin-right: $space-xs;
    }
    .hyphen {
        margin: 0 $space-xs;
    }
}
//style not the last element with class course-details-summary-with-icon
.course-details-summary-with-icon:not(:last-of-type) {
    margin-top: $space-m;
    margin-bottom: $space-s;
}
address {
    font-style: normal;
}
</style>
