import {fromUnixTime} from 'date-fns';
import {NhsVaccinationData, NhsVaccinationGroup} from '@/store/vaccinations';
import VaccinationGroup from '@/models/VaccinationGroup';

export default class DataPeriod {
    private date: Date;
    private groups: Array<VaccinationGroup>;

    constructor(props: NhsVaccinationData) {
        this.date = fromUnixTime(props.timestamp);
        this.groups = props.groups.map((group: NhsVaccinationGroup) => new VaccinationGroup(group));
    }
}
