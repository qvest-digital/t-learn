import '@testing-library/jest-dom';
import axios from 'axios';
import {BACKEND_URL, getCourses, postCourse} from '@/services/BackendService';

jest.mock('axios');

describe('BackendService.js', () => {
    it('requests course data from the server', async () => {
        axios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        id: 1,
                        title: 'Title1',
                        targetAudience: 'targetAudience1'
                    },
                    {
                        id: 2,
                        title: 'Title2',
                        targetAudience: 'targetAudience2'
                    }
                ]
            })
        );

        const courses = await getCourses();
        expect(axios.get).toHaveBeenCalledWith(BACKEND_URL + '/courses');
        expect(courses.data).toHaveLength(2);
    })

    it('send course data to the server', async () => {
        const course = {
            title: 'title',
            trainer: 'trainer',
            courseType: 'courseType',
            link: 'link'
        };

        axios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: course
            })
        );

        const response = await postCourse(course);
        expect(axios.post).toHaveBeenCalledWith(BACKEND_URL + '/courses', course);
        expect(response.data).toBe(course)
    })

})
