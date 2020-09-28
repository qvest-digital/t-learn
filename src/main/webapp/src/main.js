import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import App from './App.vue';
import { dateFormatFilter } from '@/filter/dateformatFilter';
import routes from './routes';
import vSelect from 'vue-select';

Vue.config.productionTip = false;
vSelect.props.components.default = () => ({
    Deselect: {
        render: createElement => createElement('span', '')
    },
    OpenIndicator: {
        render: createElement => createElement('span', '')
    }
});
Vue.component('v-select', vSelect);

Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.filter('formatDate', dateFormatFilter);

new Vue({
    render: h => h(App),
    router: new VueRouter({ routes })
}).$mount('#app');
