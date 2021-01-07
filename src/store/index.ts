import Vue from 'vue';
import Vuex from 'vuex';
import {extractVuexModule, createProxy} from 'vuex-class-component';
import VaccinationStore from './vaccinations';

Vue.use(Vuex);

// store.vuex.ts
export const store = new Vuex.Store({
    modules: {
        ...extractVuexModule(VaccinationStore),
    },
});

// Creating proxies.
export const vxm = {
    vaccinations: createProxy(store, VaccinationStore),
};
