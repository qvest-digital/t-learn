import ModalContainer from '@/components/ModalContainer';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';

describe('ModalContainer.vue', () => {
    test('render ModalContainer with text from props', () => {
        const { getByRole, getByTestId } = setupComponent();
        expect(getByTestId('modalContainerTitle')).toHaveTextContent(
            'Confirmation'
        );
        getByRole('button', { name: 'yes' });
        getByRole('button', { name: 'no' });
    });

    test('should emit confirm event when confirm button is clicked', async () => {
        const { getByRole, emitted } = setupComponent();
        await fireEvent.click(getByRole('button', { name: 'yes' }));
        expect(emitted().confirm.length).toEqual(1);
        expect(emitted().confirm[0]).toEqual([]);
    });

    test('should hide modal when cancel button is clicked', async () => {
        const { getByRole, queryByText } = setupComponent();
        expect(queryByText('Confirmation')).toBeInTheDocument();
        await fireEvent.click(getByRole('button', { name: 'no' }));
        expect(queryByText('Confirmation')).not.toBeInTheDocument();
    });

    function setupComponent() {
        return render(ModalContainer, {
            propsData: {
                modalTitle: 'Confirmation',
                confirmButtonTitle: 'yes',
                cancelButtonTitle: 'no'
            },
            data() {
                return {
                    visible: true
                };
            }
        });
    }
});
