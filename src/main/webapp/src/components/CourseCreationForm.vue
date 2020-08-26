<template>
  <div>
    <b-form @submit.prevent="create">
      <div v-show="hasError" style="color: darkred" data-testid="errorMsg">
        Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut.
      </div>

      <div class="mb-3">
        <label for="title" class="form-label required-label">Titel / Thema</label>
        <b-form-input v-model="course.title" id="title" size="lg" placeholder="Veranstaltungsbezeichnung" required
                      data-testid="title"/>
      </div>

      <b-row class="mb-3">
        <b-col>
          <label for="trainer" class="form-label required-label">Trainer</label>
          <b-form-input v-model="course.trainer" id="trainer" placeholder="Trainer" required/>
        </b-col>
        <b-col>
          <label for="organizer" class="form-label">Organisator</label>
          <b-form-input v-model="course.organizer" id="organizer" placeholder="Organisator"/>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col>
          <label for="startDate" class="form-label">Start</label>
          <b-form-input v-model="startDateRaw" id="startDate" placeholder="DD.MM.YYYY HH:MM"/>
        </b-col>
        <b-col>
          <label for="endDate" class="form-label">Ende</label>
          <b-form-input v-model="endDateRaw" id="endDate" placeholder="DD.MM.YYYY HH:MM"/>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col>
          <label for="courseType" class="form-label required-label">Veranstaltungsart</label>
          <b-form-select v-model="course.courseType" :options="courseTypes" id="courseType" required/>
        </b-col>
        <b-col>
          <label for="location" class="form-label">Ort</label>
          <b-form-select v-model="course.location" :options="locations" id="location"/>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col>
          <label for="address" class="form-label">Veranstaltungsadresse</label>
          <b-form-input v-model="course.address" id="address" placeholder="postalische Adresse"/>
        </b-col>
        <b-col>
          <label for="link" class="form-label">Weiterführender Link</label>
          <b-form-input v-model="course.link" id="link" placeholder="https://"/>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col>
          <label for="targetAudience" class="form-label">Zielgruppe</label>
          <b-form-textarea v-model="course.targetAudience" id="targetAudience" placeholder="Veranstaltungsbeschreibung"
                           rows="3" max-rows="6"/>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col>
          <b-button type="submit" variant="primary">
            Erstellen
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import parse from 'date-fns/parse';

export default {
  name: "CourseCreationForm",
  data: function () {
    return {
      hasError: false,
      startDateRaw: null,
      endDateRaw: null,
      courseTypes: [
        {value: null, text: 'Bitte wählen'},
        {value: "EXTERNAL", text: 'Extern'},
        {value: "INTERNAL", text: 'Intern'},
      ],
      locations: [
        {value: null, text: 'Bitte wählen'},
        {value: "REMOTE", text: 'Remote'},
        {value: "ONSITE", text: 'Präsenz'},
      ],
      course: {
        title: null,
        trainer: null,
        organizer: null,
        startDate: null,
        endDate: null,
        courseType: null,
        location: null,
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

      // TODO change hostname later
      axios.post('http://localhost:8080/courses', course)
          .then(() => {
            this.resetForm()
            this.hasError = false;
          })
          .catch(this.handleError);
    },
    resetForm: function () {
      this.startDateRaw = null;
      this.endDateRaw = null;
      Object.keys(this.course).forEach(prop => this.course[prop] = null);
    },
    handleError: function (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error("an error has occurred when trying to send data to server.");
      }
      this.hasError = true;
    }
  }
}
</script>

<style scoped>
.required-label::after {
  color: red;
  font-weight: bold;
  content: '\00a0*';
}
</style>