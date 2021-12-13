import Collection from '@/models/Collection';
import VaccinationPeriod from '@/models/VaccinationPeriod';

export default class PeriodsCollection extends Collection {
    protected items: VaccinationPeriod[] = [];

    constructor(models: VaccinationPeriod[] = []) {
        super();

        this.items = models;
        this.items.unshift(new VaccinationPeriod({
            date: '2020-12-07',
            timestamp: 1607299200,
            groups: [
                {
                    group: 'England',
                    dose1: 0,
                    dose2: 0,
                    dose3: 0,
                    booster1: 0,
                },
                {
                    group: 'Northern Ireland',
                    dose1: 0,
                    dose2: 0,
                    dose3: 0,
                    booster1: 0,
                },
                {
                    group: 'Scotland',
                    dose1: 0,
                    dose2: 0,
                    dose3: 0,
                    booster1: 0,
                },
                {
                    group: 'Wales',
                    dose1: 0,
                    dose2: 0,
                    dose3: 0,
                    booster1: 0,
                },
            ],
        }));
    }

    get total(): number {
        return this.items.reduce(
            (total: number, {groups}: VaccinationPeriod) => total + groups.vaccinated,
            0,
        );
    }

    get first(): VaccinationPeriod {
        return this.items[0];
    }

    get last(): VaccinationPeriod {
        return this.items[this.count - 1];
    }

    get rate(): number {
        const startMs = this.first.date.getTime();
        const endMs = this.last.date.getTime();

        return (endMs - startMs) / this.total;
    }

    get perMs(): number {
        const startSeconds = Math.floor(this.first.date.getTime());
        const endSeconds = Math.floor(this.last.date.getTime());

        const totalSeconds = endSeconds - startSeconds;

        return this.total / totalSeconds;
    }

    slice(num: number): PeriodsCollection {
        const items = this.items.slice(Math.max(this.count - num, 0));

        return new PeriodsCollection(items);
    }
}
