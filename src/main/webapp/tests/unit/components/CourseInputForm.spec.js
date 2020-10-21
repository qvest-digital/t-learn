import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/vue';
import { getAllCategories } from '@/services/BackendService';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuelidate from 'vuelidate';
import CourseInputForm from '@/components/CourseInputForm';
import Vue from 'vue';
import { dateFormatFilter } from '@/filter/dateformatFilter';
import vSelect from 'vue-select';

Vue.filter('formatDate', dateFormatFilter);
jest.mock('@/services/BackendService');

describe('CourseInputForm.vue', () => {
    getAllCategories.mockImplementation(() =>
        Promise.resolve({
            data: ['frontend', 'javascript']
        })
    );

    it('maps input fields correctly to the UI', async () => {
        const { getByRole, updateProps } = render(
            CourseInputForm,
            { props: { course: {} } },
            localVue => {
                localVue.use(Vuelidate);
                localVue.component('v-select', vSelect);
            }
        );

        const course = {
            title: 'Title',
            organizer: 'Organizer',
            contactPerson: 'ContactPerson',
            startDate: '2020-05-02T12:34:00+2:00',
            endDate: '2020-05-02T13:00:00+2:00',
            courseType: 'EXTERNAL',
            courseForm: 'MEETUP',
            price: '100€',
            executionType: 'REMOTE',
            address: 'Daheim',
            targetAudience: 'Alle',
            description: 'Beschreibung',
            link: 'https://tarent.de',
            categoryNames: ['frontend', 'javascript']
        };
        await updateProps({
            course
        });

        expect(getByRole('textbox', { name: 'Titel / Thema' })).toHaveValue(
            'Title'
        );
        expect(getByRole('textbox', { name: 'Veranstalter*in' })).toHaveValue(
            'Organizer'
        );
        expect(
            getByRole('textbox', { name: 'Ansprechpartner*in' })
        ).toHaveValue('ContactPerson');
        expect(getByRole('textbox', { name: 'Start' })).toHaveValue(
            dateFormatFilter(course.startDate)
        );
        expect(getByRole('textbox', { name: 'Ende' })).toHaveValue(
            dateFormatFilter(course.endDate)
        );
        expect(
            getByRole('combobox', { name: 'Veranstaltungsart' })
        ).toHaveValue('EXTERNAL');
        expect(
            getByRole('combobox', { name: 'Veranstaltungsform' })
        ).toHaveValue('MEETUP');
        expect(getByRole('textbox', { name: 'Preis' })).toHaveValue('100€');
        expect(getByRole('combobox', { name: 'Durchführung' })).toHaveValue(
            'REMOTE'
        );
        expect(getByRole('textbox', { name: 'Ort' })).toHaveValue('Daheim');
        expect(
            getByRole('textbox', { name: 'Weiterführender Link' })
        ).toHaveValue('https://tarent.de');
        const categoriesDropdown = getByRole('combobox', {
            name: 'Search for option'
        });
        expect(categoriesDropdown).toHaveTextContent('frontend');
        expect(categoriesDropdown).toHaveTextContent('javascript');

        expect(getByRole('textbox', { name: 'Zielgruppe' })).toHaveValue(
            'Alle'
        );
        expect(
            getByRole('textbox', { name: 'Beschreibung / Inhalt' })
        ).toHaveValue('Beschreibung');

        expect(getAllCategories).toHaveBeenCalled();
    });

    it("calls 'ready' callback with value 'true' when touch was called with no validation errors", async () => {
        const wrapper = mountComponent();

        wrapper.setProps({
            course: {
                title: 'Title',
                organizer: 'Organizer',
                contactPerson: null,
                startDate: null,
                endDate: null,
                courseType: 'EXTERNAL',
                courseForm: null,
                price: null,
                executionType: null,
                address: null,
                targetAudience: null,
                description: null,
                link: null,
                categoryNames: []
            }
        });

        wrapper.vm.touch();

        await waitFor(() => expect(wrapper.emitted().ready[0]).toEqual([true]));
    });

    it("calls 'ready' callback with value 'false' when touch was called with validation errors", async () => {
        const wrapper = mountComponent();

        wrapper.vm.touch();

        await waitFor(() =>
            expect(wrapper.emitted().ready[0]).toEqual([false])
        );
    });

    function mountComponent() {
        const localVue = createLocalVue();
        localVue.use(Vuelidate);
        localVue.component('v-select', vSelect);

        return mount(CourseInputForm, {
            localVue,
            propsData: {
                course: {}
            }
        });
    }
});
