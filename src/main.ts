import Vue from 'vue';
import App from './App.vue';
import {store} from './store';
import Buefy from 'buefy';
// import 'buefy/dist/buefy.css';
import VueApexCharts from 'vue-apexcharts';

Vue.use(Buefy);
Vue.use(VueApexCharts);

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
