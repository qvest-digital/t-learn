<template>
  <div>
    <h2>Übersicht über alle Veranstaltungen</h2>
    <b-row cols-lg="3">
      <b-col v-for="course in courses" :key="course.id">
        <b-card :title="course.title"
                :img-src="cardimage(course)"
                :img-alt="course.title">
          <b-card-text v-if="course.location === 'REMOTE'">
            Remote
          </b-card-text>
          <b-card-text v-if="course.location === 'ONSITE'">
            Präsenz
          </b-card-text>
          <b-card-text>
            {{ course.targetAudience }}
            <router-link :to="{ name: 'courseDetails', params: {courseId : course.id}}"
                         class="stretched-link"></router-link>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import coffeeImg from '../assets/coffee.jpg';
import signsImg from '../assets/signs.jpg';
import { getCourses } from '@/services/BackendService';

export default {
  name: "CourseOverview",
  data: function () {
    return {
      courses: []
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
    }
  },
  mounted: function () {
    getCourses()
        .then((response) => this.courses = response.data)
        .catch(() => this.courses = []);
  }
}
</script>

<style scoped>

</style>
