export interface NhsVaccinationGroup {
    group: string;
    dose1: number;
    dose2: number;
    dose3: number;
    booster1: number;
}

export interface NhsVaccinationPeriod {
    date: string;
    timestamp: number;
    groups: Array<NhsVaccinationGroup>;
}

export interface GovCoronavirusVaccinations {
    date: string;
    areaName: string;
    cumPeopleVaccinatedFirstDoseByPublishDate: number;
    cumPeopleVaccinatedSecondDoseByPublishDate: number;
    cumPeopleVaccinatedBoosterDoseByPublishDate: number;
    timestamp?: number;
}
