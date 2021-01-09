import Vue from 'vue';
import App from './App.vue';
import {store} from './store';
import Buefy from 'buefy';
import VueApexCharts from 'vue-apexcharts';
import VueScrollTo from 'vue-scrollto';

Vue.use(Buefy);
Vue.use(VueApexCharts);
Vue.use(VueScrollTo);

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
