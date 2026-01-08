<svelte:options customElement={{ tag: 'ga-results-overview-custom-clinical', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {
    calculateSliderPositionWithPercentile,
    getColorBlueToRedWithPercentile,
    getColorRedToBlueWithPercentile, suffix
  } from '../shared/functions/helpers';
  import {Service} from '../shared/utils/service';

  export let type: string;
  export let lang: string;
  export let service: Service = window.GaReportService;

  let reportData: any;

  let label = '';
  let subtitle = '';
  let description = '';
  let percentile = 0;
  let glycanage = 0;
  let chronoage = 0;
  let diff = 0;

  let show = false;

  function getColor() {
    if (glycanage === chronoage || diff <= 6) {
      return '#66CCAA';
    } else if (glycanage < chronoage && diff <= 12) {
      return '#13A195';
    } else if (glycanage < chronoage && diff > 12) {
      return '#015566';
    }  else if (glycanage > chronoage && diff <= 12) {
      return '#F2800D';
    } else if (glycanage > chronoage && diff > 12) {
      return '#DF2120';
    }
  }

  function calc() {
    if (glycanage === chronoage) {
      return 50;
    } else if (glycanage > chronoage) {
      if (diff <= 6) {
        return 51 + (2*diff + (diff*0.3));
      } else if (diff <= 12) {
        return 52 + (diff + (2 * diff * 0.65));
      } else if (diff <= 18) {
        return 55 + (2*diff + (diff*0.20));
      } else {
        return 97.2;
      }
    } else if (glycanage < chronoage) {
      if (diff <= 6) {
        return 49 - (2*diff + (diff*0.3));
      } else if (diff <= 12) {
        return 48 - (diff + (2 * diff * 0.65));
      } else if (diff <= 18) {
        return 45 - (2*diff + (diff*0.20));
      } else {
        return 2.8;
      }
    }
  }

  let subtypes = [
    {
      name: 'age',
      label: 'BIOLOGICAL_AGE',
      description: 'CHRONIC_INFLAMMATION'
    },
    {
      name: 'shield',
      label: 'S Index',
      subtitle: 'Sialylation',
      description: 'Anti-inflammatory'
    },
    {
      name: 'youth',
      label: 'G2 Index',
      subtitle: 'Digalactosylation',
      description: 'Anti-inflammatory'
    },
    {
      name: 'mature',
      label: 'G0 Index',
      subtitle: 'Agalactosylation',
      description: 'Pro-inflammatory'
    },
    {
      name: 'median',
      label: 'G1 Index',
      subtitle: 'Monogalactosylation',
      description: 'Anti-inflammatory'
    },
    {
      name: 'lifestyle',
      label: 'B Index',
      subtitle: 'Bisecting GlcNAc',
      description: 'Pro-inflammatory'
    }
  ];

  const details = subtypes.find(x => x.name === type);

  onMount(async () => {
    reportData = await service.getReport();
    glycanage = Number(reportData.glycanage);
    chronoage = Number(reportData.chronologicalage);
    diff = Math.abs(glycanage - chronoage);

    switch (type) {
      case 'age':
        percentile = Number(reportData.glycanage);
        break;
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
      subtitle = details.subtitle;
    }

    show = true;
  });
</script>

{#if show}
  <div class="main">
    <div class="label">
      <div class="label-container">
        <span style="font-size: 0.7rem;">{label}</span>
        <span style="font-size: 0.48rem;">{subtitle}</span>
        <div style="font-size: 0.44rem; color: {description === 'Anti-inflammatory' ? '#119999' : '#DD2222'};">
          <b>{description}</b>
        </div>
      </div>
    </div>
    <div class="graph-container">
      {#if type === 'mature' || type === 'lifestyle' || type === 'age'}
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
        <svg width="55" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="24" rx="4" fill="{type === 'shield' || type === 'youth' || type === 'median' ? getColorRedToBlueWithPercentile(percentile) : getColorBlueToRedWithPercentile(percentile)}"/>
        </svg>
      </div>

      <div class="slider-number" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
        <b>{percentile}<sup>{suffix(percentile, lang)}</sup> percentile</b>
      </div>

      <div class="slider-triangle" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
        <svg width="9" height="5" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.8 6.93333C6.4 7.46667 5.6 7.46667 5.2 6.93333L0 8.07577e-07L12 0L6.8 6.93333Z" fill="{type === 'shield' || type === 'youth' || type === 'median' ? getColorRedToBlueWithPercentile(percentile) : getColorBlueToRedWithPercentile(percentile)}"/>
        </svg>
      </div>

      <div class="text-left" style="width: 34.7%;">
        {type === 'shield' || type === 'youth' || type === 'median' ? 'Suboptimal' : 'Optimal'}
      </div>
      <div class="text-middle" style="width: 30%; left: 35%;">
        Average
      </div>
      <div class="text-right" style="width: 34.7%;">
        {type === 'shield' || type === 'youth' || type === 'median' ? 'Optimal' : 'Suboptimal'}
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
        height: 3px;
        width: 14.3%;
        border-radius: 24px;
    }

    .colorBoxShort {
        height: 3px;
        width: 5%;
        border-radius: 24px;
    }

    .slider {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        transform: translate(-50%, -55%);
        width: 24%;
        max-height: 70px;
    }

    .slider-number {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        transform: translate(-50%, -145%);
        width: 26%;
        font-size: 0.38rem;
        color: white;
    }

    .slider-triangle {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        transform: translate(-50%, -105%);
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
        font-size: 0.44rem;
        color: #09341F80;
    }

    .text-middle {
        position: absolute;
        height: 15%;
        top: 62%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.44rem;
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
        font-size: 0.44rem;
        color: #09341F80;
    }
</style>