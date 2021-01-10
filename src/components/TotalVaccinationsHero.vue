<template>
    <div>
        <h1 class="title">
            {{ totalFormatted }}
        </h1>
        <h2 class="subtitle">
            Estimated people vaccinated*
        </h2>
    </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import DataComponent from '@/components/DataComponent';

@Component
export default class TotalVaccinationsHero extends DataComponent {
    public total = 0
    public rate = 0
    public totalFormatted = ''
    private interval?: number

    mounted() {
        this.loadData().then(() => this.start());
    }

    setTotal(total: number) {
        this.total = total;
        this.totalFormatted = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    beforeDestroy() {
        clearInterval(this.interval);
    }

    private start() {
        this.setTotal(this.vaccinations.total);
        this.rate = Math.floor(this.vaccinations.rate / 100) / 10;

        this.interval = window.setInterval(() => {
            this.setTotal(this.total + 1);
        }, this.vaccinations.rate);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        font-size: 4em;
        text-shadow: 0 1px 10px rgba(255, 255, 255, 0.4);
    }
</style>
