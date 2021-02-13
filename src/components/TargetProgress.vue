<template>
    <div class="columns mt-2 vaccination-target">
        <div class="column is-offset-one-third-desktop is-one-third-desktop">
            <b-progress format="percent" :max="vaccinations.target" v-if="total">
                <template #bar>
                    <b-progress-bar
                        v-for="target in targets"
                        :key="target.progress"

                        :max="target.amount"
                        :value="target.progress"
                        :type="target.type"
                    ></b-progress-bar>
                </template>
            </b-progress>
            <p class="target__desc">Target: {{formattedTarget}} by {{formattedTargetDate}}</p>
        </div>
    </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {format, fromUnixTime} from 'date-fns';
import DataComponent from '@/components/DataComponent';
import {Target} from '@/store/vaccinations';

@Component
export default class TargetProgress extends DataComponent {
    public total = 0;
    public rate = 0
    private interval?: number
    private targets: Target[] = [];
    private totalTarget = 0;
    private formattedTargetDate = '';
    private formattedTarget = '';

    mounted() {
        this.loadData().then(() => this.start());
    }

    setTotal(total: number) {
        this.total = total;

        this.setTargets();
    }

    setTargets() {
        let total = this.total;

        this.targets = this.targets.map((target: Target): Target => {
            if (total < target.amount) {
                target.progress = total;
                total = 0;
            } else {
                target.progress = target.amount;
                total -= target.amount;
            }

            return target;
        });
    }

    beforeDestroy() {
        clearInterval(this.interval);
    }

    private start() {
        console.log('start');
        this.targets = this.vaccinations.targets;

        this.formattedTargetDate = format(
            fromUnixTime(this.vaccinations.targetTime / 1000),
            'do MMMM',
        );

        this.formattedTarget = this.vaccinations.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        this.totalTarget = this.vaccinations.target * 10000;
        console.log(this.targets, this.totalTarget);

        this.setTotal(this.vaccinations.total);
        this.rate = Math.floor(this.vaccinations.rate / 100) / 10;

        this.interval = window.setInterval(() => {
            this.setTotal(this.total + 1);
        }, this.vaccinations.rate);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $bar-height: 50px;

    .vaccination-target {
        .progress-wrapper {
            &.is-not-native {
                margin-bottom: 0 !important;
            }

            progress, &.is-not-native {
                height: $bar-height;

                [role="progressbar"] {
                    float: left;
                }
            }

            > .progress-value {
                line-height: 50px;
                font-size: 1em;
            }
        }

        .target__desc {
            position: relative;
            top: -$bar-height;
            line-height: $bar-height;
            margin: 0;
            color: #4a4a4a;

            font-size: 1.1em;
            font-weight: bold;
        }
    }
</style>
