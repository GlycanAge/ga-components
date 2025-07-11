<svelte:options customElement={{ tag: 'ga-results-overview-three', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {
    calculateSliderPositionWithPercentile,
    getColorBlueToRedWithPercentile,
    getColorMedianWithPercentileV3,
    getColorRedToBlueWithPercentile,
    getTranslation, suffix
  } from '../shared/functions/helpers';
  import {Service} from '../shared/utils/service';

  export let type: string;
  export let lang: string;
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
      label: 'GLYCAN_SHIELD',
      description: 'ANTI_INFLAMMATORY_INDEX'
    },
    {
      name: 'youth',
      label: 'GLYCAN_YOUTH',
      description: 'ANTI_INFLAMMATORY_INDEX'
    },
    {
      name: 'mature',
      label: 'GLYCAN_MATURE',
      description: 'PRO_INFLAMMATORY_INDEX'
    },
    {
      name: 'median',
      label: 'GLYCAN_MEDIAN',
      description: 'SUPPORTIVE_INDEX'
    },
    {
      name: 'lifestyle',
      label: 'GLYCAN_LIFESTYLE_B',
      description: 'SUPPORTIVE_INDEX'
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
        <b style="font-size: {lang === 'slovenian' ? 0.70 : 0.8}rem;">{getTranslation(lang, label)}</b>
        <div style="font-size: 0.7rem;">
          {getTranslation(lang, description)}
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
      {:else if type === 'shield' || type === 'youth'}
        <div class="colorBoxShort" style="background-color: #DF2120;"></div>
        <div class="colorBox" style="background-color: #DF2120;"></div>
        <div class="colorBox" style="background-color: #F2800D;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #13A195;"></div>
        <div class="colorBox" style="background-color: #015566;"></div>
        <div class="colorBoxShort" style="background-color: #015566;"></div>
      {:else if type === 'median'}
        <div class="colorBoxShort" style="background-color: #DF2120;"></div>
        <div class="colorBox" style="background-color: #F2800D;"></div>
        <div class="colorBox" style="background-color: #13A195;"></div>
        <div class="colorBox" style="background-color: #015566;"></div>
        <div class="colorBox" style="background-color: #015566;"></div>
        <div class="colorBox" style="background-color: #13A195;"></div>
        <div class="colorBox" style="background-color: #F2800D;"></div>
        <div class="colorBoxShort" style="background-color: #DF2120;"></div>
      {/if}

      <div class="slider" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
        <svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="24" rx="4" fill="{type === 'shield' || type === 'youth' ? getColorRedToBlueWithPercentile(percentile) : type === 'mature' || type === 'lifestyle' ? getColorBlueToRedWithPercentile(percentile) : getColorMedianWithPercentileV3(percentile)}"/>
        </svg>
      </div>

      <div class="slider-number" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
        <b>{percentile}<sup style="font-size: 0.5rem;">{suffix(percentile, lang)}</sup> percentile</b>
      </div>

      <div class="slider-triangle" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.8 6.93333C6.4 7.46667 5.6 7.46667 5.2 6.93333L0 8.07577e-07L12 0L6.8 6.93333Z" fill="{type === 'shield' || type === 'youth' ? getColorRedToBlueWithPercentile(percentile) : type === 'mature' || type === 'lifestyle' ? getColorBlueToRedWithPercentile(percentile) : getColorMedianWithPercentileV3(percentile)}"/>
        </svg>
      </div>

      <div class="text-left" style="width: {type === 'median' ? '19.7' : '34.7'}%;">
        {type === 'shield' || type === 'youth' || type === 'median' ? getTranslation(lang, 'SUBOPTIMAL') : getTranslation(lang, 'OPTIMAL')}
      </div>
      <div class="text-middle" style="width: {type === 'median' ? 35 : 30}%; left: {type === 'median' ? 32.4 : 35}%;">
        {type === 'median' ? getTranslation(lang, 'OPTIMAL') : getTranslation(lang, 'AVERAGE')}
      </div>
      <div class="text-right" style="width: {type === 'median' ? '19.8' : '34.7'}%;">
        {type === 'shield' || type === 'youth' ? getTranslation(lang, 'OPTIMAL') : getTranslation(lang, 'SUBOPTIMAL')}
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
        font-size: 0.74rem;
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