import '@testing-library/jest-dom';
import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import {
    fireEvent,
    render,
    waitForElementToBeRemoved
} from '@testing-library/vue';
import CourseOverview from '@/components/CourseOverview.vue';
import { deleteCourse, getCourses } from '@/services/BackendService';
// import { BootstrapVue } from 'bootstrap-vue';
import routes from '@/routes';

jest.mock('@/services/BackendService');

describe('CourseOverview.vue', () => {
    afterEach(() => {
        getCourses.mockReset();
        deleteCourse.mockReset();
    });

    it('requests and displays course data from server', async () => {
        mockGetCourses();

        const { findAllByText } = setupComponent();

        const titles = await findAllByText(/Title/);
        expect(titles).toHaveLength(2);
        const targetAudiences = await findAllByText(/TestTestTest/);
        expect(targetAudiences).toHaveLength(2);

        expect(getCourses).toHaveBeenCalled();
    });

    it("deletes course on server side when 'Löschen' button is clicked", async () => {
        mockGetCourses();
        const localVue = createLocalVue();
        localVue.use(VueRouter);

        const router = new VueRouter({
            routes
        });
        deleteCourse.mockImplementationOnce(() => Promise.resolve({}));
        const wrapper = mount(CourseOverview, { router, localVue });
        await wrapper.vm.$nextTick();
        await wrapper.find('#course-card-0-delete-button').trigger('click');
        await wrapper.find('.confirm-modal-confirm-button').trigger('click');
        expect(deleteCourse).toHaveBeenCalledWith(1);
    });

    it("does not delete anything when 'Abbrechen' button was clicked when deleting", async () => {
        mockGetCourses();
        const localVue = createLocalVue();
        localVue.use(VueRouter);

        const router = new VueRouter({
            routes
        });
        deleteCourse.mockImplementationOnce(() => Promise.resolve({}));
        const wrapper = mount(CourseOverview, { router, localVue });
        await wrapper.vm.$nextTick();
        await wrapper.find('#course-card-0-delete-button').trigger('click');
        await wrapper.find('.confirm-modal-cancel-button').trigger('click');
        expect(deleteCourse).not.toHaveBeenCalledWith(1);
    });

    function mockGetCourses() {
        getCourses.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        id: 1,
                        title: 'Title1',
                        targetAudience: 'TestTestTest1'
                    },
                    {
                        id: 2,
                        title: 'Title2',
                        targetAudience: 'TestTestTest2'
                    }
                ]
            })
        );
    }

    function setupComponent() {
        return render(CourseOverview, {
            routes: routes
        });
    }
});
