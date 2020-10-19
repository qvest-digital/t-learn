//import MultipleSelect from '@/components/MultipleSelect';
import '@testing-library/jest-dom';
//import { fireEvent, render } from '@testing-library/vue';
import Vue from 'vue';
import vSelect from 'vue-select';

Vue.component('v-select', vSelect);

describe('MultipleSelect.vue', () => {
    //TODO
    test('check if input event is emitted on type', async () => {
        // const { findByRole, getByRole, emitted } = setupComponent();
        // const inputfield = getByRole('searchbox');
        // await fireEvent.update(inputfield, 'f'.repeat(5));
        // expect(emitted().input.length).toEqual(5);
    });

    // function setupComponent() {
    //     return render(
    //         MultipleSelect,
    //         {
    //             propsData: {
    //                 selectedCategories: [],
    //                 categories: [
    //                     'fontend',
    //                     'backend',
    //                     'css',
    //                     'javascript',
    //                     'vue',
    //                     'java'
    //                 ]
    //             }
    //         },
    //         localVue => {
    //             localVue.component('v-select', vSelect);
    //         }
    //     );
    // }
});
