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

export const data = [
    {
        date: '2020-12-07',
        timestamp: 1607299200,
        groups: [
            {
                group: '17-79',
                dose1: 0,
                dose2: 0,
            },
            {
                group: '80+',
                dose1: 0,
                dose2: 0,
            },

        ],
    },
    {
        date: '2020-12-27',
        timestamp: 1609027200,
        groups: [
            {
                group: '17-79',
                dose1: 261561,
                dose2: 0,
            },
            {
                group: '80+',
                dose1: 524439,
                dose2: 0,
            },

        ],
    },
];
