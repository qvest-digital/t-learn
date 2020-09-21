import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import { BootstrapVue } from 'bootstrap-vue';
import routes from '../../src/routes';
import App from '../../src/App';
import Vuelidate from 'vuelidate';

describe('App.vue', () => {
    it('test navigation to overview', async () => {
        const { getByText, queryByText } = setupComponent();

        await fireEvent.click(getByText('Übersicht'));

        expect(
            queryByText('Übersicht über alle Veranstaltungen')
        ).toBeInTheDocument();
    });

    it('test navigation to create new course', async () => {
        const { getByText, queryByText } = setupComponent();

        await fireEvent.click(getByText('Anlegen'));

        expect(
            queryByText('Anlegen einer neuen Veranstaltung')
        ).toBeInTheDocument();
    });

    function setupComponent() {
        return render(
            App,
            {
                routes: routes
            },
            localVue => {
                localVue.use(BootstrapVue);
                localVue.use(Vuelidate);
            }
        );
    }
});
