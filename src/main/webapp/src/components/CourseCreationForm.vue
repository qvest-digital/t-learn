<template>
  <div>
    <b-form @submit.prevent="create">
      <div v-show="hasError" style="color: darkred" data-testid="errorMsg">
        Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut.
      </div>

      <div class="mb-3">
        <label for="title" class="form-label required-label">Titel / Thema</label>
        <b-form-input v-model="$v.course.title.$model" :state="validateState('course.title')" id="title" size="lg"
                      placeholder="Veranstaltungsbezeichnung" data-testid="title"/>
        <b-form-invalid-feedback>Titel / Thema ist ein Pflichtfeld.</b-form-invalid-feedback>
      </div>

      <b-row class="mb-3">
        <b-col>
          <label for="trainer" class="form-label required-label">Trainer</label>
          <b-form-input v-model="$v.course.trainer.$model" :state="validateState('course.trainer')" id="trainer"
                        placeholder="Trainer"/>
          <b-form-invalid-feedback>Trainer ist ein Pflichtfeld.</b-form-invalid-feedback>
        </b-col>
        <b-col>
          <label for="organizer" class="form-label">Organisator</label>
          <b-form-input v-model="course.organizer" id="organizer" placeholder="Organisator"/>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col>
          <label for="startDate" class="form-label">Start</label>
          <b-form-input v-model="$v.startDateRaw.$model" :state="validateState('startDateRaw')"
                        id="startDate" placeholder="DD.MM.YYYY HH:MM"/>
          <b-form-invalid-feedback>
            Datum muss dem Muster "DD.MM.YYYY HH:MM" entsprechen und vor dem Ende-Datum liegen.
          </b-form-invalid-feedback>
        </b-col>
        <b-col>
          <label for="endDate" class="form-label">Ende</label>
          <b-form-input v-model="$v.endDateRaw.$model" :state="validateState('endDateRaw')"
                        id="endDate" placeholder="DD.MM.YYYY HH:MM"/>
          <b-form-invalid-feedback>
            Datum muss dem Muster "DD.MM.YYYY HH:MM" entsprechen und nach dem Start-Datum liegen.
          </b-form-invalid-feedback>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col>
          <label for="courseType" class="form-label required-label">Veranstaltungsart</label>
          <b-form-select v-model="$v.course.courseType.$model" :state="validateState('course.courseType')"
                         :options="courseTypes" id="courseType"/>
          <b-form-invalid-feedback>Veranstaltungsart ist ein Pflichtfeld.</b-form-invalid-feedback>
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
          <b-form-input v-model="$v.course.link.$model" :state="validateState('course.link')"
                        id="link" placeholder="https://"/>
          <b-form-invalid-feedback>
            Der Link muss ein gültiger URL sein und mit den Protokollen "http" oder "https" beginnen.
          </b-form-invalid-feedback>
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
import Vue from 'vue'
import { isValid, parse } from 'date-fns';
import { helpers, required, url } from 'vuelidate/lib/validators'

const parseDate = (val) => parse(val, "dd.MM.yyyy H:m", new Date());

const validDate = (val) => !helpers.req(val) || isValid(parseDate(val));

const startBeforeEnd = (val, vm) => {
  const startDate = parseDate(vm.startDateRaw);
  const endDate = parseDate(vm.endDateRaw);

  if (!isValid(startDate) || !isValid(endDate)) {
    // we only want to check when both dates are valid
    return true;
  }
  return startDate.getTime() < endDate.getTime();
}

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
  validations: {
    startDateRaw: {
      validDate,
      startBeforeEnd
    },
    endDateRaw: {
      validDate,
      startBeforeEnd
    },
    course: {
      title: {
        required
      },
      trainer: {
        required
      },
      courseType: {
        required
      },
      link: {
        url,
        protocol: helpers.regex('protocol', /https?\W/)
      }
    }
  },
  watch: {
    startDateRaw: function (val) {
      try {
        this.course.startDate = parseDate(val).toISOString();
      } catch (e) {
        console.error(`start date "${val}" not parseable!`);
      }
    },
    endDateRaw: function (val) {
      try {
        this.course.endDate = parseDate(val).toISOString();
      } catch (e) {
        console.error(`end date "${val}" not parseable!`);
      }
    }
  },
  methods: {
    create: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }

      // TODO change hostname later
      axios.post('http://localhost:8080/courses', this.course)
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

      Vue.nextTick().then(() => this.$v.$reset());
    },
    handleError: function (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error("an error has occurred when trying to send data to server.");
      }
      this.hasError = true;
    },
    validateState: function (path) {
      const {$dirty, $error} = path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, this.$v);

      return $dirty ? !$error : null;
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