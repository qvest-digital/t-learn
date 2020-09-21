import '@testing-library/jest-dom';
import {
    fireEvent,
    render,
    waitFor,
    waitForElementToBeRemoved
} from '@testing-library/vue';
import { deleteCourse, getCourse } from '@/services/BackendService';
import { BootstrapVue } from 'bootstrap-vue';
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
                    link: 'https://tarent.de'
                }
            })
        );

        const { getByText, getByRole } = render(
            CourseDetails,
            {
                props: { courseId: 1 },
                routes: routes
            },
            localVue => {
                localVue.use(BootstrapVue);
            }
        );

        await waitFor(() => [
            expect(getByRole('heading')).toHaveTextContent('Title'),
            expect(getByText('Extern')).toHaveTextContent('Typ:'),
            expect(getByText('Remoteveranstaltung')).toHaveTextContent('Ort:'),
            expect(getByText('02.05.2020 10:34')).toHaveTextContent('Start:'),
            expect(getByText('02.05.2020 11:00')).toHaveTextContent('Ende:'),
            expect(getByText('Daheim')).toHaveTextContent('Adresse:'),
            expect(getByText('Organizer')).toHaveTextContent('Organisator:'),
            expect(getByText('Trainer')).toHaveTextContent('Trainer:'),
            expect(getByRole('link')).toHaveTextContent('https://tarent.de'),
            expect(getByRole('link')).toHaveAttribute(
                'href',
                'https://tarent.de'
            ),
            expect(getByText('Alle')).toBeInTheDocument()
        ]);

        expect(getCourse).toHaveBeenCalledWith(1);
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
                localVue.use(BootstrapVue);
                router.push('/details/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await waitFor(() => [
            expect(getCourse).toBeCalledWith(1),
            expect(routerPushSpy).toBeCalledWith('/')
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
                localVue.use(BootstrapVue);
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
        const { findByRole, getByText, getByRole } = render(
            CourseDetails,
            {
                props: { courseId: 1 },
                routes: routes
            },
            (localVue, store, router) => {
                localVue.use(BootstrapVue);
                router.push('/details/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await fireEvent.click(getByRole('button', { name: 'Löschen' }));

        const confirmButton = await findByRole('button', { name: 'Ok' });
        await fireEvent.click(confirmButton);

        await waitForElementToBeRemoved(getByText('Löschen bestätigen'));

        await waitFor(() => [
            expect(deleteCourse).toHaveBeenCalledWith(1),
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
                localVue.use(BootstrapVue);
                router.push('/details/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await fireEvent.click(getByRole('button', { name: 'Löschen' }));

        const cancelButton = await findByRole('button', { name: 'Abbrechen' });
        await fireEvent.click(cancelButton);

        await waitForElementToBeRemoved(getByText('Löschen bestätigen'));

        expect(deleteCourse).not.toHaveBeenCalled();
        expect(routerPushSpy).not.toHaveBeenCalled();
    });
});
