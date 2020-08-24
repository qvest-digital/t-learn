import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import axios from 'axios';
import CourseOverview from '@/components/CourseOverview.vue';
import { BootstrapVue } from 'bootstrap-vue';

jest.mock('axios');

describe('CourseOverview.vue', () => {
    it('requests and displays course data from server', async () => {

        axios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        id: 1,
                        title: "Title1",
                        targetAudience: "TestTestTest1",
                    },
                    {
                        id: 2,
                        title: "Title2",
                        targetAudience: "TestTestTest2",
                    }
                ]
            }),
        );

        render(CourseOverview, {}, localVue => {
            localVue.use(BootstrapVue)
        });

        const titles = await screen.findAllByText(/Title/);
        expect(titles).toHaveLength(2);
        const targetAudiences = await screen.findAllByText(/TestTestTest/);
        expect(targetAudiences).toHaveLength(2);

        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/courses');

    })
})