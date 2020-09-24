import '@testing-library/jest-dom';
import { fireEvent, getByTestId, render, waitFor } from '@testing-library/vue';
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

        const { getByLabelText, getByText, getByRole, getByTestId } = render(
            CourseDetails,
            {
                props: { courseId: 1 },
                routes: routes
            }
        );

        await waitFor(() => [
            expect(getByTestId('courseDetailsTitle')).toHaveTextContent(
                'Title'
            ),
            expect(getByLabelText('Typ:')).toHaveTextContent('Extern'),
            expect(getByLabelText('Ort:')).toHaveTextContent(
                'Remoteveranstaltung'
            ),
            expect(getByLabelText('Start:')).toHaveTextContent(
                '02.05.2020 10:34'
            ),
            expect(getByLabelText('Ende:')).toHaveTextContent(
                '02.05.2020 11:00'
            ),
            expect(getByLabelText('Adresse:')).toHaveTextContent('Daheim'),
            expect(getByLabelText('Organisator:')).toHaveTextContent(
                'Organizer'
            ),
            expect(getByLabelText('Trainer:')).toHaveTextContent('Trainer'),
            expect(getByRole('link')).toHaveTextContent('https://tarent.de'),
            expect(getByRole('link')).toHaveAttribute(
                'href',
                'https://tarent.de'
            ),
            expect(getByText('Alle')).toBeInTheDocument(),
            expect(getByText('Beschreibung')).toBeInTheDocument()
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
                data: { id: 1 }
            })
        );

        deleteCourse.mockImplementationOnce(() => Promise.resolve({}));

        let routerPushSpy;
        const { findByRole, getByRole, queryByText } = render(
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

        const confirmButton = await findByRole('button', { name: 'Ja' });
        await fireEvent.click(confirmButton);

        expect(queryByText('Möchtest Du die Veranstaltung')).toBeNull();

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
        const { findByRole, getByRole, queryByText } = render(
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

        expect(queryByText('Möchtest Du die Veranstaltung')).toBeNull();

        expect(deleteCourse).not.toHaveBeenCalled();
        expect(routerPushSpy).not.toHaveBeenCalled();
    });
});
