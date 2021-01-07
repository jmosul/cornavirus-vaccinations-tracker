import {action, createModule} from 'vuex-class-component';
import VaccinationPeriod from '@/models/VaccinationPeriod';
import data from './data';
import {NhsVaccinationPeriod} from '@/store/vaccinations/types';
import PeriodsCollection from '@/models/PeriodsCollection';

export const VuexModule = createModule({
    namespaced: 'vaccinations',
    strict: false,
});

export default class VaccinationStore extends VuexModule {
    private _periods: PeriodsCollection = new PeriodsCollection();
    private _loaded = false;
    private velocityHistory = 3;

    @action async loadData() {
        if (!this._loaded) {
            this.periods = new PeriodsCollection(
                data.map((period: NhsVaccinationPeriod) => new VaccinationPeriod(period)),
            );
        }

        this._loaded = true;
    }

    set periods(periods: PeriodsCollection) {
        this._periods = periods;
    }

    get periods(): PeriodsCollection {
        return this._periods;
    }

    get total(): number {
        const msSince = (new Date()).getTime() - this.periods.last.date.getTime();

        return this.periods.total + Math.floor(msSince * this.velocityPeriods.perMs);
    }

    get rate(): number {
        return this.velocityPeriods.rate;
    }

    get velocityPeriods(): PeriodsCollection {
        return this.periods.slice(this.velocityHistory);
    }
}
