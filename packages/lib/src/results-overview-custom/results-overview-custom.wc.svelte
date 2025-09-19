<svelte:options customElement={{ tag: 'ga-results-overview-custom', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {
    calculateSliderPositionWithPercentile,
    getColorBlueToRedWithPercentile,
    getColorRedToBlueWithPercentile,
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
      label: 'S Indeks',
      subtitle: 'Sijalinizacija',
      description: 'Protuupalni indeks'
    },
    {
      name: 'youth',
      label: 'G2 Indeks',
      subtitle: 'Digalaktozilacija',
      description: 'Protuupalni indeks'
    },
    {
      name: 'mature',
      label: 'G0 Indeks',
      subtitle: 'Digalaktozilacija',
      description: 'Proupalni indeks'
    },
    {
      name: 'median',
      label: 'G1 Indeks',
      subtitle: 'Monogalaktozilacija',
      description: 'Protuupalni indeks'
    },
    {
      name: 'lifestyle',
      label: 'B Indeks',
      subtitle: 'Račvajući GlcNAc',
      description: 'Proupalni indeks'
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
        <div style="font-size: 0.44rem; color: {description === 'Protuupalni indeks' ? '#119999' : '#DD2222'};">
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
        <svg style="position: relative;" width="27" height="27" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.0001 35.5418C19.6112 35.5418 19.2223 35.4724 18.8334 35.3335C18.4445 35.1946 18.0973 34.9863 17.7917 34.7085C15.9862 33.0418 14.389 31.4168 13.0001 29.8335C11.6112 28.2502 10.4515 26.7154 9.52091 25.2293C8.59036 23.7432 7.88203 22.3127 7.39591 20.9377C6.9098 19.5627 6.66675 18.2502 6.66675 17.0002C6.66675 12.8335 8.00703 9.51405 10.6876 7.04183C13.3681 4.56961 16.4723 3.3335 20.0001 3.3335C23.5279 3.3335 26.632 4.56961 29.3126 7.04183C31.9931 9.51405 33.3334 12.8335 33.3334 17.0002C33.3334 18.2502 33.0904 19.5627 32.6042 20.9377C32.1181 22.3127 31.4098 23.7432 30.4792 25.2293C29.5487 26.7154 28.389 28.2502 27.0001 29.8335C25.6112 31.4168 24.014 33.0418 22.2084 34.7085C21.9029 34.9863 21.5556 35.1946 21.1667 35.3335C20.7779 35.4724 20.389 35.5418 20.0001 35.5418Z"
                fill="{type === 'shield' || type === 'youth' || type === 'median' ? getColorRedToBlueWithPercentile(percentile) :  getColorBlueToRedWithPercentile(percentile)}"/>
        </svg>
      </div>

      <div class="slider-number" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
        <b>{percentile}</b>
      </div>

      <div class="text-left" style="width: 34.7%;">
        {type === 'shield' || type === 'youth' || type === 'median' ? 'Suboptimalno' : 'Optimalno'}
      </div>
      <div class="text-middle" style="width: 30%; left: 35%;">
        Prosječno
      </div>
      <div class="text-right" style="width: 34.7%;">
        {type === 'shield' || type === 'youth' || type === 'median' ? 'Optimalno' : 'Suboptimalno'}
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
        transform: translate(-50%, -130%);
        width: 24%;
        font-size: 0.55rem;
        color: white;
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