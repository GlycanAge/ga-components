<svelte:options customElement={{ tag: 'ga-chronic', shadow: 'open' }}/>

<script lang="ts">
    import {Service} from '../shared/utils/service';
    import {onMount} from 'svelte';
    import {getTranslation} from '../shared/functions/helpers';

    export let lang: string;
    export let report: string;
    export let service: Service = window.GaReportService;

    let glycanAge = 0;
    let chronoAge = 0;
    let reportData: any;

    let show = false;

    function calc() {
        const diff = Math.abs(glycanAge - chronoAge);

        if (glycanAge === chronoAge) {
            return 50;
        } else if (glycanAge > chronoAge) {
            return 50 + diff;
        } else if (glycanAge < chronoAge) {
            return 50 - diff;
        }
    }

    onMount(async () => {
        reportData = await service.getReport(report);
        glycanAge = Number(reportData.glycanage);
        chronoAge = Number(reportData.chronologicalage);
        show = true;
    });
</script>

{#if show}
    <div class="main">
        <div class="movable" style="position: absolute; transform: translate(-50%, 0%); left: {calc()}%;">
            <div style="text-align: center; white-space: nowrap">{getTranslation(lang, 'BIOLOGICAL_AGE')}</div>
            <div class="age-font"><b>{glycanAge}</b></div>
            <svg
                    class="rotate"
                    width="18%"
                    height="18%"
                    viewBox="0 0 42 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
            >
                <path
                        d="M14.0718 4C17.151 -1.33334 24.849 -1.33333 27.9282 4.00001L40.0525 25C43.1317 30.3333 39.2827 37 33.1243 37L8.87563 37C2.71722 37 -1.13177 30.3333 1.94743 25L14.0718 4Z"
                        fill="#09371F"
                />
            </svg>
        </div>
    </div>
{/if}

<style>
    .main {
        height: 5rem;
        width: 25rem;
        display: flex;
        position: relative;
    }

    .movable {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 8rem;
        height: 100%;
    }

    .age-font {
        font-size: 1.5rem;
    }

    .rotate {
        transform: rotate(180deg);
    }
</style>
