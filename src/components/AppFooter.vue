<template>
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
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AppFooter extends Vue {
}
</script>

<style scoped>

</style>
