<template>
    <div class="container has-text-centered">
        <total-vaccinations-hero></total-vaccinations-hero>
        <target-progress></target-progress>
        <vaccination-rate></vaccination-rate>
    </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';
import TotalVaccinationsHero from '@/components/TotalVaccinationsHero.vue';
import VaccinationRate from '@/components/VaccinationRate';
import TargetProgress from '@/components/TargetProgress';

@Component({
    components: {
        TargetProgress,
        VaccinationRate,
        TotalVaccinationsHero,
    },
})
export default class Hero extends Vue {

}
</script>

<style scoped>

</style>
