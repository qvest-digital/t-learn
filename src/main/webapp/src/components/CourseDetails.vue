<template>
    <div class="course-details-container">
        <ConfirmModal
            @cancel="showModal = false"
            @confirm="deleteCourse(course.id)"
            v-if="showModal"
            confirmButtonTitle="LÖSCHEN"
            cancelButtonTitle="ABBRECHEN"
            modalTitle="Veranstaltung löschen - "
            :extraTitle="course.title"
            text="Möchtest Du die Veranstaltung wirklich löschen?"
        />
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
                <button class="button with-icon" @click="showModal = true">
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
                    id="trainer"
                    v-if="course.trainer"
                    class="course-details-summary-label"
                >
                    Veranstalter*in:
                </div>
                <div
                    data-testid="trainer"
                    class="course-details-summary-text"
                    :title="course.trainer"
                    v-if="course.trainer"
                >
                    {{ course.trainer }}
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
                            course.courseForm === 'MEETUP' ? 'MeetUp' :
                            course.courseForm === 'CONFERENCE' ? 'Barcamp/Konferenz' :
                            course.courseForm === 'LANGUAGE_COURSE' ? 'Sprachkurs' :
                            course.courseForm === 'CERTIFICATION' ? 'Zertifizierung' :
                            course.courseForm === 'STUDY_GROUP' ? 'Lerngruppe' :
                            course.courseForm === 'LECTURE' ? 'Vortrag' :
                            course.courseForm === 'SEMINAR' ? 'Seminar' :
                            course.courseForm === 'WORKSHOP' ? 'Workshop' : ''
                        }}
                    </span>
                    <span class="comma" v-if="course.executionType">,</span>
                    <span
                        v-if="course.executionType"
                        data-testid="executionType"
                        class="course-details-summary-icon-text"
                    >
                        {{
                            course.executionType === 'REMOTE' ? 'Remote' : 'Präsenz'
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
.nav-item > button:first-child {
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
    max-height: auto;
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
