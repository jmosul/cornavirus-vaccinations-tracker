<template>
    <div class="container has-text-centered">
        <total-vaccinations-hero></total-vaccinations-hero>
        <vaccination-rate></vaccination-rate>
    </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';
import TotalVaccinationsHero from '@/components/TotalVaccinationsHero.vue';
import VaccinationRate from '@/components/VaccinationRate';

@Component({
    components: {
        VaccinationRate,
        TotalVaccinationsHero,
    },
})
export default class Hero extends Vue {

}
</script>

<style scoped>

</style>
