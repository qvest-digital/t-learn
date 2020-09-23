import '@testing-library/jest-dom';
import { shallowMount } from '@vue/test-utils';
import {
    fireEvent,
    render,
    waitFor,
    waitForElementToBeRemoved
} from '@testing-library/vue';
import { deleteCourse, getCourse } from '@/services/BackendService';
import routes from '@/routes';
import CourseDetails from '@/components/CourseDetails';
import Vue from 'vue';
import { dateFormatFilter } from '@/filter/dateformatFilter';

Vue.filter('formatDate', dateFormatFilter);
jest.mock('@/services/BackendService');

describe('CourseDetails.vue', () => {
    afterEach(() => {
        getCourse.mockReset();
        deleteCourse.mockReset();
    });

    it('loads course from server and displays all fields', async () => {
        getCourse.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    id: 1,
                    title: 'Title',
                    trainer: 'Trainer',
                    organizer: 'Organizer',
                    startDate: '2020-05-02T12:34:00+02:00',
                    endDate: '2020-05-02T13:00:00+02:00',
                    courseType: 'EXTERNAL',
                    location: 'REMOTE',
                    address: 'Daheim',
                    targetAudience: 'Alle',
                    description: 'Beschreibung',
                    link: 'https://tarent.de'
                }
            })
        );
        const wrapper = shallowMount(CourseDetails, {
            propsData: {
                courseId: 1
            }
        });
        await wrapper.vm.$nextTick();
        expect(getCourse).toHaveBeenCalledWith(1);
        expect(wrapper.find('.page-title').text()).toBe('Title');
        expect(wrapper.find('#course-details-text-course-type').text()).toBe(
            'Extern'
        );

        expect(
            wrapper.find('#course-details-text-course-location').text()
        ).toBe('Remoteveranstaltung');

        expect(
            wrapper.find('#course-details-text-course-start-date').text()
        ).toBe('02.05.2020 10:34');

        expect(
            wrapper.find('#course-details-text-course-end-date').text()
        ).toBe('02.05.2020 11:00');

        expect(wrapper.find('#course-details-text-course-address').text()).toBe(
            'Daheim'
        );

        expect(
            wrapper.find('#course-details-text-course-organizer').text()
        ).toBe('Organizer');

        expect(wrapper.find('#course-details-text-course-trainer').text()).toBe(
            'Trainer'
        );

        expect(wrapper.find('#course-details-text-course-link').text()).toBe(
            'https://tarent.de'
        );

        expect(wrapper.find('.course-details-target-audiance').text()).toBe(
            'Alle'
        );
        expect(wrapper.find('.course-details-description').text()).toBe(
            'Beschreibung'
        );
    });

    it('navigates to overview page when course was not found', async () => {
        getCourse.mockImplementationOnce(() =>
            Promise.reject({ response: { status: 404 } })
        );

        let routerPushSpy;
        render(
            CourseDetails,
            {
                props: { courseId: 1 },
                routes: routes
            },
            (localVue, store, router) => {
                router.push('/details/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await waitFor(() => [
            expect(getCourse).toBeCalledWith(1)
            // expect(routerPushSpy).toBeCalledWith('/')
        ]);
    });

    it("navigates to edit page when 'Bearbeiten' button was clicked", async () => {
        getCourse.mockImplementationOnce(() => Promise.resolve({ data: {} }));

        let routerPushSpy;
        const { getByRole } = render(
            CourseDetails,
            {
                props: { courseId: 1 },
                routes: routes
            },
            (localVue, store, router) => {
                router.push('/details/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await fireEvent.click(getByRole('button', { name: 'Bearbeiten' }));

        expect(routerPushSpy).toBeCalledWith({
            name: 'courseEdit',
            params: { courseId: 1 }
        });
    });

    it("sends delete request to server and navigates to overview page when 'Löschen' button is clicked", async () => {
        getCourse.mockImplementationOnce(() =>
            Promise.resolve({
                data: {}
            })
        );

        deleteCourse.mockImplementationOnce(() => Promise.resolve({}));

        let routerPushSpy;
        const { getByTestId, findByTestId } = render(
            CourseDetails,
            {
                props: { courseId: 1 },
                routes: routes
            },
            (localVue, store, router) => {
                router.push('/details/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await fireEvent.click(getByTestId('course-details-delete-button'));

        const confirmButton = await findByTestId('confirm-button');
        await fireEvent.click(confirmButton);

        await waitFor(() => [
            expect(deleteCourse).toHaveBeenCalled(),
            expect(routerPushSpy).toBeCalledWith('/')
        ]);
    });

    it("stays on page when 'Abbrechen' button was clicked when deleting", async () => {
        getCourse.mockImplementationOnce(() =>
            Promise.resolve({
                data: {}
            })
        );

        let routerPushSpy;
        const { findByRole, getByText, getByRole } = render(
            CourseDetails,
            {
                props: { courseId: 1 },
                routes: routes
            },
            (localVue, store, router) => {
                router.push('/details/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await fireEvent.click(getByRole('button', { name: 'Löschen' }));

        const cancelButton = await findByRole('button', { name: 'Abbrechen' });
        await fireEvent.click(cancelButton);

        expect(deleteCourse).not.toHaveBeenCalled();
        expect(routerPushSpy).not.toHaveBeenCalled();
    });
});
