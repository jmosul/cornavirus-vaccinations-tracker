import {fromUnixTime} from 'date-fns';
import {NhsVaccinationPeriod} from '@/store/vaccinations/types';
import GroupsCollection from '@/models/GroupsCollection';

export default class VaccinationPeriod {
    private _date: Date
    private _groups: GroupsCollection

    constructor(props: NhsVaccinationPeriod) {
        this._date = fromUnixTime(props.timestamp);
        this._groups = new GroupsCollection(props.groups);
    }

    /**
     * @return Date
     */
    get date(): Date {
        return this._date;
    }

    /**
     * @return GroupsCollection
     */
    get groups(): GroupsCollection {
        return this._groups;
    }
}
