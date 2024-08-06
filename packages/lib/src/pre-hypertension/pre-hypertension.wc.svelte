<svelte:options customElement={{ tag: 'ga-pre-hypertension', shadow: 'open' }} />

<script lang="ts">
    import { onMount } from 'svelte';
    import { Service } from '../shared/utils/service';
    import Arrow from '../shared/components/Arrow.svelte';
    import { getTranslation } from '../shared/functions/helpers';

    export let lang: string;
    export let report: string;
    export let type: string;
    export let service: Service = window.GaReportService;

    let reportData: any;

    let overlap = false;
    let showSummary = false;
    let counter = '';
    let message = '';
    let percentile = 0; // G2percentile

    onMount(async () => {
        reportData = await service.getReport(report);

        percentile = Number(reportData.G2percentile);

        if (percentile < 32) {
            counter = '1/1';
            message = getTranslation(lang, 'LOWER_THAN_AVERAGE');
            overlap = true;
            showSummary = true;
            return;
        }
        if (percentile >= 32 && percentile <= 68) {
            counter = '0/1';
            message = getTranslation(lang, 'AROUND_AVERAGE');
            showSummary = true;
            return;
        }
        if (percentile > 68) {
            counter = '0/1';
            message = getTranslation(lang, 'HIGHER_THAN_AVERAGE');
            showSummary = true;
            return;
        }
    });
</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,1,0"/>
</head>

{#if type === 'header'}
    <div class="header">
        <div style="padding-right: 10px;">
            <b>{counter}</b>
        </div>
        {#if overlap}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                    fill="#F2590D"
                    d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                    fill="#12A195"
                    d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
        {/if}
        &nbsp;&nbsp;
        {#if overlap}
            {getTranslation(lang, 'SOME_OVERLAP')}
        {:else}
            {getTranslation(lang, 'NO_OVERLAP')}
        {/if}
    </div>
{:else if type === 'summary' && showSummary}
    <div class="summaryMain">
        <div class="summaryHeader">
            <div style="transform: translate(-50%);">
                {#if overlap}
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#F2590D" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#12A195" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
                {/if}
            </div>
            <div>
                <b style="color: {overlap ? '#F2590D' : '#12A195'}">{percentile < 32 ? getTranslation(lang, 'SOME_OVERLAP_LONG') : getTranslation(lang, 'NO_OVERLAP_LONG')}</b> {getTranslation(lang, 'OVERLAP_TEXT')}
            </div>
        </div>
        <hr>
        <div class="summaryBody">
            <h5>{getTranslation(lang, 'SYMPTOMS')}</h5>
            <ul>
                <li>{getTranslation(lang,'SYMPTOM_ONE')}</li>
            </ul>

            <h5>{getTranslation(lang,'POSSIBLE_FOLLOW_UP')}</h5>
            <ul>
                <li>{getTranslation(lang,'POSSIBLE_FOLLOW_UP_ONE')}</li>
                <li>{getTranslation(lang,'POSSIBLE_FOLLOW_UP_TWO')}</li>
                <li>{getTranslation(lang,'POSSIBLE_FOLLOW_UP_THREE')}</li>
            </ul>
            <h5>{getTranslation(lang,'RELATED_RESEARCH_PAPERS')}</h5>
            <a href="https://pubmed.ncbi.nlm.nih.gov/27124023/">The Association Between Glycosylation of Immunoglobulin G and Hypertension: A Multiple Ethnic Cross-Sectional Study</a>
            <p>In an extensive study with 4757 participants, including 913 from the Chinese Han Beijing population, 985 from Croatian Korčula, 896 from Croatian Vis, and 1963 from Scottish Orkney, researchers investigated changes in IgG glycans associated with prehypertension and hypertension. The demographic composition of the study was approximately 40% female and 60% male participants. A notable observation was the decrease in G2 in the cohort with prehypertension.</p>
        </div>
    </div>
{:else}
    <div class="main">
        <div class="label" style="font-size: 0.8rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  fill={percentile >= 32 ? '#12A195' : '#F2590D'} d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
            <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
                <div>{getTranslation(lang,'GLYCAN')} <b>Youth (G2)</b></div>
                <div>{message}</div>
            </div>
        </div>
        <div style="width: 70%; display: flex; align-items: center;">
            <Arrow type="left" {percentile} />
        </div>
    </div>
{/if}

<style>
    .summaryMain {
        padding: 0 48px;
        height: 100%;
        display: flex;
        flex-direction: column;
        color: #09341FCC;
    }

    .summaryMain hr {
        border: 2px solid rgba(201, 219, 210, 1);
        border-radius: 2px;
        margin: 18px 0;
    }

    .summaryMain h5 {
        font-size: 16px;
        margin: 0;
    }

    .summaryMain ul {
        margin-top: 4px;
        margin-bottom: 24px;
        font-size: 14px;
        padding-left: 20px;
    }

    .summaryMain ul li:not(:first-child) {
        margin-top: 4px;
    }

    .summaryHeader {
        width: 100%;
        font-size: 16px;
        line-height: 115%;
        padding-top: 32px;
        display: flex;
        align-items: center;
        transform: translateX(-48px);
    }

    .summaryBody {
        width: 100%;
        height: 100%;
        margin: auto;
    }

    .summaryBody a {
        display: block;
        color: #E66439;
        font-weight: bold;
        font-size: 12px;
        margin-top: 12px;
    }

    .summaryBody svg {
        vertical-align: middle;
    }

    .summaryBody p {
        color: rgba(9, 52, 31, 0.80);
        font-size: 10px;
        margin-top: 6px;
    }

    .main {
        height: 100%;
        width: 100%;
        display: flex;
    }

    .label {
        width: 30%;
        display: flex;
        align-items: center;
    }

    .header {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>