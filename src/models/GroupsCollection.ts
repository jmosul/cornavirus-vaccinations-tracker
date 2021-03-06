import VaccinationGroup from '@/models/VaccinationGroup';
import {NhsVaccinationGroup} from '@/store/vaccinations/types';

export default class GroupsCollection {
    private groups: VaccinationGroup[];

    /**
     * @param {NhsVaccinationGroup[]} groups
     */
    constructor(groups: NhsVaccinationGroup[]) {
        this.groups = groups.map((group: NhsVaccinationGroup) => new VaccinationGroup(group));
    }

    get vaccinated(): number {
        return this.groups.reduce((total: number, {dose1}: VaccinationGroup) => total + dose1, 0);
    }

    get first() {
        return this.groups[0];
    }

    get last() {
        return this.groups[this.groups.length - 1];
    }
}
