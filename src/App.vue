<template>
    <div id="app">
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
                        <ul>
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

        <app-footer></app-footer>
    </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import TotalVaccinationsHero from '@/components/TotalVaccinationsHero.vue';
import Hero from '@/components/Hero.vue';
import DataComponent from '@/components/DataComponent';
import About from '@/components/About.vue';
import AppFooter from '@/components/AppFooter.vue';

@Component({
    components: {
        AppFooter,
        About,
        Hero,
        TotalVaccinationsHero,
    },
})
export default class App extends DataComponent {

}

</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

$primary: #005eb8;
$primary-light: #0072ce;
$primary-dark: #003087;
$primary-invert: #ffffff;

$info: #41b6e6;

// Lists and maps
$custom-colors: null !default;
$custom-shades: null !default;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
        (
            "white": (
                $white,
                $black,
            ),
            "black": (
                $black,
                $white,
            ),
            "light": (
                $light,
                $light-invert,
            ),
            "dark": (
                $dark,
                $dark-invert,
            ),
            "primary": (
                $primary,
                $primary-invert,
                $primary-light,
                $primary-dark,
            ),
            "link": (
                $link,
                $link-invert,
                $link-light,
                $link-dark,
            ),
            "info": (
                $info,
                $info-invert,
                $info-light,
                $info-dark,
            ),
            "success": (
                $success,
                $success-invert,
                $success-light,
                $success-dark,
            ),
            "warning": (
                $warning,
                $warning-invert,
                $warning-light,
                $warning-dark,
            ),
            "danger": (
                $danger,
                $danger-invert,
                $danger-light,
                $danger-dark,
            ),
        ),
        $custom-colors
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

p {
    margin-bottom: 15px;
}

</style>
