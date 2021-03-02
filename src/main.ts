import Vue from 'vue';
import App from './App.vue';
import {store} from './store';
import {router} from './router';
import Buefy from 'buefy';
import VueApexCharts from 'vue-apexcharts';
import VueScrollTo from 'vue-scrollto';
import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import awsconfig from '@/aws-exports';

Vue.use(Buefy);
Vue.use(VueApexCharts);
Vue.use(VueScrollTo);

Amplify.configure(awsconfig);
Auth.configure({mandatorySignIn: false});

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
