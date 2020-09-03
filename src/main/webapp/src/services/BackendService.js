import axios from 'axios';
import config from '../../config'

export const BACKEND_URL = config.backendUrl;

export function getCourses() {
    return axios.get(BACKEND_URL + '/courses');
}

export function postCourse(course) {
    return axios.post(BACKEND_URL + '/courses', course);
}
