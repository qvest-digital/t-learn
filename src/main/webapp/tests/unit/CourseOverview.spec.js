import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import CourseOverview from '@/components/CourseOverview.vue';
import { getCourses } from '@/services/BackendService';
import { BootstrapVue } from 'bootstrap-vue';
import routes from '@/routes';

jest.mock('@/services/BackendService');

describe('CourseOverview.vue', () => {
    it('requests and displays course data from server', async () => {

        getCourses.mockImplementationOnce(() =>
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

        render(CourseOverview, {
            routes: routes
        }, localVue => {
            localVue.use(BootstrapVue)
        });

        const titles = await screen.findAllByText(/Title/);
        expect(titles).toHaveLength(2);
        const targetAudiences = await screen.findAllByText(/TestTestTest/);
        expect(targetAudiences).toHaveLength(2);

        expect(getCourses).toHaveBeenCalled();

    })
})
