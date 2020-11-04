import InputField from '@/components/fields/InputField';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import Vuelidate from 'vuelidate';
import { maxLength } from 'vuelidate/lib/validators';
import { getRandomString } from '../../../util/testUtil';

describe('InputField.vue', () => {
    test('Render InputField with data from props', () => {
        const id = 'fieldId';
        const label = 'fieldLabel';
        const placeholder = 'placeholderText';

        const { getByLabelText, getByRole, queryByTestId } = render(
            InputField,
            {
                props: {
                    id: id,
                    label: label,
                    placeholder: placeholder,
                    validations: {},
                    errorMessage: 'irrelevant'
                }
            },
            localVue => {
                localVue.use(Vuelidate);
            });

        getByLabelText(label, { for: id });
        const inputElement = getByRole('textbox', {
            id: id, placeholder: placeholder
        });
        expect(inputElement.name).toBe(id);
        expect(queryByTestId('inputFieldError')).not.toBeInTheDocument();
    });

    test('Do not display error if input text is under 255 characters', async () => {
        const { getByRole, queryByTestId } = render(
            InputField,
            {
                props: {
                    id: 'irrelevant',
                    label: 'irrelevant',
                    placeholder: 'irrelevant',
                    validations: {maxLength: maxLength(255)},
                    errorMessage: 'irrelevant'
                }
            },
            localVue => {
                localVue.use(Vuelidate);
            });

        expect(queryByTestId('inputFieldError')).not.toBeInTheDocument();

        const inputElement = getByRole('textbox');
        await fireEvent.update(inputElement, getRandomString(255));

        expect(queryByTestId('inputFieldError')).not.toBeInTheDocument();
    });

    test('Display error if input text is above 255 characters', async () => {
        const errorMessage = 'Input length is too high'

        const { getByRole, queryByTestId } = render(
            InputField,
            {
                props: {
                    id: 'irrelevant',
                    label: 'irrelevant',
                    placeholder: 'irrelevant',
                    validations: {maxLength: maxLength(255)},
                    errorMessage: errorMessage
                }
            },
            localVue => {
                localVue.use(Vuelidate);
            });

        expect(queryByTestId('inputFieldError')).not.toBeInTheDocument();

        const inputElement = getByRole('textbox');
        await fireEvent.update(inputElement, getRandomString(256));

        const errorField = queryByTestId('inputFieldError');
        expect(errorField).toBeInTheDocument();
        expect(errorField).toHaveTextContent(errorMessage);
    });

    test('Display provided input text ', async () => {
        const input = 'input text';

        const { getByRole } = render(
            InputField,
            {
                props: {
                    id: 'irrelevant',
                    label: 'irrelevant',
                    placeholder: 'irrelevant',
                    value: input,
                    validations: {},
                    errorMessage: 'irrelevant'
                }
            },
            localVue => {
                localVue.use(Vuelidate);
            });

        const inputElement = getByRole('textbox');
        expect(inputElement.value).toBe(input);
    });

});
