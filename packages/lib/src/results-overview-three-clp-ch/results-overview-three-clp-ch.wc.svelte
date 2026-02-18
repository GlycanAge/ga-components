<svelte:options customElement={{ tag: 'ga-results-overview-three-clp-ch', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {
    calculateSliderPositionWithPercentile,
    getColorBlueToRedWithPercentile,
    getColorRedToBlueWithPercentile,
  } from '../shared/functions/helpers';
  import {Service} from '../shared/utils/service';

  export let type: string;
  export let service: Service = window.GaReportService;

  let reportData: any;

  let label = '';
  let description = '';
  let percentile = 0;
  let glycanage = 0;
  let chronoage = 0;

  let show = false;

  let subtypes = [
    {
      name: 'shield',
      label: 'Glycan Shield (S)',
      description: '抗炎指标'
    },
    {
      name: 'youth',
      label: 'Glycan Youth (G2)',
      description: '抗炎指标'
    },
    {
      name: 'mature',
      label: 'Glycan Mature (G0)',
      description: '促炎指标'
    },
    {
      name: 'median',
      label: 'Glycan Median (G1)',
      description: '辅助指标'
    },
    {
      name: 'lifestyle',
      label: 'Glycan Bisection (B)',
      description: '辅助指标'
    }
  ];

  const details = subtypes.find(x => x.name === type);

  onMount(async () => {
    reportData = await service.getReport();
    glycanage = Number(reportData.glycanage);
    chronoage = Number(reportData.chronologicalage);

    switch (type) {
      case 'shield':
        percentile = Number(reportData.Spercentile);
        break;
      case 'youth':
        percentile = Number(reportData.G2percentile);
        break;
      case 'mature':
        percentile = Number(reportData.G0percentile);
        break;
      case 'median':
        percentile = Number(reportData.G1percentile);
        break;
      case 'lifestyle':
        percentile = Number(reportData.Bpercentile);
    }

    if (percentile === 100 || percentile === 0) {
      percentile = percentile === 100 ? 99 : 1;
    }

    if (details) {
      label = details.label;
      description = details.description;
    }

    show = true;
  });
</script>

{#if show}
  <div class="main">
    <div class="label">
      <div class="label-container">
        <b style="font-size: 0.8rem;">{label}</b>
        <div style="font-size: 0.7rem;">
          {description}
        </div>
      </div>
    </div>
    <div class="graph-container">
      {#if type === 'mature' || type === 'lifestyle'}
        <div class="colorBoxShort" style="background-color: #015566;"></div>
        <div class="colorBox" style="background-color: #015566;"></div>
        <div class="colorBox" style="background-color: #13A195;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #F2800D;"></div>
        <div class="colorBox" style="background-color: #DF2120;"></div>
        <div class="colorBoxShort" style="background-color: #DF2120;"></div>
      {:else if type === 'shield' || type === 'youth' || type === 'median'}
        <div class="colorBoxShort" style="background-color: #DF2120;"></div>
        <div class="colorBox" style="background-color: #DF2120;"></div>
        <div class="colorBox" style="background-color: #F2800D;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #13A195;"></div>
        <div class="colorBox" style="background-color: #015566;"></div>
        <div class="colorBoxShort" style="background-color: #015566;"></div>
      {/if}

      <div class="slider" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
        <svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="24" rx="4" fill="{type === 'shield' || type === 'youth' || type === 'median' ? getColorRedToBlueWithPercentile(percentile) : getColorBlueToRedWithPercentile(percentile)}"/>
        </svg>
      </div>

      <div class="slider-number" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
        <b>第 {percentile} 百分位</b>
      </div>

      <div class="slider-triangle" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.8 6.93333C6.4 7.46667 5.6 7.46667 5.2 6.93333L0 8.07577e-07L12 0L6.8 6.93333Z" fill="{type === 'shield' || type === 'youth' || type === 'median' ? getColorRedToBlueWithPercentile(percentile) : getColorBlueToRedWithPercentile(percentile)}"/>
        </svg>
      </div>

      <div class="text-left" style="width: 34.7%;">
        {type === 'shield' || type === 'youth' || type === 'median' ? '次优' : '最佳'}
      </div>
      <div class="text-middle" style="width: 30%; left: 35%;">
        平均
      </div>
      <div class="text-right" style="width: 34.7%;">
        {type === 'shield' || type === 'youth' || type === 'median' ? '最佳' : '次优'}
      </div>
    </div>
  </div>
{/if}

<style>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
    }

    .label {
        width: 30%;
        display: flex;
        align-items: center;
        font-size: 0.8rem;
    }

    .label-container {
        display: flex;
        flex-direction: column;
    }

    .graph-container {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .colorBox {
        height: 5px;
        width: 14.3%;
        border-radius: 24px;
    }

    .colorBoxShort {
        height: 5px;
        width: 5%;
        border-radius: 24px;
    }

    .slider {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        transform: translate(-50%, -90%);
        width: 24%;
        max-height: 70px;
    }

    .slider-number {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        transform: translate(-50%, -120%);
        width: 24%;
        font-size: 0.71rem;
        color: white;
    }

    .slider-triangle {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        transform: translate(-50%, -90%);
        width: 24%;
    }

    .text-left {
        position: absolute;
        height: 15%;
        border-left: 1px solid #09341F33;
        border-right: 1px solid #09341F33;
        top: 62%;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        color: #09341F80;
    }

    .text-middle {
        position: absolute;
        height: 15%;
        top: 62%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        color: #09341F80;
    }

    .text-right {
        position: absolute;
        height: 15%;
        border-left: 1px solid #09341F33;
        border-right: 1px solid #09341F33;
        top: 62%;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        color: #09341F80;
    }
</style>