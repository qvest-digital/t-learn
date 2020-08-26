<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <b-container fluid>
        <a class="navbar-brand py-0" href="/">
          <!--img src="/static/logo.webp" class="pr-2 " style="height:2rem;"-->
          Weiterbildungsbörse
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/foor">bar</a>
            </li>
          </ul>
        </div>
      </b-container>
    </nav>
    <b-container class="pt-5">
      <CourseCreationForm></CourseCreationForm>
      <CourseOverview></CourseOverview>
    </b-container>
    <footer class="container-fluid bg-light text-center mt-4">
      <span class="text-muted">
        something |
        <a class="link-secondary" href="/privacy-policy">Privacy Policy</a>
        | <a class="link-secondary" href="/impressum">Impressum</a>
      </span>
    </footer>
  </div>
</template>

<script>
import CourseCreationForm from "./components/CourseCreationForm";
import CourseOverview from "./components/CourseOverview";

export default {
  name: 'App',
  components: {
    CourseCreationForm,
    CourseOverview
  }
}
</script>

<style>

</style>
