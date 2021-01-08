import {action, createModule} from 'vuex-class-component';
import VaccinationPeriod from '@/models/VaccinationPeriod';
import {GovCoronavirusVaccinations, NhsVaccinationGroup, NhsVaccinationPeriod} from '@/store/vaccinations/types';
import PeriodsCollection from '@/models/PeriodsCollection';

const dataUrl = 'https://coronavirus.data.gov.uk/api/v1/data?filters=areaType=nation&structure=%7B%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22newPeopleReceivingFirstDose%22:%22newPeopleReceivingFirstDose%22,%22newPeopleReceivingSecondDose%22:%22newPeopleReceivingSecondDose%22%7D';

export const VuexModule = createModule({
    namespaced: 'vaccinations',
    strict: false,
});

const formatData = function(data: GovCoronavirusVaccinations[]) {
    const squashedData: {[key: string]: GovCoronavirusVaccinations[] } = {};

    // calculate timestamp from each period
    data = data.map((period) => {
        period.timestamp = Date.parse(period.date) / 1000;

        return period;
    });

    data.sort(
        (period1, period2) => period1.timestamp && period2.timestamp ? period1.timestamp - period2.timestamp : 0,
    );

    data.forEach((period: GovCoronavirusVaccinations) => {
        if (!squashedData[period.date]) {
            squashedData[period.date] = [];
        }

        squashedData[period.date].push(period);
    });

    const formattedData: VaccinationPeriod[] = Object.values(squashedData).map((periodData) => {
        const groups = periodData.map((group) => ({
            group: group.areaName,
            dose1: group.newPeopleReceivingFirstDose,
            dose2: group.newPeopleReceivingSecondDose,
        } as NhsVaccinationGroup));

        return {
            date: periodData[0].date,
            timestamp: periodData[0].timestamp,
            groups,
        } as NhsVaccinationPeriod;
    }).map((period) => new VaccinationPeriod(period));

    return new PeriodsCollection(formattedData);
};

const getData = async function(): Promise<PeriodsCollection> {
    const data = await fetch(dataUrl)
        .then((response) => response.json())
        .then(({data}) => data);

    return formatData(data);
};

export default class VaccinationStore extends VuexModule {
    private _periods: PeriodsCollection = new PeriodsCollection();
    private _loaded = false;
    private velocityHistory = 3;
    private _target = 15000000;

    private _loadingPromise?: Promise<boolean>

    @action async loadData(): Promise<boolean> {
        if (this._loaded) {
            return this._loaded;
        }

        if (this._loadingPromise) {
            return this._loadingPromise;
        }

        return this._loadingPromise = getData().then(
            (periods) => {
                this._periods = periods;

                return this._loaded = true;
            },
        ).then(() => true);
    }

    set periods(periods: PeriodsCollection) {
        this._periods = periods;
    }

    get periods(): PeriodsCollection {
        return this._periods;
    }

    get target(): number {
        return this._target;
    }

    get targetTime(): number {
        return Date.parse('2021-02-14');
    }

    get total(): number {
        const msSince = (new Date()).getTime() - this.periods.last.date.getTime();

        return this.periods.total + Math.floor(msSince * this.velocityPeriods.perMs);
    }

    get rate(): number {
        return this.velocityPeriods.rate;
    }

    get velocityPeriods(): PeriodsCollection {
        return this.periods;
    }
}
