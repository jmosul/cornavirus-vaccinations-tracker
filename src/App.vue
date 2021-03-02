<template>
    <div id="app">
        <router-view></router-view>

        <app-footer></app-footer>
    </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import DataComponent from '@/components/DataComponent';
import AppFooter from '@/components/AppFooter.vue';
import {Analytics} from 'aws-amplify';
import Home from '@/views/Home.vue';

Analytics.record({name: 'albumVisit'});

@Component({
    components: {
        Home,
        AppFooter,
    },
})
export default class App extends DataComponent {
    mounted() {
        Analytics.record({name: 'appVisit'});
    }
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

    .about__link {
        .is-active {
            color: $primary;
        }
    }
}

p {
    margin-bottom: 15px;
}

</style>
