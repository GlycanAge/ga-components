<svelte:options customElement={{ tag: 'ga-single-overview-three', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {
    calculateSliderPositionWithPercentile,
    getColorBlueToRedWithPercentile,
    getColorRedToBlueWithPercentile,
    getTranslation, suffix
  } from '../shared/functions/helpers';
  import {Service} from '../shared/utils/service';

  export let type: string;
  export let lang: string;
  export let service: Service = window.GaReportService;

  let reportData: any;
  let percentile = 0;

  let show = false;

  onMount(async () => {
    reportData = await service.getReport();

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

    show = true;
  });
</script>

{#if show}
  <div class="main">
    <div class="label">
      {getTranslation(lang, 'RANKS_YOU')}&nbsp;
      <span style="color: {type === 'shield' || type === 'youth' || type === 'median' ? getColorRedToBlueWithPercentile(percentile) : getColorBlueToRedWithPercentile(percentile)}; height: 80%; display: flex;">
                <b>{percentile}{#if lang === 'japanese'}パーセンタイル{/if}</b>
            </span>
      <sup style="color: {type === 'shield' || type === 'youth' || type === 'median' ? getColorRedToBlueWithPercentile(percentile) : getColorBlueToRedWithPercentile(percentile)}; font-size: 0.65rem;"><b>{suffix(percentile, lang)}</b></sup>
      {#if lang === 'japanese'}
        にランク付けされました。
      {:else if lang === 'english'}
        &nbsp;percentile:
      {/if}
    </div>
    <div class="graph">
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
          <b>{percentile}<sup style="font-size: 0.5rem;">{suffix(percentile, lang)}</sup> percentile</b>
        </div>

        <div class="slider-triangle" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.8 6.93333C6.4 7.46667 5.6 7.46667 5.2 6.93333L0 8.07577e-07L12 0L6.8 6.93333Z" fill="{type === 'shield' || type === 'youth' || type === 'median' ? getColorRedToBlueWithPercentile(percentile) : getColorBlueToRedWithPercentile(percentile)}"/>
          </svg>
        </div>

        <div class="text-left" style="width: 34.7%;">
          {type === 'shield' || type === 'youth' || type === 'median' ? getTranslation(lang, 'SUBOPTIMAL') : getTranslation(lang, 'OPTIMAL')}
        </div>
        <div class="text-middle" style="width: 29.5%;">
          {getTranslation(lang, 'AVERAGE')}
        </div>
        <div class="text-right" style="width: 34.7%;">
          {type === 'shield' || type === 'youth' || type === 'median' ? getTranslation(lang, 'OPTIMAL') : getTranslation(lang, 'SUBOPTIMAL')}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .label {
        height: 15%;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .graph {
        height: 85%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #09341F33;
        border-radius: 10px;
    }

    .graph-container {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .colorBox {
        height: 7px;
        width: 14.3%;
        border-radius: 24px;
    }

    .colorBoxShort {
        height: 7px;
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
        left: 35%;
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


    .slider-triangle {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        transform: translate(-50%, -90%);
        width: 24%;
    }

</style>