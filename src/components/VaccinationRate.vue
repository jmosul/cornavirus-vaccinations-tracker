<template>
    <div class="columns">
        <div class="column is-one-third-desktop"></div>
        <div class="column is-one-third-desktop">
            <apexchart type="radialBar" :series="series" :options="options"></apexchart>
            <h2 class="subtitle">1 Person vaccinated every {{rate}} seconds</h2>
        </div>
    </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';
import DataComponent from '@/components/DataComponent';
import {differenceInSeconds} from 'date-fns';

@Component({
    components: {apexchart: VueApexCharts},
})
export default class TotalVaccinationsHero extends DataComponent {
    public targetRate = 2000000 / 7 / 24 / 60 / 60;
    public rate = 0;
    private flicker = -1;
    private interval = 0;

    public options = {
        colors: ['#009639'],
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: false,
                    },
                },
            },
        },
    };

    public series = [45];

    mounted() {
        this.loadData().then(() => this.start());
    }

    beforeDestroy() {
        clearInterval(this.interval);
    }

    private start() {
        this.setTargetRate();

        this.rate = Math.floor(this.vaccinations.rate / 100) / 10;
        this.series = [(this.rate / this.targetRate) * 100];

        this.interval = setInterval(() => {
            this.series = [this.series[0] + this.flicker];
            this.flicker *= -1;
        }, 300);
    }

    private setTargetRate() {
        const timePeriod = differenceInSeconds(new Date(this.vaccinations.targetTime), this.vaccinations.periods.first.date);

        this.targetRate = this.vaccinations.target / timePeriod;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
