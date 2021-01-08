export interface NhsVaccinationGroup {
    group: string;
    dose1: number;
    dose2: number;
}

export interface NhsVaccinationPeriod {
    date: string;
    timestamp: number;
    groups: Array<NhsVaccinationGroup>;
}

export interface GovCoronavirusVaccinations {
    date: string;
    areaName: string;
    newPeopleReceivingFirstDose: number;
    newPeopleReceivingSecondDose: number;
    timestamp?: number;
}
