import {NhsVaccinationGroup} from '@/store/vaccinations/types';
import Model from '@/models/Model';

export default class VaccinationGroup extends Model {
    private group: string;
    private _dose1: number;
    private _dose2: number;
    private _dose3: number;
    private _booster1: number;

    constructor(props: NhsVaccinationGroup) {
        super();

        this.group = props.group;
        this._dose1 = props.dose1;
        this._dose2 = props.dose2;
        this._dose3 = props.dose3;
        this._booster1 = props.booster1;
    }

    get dose1(): number {
        return this._dose1;
    }

    get booster1(): number {
        return this._booster1;
    }
}
