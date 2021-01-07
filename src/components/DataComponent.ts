import {vxm} from '@/store';
import Vue from 'vue';

export default class DataComponent extends Vue {
    public ready = false;
    protected vaccinations = vxm.vaccinations;

    async loadData() {
        return this.vaccinations.loadData().then(() => this.ready = true);
    }
}
