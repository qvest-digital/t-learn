import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import App from './App.vue';
import { dateFormatFilter } from '@/filter/dateformatFilter';

import routes from './routes';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.filter('formatDate', dateFormatFilter);

new Vue({
    render: h => h(App),
    router: new VueRouter({ routes })
}).$mount('#app');
