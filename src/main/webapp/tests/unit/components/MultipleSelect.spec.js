import MultipleSelect from '@/components/MultipleSelect';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import vSelect from 'vue-select';

describe('MultipleSelect.vue', () => {
    it('shows values handed in via props', async () => {
        const { getByRole } = render(
            MultipleSelect,
            {
                props: {
                    value: ['option 1', 'option 2'],
                    options: ['option 1', 'option 2', 'option 3']
                }
            },
            localVue => {
                localVue.component('v-select', vSelect);
            }
        );

        const combobox = getByRole('combobox');
        expect(combobox).toHaveTextContent('option 1');
        expect(combobox).toHaveTextContent('option 2');
        expect(combobox).not.toHaveTextContent('option 3');
    });

    it('shows updated selected option on value prop change', async () => {
        const { getByRole, updateProps } = render(
            MultipleSelect,
            {
                props: {
                    options: ['option 1', 'option 2', 'option 3']
                }
            },
            localVue => {
                localVue.component('v-select', vSelect);
            }
        );

        await updateProps({ value: ['option 1'] });

        const combobox = getByRole('combobox');
        expect(combobox).toHaveTextContent('option 1');
        expect(combobox).not.toHaveTextContent('option 2');
        expect(combobox).not.toHaveTextContent('option 3');
    });

    it('shows updated selected option on options prop change', async () => {
        const { getByRole, updateProps } = render(
            MultipleSelect,
            {
                props: {
                    value: ['option 1']
                }
            },
            localVue => {
                localVue.component('v-select', vSelect);
            }
        );

        await updateProps({ options: ['option 1'] });

        expect(getByRole('combobox')).toHaveTextContent('option 1');
    });

    it('submits event on single selection', async () => {
        const { emitted, options } = await primeComponent();

        await fireEvent.mouseDown(options[1]);

        expect(emitted().input[0]).toEqual([['option 2']]);
    });

    it('submits events on multiple selection', async () => {
        const { emitted, options } = await primeComponent();

        await fireEvent.mouseDown(options[1]);
        await fireEvent.mouseDown(options[2]);

        expect(emitted().input).toEqual([
            [['option 2']],
            [['option 2', 'option 3']]
        ]);
    });

    async function primeComponent() {
        const component = render(
            MultipleSelect,
            {
                props: {
                    value: [],
                    options: ['option 1', 'option 2', 'option 3']
                }
            },
            localVue => {
                localVue.component('v-select', vSelect);
            }
        );
        await fireEvent.mouseDown(component.getByRole('combobox'));
        const options = component.getAllByRole('option');

        return { ...component, options };
    }
});
