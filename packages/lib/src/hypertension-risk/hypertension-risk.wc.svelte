<svelte:options customElement={{ tag: 'ga-hypertension-risk', shadow: 'open' }} />

<script lang="ts">
    import type { Language } from '../shared/interfaces/language.interface';
    import { onMount } from 'svelte';
    import {
        getPadding,
        getMargin,
        getBorderRadius,
        moveDiv,
        suffix
    } from '../shared/functions/helpers';
    import { Service } from '../shared/utils/service';

    export let language: Language;
    export let report: string;
    export let type: string;
    export let service: Service = window.GaReportService;

    let reportData: any;

    let min1 = 0; // Bxmin
    let max1 = 0; // Bxmax
    let res1 = 0; // Byourscore
    let perc1 = 0; // Bpercentile

    let overlap = false;
    let someOverlap = false;
    let noOverlap = false;
    let showSummary = false;
    let counter = '';

    function getColor() {
        if (perc1 === 50) {
            return '#00AA44';
        }
        if (perc1 > 50) {
            return '#CC0000';
        }

        if (perc1 < 50) {
            return '#00AA44';
        }
        return '#00AA44';
    }

    function getBackground() {
        if (perc1 === 50) {
            return 'rgba(0,170,68,0.15)';
        }
        if (perc1 > 50) {
            return 'rgba(204,0,0,0.15)';
        }
        if (perc1 < 50) {
            return 'rgba(0,170,68,0.15)';
        }
        return 'rgba(0,170,68,0.15)';
    }

    function getBodyBackground() {
        if (perc1 === 50) {
            return 'rgba(0,170,68,0.05)';
        }
        if (perc1 > 50) {
            return 'rgba(204,0,0,0.05)';
        }
        if (perc1 < 50) {
            return 'rgba(0,170,68,0.05)';
        }
        return 'rgba(0,170,68,0.05)';
    }

    function getWording() {
        if (perc1 === 50) {
            return 'no significant overlap';
        }
        if (perc1 > 50) {
            return 'some overlap';
        }

        if (perc1 < 50) {
            return 'no significant overlap';
        }

        return 'no significant overlap';
    }

    onMount(async () => {
        reportData = await service.getReport(report);

        min1 = Number(reportData.Bxmin);
        max1 = Number(reportData.Bxmax);
        res1 = Number(reportData.Byourscore);
        perc1 = Number(reportData.Bpercentile);

        if (perc1 === 50) {
            counter = '0/1';
            noOverlap = true;
            showSummary = true;
            return;
        }
        if (perc1 > 50) {
            counter = '1/1';
            overlap = true;
            showSummary = true;
            return;
        }

        if (perc1 < 50) {
            counter = '0/1';
            noOverlap = true;
            showSummary = true;
            return;
        }
    });
</script>

<head>
    <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,1,0"
    />
</head>

{#if type === 'header'}
    <div class="header">
        {#if overlap}
            <div style="padding-right: 10px;">
                <b>{counter}</b>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            ><path
                    fill="#F2590D"
                    d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
            /></svg
            >
            &nbsp; Some overlap
        {/if}
        {#if someOverlap}
            <div style="padding-right: 10px;">
                <b>{counter}</b>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            ><path
                    fill="#FFAA00"
                    d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
            /></svg
            >
            &nbsp; Minor overlap
        {/if}
        {#if noOverlap}
            <div style="padding-right: 10px;">
                <b>{counter}</b>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            ><path
                    fill="#12A195"
                    d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
            /></svg
            >
            &nbsp; No significant overlap
        {/if}
    </div>
{:else if type === 'summary'}
    {#if showSummary}
        {#if noOverlap}
            <div class="summaryMain">
                <div
                        class="summaryHeader"
                        style="border-radius: 8px; background-color: rgba(0,170,68,0.15); border: 2px solid #00AA44;"
                >
                    <div style="width: 10%; padding-left: 1.5rem; padding-right: 1rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"
                        ><path
                                fill="#00AA44"
                                d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                        /></svg
                        >
                    </div>
                    <div style="width: 90%;">
                        There is <b>no significant overlap</b> of glycan indexes between <br /> your patient and
                        increased risk of hypertension <br /> patients.
                    </div>
                </div>
                <div class="summaryBody" style="opacity: 0.35;">
                    <div style="font-size: 1.2rem; padding-bottom: 1rem;">Symptoms to check for:</div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Elevated blood pressure readings:</b> Consistently higher-than-normal blood
                        <br /> pressure readings are a key indicator. Regular monitoring helps in early <br />
                        detection and management.
                    </div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Family history of hypertension:</b> A strong family history indicates a higher
                        <br />risk. It's essential to be aware of family medical history for early intervention.
                    </div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Lifestyle factors:</b> Poor lifestyle choices, such as a high-sodium diet, <br />
                        sedentary lifestyle, and excessive alcohol consumption, are critical <br />
                        symptoms to be addressed.
                    </div>
                    <div style="font-size: 1.2rem; padding-top: 0.4rem;padding-bottom: 1rem;">
                        Possible follow-up tests:
                    </div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Blood pressure monitoring:</b> Regular monitoring of blood pressure levels is
                        <br /> crucial for assessing the risk and initiating preventive measures.
                    </div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Blood tests:</b> These tests check for high cholesterol levels, diabetes, and
                        <br /> kidney function, which are related to hypertension risk.
                    </div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Electrocardiogram (EKG):</b> This test checks for heart abnormalities that
                        <br /> may be associated with an increased risk of hypertension.
                    </div>
                </div>
            </div>
        {:else}
            <div class="summaryMain" style="border: 2px solid {getColor()};">
                <div
                        class="summaryHeader"
                        style="border-radius: 8px 8px 0 0; background-color: {getBackground()}; border-bottom: 2px solid {getColor()};"
                >
                    <div style="width: 10%; padding-left: 1.5rem; padding-right: 1rem;">
                        {#if overlap}
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"
                            ><path
                                    fill="#CC0000"
                                    d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
                            /></svg
                            >
                        {/if}
                        {#if someOverlap}
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"
                            ><path
                                    fill="#EE9933"
                                    d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                            /></svg
                            >
                        {/if}
                    </div>
                    <div style="width: 90%; font-size: 0.8rem;">
                        There is <b>{getWording()}</b> of glycan indexes between <br /> your patient and
                        increased risk of hypertension patients.
                    </div>
                </div>
                <div class="summaryBody" style="background-color: {getBodyBackground()};">
                    <div style="font-size: 1.2rem; padding-bottom: 1rem;">Symptoms to check for:</div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Elevated blood pressure readings:</b> Consistently higher-than-normal blood
                        <br /> pressure readings are a key indicator. Regular monitoring helps in early <br />
                        detection and management.
                    </div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Family history of hypertension:</b> A strong family history indicates a higher
                        <br />risk. It's essential to be aware of family medical history for early intervention.
                    </div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Lifestyle factors:</b> Poor lifestyle choices, such as a high-sodium diet, <br />
                        sedentary lifestyle, and excessive alcohol consumption, are critical <br />
                        symptoms to be addressed.
                    </div>
                    <div style="font-size: 1.2rem; padding-top: 0.4rem;padding-bottom: 1rem;">
                        Possible follow-up tests:
                    </div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Blood pressure monitoring:</b> Regular monitoring of blood pressure levels is
                        <br /> crucial for assessing the risk and initiating preventive measures.
                    </div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Blood tests:</b> These tests check for high cholesterol levels, diabetes, and
                        <br /> kidney function, which are related to hypertension risk.
                    </div>
                    <div style="font-size: 0.7rem; padding-bottom: 0.4rem;">
                        <b>Electrocardiogram (EKG):</b> These tests can identify areas of
                        <br />
                        damage and help in diagnosis and management.
                    </div>
                </div>
            </div>
        {/if}
    {/if}
{:else}
    <div class="main" style="height: 180px;">
        <div class="row" style="height: 30%; padding-bottom: 1rem;">
            <div class="label" style="font-size: 0.8rem;">Glycan<br /><b>Lifestyle</b></div>
            <div class="content">
                <div class="min"><b>{min1}</b></div>
                <div class="max"><b>{max1}</b></div>
                <div class="middleParent">
                    <div class="xAxis"></div>
                    <div class="yAxis"></div>
                    <div class="diseaseArea" style="border-radius: 0 6px 6px 0; left: 50.3%;"></div>
                    <div
                            class="result"
                            style="padding: {getPadding(perc1)}; margin: {getMargin(
              perc1
            )}; border-radius: {getBorderRadius(perc1)}"
                    >
                        <div class="resultDisplay" style="right: {moveDiv(perc1)};">
                            <div class="message">
                                <b>{res1} ({perc1}<sup>{suffix(perc1)}</sup> percentile)</b>
                            </div>
                            <div class="triangle-down"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="lastRow">
            <div class="dot1"></div>
            <div style="font-size: 0.8rem;">Increased risk of hypertension</div>
            <div class="dot2"></div>
            <div style="font-size: 0.8rem;">Your patient</div>
        </div>
    </div>
{/if}

<style>
    .main {
        width: 450px;
        background-color: #f0f6f5;
        border: 2px solid #c8dbd0;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .summaryMain {
        width: 500px;
        height: 540px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
    }

    .summaryHeader {
        width: 100%;
        height: 30%;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
    }

    .summaryBody {
        width: 95%;
        height: 100%;
        padding: 1.5rem 0 0 1.5rem;
    }
    .row {
        width: 100%;
        display: flex;
    }

    .label {
        width: 14%;
        height: 100%;
        margin-left: 1.5rem;
        line-height: 0.9rem;
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
    }

    .content {
        width: 86%;
        height: 100%;
        position: relative;
    }

    .min {
        position: absolute;
        top: 34%;
        left: 1.6%;
        font-size: 0.6rem;
        color: #6b8678;
    }

    .middleParent {
        position: absolute;
        width: 76%;
        height: 80%;
        left: 10%;
        top: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .xAxis {
        position: absolute;
        left: 0;
        top: 48%;
        width: 100%;
        height: 0.1rem;
        background-color: #08341f;
        border-radius: 10px;
        z-index: 9999;
        max-height: 1px;
    }

    .diseaseArea {
        position: absolute;
        width: 46%;
        top: 10%;
        height: 80%;
        background-color: #c8dbd0;
    }

    .result {
        width: 1.5%;
        height: 24%;
        background-color: #33664d;
        z-index: 9998;
        position: relative;
    }

    .result2 {
        width: 1.5%;
        height: 24%;
        background-color: #33664d;
        z-index: 9998;
        position: relative;
    }

    .result3 {
        width: 1.5%;
        height: 24%;
        background-color: #33664d;
        z-index: 9998;
        position: relative;
    }

    .yAxis {
        position: absolute;
        left: 49.72%;
        width: 0.1rem;
        height: 88%;
        background-color: #08341f;
        border-radius: 10px;
    }

    .max {
        position: absolute;
        top: 34%;
        right: 5.5%;
        font-size: 0.6rem;
        color: #6b8678;
    }

    .lastRow {
        width: 100%;
        height: 11%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 12px;
    }

    .dot1 {
        height: 10px;
        width: 10px;
        border-radius: 99px;
        background-color: #c8dbd0;
        border: 1px solid black;
        margin-right: 6px;
    }

    .dot2 {
        height: 10px;
        width: 10px;
        border-radius: 99px;
        background-color: #33664d;
        border: 1px solid black;
        margin: 0 6px 0 36px;
    }

    .resultDisplay {
        position: absolute;
        bottom: 80%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .message {
        color: #33664d;
        z-index: 99999;
        min-width: 100px;
        font-size: 0.48rem;
        margin-bottom: -8px;
    }

    .triangle-down {
        margin-top: 0.6rem;
        margin-bottom: 0.4rem;
        width: 0;
        height: 0;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-top: 6px solid #33664d;
    }

    .header {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>
