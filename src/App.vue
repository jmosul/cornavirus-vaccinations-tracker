<template>
  <div id="app">
      <section class="hero is-primary is-fullheight">
          <div class="hero-body">
              <hero></hero>
          </div>

          <div class="hero-foot pl-6 pr-6">
              <nav class="tabs is-boxed is-fullwidth">
                  <div class="container">
                      <ul>
                          <li class="is-active">
                              <a href="#about">About</a>
                          </li>
                      </ul>
                  </div>
              </nav>
          </div>
      </section>

      <main id="#about">
          Some content
      </main>

      <footer class="footer">
          <div class="content has-text-centered">
              <p>
                  Tracker by James
                  <br>
                  <a
                      href="https://github.com/jmosul/cornavirus-vaccinations-tracker"
                      title="jmosul/cornavirus-vaccinations-tracker"
                      target="_blank"
                  >
                      Source code on Github
                  </a>
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

$primary: #005EB8;
$primary-light: #0072CE;
$primary-dark: #003087;
$primary-invert: #ffffff;

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

</style>
