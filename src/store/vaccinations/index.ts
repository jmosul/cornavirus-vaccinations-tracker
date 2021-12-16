import {action, createModule} from 'vuex-class-component';
import VaccinationPeriod from '@/models/VaccinationPeriod';
import {GovCoronavirusVaccinations, NhsVaccinationGroup, NhsVaccinationPeriod} from '@/store/vaccinations/types';
import PeriodsCollection from '@/models/PeriodsCollection';
import Cov19API, {StructureType} from '@publichealthengland/uk-covid19/lib/UKCovid19';

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
            dose1: group.cumPeopleVaccinatedFirstDoseByPublishDate,
            dose2: group.cumPeopleVaccinatedSecondDoseByPublishDate,
            dose3: 0,
            booster1: group.cumPeopleVaccinatedBoosterDoseByPublishDate,
        } as NhsVaccinationGroup));

        return {
            date: periodData[0].date,
            timestamp: periodData[0].timestamp,
            groups,
        } as NhsVaccinationPeriod;
    }).map((period) => new VaccinationPeriod(period));

    const collection = new PeriodsCollection(formattedData);

    const url = new URL(window.location.toString());
    const type = url.searchParams.get('v');

    if (type) {
        collection.setType(type);
    }

    return collection;
};

const getData = async function(): Promise<PeriodsCollection> {
    const structure = {
        date: 'date',
        areaName: 'areaName',
        cumPeopleVaccinatedFirstDoseByPublishDate: 'cumPeopleVaccinatedFirstDoseByPublishDate',
        cumPeopleVaccinatedSecondDoseByPublishDate: 'cumPeopleVaccinatedSecondDoseByPublishDate',
        cumPeopleVaccinatedThirdInjectionByPublishDate: 'cumPeopleVaccinatedThirdInjectionByPublishDate',
    };

    const filters = ['areaType=nation'];

    const api = new Cov19API({
        filters,
        structure,
        latestBy: 'cumPeopleVaccinatedFirstDoseByPublishDate',
    });

    const data = await api.getJSON().then((json) => json.data);

    return formatData(data.map((structure: StructureType) => {
        return {
            date: structure.date,
            areaName: structure.areaName,
            cumPeopleVaccinatedFirstDoseByPublishDate: parseInt(structure.cumPeopleVaccinatedFirstDoseByPublishDate),
            cumPeopleVaccinatedSecondDoseByPublishDate: parseInt(structure.cumPeopleVaccinatedSecondDoseByPublishDate),
            cumPeopleVaccinatedBoosterDoseByPublishDate: structure.cumPeopleVaccinatedThirdInjectionByPublishDate ? parseInt(structure.cumPeopleVaccinatedThirdInjectionByPublishDate) : 0,
        } as GovCoronavirusVaccinations;
    }));
};

export interface Target {
    amount: number;
    progress: number;
    date: number;
    type: string;
}

export default class VaccinationStore extends VuexModule {
    private _periods: PeriodsCollection = new PeriodsCollection();
    private _loaded = false;
    private velocityHistory = 3;
    private _targets: Target[] = [
        {
            amount: 15000000,
            progress: 0,
            date: Date.parse('2021-02-14'),
            type: 'is-danger',
        },
        {
            amount: 17200000,
            progress: 0,
            date: Date.parse('2021-04-30'),
            type: 'is-warning',
        },
    ];

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

    set vacType(vacType: string) {
        this._periods.setType(vacType);
    }

    get vacType(): string {
        return this._periods.getVacType();
    }

    set periods(periods: PeriodsCollection) {
        this._periods = periods;
    }

    get periods(): PeriodsCollection {
        return this._periods;
    }

    get targets(): Target[] {
        let useNextTarget = true;

        return this._targets.filter(
            (target: Target): boolean => {
                if (useNextTarget) {
                    useNextTarget = target.amount < this.total;

                    return true;
                }

                return false;
            },
        );
    }

    get targetTime(): number {
        const targets = this.targets;

        return targets[targets.length - 1].date;
    }

    get target(): number {
        return this.targets.reduce((total: number, target: Target) => target.amount + total, 0);
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
