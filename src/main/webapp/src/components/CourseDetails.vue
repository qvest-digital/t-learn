<template>
  <div>
    <div>
      <h1>{{ course.title }}</h1>
    </div>
    <div>
      <div class="detailThumbnail">
        <b-img left thumbnail class="mb-3 mr-3" :src="cardimage(course)"></b-img>
      </div>
      <b-row class="mb-3" cols="1" cols-md="2">
        <b-col v-if="course.courseType">
          <div class="label">Typ:</div>{{ course.courseType=='EXTERNAL' ? 'Extern' : 'Intern' }}
        </b-col>
        <b-col v-if="course.location">
          <div class="label">Ort:</div>{{ course.location=='REMOTE' ? 'Remoteveranstaltung' : 'Präsenzveranstaltung' }}
        </b-col>
        <b-col v-if="course.startDate">
          <div class="label">Start:</div>{{ course.startDate | formatDate }}
        </b-col>
        <b-col v-if="course.endDate">
          <div class="label">Ende:</div>{{ course.endDate | formatDate }}
        </b-col>
        <b-col v-if="course.address">
          <div class="label">Adresse:</div>{{ course.address }}
        </b-col>
        <b-col v-if="course.organizer">
          <div class="label">Organisator:</div>{{ course.organizer }}
        </b-col>
        <b-col v-if="course.trainer">
          <div class="label">Trainer:</div>{{ course.trainer }}
        </b-col>
        <b-col v-if="course.link">
          <div class="label">Link:</div><div class="abbreviation"><a :href="course.link">{{ course.link }}</a></div>
        </b-col>
      </b-row>
      <p>{{ course.targetAudience }}</p>
    </div>
  </div>
</template>

<script>
import coffeeImg from '../assets/coffee.jpg';
import signsImg from '../assets/signs.jpg';
import { getCourse } from "@/services/BackendService";

export default {
  name: "CourseDetails",
  data: function () {
    return {
      course: {}
    }
  },
  props: {
    courseId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    courseId: function (courseId) {
      this.loadCourse(courseId)
    }
  },
  methods: {
    cardimage: function (course) {
      switch (course.courseType) {
        case "EXTERNAL":
          return signsImg;
        case "INTERNAL":
        default:
          return coffeeImg;
      }
    },
    loadCourse: function (courseId) {
      getCourse(courseId)
          .then((response) => {
            this.course = response.data;
          })
          .catch(() => this.course = {});
    }
  },
  mounted: function () {
    this.loadCourse(this.courseId);
  }
}
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