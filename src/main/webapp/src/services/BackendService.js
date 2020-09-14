import axios from "axios";

export function getCourses() {
  return axios.get("courses");
}

export function getCourse(courseId) {
  return axios.get(`courses/${courseId}`);
}

export function createCourse(course) {
  return axios.post("courses", course);
}

export function updateCourse(course) {
  return axios.put(`courses/${course.id}`, course);
}

export function deleteCourse(courseId) {
  return axios.delete(`courses/${courseId}`);
}
