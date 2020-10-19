import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/vue';
import CourseCreationForm from '@/components/CourseCreationForm.vue';
import { createCourse } from '@/services/BackendService';
import Vuelidate from 'vuelidate';
import routes from '@/routes';

jest.mock('@/services/BackendService');
global.console = { error: jest.fn() };

describe('CourseCreationForm.vue', () => {
    afterEach(() => {
        createCourse.mockReset();
    });

    it('sends form data on submit to server and navigates to details view', async () => {
        createCourse.mockImplementationOnce(course => {
            return Promise.resolve({
                data: { id: 1, ...course }
            });
        });

        let routerPushSpy;
        const { getByTestId, getByRole, getAllByRole } = render(
            CourseCreationForm,
            {
                routes: routes
            },
            (localVue, store, router) => {
                localVue.use(Vuelidate);
                router.push('/create');
                routerPushSpy = jest.spyOn(router, 'push');
            }
        );

        expect(getByTestId('errorMsg')).not.toBeVisible();

        // set required fields
        await fireEvent.update(
            getByRole('textbox', { name: 'Titel / Thema' }),
            'Test'
        );
        await fireEvent.update(
            getByRole('textbox', { name: 'Veranstalter*in' }),
            'Organizer'
        );
        await fireEvent.update(
            getByRole('combobox', { name: 'Veranstaltungsart' }),
            'EXTERNAL'
        );

        const buttons = getAllByRole('button');
        await fireEvent.click(buttons[1]);

        expect(getByTestId('errorMsg')).not.toBeVisible();
        expect(createCourse).toHaveBeenCalledWith({
            address: null,
            courseType: 'EXTERNAL',
            courseForm: null,
            endDate: null,
            link: null,
            executionType: null,
            contactPerson: null,
            startDate: null,
            targetAudience: null,
            description: null,
            title: 'Test',
            organizer: 'Organizer',
            price: null
        });
        expect(routerPushSpy).toHaveBeenCalledWith({
            name: 'courseDetails',
            params: { courseId: 1 }
        });
    });

    it('shows error message on unsuccessful form data submit to server', async () => {
        createCourse.mockImplementationOnce(() =>
            Promise.reject({
                data: {}
            })
        );

        const { getByRole, getByTestId, getAllByRole } = setupComponent();

        const errorMessages = getByTestId('errorMsg');
        expect(errorMessages).not.toBeVisible();

        // set required fields
        await fireEvent.update(
            getByRole('textbox', { name: 'Titel / Thema' }),
            'Test'
        );
        await fireEvent.update(
            getByRole('textbox', { name: 'Veranstalter*in' }),
            'Organizer'
        );
        await fireEvent.update(
            getByRole('combobox', { name: 'Veranstaltungsart' }),
            'EXTERNAL'
        );

        const buttons = getAllByRole('button');
        await fireEvent.click(buttons[1]);

        expect(createCourse).toHaveBeenCalledWith({
            address: null,
            courseType: 'EXTERNAL',
            courseForm: null,
            endDate: null,
            link: null,
            executionType: null,
            contactPerson: null,
            startDate: null,
            targetAudience: null,
            description: null,
            title: 'Test',
            organizer: 'Organizer',
            price: null
        });
        await waitFor(() => expect(errorMessages).toBeVisible());
    });

    it('shows validation errors when required fields are not filled', async () => {
        const { getByRole, getAllByRole, getByTestId } = setupComponent();

        expect(getByTestId('errorMsg')).not.toBeVisible();
        const buttons = getAllByRole('button');
        await fireEvent.click(buttons[1]);

        expect(createCourse).not.toBeCalled();

        expect(getByTestId('errorMsg')).not.toBeVisible();
        expect(
            getByRole('textbox', { name: 'Titel / Thema' }).classList
        ).toContain('is-invalid');
        expect(
            getByRole('textbox', { name: 'Veranstalter*in' }).classList
        ).toContain('is-invalid');
        expect(
            getByRole('combobox', { name: 'Veranstaltungsart' }).classList
        ).toContain('is-invalid');
    });

    it('shows no validation errors when start date and end date is valid', async () => {
        const { getByRole } = setupComponent();

        const startInput = getByRole('textbox', { name: 'Start' });
        const endInput = getByRole('textbox', { name: 'Ende' });
        await fireEvent.update(startInput, '12.12.2020 12:12');
        await fireEvent.update(endInput, '12.12.2020 12:13');

        expect(startInput.classList).toContain('is-valid');
        expect(endInput.classList).toContain('is-valid');
    });

    it('shows validation errors when start and end date are not in valid format', async () => {
        const { getByRole } = setupComponent();

        const startInput = getByRole('textbox', { name: 'Start' });
        const endInput = getByRole('textbox', { name: 'Ende' });
        await fireEvent.update(startInput, '2020-12-12');
        await fireEvent.update(endInput, '2020-12-12');

        expect(startInput.classList).toContain('is-invalid');
        expect(endInput.classList).toContain('is-invalid');
    });

    it('shows validation errors when start date is after end date', async () => {
        const { getByRole } = setupComponent();

        const startInput = getByRole('textbox', { name: 'Start' });
        const endInput = getByRole('textbox', { name: 'Ende' });
        await fireEvent.update(startInput, '12.12.2020 12:12');
        await fireEvent.update(endInput, '12.12.2020 12:11');

        expect(startInput.classList).toContain('is-invalid');
        expect(endInput.classList).toContain('is-invalid');
    });

    it('shows validation errors when start date is equal to end date', async () => {
        const { getByRole } = setupComponent();

        const startInput = getByRole('textbox', { name: 'Start' });
        const endInput = getByRole('textbox', { name: 'Ende' });
        await fireEvent.update(startInput, '12.12.2020 12:12');
        await fireEvent.update(endInput, '12.12.2020 12:12');

        expect(startInput.classList).toContain('is-invalid');
        expect(endInput.classList).toContain('is-invalid');
    });

    it('it does not show validation error when link is valid', async () => {
        const { getByRole } = setupComponent();

        const linkInput = getByRole('textbox', {
            name: 'Weiterführender Link'
        });
        await fireEvent.update(linkInput, 'https://tarent.de');

        expect(linkInput.classList).toContain('is-valid');
    });

    it('shows validation error when link is invalid', async () => {
        const { getByRole } = setupComponent();

        const linkInput = getByRole('textbox', {
            name: 'Weiterführender Link'
        });
        await fireEvent.update(linkInput, 'localhost');

        expect(linkInput.classList).toContain('is-invalid');
    });

    it('shows validation error when link protocol is not http or https', async () => {
        const { getByRole } = setupComponent();

        const linkInput = getByRole('textbox', {
            name: 'Weiterführender Link'
        });
        await fireEvent.update(linkInput, 'ftp://tarent.de');

        expect(linkInput.classList).toContain('is-invalid');
    });

    it('shows validation error when link length is > 1000 characters', async () => {
        const { getByRole } = setupComponent();

        const link = getByRole('textbox', {
            name: 'Weiterführender Link'
        });
        await fireEvent.update(link, `https://${'a'.repeat(1001 - 11)}.de`);

        expect(link.classList).toContain('is-invalid');
    });

    it('shows no validation error when link length is 1000 characters', async () => {
        const { getByRole } = setupComponent();

        const link = getByRole('textbox', {
            name: 'Weiterführender Link'
        });
        await fireEvent.update(link, `https://${'a'.repeat(1000 - 11)}.de`);

        expect(link.classList).not.toContain('is-invalid');
    });

    it('shows validation error when targetAudience length is > 2000 characters', async () => {
        const { getByRole } = setupComponent();

        const targetAudience = getByRole('textbox', {
            name: 'Zielgruppe'
        });
        await fireEvent.update(targetAudience, 'a'.repeat(2001));

        expect(targetAudience.classList).toContain('is-invalid');
    });

    it('shows no validation error when targetAudience length is 2000 characters', async () => {
        const { getByRole } = setupComponent();

        const targetAudience = getByRole('textbox', {
            name: 'Zielgruppe'
        });
        await fireEvent.update(targetAudience, 'a'.repeat(2000));

        expect(targetAudience.classList).not.toContain('is-invalid');
    });

    it('shows validation error when description length is > 2000 characters', async () => {
        const { getByRole } = setupComponent();

        const description = getByRole('textbox', {
            name: 'Beschreibung / Inhalt'
        });
        await fireEvent.update(description, 'a'.repeat(2001));

        expect(description.classList).toContain('is-invalid');
    });

    it('shows no validation error when description length is 2000 characters', async () => {
        const { getByRole } = setupComponent();

        const description = getByRole('textbox', {
            name: 'Beschreibung / Inhalt'
        });
        await fireEvent.update(description, 'a'.repeat(2000));

        expect(description.classList).not.toContain('is-invalid');
    });

    function setupComponent() {
        return render(CourseCreationForm, {}, localVue => {
            localVue.use(Vuelidate);
        });
    }
});
