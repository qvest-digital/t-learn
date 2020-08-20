<template>
  <div id="app">
    <CourseCreationForm/>
  </div>
</template>

<script>
import CourseCreationForm from "./components/CourseCreationForm";

export default {
  name: 'App',
  components: {
    CourseCreationForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
