<template>
    <div>

        <main class="hero is-primary is-fullheight">
            <div class="hero-header is-hidden-mobile">
                <h3 class="subtitle mt-2">We're getting there!</h3>
            </div>
            <div class="hero-body">
                <hero></hero>
            </div>
            <div class="hero-foot pl-6 pr-6">
                <nav class="tabs is-boxed is-fullwidth">
                    <div class="container">
                        <ul class="about__link">
                            <li class="is-active">
                                <a href="#" v-scroll-to="'#about'">*About these numbers</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </main>

        <section id="about">
            <about></about>
        </section>
    </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import TotalVaccinationsHero from '@/components/TotalVaccinationsHero.vue';
import Hero from '@/components/Hero.vue';
import DataComponent from '@/components/DataComponent';
import About from '@/components/About.vue';

@Component({
    components: {
        About,
        Hero,
        TotalVaccinationsHero,
    },
})
export default class Home extends DataComponent {
}

</script>
