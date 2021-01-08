<template>
    <div class="columns mt-5 vaccination-target">
        <div class="column is-offset-one-third-desktop is-one-third-desktop">
            <b-progress
                :value="total"
                type="is-danger"
                show-value
                :max="vaccinations.target"
            >
                Target: {{formattedTarget}} by {{formattedTargetDate}}
            </b-progress>
        </div>
    </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {format, fromUnixTime} from 'date-fns';
import DataComponent from '@/components/DataComponent';

@Component
export default class TargetProgress extends DataComponent {
    public total = 0;
    public rate = 0
    private interval?: number
    private percentage = 0;
    private formattedTargetDate = '';
    private formattedTarget = '';

    mounted() {
        this.loadData().then(() => this.start());
    }

    setTotal(total: number) {
        this.total = total;
        this.percentage = Math.floor(total / this.vaccinations.target * 10000) / 100;
    }

    beforeDestroy() {
        clearInterval(this.interval);
    }

    private start() {
        this.formattedTargetDate = format(
            fromUnixTime(this.vaccinations.targetTime / 1000),
            'do MMMM',
        );

        this.formattedTarget = this.vaccinations.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        this.setTotal(this.vaccinations.total);
        this.rate = Math.floor(this.vaccinations.rate / 100) / 10;

        this.interval = setInterval(() => {
            this.setTotal(this.total + 1);
        }, this.vaccinations.rate);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .vaccination-target .progress-wrapper {
        progress {
            height: 50px;
        }

        > .progress-value {
            line-height: 50px;
            font-size: 1em;
        }
    }
</style>
