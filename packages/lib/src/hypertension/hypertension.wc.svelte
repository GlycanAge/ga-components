<svelte:options customElement={{ tag: 'ga-hypertension', shadow: 'open' }} />

<script lang="ts">
  import { onMount } from 'svelte';
  import { Service } from '../shared/utils/service';
  import Arrow from '../shared/components/Arrow.svelte';

  export let report: string;
  export let type: string;
  export let subtype: string;
  export let service: Service = window.GaReportService;

  let reportData: any;

  let overlap = false;
  let someOverlap = false;
  let showSummary = false;
  let counter = '';
  let message = '';

  // mature
  let perc1 = 0; // G0percentile

  // median
  let perc2 = 0; // G1percentile

  // youth
  let perc3 = 0; // G2percentile
  let percentile = 0;

  onMount(async () => {
    reportData = await service.getReport(report);

    switch (subtype) {
      case 'mature':
        percentile = Number(reportData.G0percentile);
        break;
      case 'median':
        percentile = Number(reportData.G1percentile);
        break;
      case 'youth':
        percentile = Number(reportData.G2percentile);
        break;
    }

    perc1 = Number(reportData.G0percentile);
    perc2 = Number(reportData.G1percentile);
    perc3 = Number(reportData.G2percentile);

    if (percentile < 32) {
      message = 'Lower than average';
    }
    if (percentile >= 32 && percentile <= 68) {
      message = 'Around average';
    }
    if (percentile > 68) {
      message = 'Higher than average';
    }

    if (perc1 > 68 && perc2 < 32 && perc3 < 32) {
      counter = '3/3';
      overlap = true;
      showSummary = true;
      return;
    }

    if (perc1 > 68 || perc2 < 32 || perc3 < 32) {
      if (
              (perc1 > 68 && perc2 < 32) ||
              (perc2 < 32 && perc3 < 32) ||
              (perc1 > 68 && perc3 < 32)
      ) {
        counter = '2/3';
        someOverlap = true;
        showSummary = true;
        return;
      }
      counter = '1/3';
      showSummary = true;
      return;
    }

    counter = '0/3';
    showSummary = true;
    return;
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
    {#if overlap || someOverlap}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
              fill="#F2590D"
              d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
              fill="#12A195"
              d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
    {/if}
    &nbsp;&nbsp;{overlap ? 'Major overlap' : someOverlap ? 'Some overlap' : 'No significant overlap'}
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
        <b style="color: {overlap || someOverlap ? '#F2590D' : '#12A195'}">{overlap ? 'Major overlap' : someOverlap ? 'Some overlap' : 'No significant overlap'}</b> of glycan indexes between <br /> your patient and this condition.
      </div>
    </div>
    <div class="summaryBody">
      <h5>Signs and symptoms</h5>
      <ul style="font-size: 0.8rem;">
        <li>Persistent blood pressure over 140/90 mmHg</li>
        <li>Headaches and dizziness</li>
        <li>Blurred vision or visual disturbances</li>
      </ul>

      <h5>Possible follow-up</h5>
      <ul style="font-size: 0.8rem;">
        <li>Regular blood pressure monitoring</li>
        <li>24-hour ambulatory blood pressure monitoring</li>
        <li>Kidney function tests</li>
      </ul>
      <h5>Related research papers</h5>
      <a style="color: #E66439;" href="https://pubmed.ncbi.nlm.nih.gov/27124023/">The Association Between Glycosylation of Immunoglobulin G and Hypertension: A Multiple Ethnic Cross-Sectional Study</a>
      <p style="margin: 0; font-size: 0.8rem; color: #09341FCC;">In an extensive study with 4757 participants, including 913 from the Chinese Han Beijing population, 985 from Croatian Korčula, 896 from Croatian Vis, and 1963 from Scottish Orkney, researchers investigated changes in IgG glycans associated with prehypertension and hypertension. The demographic composition of the study was approximately 40% female and 60% male participants. Among hypertension patients, there was a noted decrease in G2 and S, alongside an increase in G0.</p>
    </div>
  </div>
{:else}
  {#if subtype === 'mature'}
    <div class="main">
      <div class="label" style="font-size: 0.8rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  fill={percentile <= 68 ? '#12A195' : '#F2590D'} d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
        <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
          <div>Glycan <b>Mature (G0)</b></div>
          <div>{message}</div>
        </div>
      </div>
      <div style="width: 70%; display: flex; align-items: center;">
        <Arrow type="right" {percentile} />
      </div>
    </div>
  {/if}
  {#if subtype === 'median'}
    <div class="main">
      <div class="label" style="font-size: 0.8rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  fill={percentile >= 32 ? '#12A195' : '#F2590D'} d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
        <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
          <div>Glycan <b>Median (G1)</b></div>
          <div>{message}</div>
        </div>
      </div>
      <div style="width: 70%; display: flex; align-items: center;">
        <Arrow type="left" {percentile} />
      </div>
    </div>
  {/if}
  {#if subtype === 'youth'}
    <div class="main">
      <div class="label" style="font-size: 0.8rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  fill={percentile >= 32 ? '#12A195' : '#F2590D'} d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
        <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
          <div>Glycan <b>Youth (G2)</b></div>
          <div>{message}</div>
        </div>
      </div>
      <div style="width: 70%; display: flex; align-items: center;">
        <Arrow type="left" {percentile} />
      </div>
    </div>
  {/if}
{/if}

<style>
  .summaryMain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #09341FCC;
  }

  .summaryHeader {
    width: 100%;
    height: 16%;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
  }

  .summaryBody {
    width: 80%;
    height: 100%;
    margin: auto;
    border-top: 2px solid #C9DBD2;
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

