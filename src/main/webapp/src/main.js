import Vue from "vue";
import Vuelidate from "vuelidate";
import VueRouter from "vue-router";
import App from "./App.vue";
import { BootstrapVue } from "bootstrap-vue";
import { format, parseISO } from "date-fns";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import routes from "./routes";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(VueRouter);

Vue.filter("formatDate", (value, dateFormat) => {
  if (!value) {
    return "";
  }

  if (dateFormat) {
    return format(parseISO(value), dateFormat);
  } else {
    return format(parseISO(value), "dd.MM.yyyy HH:mm");
  }
});

new Vue({
  render: h => h(App),
  router: new VueRouter({ routes })
}).$mount("#app");
