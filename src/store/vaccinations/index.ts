import {action, VuexModule} from 'vuex-class-component';
import VaccinationPeriod from '@/models/VaccinationPeriod';
import data from './data';
import {NhsVaccinationPeriod} from '@/store/vaccinations/types';

export class VaccinationStore extends VuexModule {
    private _periods: VaccinationPeriod[] = [];

    @action async loadData() {
        this.periods = data.map((period: NhsVaccinationPeriod) => new VaccinationPeriod(period));
    }

    set periods(periods: VaccinationPeriod[]) {
        this._periods = periods;
    }

    get firstPeriod(): VaccinationPeriod {
        return this._periods[0];
    }

    get lastPeriod(): VaccinationPeriod {
        return this._periods[this._periods.length - 1];
    }

    get total(): number {
        return this._periods.reduce(
            (total: number, {groups}: VaccinationPeriod) => total + groups.vaccinated,
            0,
        );
    }

    get rate(): number {
        const startSeconds = Math.floor(this.firstPeriod.date.getTime() / 1000);
        const endSeconds = Math.floor(this.lastPeriod.date.getTime() / 1000);

        const totalSeconds = endSeconds - startSeconds;

        return this.total / totalSeconds;
    }
}
