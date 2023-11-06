<svelte:options customElement={{tag: "ga-chronic",shadow: "open",}}/>

<script lang="ts">
    import type {Language} from '../shared/interfaces/language.interface';
    import {Service} from '../shared/utils/service';
    import {onMount} from 'svelte';
    // Language of the rendered list
    export let language: Language;

    // ID of the report
    export let report: string;
    export let type: string;
    export let service: Service = window.GaReportService;
    let glycanAge = 0; // glycanage
    let chronoAge = 0; // chronologicalage
    let reportData: any;

    function getMargin() {
        if (glycanAge > chronoAge) {
            return '0 0 0 140px';
        } else if (glycanAge < chronoAge) {
            return '0 140px 0 0';
        }
        return '0';
    }

    onMount(async () => {
        reportData = await service.getReport(undefined);
        glycanAge = Number(reportData.glycanage);
        chronoAge =  Number(reportData.chronologicalage);
    })
</script>

<div class="main">
    <div class="movable" style="margin: {getMargin()};">
        <div>Biological age</div>
        <div class="age-font"><b>{glycanAge}</b></div>
        <svg class="rotate" width="18%" height="18%" viewBox="0 0 42 37" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                    d="M14.0718 4C17.151 -1.33334 24.849 -1.33333 27.9282 4.00001L40.0525 25C43.1317 30.3333 39.2827 37 33.1243 37L8.87563 37C2.71722 37 -1.13177 30.3333 1.94743 25L14.0718 4Z"
                    fill="#09371F"/>
        </svg>
    </div>
</div>

<style>
    .main {
        height: 5rem;
        width: 25rem;
        border: 1px solid red;
        display: flex;
        justify-content: center;
    }

    .movable {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 7rem;
        height: 100%;
        border: 1px solid blue;
    }

    .age-font {
        font-size: 1.5rem;
    }

    .rotate {
        transform: rotate(180deg);
    }
</style>