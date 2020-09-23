import { shallowMount } from '@vue/test-utils';
import ConfirmModal from '@/components/ConfirmModal';
describe('ConfirmModal.vue', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ConfirmModal, {
            propsData: {
                confirmButtonTitle: 'yes',
                cancelButtonTitle: 'no',
                text: 'Are you sure?'
            }
        });
    });
    test('render ConfirmModal with text from props', () => {
        const contentText = wrapper.find('.confirm-modal-content');
        expect(contentText.text()).toContain('Are you sure?');

        const confirmButtonText = wrapper.find('.confirm-modal-confirm-button');
        expect(confirmButtonText.text()).toContain('yes');

        const cancelButtonText = wrapper.find('.confirm-modal-cancel-button');
        expect(cancelButtonText.text()).toContain('no');
    });

    test('check if cancel event is emitted on cancel button click', async () => {
        const cancelButton = wrapper.find('.confirm-modal-cancel-button');
        await cancelButton.trigger('click');
        expect(wrapper.emitted().cancel).toBeTruthy();
    });

    test('check if confirm event is emitted on confirm button click', async () => {
        const confirmButton = wrapper.find('.confirm-modal-confirm-button');
        await confirmButton.trigger('click');
        expect(wrapper.emitted().confirm).toBeTruthy();
    });
});
