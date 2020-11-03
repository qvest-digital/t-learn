import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import RadioButton from '@/components/RadioButton';

describe('RadioButton.vue', () => {
    it('should click the radio button', async () => {
        const { getByLabelText, emitted } = render(RadioButton, {
            propsData: {
                name: 'option',
                id: 'option',
                label: 'click me',
                value: null
            }
        });
        await fireEvent.click(getByLabelText('click me'));
        expect(emitted().change.length).toEqual(1);
        expect(emitted().change[0]).toEqual(['click me']);
    });
});
