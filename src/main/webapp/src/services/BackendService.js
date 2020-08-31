import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080';

export async function getCourses() {
    return await axios.get(BACKEND_URL + '/courses');
}

export async function postCourse(course) {
    return await axios.post(BACKEND_URL + '/courses', course);
}
