<svelte:options customElement={{ tag: 'ga-index-graph', shadow: 'open' }}/>

<script lang="ts">
    import {onMount} from 'svelte';
    import {Service} from '../shared/utils/service';
    import {
        calculateSliderPosition,
        getColorBlueToRed,
        getColorRedToBlue,
        getTranslation,
        suffix
    } from '../shared/functions/helpers';

    export let report: string;
    export let type: string;
    export let lang: string;
    export let service: Service = window.GaReportService;

    let reportData: any;

    let min = 0;
    let mid = 0;
    let max = 0;
    let result = 0;
    let percentile = 0;

    let show = false;

    onMount(async () => {
        reportData = await service.getReport(report);

        switch (type) {
            case 'shield':
                min = Number(reportData.Sxmin);
                mid = Number(reportData.Sxaverage);
                max = Number(reportData.Sxmax);
                result = Number(reportData.Syourscore);
                percentile = Number(reportData.Spercentile);
                break;
            case 'youth':
                min = Number(reportData.G2xmin);
                mid = Number(reportData.G2xaverage);
                max = Number(reportData.G2xmax);
                result = Number(reportData.G2yourscore);
                percentile = Number(reportData.G2percentile);
                break;
            case 'mature':
                min = Number(reportData.G0xmin);
                mid = Number(reportData.G0xaverage);
                max = Number(reportData.G0xmax);
                result = Number(reportData.G0yourscore);
                percentile = Number(reportData.G0percentile);
                break;
            case 'lifestyle':
                min = Number(reportData.Bxmin);
                mid = Number(reportData.Bxaverage);
                max = Number(reportData.Bxmax);
                result = Number(reportData.Byourscore);
                percentile = Number(reportData.Bpercentile);
        }

        show = true;
    });
</script>

{#if show}
    <div class="parent">
        {#if type === 'shield' || type === 'youth'}
            <div class="colorBoxShort" style="background-color: #DF2120;"></div>
            <div class="colorBox" style="background-color: #DF2120;"></div>
            <div class="colorBox" style="background-color: #F2800D;"></div>
            <div class="colorBox" style="background-color: #66CCAA;"></div>
            <div class="colorBox" style="background-color: #66CCAA;"></div>
            <div class="colorBox" style="background-color: #13A195;"></div>
            <div class="colorBox" style="background-color: #015566;"></div>
            <div class="colorBoxShort" style="background-color: #015566;"></div>
        {:else}
            <div class="colorBoxShort" style="background-color: #015566;"></div>
            <div class="colorBox" style="background-color: #015566;"></div>
            <div class="colorBox" style="background-color: #13A195;"></div>
            <div class="colorBox" style="background-color: #66CCAA;"></div>
            <div class="colorBox" style="background-color: #66CCAA;"></div>
            <div class="colorBox" style="background-color: #F2800D;"></div>
            <div class="colorBox" style="background-color: #DF2120;"></div>
            <div class="colorBoxShort" style="background-color: #DF2120;"></div>
        {/if}

        <div class="slider" style="left: {calculateSliderPosition(min, mid, max, result)}%;">
            <p style="font-size: 1rem;">
                {getTranslation(lang, 'YOUR_RESULT')}
            </p>
            <p style="font-size: 1.2rem;">
                <b>{result}</b>
            </p>
            <svg class="rotateImg" width="14%" height="14%" viewBox="0 0 42 37" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0718 4C17.151 -1.33334 24.849 -1.33333 27.9282 4.00001L40.0525 25C43.1317 30.3333 39.2827 37 33.1243 37L8.87563 37C2.71722 37 -1.13177 30.3333 1.94743 25L14.0718 4Z"
                      fill="#09371F"/>
            </svg>
        </div>

        <div class="bottom-triangle" style="left: 9.5%;">
            <svg width="30%" height="30%" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0718 4C17.151 -1.33334 24.849 -1.33333 27.9282 4.00001L40.0525 25C43.1317 30.3333 39.2827 37 33.1243 37L8.87563 37C2.71722 37 -1.13177 30.3333 1.94743 25L14.0718 4Z"
                      fill="#6B8779"/>
            </svg>
            <div><b>{min}</b></div>
        </div>

        <div class="bottom-triangle" style="left: 50%;">
            <svg width="30%" height="30%" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0718 4C17.151 -1.33334 24.849 -1.33333 27.9282 4.00001L40.0525 25C43.1317 30.3333 39.2827 37 33.1243 37L8.87563 37C2.71722 37 -1.13177 30.3333 1.94743 25L14.0718 4Z"
                      fill="#6B8779"/>
            </svg>
            <div><b>{mid}</b></div>
        </div>

        <div class="bottom-triangle" style="left: 90.5%;">
            <svg width="30%" height="30%" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0718 4C17.151 -1.33334 24.849 -1.33333 27.9282 4.00001L40.0525 25C43.1317 30.3333 39.2827 37 33.1243 37L8.87563 37C2.71722 37 -1.13177 30.3333 1.94743 25L14.0718 4Z"
                      fill="#6B8779"/>
            </svg>
            <div><b>{max}</b></div>
        </div>

        <div class="message">
            <p>{getTranslation(lang, 'RANKS_YOU')}</p>
            <div class="colored-percentile"
                 style="background-color: {type === 'shield' || type === 'youth' ? getColorRedToBlue(min, mid, max, result) : getColorBlueToRed(min, mid, max, result)};">
                <b>{percentile}<sup>{suffix(percentile)}</sup> {getTranslation(lang, 'PERCENTILE')}</b>
            </div>
            <p>*</p>
        </div>
    </div>
{/if}

<style>
    .parent {
        display: flex;
        width: 100%;
        height: 10px;
        position: relative;
        font-family: 'Sen', 'Noto Sans JP', sans-serif;
    }

    .slider {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        transform: translate(-50%, -110%);
        width: 24%;
        max-height: 70px;
    }

    .bottom-triangle {
        position: absolute;
        top: 100%;
        transform: translate(-50%, 2%);
        width: 8%;
        max-height: 36px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #6B8779;
    }

    .message {
        position: absolute;
        top: 4rem;
        width: 70%;
        height: 3rem;
        transform: translate(-50%, 0%);
        left: 50%;
        max-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        gap: .25rem;
        color: #36614B;
    }

    .colored-percentile {
        height: 90%;
        width: 28%;
        min-width: 145px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
    }

    .colorBox {
        width: 14%;
        border-radius: 24px;
        margin-left: 0.2%;
        margin-right: 0.2%;
    }

    .colorBoxShort {
        width: 10%;
        border-radius: 24px;
    }

    .rotateImg {
        transform: rotate(180deg);
    }

    p {
        margin: 0;
    }
</style>