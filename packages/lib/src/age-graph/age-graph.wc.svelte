<svelte:options customElement={{ tag: 'ga-age-graph', shadow: 'open' }}/>

<script lang="ts">
    import {onMount} from 'svelte';
    import {Service} from '../shared/utils/service';

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
            return diff > 35 ? 86 : 52 + diff;
        } else if (glycanAge < chronoAge) {
            return diff > 35 ? 14 : 48 - diff;
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
    <div class="parent" style="position: relative;">
        <div class="colorBoxShort" style="background-color: #015566;"></div>
        <div class="colorBox" style="background-color: #015566;"></div>
        <div class="colorBox" style="background-color: #13A195;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #F2800D;"></div>
        <div class="colorBox" style="background-color: #DF2120;"></div>
        <div class="colorBoxShort" style="background-color: #DF2120;"></div>

        <div class="slider-top" style="left: {calc()}%;">
            <p style="font-size: 1.1rem;">
                Biological age
            </p>
            <p style="font-size: 2.5rem;">
                <b>{glycanAge}</b>
            </p>
            <svg class="rotateImg" width="22%" height="22%" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0718 4C17.151 -1.33334 24.849 -1.33333 27.9282 4.00001L40.0525 25C43.1317 30.3333 39.2827 37 33.1243 37L8.87563 37C2.71722 37 -1.13177 30.3333 1.94743 25L14.0718 4Z" fill="#09371F"/>
            </svg>
        </div>
        <div class="slider-bottom">
            <svg width="22%" height="22%" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0718 4C17.151 -1.33334 24.849 -1.33333 27.9282 4.00001L40.0525 25C43.1317 30.3333 39.2827 37 33.1243 37L8.87563 37C2.71722 37 -1.13177 30.3333 1.94743 25L14.0718 4Z" fill="#09371F"/>
            </svg>
            <div style="font-size: 2.5rem;">
                <b>{chronoAge}</b>
            </div>
            <div style="font-size: 1.1rem;">
                Chronological age
            </div>
        </div>
    </div>
{/if}

<style>
    .parent {
        display: flex;
        width: 100%;
        height: 20px;
        font-family: 'Sen', 'Noto Sans JP', sans-serif;
    }

    .slider-top {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        transform: translate(-50%, -100%);
        width: 18%;
        padding: 0.1rem;
    }

    .slider-bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        width: 18%;
        transform: translate(-50%, 14%);
        left: 50%;
        padding: 0.1rem;
    }

    .colorBox {
        width: 14%;
        border-radius: 24px;
        margin-left: 0.3%;
        margin-right: 0.3%;
    }

    .colorBoxShort {
        width: 7%;
        border-radius: 24px;
    }

    .rotateImg {
        transform: rotate(180deg);
    }

    p {
        margin: 0;
    }
</style>