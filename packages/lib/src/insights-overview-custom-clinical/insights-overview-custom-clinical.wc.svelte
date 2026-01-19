<svelte:options customElement={{ tag: 'ga-insights-overview-custom-clinical', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';

  export let service: Service = window.GaReportService;
  export let type: string;

  let reportData: any;

  let gender = '';

  let riskCounter = 0;
  let hyperCounter = 0;
  let cvaCounter = 0;
  let cvaFCounter = 0;
  let atheroCounter = 0;
  let coronaryCounter = 0;
  let diabetesCounter = 0;
  let dyslipidemiaCounter = 0;
  let arthritisCounter = 0;
  let colitisCounter = 0;
  let crohnCounter = 0;
  let sleCounter = 0;
  let copdCounter = 0;

  let bPercentile = 0; // Bpercentile
  let sPercentile = 0; // Spercentile
  let g0Percentile = 0; // g0percentile
  let g1Percentile = 0; // g1percentile
  let g2Percentile = 0; // g2percentile
  let p22Percentile = 0; // p22percentile
  let p18Percentile = 0; // p18percentile
  let p23Percentile = 0; // p23percentile
  let p26Percentile = 0; // p26percentile

  let show = false;

  let badAreas = [];
  let orangeAreas = [];
  let greenAreas = [];

  function calculateCardiovascular() {
    if (gender === 'F') {if (cvaFCounter === 0) {greenAreas.push({label: 'MI & CVA', color: 'green'})} else if (cvaFCounter === 1) {badAreas.push({label: 'MI & CVA', color: 'red'});}} else {if (cvaCounter < 3) {greenAreas.push({label: 'MI & CVA', color: 'green'})} else if (cvaCounter === 3) {orangeAreas.push({label: 'MI & CVA', color: 'orange'});} else if (cvaCounter === 4) {badAreas.push({label: 'MI & CVA', color: 'red'});}}
    if (gender === 'F') {if (atheroCounter < 3) {greenAreas.push({label: 'Atherosclerosis', color: 'green'})} else if (atheroCounter === 5) {badAreas.push({label: 'Atherosclerosis', color: 'red'});} else {orangeAreas.push({label: 'Atherosclerosis', color: 'orange'});}}
    if (gender === 'F') {if (coronaryCounter === 0) {greenAreas.push({label: 'Coronary artery disease', color: 'green'})} else if (coronaryCounter === 1) {orangeAreas.push({label: 'Coronary artery disease', color: 'orange'});} else if (coronaryCounter === 2) {badAreas.push({label: 'Coronary artery disease', color: 'red'});}}

    if (riskCounter === 0 && hyperCounter < 2) {
      greenAreas.push({label: 'Hypertension', color: 'green'})
    } else {
      badAreas.push({label: 'Hypertension', color: 'red'});
    }
  }

  function calculateMetabolic() {
    if (diabetesCounter < 3) {greenAreas.push({label: 'Type 2 diabetes', color: 'green'})} else if (diabetesCounter === 5) {badAreas.push({label: 'Type 2 diabetes', color: 'red'});} else {orangeAreas.push({label: 'Type 2 diabetes', color: 'orange'});}
    if (dyslipidemiaCounter < 3) {greenAreas.push({label: 'Dyslipidemia', color: 'green'})} else if (dyslipidemiaCounter === 3) {orangeAreas.push({label: 'Dyslipidemia', color: 'orange'});} else {badAreas.push({label: 'Dyslipidemia', color: 'red'});}
  }

  function calculateAutoimmunity() {
    if (arthritisCounter < 3) {greenAreas.push({label: 'Rheumatoid arthritis', color: 'green'})} else if (arthritisCounter === 3) {orangeAreas.push({label: 'Rheumatoid arthritis', color: 'orange'});} else {badAreas.push({label: 'Rheumatoid arthritis', color: 'red'});}
    if (colitisCounter < 3) {greenAreas.push({label: 'Ulcerative colitis', color: 'green'})} else if (colitisCounter === 3) {orangeAreas.push({label: 'Ulcerative colitis', color: 'orange'});} else {badAreas.push({label: 'Ulcerative colitis', color: 'red'});}
    if (crohnCounter < 3) {greenAreas.push({label: "Crohn's disease", color: 'green'})} else if (crohnCounter === 5) {badAreas.push({label: "Crohn's disease", color: 'red'});} else {orangeAreas.push({label: "Crohn's disease", color: 'orange'});}
    if (sleCounter < 3) {greenAreas.push({label: 'SLE', color: 'green'})} else if (sleCounter === 3) {orangeAreas.push({label: 'SLE', color: 'orange'});} else {badAreas.push({label: 'SLE', color: 'red'});}
  }

  function calculateResp() {
    if (copdCounter === 0) {greenAreas.push({label: 'COPD', color: 'green'})} else if (copdCounter === 1) {orangeAreas.push({label: 'COPD', color: 'orange'});} else {badAreas.push({label: 'COPD', color: 'red'});}
  }

  onMount(async () => {
    reportData = await service.getReport();
    gender = reportData.sex;

    bPercentile = Number(reportData.Bpercentile);
    sPercentile = Number(reportData.Spercentile);
    g0Percentile = Number(reportData.G0percentile);
    g1Percentile = Number(reportData.G1percentile);
    g2Percentile = Number(reportData.G2percentile);
    p18Percentile = Number(reportData.P18percentile);
    p22Percentile = Number(reportData.P22percentile);
    p23Percentile = Number(reportData.P23percentile);
    p26Percentile = Number(reportData.P26percentile);

    if (bPercentile >= 67) {
      riskCounter++;
      cvaCounter++;
      atheroCounter++;
      diabetesCounter++;
      dyslipidemiaCounter++;
      crohnCounter++;
      copdCounter++;
    }

    if (bPercentile <= 33) {
      colitisCounter++;
    }

    if (sPercentile <= 33) {
      cvaCounter++;
      atheroCounter++;
      coronaryCounter++;
      diabetesCounter++;
      dyslipidemiaCounter++;
      arthritisCounter++;
      crohnCounter++;
    }

    if (g0Percentile >= 67) {
      hyperCounter++;
      cvaCounter++;
      atheroCounter++;
      coronaryCounter++;
      diabetesCounter++;
      dyslipidemiaCounter++;
      colitisCounter++;
      crohnCounter++;
      arthritisCounter++;
    }

    if (g1Percentile <= 33) {
      hyperCounter++;
      atheroCounter++;
      diabetesCounter++;
      arthritisCounter++;
      colitisCounter++;
      crohnCounter++;
      copdCounter++;
    }

    if (g2Percentile <= 33) {
      hyperCounter++;
      cvaCounter++;
      atheroCounter++;
      diabetesCounter++;
      dyslipidemiaCounter++;
      arthritisCounter++;
      colitisCounter++;
      crohnCounter++;
    }

    if (p18Percentile >= 67) {
      sleCounter++;
    }

    if (p22Percentile <= 33) {
      sleCounter++;
    }

    if (p23Percentile >= 67) {
      sleCounter++;
    }

    if (p26Percentile <= 33) {
      sleCounter++;
    }

    if (p22Percentile <= 33 && gender === 'F') {
      cvaFCounter++;
    }

    calculateCardiovascular();
    calculateMetabolic();
    calculateAutoimmunity();
    calculateResp();

    show = true;
  });
</script>

{#if show}
  <div class="main">
    {#if badAreas.length}
      <div class="causes" style="border-top: 1px solid #09341F33; border-bottom: {greenAreas.length || orangeAreas.length ? 'none' : '1px solid #09341F33'}">
        <span style="font-size: 0.58rem; min-width: 82px;">High overlap</span>
        <div style="display: flex; flex-wrap: wrap; gap: 0.2rem;">
          {#each badAreas as area}
            <div class="cause-chip bad">
              <div class="cause-chip-dot"></div>
              {area.label}
            </div>
          {/each}
        </div>
      </div>
    {/if}
    {#if orangeAreas.length}
      <div class="causes" style="border-top: 1px solid #09341F33; border-bottom: {greenAreas.length ? 'none' : '1px solid #09341F33'}">
        <div style="font-size: 0.58rem; min-width: 82px;">Moderate overlap</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.2rem;">
          {#each orangeAreas as oArea}
            <div class="cause-chip slightly-bad">
              <div class="cause-chip-dot"></div>
              {oArea.label}
            </div>
          {/each}
        </div>
      </div>
    {/if}
    {#if greenAreas.length}
      <div class="causes" style="border-top: 1px solid #09341F33; border-bottom: 1px solid #09341F33;">
        <span style="font-size: 0.58rem; min-width: 82px;">Low overlap</span>
        <div style="display: flex; flex-wrap: wrap; gap: 0.2rem;">
          {#each greenAreas as gArea}
            <div class="cause-chip good">
              <div class="cause-chip-dot"></div>
              {gArea.label}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .causes {
        display: flex;
        flex: 1;
        gap: 1rem;
        padding: 0.5rem;
        align-items: center;
    }
    .cause-chip {
        display: flex;
        align-items: center;
        height: 1rem;
        gap: 0.15rem;
        padding: 0 .5rem;
        font-size: 6px;
        font-weight: bold;
        border-radius: 999px;
    }
    .cause-chip-dot {
        width: 5px;
        height: 5px;
        border-radius: 999px;
    }
    .cause-chip.good  {
        background-color: rgba(17,153,153,.1);
        color: #119999;
    }
    .cause-chip.good .cause-chip-dot  {
        background-color: #119999;
    }
    .cause-chip.slightly-bad .cause-chip-dot  {
        background-color: #FFAA00;
    }
    .cause-chip.bad .cause-chip-dot  {
        background-color: #DD2222;
    }
    .cause-chip.slightly-bad {
        background-color: #FFAA001A;
        color: #FFAA00;
    }
    .cause-chip.bad {
        background-color: rgba(221,34,34,.1);
        color: #DD2222;
    }
    .cause-chip.good {
        background-color: rgba(17,153,153,.1);
        color: #119999;
    }
    .cause-chip.slightly-bad {
        background-color: #FFAA001A;
        color: #FFAA00;
    }
    .cause-chip.bad {
        background-color: rgba(221,34,34,.1);
        color: #DD2222;
    }
</style>