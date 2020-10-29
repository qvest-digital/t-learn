import '@testing-library/jest-dom';
import { render, waitFor, fireEvent } from '@testing-library/vue';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuelidate from 'vuelidate';
import FeedbackForm from '@/components/FeedbackForm';
import Vue from 'vue';

function mountComponent() {
    const localVue = createLocalVue();
    localVue.use(Vuelidate);
    return mount(FeedbackForm, {
        localVue
    });
}
function renderComponent() {
    return render(
        FeedbackForm,
        {
            data() {
                return {
                    feedback: {
                        participantName: '',
                        dislikes: '',
                        likes: '',
                        recommendation: ''
                    }
                };
            }
        },
        localVue => {
            localVue.use(Vuelidate);
        }
    );
}
describe('FeedbackForm.vue', () => {
    it("calls 'ready' callback with value 'false' when touch was called with validation errors", async () => {
        const wrapper = mountComponent();

        wrapper.vm.touch();

        await waitFor(() =>
            expect(wrapper.emitted().ready[0]).toEqual([false])
        );
    });

    it("calls 'ready' callback with value 'true' when touch was called with no validation errors", async () => {
        const wrapper = mountComponent();

        wrapper.setData({
            feedback: {
                participantName: '',
                dislikes: '',
                likes: '',
                recommendation: 'yes'
            }
        });

        wrapper.vm.touch();

        await waitFor(() => expect(wrapper.emitted().ready[0]).toEqual([true]));
    });

    it('should fill input fields with correct values', async () => {
        const { getByRole, getByLabelText, getByText } = renderComponent();
        const participantName = getByLabelText(/Wie lautet Dein Name?/i);
        await fireEvent.update(participantName, 'David');
        expect(
            getByRole('textbox', { name: 'Wie lautet Dein Name?' })
        ).toHaveValue('David');

        const dislikes = getByLabelText(
            /Was hat Dir im Rahmen der Fortbildung nicht gefallen?/i
        );
        await fireEvent.update(dislikes, 'nothing');
        expect(
            getByRole('textbox', {
                name: 'Was hat Dir im Rahmen der Fortbildung nicht gefallen?'
            })
        ).toHaveValue('nothing');

        const likes = getByLabelText(/Was hat Dir besonders gut gefallen?/i);
        await fireEvent.update(likes, 'good');
        expect(
            getByRole('textbox', {
                name: 'Was hat Dir besonders gut gefallen?'
            })
        ).toHaveValue('good');

        getByText(
            'Kannst Du die Teilnahme an dieser Fortbildung weiterempfehlen?'
        );

        const recommendation = getByLabelText(/Ja/i);
        await fireEvent.click(recommendation);
        expect(
            getByRole('radio', {
                name: 'Ja'
            })
        ).toBeChecked();
    });

    it('should display error message when text is too long', async () => {
        const { getByLabelText, getByText } = renderComponent();
        const participantName = getByLabelText(/Wie lautet Dein Name?/i);
        await fireEvent.update(participantName, 'a'.repeat(256));
        getByText('Die maximale Länge sind 255 Zeichen.');
    });
});
