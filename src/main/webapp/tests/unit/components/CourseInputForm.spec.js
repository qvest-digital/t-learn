import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/vue';
import { createLocalVue, mount } from '@vue/test-utils';
// import { BootstrapVue } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import CourseInputForm from '@/components/CourseInputForm';
import Vue from 'vue';
import { dateFormatFilter } from '@/filter/dateformatFilter';

Vue.filter('formatDate', dateFormatFilter);

describe('CourseInputForm.vue', () => {
    it('maps input fields correctly to the UI', async () => {
        const { getByRole, updateProps } = render(
            CourseInputForm,
            { props: { course: {} } },
            localVue => {
                // localVue.use(BootstrapVue);
                localVue.use(Vuelidate);
            }
        );

        const course = {
            title: 'Title',
            trainer: 'Trainer',
            organizer: 'Organizer',
            startDate: '2020-05-02T12:34:00+2:00',
            endDate: '2020-05-02T13:00:00+2:00',
            courseType: 'EXTERNAL',
            location: 'REMOTE',
            address: 'Daheim',
            targetAudience: 'Alle',
            link: 'https://tarent.de'
        };
        await updateProps({
            course
        });

        expect(getByRole('textbox', { name: 'Titel / Thema' })).toHaveValue(
            'Title'
        );
        expect(getByRole('textbox', { name: 'Trainer' })).toHaveValue(
            'Trainer'
        );
        expect(getByRole('textbox', { name: 'Organisator' })).toHaveValue(
            'Organizer'
        );
        expect(getByRole('textbox', { name: 'Start' })).toHaveValue(
            dateFormatFilter(course.startDate)
        );
        expect(getByRole('textbox', { name: 'Ende' })).toHaveValue(
            dateFormatFilter(course.endDate)
        );
        expect(
            getByRole('combobox', { name: 'Veranstaltungsart' })
        ).toHaveValue('EXTERNAL');
        expect(getByRole('combobox', { name: 'Ort' })).toHaveValue('REMOTE');
        expect(
            getByRole('textbox', { name: 'Veranstaltungsadresse' })
        ).toHaveValue('Daheim');
        expect(
            getByRole('textbox', { name: 'Weiterführender Link' })
        ).toHaveValue('https://tarent.de');
        expect(getByRole('textbox', { name: 'Zielgruppe' })).toHaveValue(
            'Alle'
        );
    });

    it("calls 'ready' callback with value 'true' when touch was called with no validation errors", async () => {
        const wrapper = mountComponent();

        wrapper.setProps({
            course: {
                title: 'Title',
                trainer: 'Trainer',
                organizer: null,
                startDate: null,
                endDate: null,
                courseType: 'EXTERNAL',
                location: null,
                address: null,
                targetAudience: null,
                link: null
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
        // localVue.use(BootstrapVue);
        localVue.use(Vuelidate);

        return mount(CourseInputForm, {
            localVue,
            propsData: {
                course: {}
            }
        });
    }
});
