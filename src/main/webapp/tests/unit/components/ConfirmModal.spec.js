import ConfirmModal from '@/components/ConfirmModal';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';

describe('ConfirmModal.vue', () => {
    test('render ConfirmModal with text from props', () => {
        const { getByRole, getByTestId } = setupComponent();

        expect(getByTestId('confirmModalTitle')).toHaveTextContent(
            'Confirmation'
        );
      

        getByRole('button', { name: 'yes' });
        getByRole('button', { name: 'no' });
    });

    test('check if cancel event is emitted on cancel button click', async () => {
        const { getByRole, emitted } = setupComponent();

        await fireEvent.click(getByRole('button', { name: 'yes' }));
        expect(emitted().confirm.length).toEqual(1);
        expect(emitted().confirm[0]).toEqual([]);
    });

    test('check if confirm event is emitted on confirm button click', async () => {
        const { getByRole, emitted } = setupComponent();

        await fireEvent.click(getByRole('button', { name: 'no' }));
        expect(emitted().cancel.length).toEqual(1);
        expect(emitted().cancel[0]).toEqual([]);
    });

    function setupComponent() {
        return render(ConfirmModal, {
            propsData: {
                modalTitle: 'Confirmation',
                confirmButtonTitle: 'yes',
                cancelButtonTitle: 'no'
            }
        });
    }
});
