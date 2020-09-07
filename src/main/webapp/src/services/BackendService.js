import axios from "axios";

export function getCourses() {
  return axios.get("courses");
}

export function getCourse(courseId) {
  return axios.get(`courses/${courseId}`);
}

export function postCourse(course) {
  return axios.post("courses", course);
}
