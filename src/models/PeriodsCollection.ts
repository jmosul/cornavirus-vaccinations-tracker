import Collection from '@/models/Collection';
import VaccinationPeriod from '@/models/VaccinationPeriod';

export default class PeriodsCollection extends Collection {
    protected items: VaccinationPeriod[] = [];
    protected type: string = 'dose1';

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

    setType(type: string) {
        this.type = type;
    }

    getVacType(): string {
        return this.type;
    }

    get total(): number {
        return this.items.reduce(
            (total: number, {groups}: VaccinationPeriod) => {
                const count = this.type === 'boosted' ? groups.boosted : groups.vaccinated;

                return total + count;
            },
            0,
        );
    }

    get first(): VaccinationPeriod {
        if (this.type === 'boosted') {
            return new VaccinationPeriod({
                date: '2021-09-30',
                timestamp: 1632960000,
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
            });
        }

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
