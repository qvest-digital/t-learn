<template>
  <div>
    <h2>Übersicht über alle Veranstaltungen</h2>
    <b-row cols-lg="3">
      <b-col v-for="course in courses" :key="course.id">
        <b-card :title="course.title"
                :img-src="cardimage(course)"
                :img-alt="course.title">
          <b-card-text>
            <div v-if="course.location === 'REMOTE'">
              Remote
            </div>
            <div v-if="course.location === 'ONSITE'">
              Präsenz
            </div>
            <div>
              {{ course.targetAudience }}
            </div>
            <a href="#" class="stretched-link"></a>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import coffeeImg from '../assets/coffee.jpg';
import signsImg from '../assets/signs.jpg';

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
    // TODO change hostname later
    axios.get('http://localhost:8080/courses')
        .then((response) => {
          this.courses = response.data;
        })
        .catch(() => this.courses = []);
  }
}
</script>

<style scoped>

</style>