<template>
    <div class="container has-text-centered">
        <div class="tabs is-centered is-toggle is-toggle-rounded ">
            <ul>
                <li :class="{'is-active': !boosted}"><a @click="setDose1">Vaccinated</a></li>
                <li :class="{'is-active': boosted}"><a @click="setBoosters">Boosted</a></li>
            </ul>
        </div>

        <div v-if="active">
            <total-vaccinations-hero></total-vaccinations-hero>
            <target-progress v-if="!boosted"></target-progress>
            <vaccination-rate></vaccination-rate>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';
import TotalVaccinationsHero from '@/components/TotalVaccinationsHero.vue';
import VaccinationRate from '@/components/VaccinationRate';
import TargetProgress from '@/components/TargetProgress';
import DataComponent from '@/components/DataComponent';

@Component({
    components: {
        TargetProgress,
        VaccinationRate,
        TotalVaccinationsHero,
    },
})
export default class Hero extends DataComponent {
    active = true;

    get boosted() {
        return this.vaccinations.vacType === 'boosted';
    }

    setDose1() {
        this.setType('dose1');
    }

    setBoosters() {
        this.setType('boosted');
    }

    setType(vacType) {
        this.active = false;
        this.vaccinations.vacType = vacType;

        setTimeout(() => {
            this.active = true;
        }, 100);
    }
}
</script>

<style>
    .tabs.is-toggle > ul > li.is-active {
        color: #005eb8;
    }
</style>
