import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/vue';
import {
    getCategories,
    getCourse,
    updateCourse
} from '@/services/BackendService';
import Vuelidate from 'vuelidate';
import routes from '@/routes';
import CourseEditForm from '@/components/CourseEditForm';
import Vue from 'vue';
import { dateFormatFilter } from '@/filter/dateformatFilter';

Vue.filter('formatDate', dateFormatFilter);
jest.mock('@/services/BackendService');
global.console = { error: jest.fn() };

describe('CourseEditForm.vue', () => {
    getCategories.mockImplementation(() =>
        Promise.resolve({
            data: ['frontend', 'javascript']
        })
    );

    afterEach(() => {
        getCourse.mockReset();
        updateCourse.mockReset();
    });

    it('sends updated form data on submit to server and navigates to details view', async () => {
        const course = createCourse();
        getCourse.mockImplementationOnce(() =>
            Promise.resolve({
                data: course
            })
        );
        updateCourse.mockImplementationOnce(() =>
            Promise.resolve({
                data: {}
            })
        );

        let routerPushSpy;
        const { getByTestId, getByRole } = render(
            CourseEditForm,
            {
                props: { courseId: 1 },
                routes: routes
            },
            (localVue, store, router) => {
                localVue.use(Vuelidate);
                router.push('/edit/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await waitForFormPopulation(getByRole);

        const errorMessages = getByTestId('errorMsg');
        expect(errorMessages).not.toBeVisible();

        await fireEvent.update(
            getByRole('textbox', { name: 'Titel / Thema' }),
            'New Title'
        );

        await fireEvent.submit(getByRole('button', { name: 'SPEICHERN' }));

        expect(errorMessages).not.toBeVisible();
        expect(getCourse).toHaveBeenCalledWith(1);
        expect(updateCourse).toHaveBeenCalledWith(course);
        expect(routerPushSpy).toHaveBeenCalledWith({
            name: 'courseDetails',
            params: { courseId: 1 }
        });
    });

    it('shows error message on unsuccessful form data submit to server', async () => {
        const course = createCourse();

        getCourse.mockImplementationOnce(() =>
            Promise.resolve({
                data: course
            })
        );
        updateCourse.mockImplementationOnce(() =>
            Promise.reject({
                data: {}
            })
        );

        let routerPushSpy;
        const { getByTestId, getByRole } = render(
            CourseEditForm,
            {
                props: { courseId: 1 },
                routes: routes
            },
            (localVue, store, router) => {
                localVue.use(Vuelidate);
                router.push('/edit/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await waitForFormPopulation(getByRole);

        const errorMessages = getByTestId('errorMsg');
        expect(errorMessages).not.toBeVisible();

        await fireEvent.submit(getByRole('button', { name: 'SPEICHERN' }));

        expect(updateCourse).toHaveBeenCalledWith(course);
        expect(routerPushSpy).not.toHaveBeenCalled();
        await waitFor(() => expect(errorMessages).toBeVisible());
    });

    it('navigates to overview page when course was not found', async () => {
        getCourse.mockImplementationOnce(() =>
            Promise.reject({ response: { status: 404 } })
        );

        let routerPushSpy;
        render(
            CourseEditForm,
            {
                props: { courseId: 1 },
                routes: routes
            },
            (localVue, store, router) => {
                localVue.use(Vuelidate);
                router.push('/edit/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await waitFor(() => [
            expect(getCourse).toHaveBeenCalledWith(1),
            expect(routerPushSpy).toHaveBeenCalledWith('/')
        ]);
    });

    it('shows validation errors when required fields are not filled', async () => {
        getCourse.mockImplementationOnce(() =>
            Promise.resolve({
                data: createCourse()
            })
        );

        let routerPushSpy;
        const { getByTestId, getByRole } = render(
            CourseEditForm,
            {
                props: { courseId: 1 },
                routes: routes
            },
            (localVue, store, router) => {
                localVue.use(Vuelidate);
                router.push('/edit/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await waitForFormPopulation(getByRole);

        const errorMessages = getByTestId('errorMsg');
        expect(errorMessages).not.toBeVisible();

        const title = getByRole('textbox', { name: 'Titel / Thema' });
        await fireEvent.update(title, '');

        expect(title.classList).toContain('is-invalid');

        await fireEvent.submit(getByRole('button', { name: 'SPEICHERN' }));

        expect(updateCourse).not.toHaveBeenCalled();
        expect(routerPushSpy).not.toHaveBeenCalled();
        expect(errorMessages).not.toBeVisible();
    });

    it("navigates back to details page if button 'ABBRECHEN' was clicked", async () => {
        getCourse.mockImplementationOnce(() =>
            Promise.resolve({
                data: createCourse()
            })
        );

        let routerPushSpy;
        const { getByRole } = render(
            CourseEditForm,
            {
                props: { courseId: 1 },
                routes: routes
            },
            (localVue, store, router) => {
                localVue.use(Vuelidate);
                router.push('/edit/1');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        await waitForFormPopulation(getByRole);

        await fireEvent.click(getByRole('button', { name: 'ABBRECHEN' }));

        expect(updateCourse).not.toHaveBeenCalled();
        expect(routerPushSpy).toHaveBeenCalledWith({
            name: 'courseDetails',
            params: { courseId: 1 }
        });
    });

    function createCourse() {
        return {
            id: 1,
            title: 'Title',
            organizer: 'Organizer',
            contactPerson: null,
            startDate: null,
            endDate: null,
            courseType: 'EXTERNAL',
            price: null,
            location: null,
            address: null,
            targetAudience: null,
            description: null,
            link: null,
            categoryNames: null
        };
    }

    function waitForFormPopulation(getByRole) {
        return waitFor(() => [
            expect(getByRole('textbox', { name: 'Titel / Thema' })).toHaveValue(
                'Title'
            ),
            expect(
                getByRole('textbox', { name: 'Veranstalter*in' })
            ).toHaveValue('Organizer'),
            expect(
                getByRole('combobox', { name: 'Veranstaltungsart' })
            ).toHaveValue('EXTERNAL')
        ]);
    }
});
