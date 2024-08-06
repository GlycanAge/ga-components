<svelte:options customElement={{ tag: 'ga-dyslipidemia', shadow: 'open' }} />

<script lang="ts">
  import { onMount } from 'svelte';
  import { Service } from '../shared/utils/service';
  import Arrow from '../shared/components/Arrow.svelte';
  import {getHeaderMessage, getTranslation} from '../shared/functions/helpers';

  export let lang: string;
  export let report: string;
  export let type: string;
  export let subtype: string;
  export let service: Service = window.GaReportService;

  let subtypes = [
    {
      name: 'mature',
      csvName: 'G0percentile',
    },
    {
      name: 'youth',
      csvName: 'G2percentile',
    },
    {
      name: 'shield',
      csvName: 'Spercentile',
    },
    {
      name: 'lifestyle',
      csvName: 'Bpercentile',
    }
  ]

  let reportData: any;

  let overlap = false;
  let someOverlap = false;
  let showSummary = false;
  let showHeader = false;

  let message = '';
  let perc1 = 0; // G0percentile, mature
  let perc2 = 0; // G2percentile, youth
  let perc3 = 0; // Spercentile, shield
  let perc4 = 0; // Bpercentile, lifestyle
  let percentile = 0;
  let counter: number = 0;

  function countOverlaps() {
    if (perc1 > 68) {
      counter++;
    }
    if (perc2 < 32) {
      counter++;
    }
    if (perc3 < 32) {
      counter++;
    }
    if (perc4 > 68) {
      counter++;
    }
  }

  const details = subtypes.find(x => x.name === subtype);

  onMount(async () => {
    reportData = await service.getReport(report);

    if (details) {
      percentile = Number(reportData[details.csvName]);
      message = getHeaderMessage(percentile);
    }

    perc1 = Number(reportData.G0percentile);
    perc2 = Number(reportData.G2percentile);
    perc3 = Number(reportData.Spercentile);
    perc4 = Number(reportData.Bpercentile);

    countOverlaps();

    if (counter === 4) {
      overlap = true;
    }

    if (counter === 3) {
      someOverlap = true;
    }

    showHeader = true;
    showSummary = true;
    return;
  });
</script>

<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,1,0"/>
</head>

{#if type === 'header' && showHeader}
  <div class="header">
    <div style="padding-right: 10px;">
      <b>{counter}/4</b>
    </div>
    {#if overlap || someOverlap}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
              fill={someOverlap ? '#FFAA00' : '#F2590D'}
              d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
              fill="#12A195"
              d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
    {/if}
    &nbsp;&nbsp;
    {#if overlap}
      {getTranslation(lang, 'SOME_OVERLAP')}
    {:else if someOverlap}
      {getTranslation(lang, 'MINOR_OVERLAP')}
    {:else}
      {getTranslation(lang, 'NO_OVERLAP')}
    {/if}
  </div>
{:else if type === 'summary' && showSummary}
  <div class="summaryMain">
    <div class="summaryHeader">
      <div style="transform: translate(-50%);">
        {#if overlap || someOverlap}
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#F2590D" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#12A195" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
        {/if}
      </div>
      <div>
        <b style="color: {overlap ? '#F2590D' : '#12A195'}">
          {#if overlap}
            {getTranslation(lang, 'SOME_OVERLAP_LONG')}
          {:else if someOverlap}
            {getTranslation(lang, 'MINOR_OVERLAP_LONG')}
          {:else}
            {getTranslation(lang, 'NO_OVERLAP_LONG')}
          {/if}
        </b> {getTranslation(lang, 'OVERLAP_TEXT')}
      </div>
    </div>
    <hr>
    <div class="summaryBody">
      <h5>{getTranslation(lang, 'SYMPTOMS')}</h5>
      <ul>
        <li>{getTranslation(lang, 'SYMPTOM_ONE')}</li>
      </ul>

      <h5>{getTranslation(lang,'POSSIBLE_FOLLOW_UP')}</h5>
      <ul>
        <li>{getTranslation(lang,'POSSIBLE_FOLLOW_UP_FIFTEEN')}</li>
        <li>{getTranslation(lang,'POSSIBLE_FOLLOW_UP_SIXTEEN')}</li>
        <li>{getTranslation(lang,'POSSIBLE_FOLLOW_UP_FIVE')}</li>
      </ul>
      <h5>{getTranslation(lang,'RELATED_RESEARCH_PAPERS')}</h5>
      <a href="https://translational-medicine.biomedcentral.com/articles/10.1186/s12967-018-1616-2">The changes of immunoglobulin G N-glycosylation in blood lipids and dyslipidaemia</a>
      <p>In a study focusing on IgG glycome changes related to dyslipidemia, 598 participants (67% female participants) were selected from a larger observational cross-sectional study conducted in 2012, which initially involved 913 participants of Chinese Han ancestry from Beijing. The glycomic analysis revealed a decrease in G2 and S, coupled with an increase in G0 and B. A predictive model incorporating six specific glycan structures was developed from these findings, resulting in an AUC of 0.692.</p>
    </div>
  </div>
{:else}
  {#if subtype === 'mature'}
    <div class="main">
      <div class="label" style="font-size: 0.8rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  fill={percentile <= 68 ? '#12A195' : '#F2590D'} d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
        <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
          <div>{getTranslation(lang,'GLYCAN')} <b>Mature (G0)</b></div>
          <div>{message}</div>
        </div>
      </div>
      <div style="width: 70%; display: flex; align-items: center;">
        <Arrow type="right" {percentile} />
      </div>
    </div>
  {/if}
  {#if subtype === 'youth'}
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
  {#if subtype === 'shield'}
    <div class="main">
      <div class="label" style="font-size: 0.8rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  fill={percentile >= 32 ? '#12A195' : '#F2590D'} d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
        <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
          <div>{getTranslation(lang,'GLYCAN')} <b>Shield (S)</b></div>
          <div>{message}</div>
        </div>
      </div>
      <div style="width: 70%; display: flex; align-items: center;">
        <Arrow type="left" {percentile} />
      </div>
    </div>
  {/if}
  {#if subtype === 'lifestyle'}
    <div class="main">
      <div class="label" style="font-size: 0.8rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  fill={percentile <= 68 ? '#12A195' : '#F2590D'} d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
        <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
          <div>{getTranslation(lang,'GLYCAN')} <b>Lifestyle (B)</b></div>
          <div>{message}</div>
        </div>
      </div>
      <div style="width: 70%; display: flex; align-items: center;">
        <Arrow type="right" {percentile} />
      </div>
    </div>
  {/if}
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