<template>
  <div>
    <div v-show="hasError" style="color: darkred">
      Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut.
    </div>
    <form @submit.prevent="create">
      <div>
        <label for="title">Titel / Thema</label>
        <input v-model="course.title" id="title"/>
      </div>
      <div>
        <label for="trainer">Trainer</label>
        <input v-model="course.trainer" id="trainer"/>
      </div>
      <div>
        <label for="organizer">Organisator</label>
        <input v-model="course.organizer" id="organizer"/>
      </div>
      <div>
        <label for="startDate">Startzeitpunkt</label>
        <input v-model="startDateRaw" id="startDate"/>
      </div>
      <div>
        <label for="endDate">Endzeitpunkt</label>
        <input v-model="endDateRaw" id="endDate"/>
      </div>
      <div>
        <label for="courseType">Veranstaltungsart</label>
        <select v-model="course.courseType" id="courseType">
          <option value="">Bitte wählen</option>
          <option v-for="courseType in courseTypes" :value="courseType.value" :key="courseType.value">
            {{ courseType.text }}
          </option>
        </select>
      </div>
      <div>
        <label for="location">Ort</label>
        <select v-model="course.location" id="location">
          <option value="">Bitte wählen</option>
          <option v-for="location in locations" :value="location.value" :key="location.value">
            {{ location.text }}
          </option>
        </select>
      </div>
      <div>
        <label for="address">Adresse</label>
        <input v-model="course.address" id="address"/>
      </div>
      <div>
        <label for="targetAudience">Zielpublikum</label>
        <textarea v-model="course.targetAudience" id="targetAudience"/>
      </div>
      <div>
        <label for="link">Link</label>
        <input v-model="course.link" id="link"/>
      </div>
      <div>
        <button type="submit">
          Anlegen
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import parse from 'date-fns/parse';

export default {
  name: "CourseCreationForm",
  data: function () {
    return {
      hasError: false,
      startDateRaw: null,
      endDateRaw: null,
      courseTypes: [
        {value: "EXTERNAL", text: 'Extern'},
        {value: "INTERNAL", text: 'Intern'},
      ],
      locations: [
        {value: "REMOTE", text: 'Remote'},
        {value: "ONSITE", text: 'Präsenz'},
      ],
      course: {
        title: null,
        trainer: null,
        organizer: null,
        startDate: null,
        endDate: null,
        courseType: '',
        location: '',
        address: null,
        targetAudience: null,
        link: null
      }
    }
  },
  watch: {
    startDateRaw: function (val) {
      try {
        this.course.startDate = parse(val, "dd.MM.yyyy H:m", new Date()).toISOString();
      } catch (e) {
        console.error(`start date "${val}" not parseable!`);
      }
    },
    endDateRaw: function (val) {
      try {
        this.course.endDate = parse(val, "dd.MM.yyyy H:m", new Date()).toISOString();
      } catch (e) {
        console.error(`end date "${val}" not parseable!`);
      }
    }
  },
  methods: {
    create: function () {

      const course = this.course;

      course.courseType = course.courseType === "" ? null : course.courseType;
      course.location = course.location === "" ? null : course.location;

      // TODO change hostname later
      fetch('http://localhost:8080/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      })
          .then((response) => {
            if (response.ok) {
              this.resetForm()
            } else {
              response.text().then(this.handleError);
            }
            this.hasError = !response.ok;
          })
          .catch(this.handleError);
    },
    resetForm: function () {
      this.startDateRaw = null;
      this.endDateRaw = null;
      Object.keys(this.course).forEach(prop => this.course[prop] = null)
      this.course.courseType = '';
      this.course.location = '';
    },
    handleError: function (error) {
      console.error(error);
      this.hasError = true
    }
  }
}
</script>

<style scoped>

</style>