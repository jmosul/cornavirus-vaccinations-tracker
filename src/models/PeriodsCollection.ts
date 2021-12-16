import Collection from '@/models/Collection';
import VaccinationPeriod from '@/models/VaccinationPeriod';
import BoostedVaccinationPeriod from '@/models/initials/BoostedVaccinationPeriod';
import FirstDoseVaccinationPeriod from '@/models/initials/FirstDoseVaccinationPeriod';
import SecondDoseVaccinationPeriod from '@/models/initials/SecondDoseVaccinationPeriod';

export default class PeriodsCollection extends Collection {
    protected items: VaccinationPeriod[] = [];
    protected type: string = 'dose1';

    constructor(models: VaccinationPeriod[] = []) {
        super();

        this.items = models;
        this.items.unshift(FirstDoseVaccinationPeriod);
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
                switch(this.type) {
                    case 'boosted':
                        return total + groups.boosted;

                    case 'dose2':
                        return total + groups.second;

                    default:
                        return total + groups.vaccinated;
                }
            },
            0,
        );
    }

    get first(): VaccinationPeriod {
        switch (this.type) {
            case 'boosted':
                return BoostedVaccinationPeriod;
            case 'dose2':
                return SecondDoseVaccinationPeriod;

            default:
                return this.items[0];
        }
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
