<template>
    <div class="container has-text-centered">
        <h1 class="title">
            {{ totalFormatted }}
        </h1>
        <h2 class="subtitle">
            Estimated people vaccinated
        </h2>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {vxm} from '@/store';
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

        this.interval = setInterval(() => {
            this.setTotal(this.total + 1);
        }, this.vaccinations.rate);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
