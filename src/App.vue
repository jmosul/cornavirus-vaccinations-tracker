<template>
    <div id="app">
        <section class="hero is-primary is-fullheight">
            <div class="hero-header">
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
                                <a href="#about">*About these numbers</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </section>

        <main id="#about">
            <div class="hero is-info">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">
                            The Vaccination Tracker
                        </h1>
                    </div>
                </div>
            </div>
            <div class="container p-2">

                <p>The aim of this tracker is not to provide accurate updated to the number of people vaccinated.</p>
                <p>
                    But instead perhaps it can offer some
                    <span class="has-text-primary has-text-weight-bold">hope</span>
                    as we work our way back towards normality.
                </p>
                <p>
                    It has been a long and difficult time since the start of the pandemic, but as can be demonstrated here;
                    the end is in sight. With each tick of the tracker we are getting that little closer to returning to our
                    lives, getting our of our homes and seeing our love ones.
                </p>
                <h2 class="subtitle">
                    How do we work out these numbers?
                </h2>
                <p>
                    All data used on this page comes from the official government statistics published at
                    <a
                        href="https://coronavirus.data.gov.uk/details/healthcare"
                        title="Coronavirus data.gov.uk"
                        target="_blank"
                    >
                        https://coronavirus.data.gov.uk/details/healthcare
                    </a>.
                </p>
                <p>
                    Using this data, we calculate the speed at which vaccinations are taking place since the beginning of the
                    vaccination program on the 7th December 2020. The calculations are simple and should only be used as a
                    guide to the speed of the NHS's ambitious vaccination program.
                </p>
                <p>
                    For official figures and updates please see the link above to the official figures which are posted weekly.
                </p>

                <h2 class="subtitle">Stay Safe and Stay Hopeful</h2>
                <p>
                    Thank you for visiting this tracker, all that remains is to say, stay safe and be well.
                </p>
                <p>
                    For information on Coronavirus, guidance and staying safe, please visit the
                    <a
                        href="https://www.nhs.uk/conditions/coronavirus-covid-19"
                        target="_blank"
                        title="NHS Coronavirus Covid 19 Information"
                    >NHS Coronavirus Covid 19 Information Website</a>.
                </p>
            </div>
        </main>

        <footer class="footer is-size-7">
            <div class="content has-text-centered">
                <p>
                    &copy; James O'Sullivan |
                    <a
                        href="https://github.com/jmosul/cornavirus-vaccinations-tracker"
                        title="jmosul/cornavirus-vaccinations-tracker"
                        target="_blank"
                    >
                        Source code on Github
                    </a>
                </p>
                <p class="">
                    All Trademarks referred to are the property of their respective owners.
                </p>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import TotalVaccinationsHero from '@/components/TotalVaccinationsHero.vue';
import Hero from '@/components/Hero.vue';
import DataComponent from '@/components/DataComponent';

@Component({
    components: {
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

$info: #41B6E6;

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
