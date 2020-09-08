<template>
  <div>
    <h2>Editieren einer Veranstaltung</h2>
    <b-form @submit.prevent="update">
      <div v-show="hasError" style="color: darkred" data-testid="errorMsg">
        Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut.
      </div>

      <CourseInputForm
        ref="courseForm"
        :course="course"
        @ready="isReady => (isValid = isReady)"
      />

      <b-row class="mb-3">
        <b-col>
          <b-button
            @click="
              $router.push({ name: 'courseDetails', params: { courseId } })
            "
            variant="secondary"
          >
            Abbrechen
          </b-button>
          <b-button type="submit" variant="primary">
            Speichern
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { getCourse, updateCourse } from "@/services/BackendService";
import CourseInputForm from "@/components/CourseInputForm";

export default {
  name: "CourseEditForm",
  components: { CourseInputForm },
  data: function() {
    return {
      isValid: true,
      hasError: false,
      course: {}
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
    update: function() {
      this.$refs.courseForm.touch();

      this.$nextTick(() => {
        if (!this.isValid) {
          return false;
        }

        const id = this.courseId;
        updateCourse(this.course)
          .then(() => {
            this.$router.push({
              name: "courseDetails",
              params: { courseId: id }
            });
          })
          .catch(this.handleError);
      });
    },
    handleError: function(error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(
          "an error has occurred when trying to send data to server."
        );
      }
      this.hasError = true;
    },
    loadCourse: function(courseId) {
      getCourse(courseId)
        .then(response => {
          this.course = response.data;
        })
        .catch(this.handleError);
    }
  },
  mounted: function() {
    this.loadCourse(this.courseId);
  }
};
</script>

<style scoped></style>
