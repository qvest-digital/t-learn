import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/vue';
import {
    createFeedback,
    deleteCourse,
    getCourse
} from '@/services/BackendService';
import routes from '@/routes';
import CourseDetails from '@/components/CourseDetails';
import Vuelidate from 'vuelidate';

import Vue from 'vue';
import { dateFormatFilter } from '@/filter/dateformatFilter';

Vue.filter('formatDate', dateFormatFilter);
jest.mock('@/services/BackendService');

describe('CourseDetails.vue', () => {
    afterEach(() => {
        getCourse.mockReset();
        deleteCourse.mockReset();
        createFeedback.mockReset();
    });

    it('should call createFeedback', async () => {
        const feedback = {
            participantName: '',
            dislikes: '',
            likes: '',
            recommendation: true
        };
        getCourse.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    id: 2
                }
            })
        );
        createFeedback.mockImplementationOnce(() =>
            Promise.resolve({
                data: feedback
            })
        );

        const { getByLabelText, getByRole } = render(
            CourseDetails,
            {
                propsData: { courseId: 2 },
                data() {
                    return {
                        feedback
                    };
                }
            },
            localVue => {
                localVue.use(Vuelidate);
            }
        );

        await fireEvent.click(getByRole('button', { name: 'FEEDBACK' }));
        await fireEvent.click(getByLabelText('Ja'));
        await fireEvent.click(getByRole('button', { name: 'SPEICHERN' }));
        expect(createFeedback).toHaveBeenCalledWith(2, { ...feedback });
    });

    it('loads course from server and displays all fields', async () => {
        getCourse.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    id: 1,
                    title: 'Title',
                    organizer: 'Organizer',
                    contactPerson: 'ContactPerson',
                    startDate: '2020-05-02T12:34:00+02:00',
                    endDate: '2020-05-02T13:00:00+02:00',
                    courseType: 'EXTERNAL',
                    courseForm: 'MEETUP',
                    executionType: 'REMOTE',
                    price: '100€',
                    address: 'Daheim',
                    targetAudience: 'Alle',
                    description: 'Beschreibung',
                    link: 'https://tarent.de',
                    categoryNames: ['frontend', 'javascript']
                }
            })
        );

        const { getByText, getByRole, getByTestId } = render(CourseDetails, {
            props: { courseId: 1 },
            routes: routes
        });

        const categories = getByTestId('categories');
        await waitFor(() => [
            expect(getByTestId('courseDetailsTitle')).toHaveTextContent(
                'Title'
            ),
            expect(categories).toHaveTextContent('frontend'),
            expect(categories).toHaveTextContent('javascript'),
            expect(getByTestId('courseType')).toHaveTextContent('Extern'),
            expect(getByTestId('courseForm')).toHaveTextContent('MeetUp'),
            expect(getByTestId('executionType')).toHaveTextContent('Remote'),
            expect(getByTestId('price')).toHaveTextContent('100€'),

            expect(getByTestId('startDateSummary')).toHaveTextContent(
                '02.05.2020 10:34'
            ),
            expect(getByTestId('endDate')).toHaveTextContent(
                '02.05.2020 11:00'
            ),
            expect(getByTestId('address')).toHaveTextContent('Daheim'),

            expect(getByTestId('contactPerson')).toHaveTextContent(
                'ContactPerson'
            ),
            expect(getByTestId('organizer')).toHaveTextContent('Organizer'),

            expect(getByRole('link')).toHaveTextContent('https://tarent.de'),
            expect(getByTestId('beschreibung')).toHaveTextContent(
                'Beschreibung'
            ),

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
                router.push('/details/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await waitFor(() => [
            expect(getCourse).toBeCalledWith(1),
            expect(routerPushSpy).toBeCalledWith('/')
        ]);
    });

    it("navigates to edit page when 'BEARBEITEN' button was clicked", async () => {
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

        await fireEvent.click(getByRole('button', { name: 'BEARBEITEN' }));

        expect(routerPushSpy).toBeCalledWith({
            name: 'courseEdit',
            params: { courseId: 1 }
        });
    });

    it("sends delete request to server and navigates to overview page when 'LÖSCHEN' button is clicked", async () => {
        getCourse.mockImplementationOnce(() =>
            Promise.resolve({
                data: { id: 1 }
            })
        );

        deleteCourse.mockImplementationOnce(() => Promise.resolve({}));

        let routerPushSpy;
        const { getByRole, queryByText, findAllByRole } = render(
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

        await fireEvent.click(getByRole('button', { name: 'LÖSCHEN' }));

        const confirmButton = await findAllByRole('button', {
            name: 'LÖSCHEN'
        });
        await fireEvent.click(confirmButton[0]);

        expect(queryByText('Möchtest Du die Veranstaltung')).toBeNull();

        await waitFor(() => [
            expect(deleteCourse).toHaveBeenCalledWith(1),
            expect(routerPushSpy).toBeCalledWith('/')
        ]);
    });

    it("stays on page when 'ABBRECHEN' button was clicked when deleting", async () => {
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

        await fireEvent.click(getByRole('button', { name: 'LÖSCHEN' }));

        const cancelButton = await findByRole('button', { name: 'ABBRECHEN' });
        await fireEvent.click(cancelButton);

        expect(queryByText('Möchtest Du die Veranstaltung')).toBeNull();

        expect(deleteCourse).not.toHaveBeenCalled();
        expect(routerPushSpy).not.toHaveBeenCalled();
    });
});
