<template>
    <div>
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
            <p>
                This tracker estimates the current progress of the NHS vaccination program based on the weekly
                official figures. It should not be considered as accurate or official update to the number of people
                vaccinated.
            </p>
            <p class="is-size-5">
                But instead perhaps it can offer some
                <span class="has-text-primary has-text-weight-bold">hope</span>
                as we work our way back towards normality.
            </p>
            <p>
                It has been a long and difficult time since the start of the pandemic, but as can be demonstrated
                here; the end is in sight. With each tick of the tracker we are getting that little closer to
                returning to our lives, getting our of our homes and seeing our love ones.
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
                Using this data, we calculate the speed at which vaccinations are taking place since the beginning
                of the vaccination program on the 7th December 2020.
                <strong>The calculations are simple and should only be used as a guide</strong>
                to the speed of the NHS's ambitious vaccination program.
            </p>
            <p>
                For official figures and updates please see the link above to the official figures which are posted
                weekly.
            </p>
            <h4>Target Source</h4>
            <p>
                The target of 15 million vaccinations by 14th February 2021 is based on the government's target
                of 15 million vaccination by Mid-February
                <a
                    class="is-size-7"
                    href="https://www.bbc.co.uk/news/health-55274833"
                    target="_blank"
                    title="BBC News | Covid vaccine: How will the UK jab millions of people?"
                >
                    (source: BBC News: How will the UK jab millions of people?).
                </a>
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
    </div>
</template>

<script>
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class About extends Vue {
}
</script>

<style scoped>

</style>
