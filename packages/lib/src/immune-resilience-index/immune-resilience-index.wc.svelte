<svelte:options customElement={{ tag: 'ga-immune-resilience-index', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {
    calculateSliderPositionWithPercentile,
    getColorRedToBlueWithPercentile,
    suffix
  } from '../shared/functions/helpers';
  import {Service} from '../shared/utils/service';

  export let service: Service = window.GaReportService;

  let reportData: any;
  let resilienceData: any;

  let gender = '';
  let g2 = 0;
  let g0 = 0;
  let r_index = 0;
  let percentile = 0;

  let show = false;

  onMount(async () => {
    reportData = await service.getReport();
    gender = reportData.sex;
    resilienceData = await service.getResilienceData(gender);


    g0 = Number(reportData.G0yourscore);
    g2 = Number(reportData.G2yourscore);
    r_index = Number(g2/g0);

    let under = resilienceData.data.filter((item: any) => item.y < r_index).length;
    let total = resilienceData.data.length;
    percentile = Math.round((under / total) * 100);

    if (percentile === 100 || percentile === 0) {
      percentile = percentile === 100 ? 99 : 1;
    }

    show = true;
  });
</script>

{#if show}
  <div class="main">
    <div class="label">
      Immune resilience index ranks in the&nbsp;
      <span style="color: {getColorRedToBlueWithPercentile(percentile)}; height: 80%; display: flex;">
          <b>{percentile}</b>
      </span>
      <sup style="color: {getColorRedToBlueWithPercentile(percentile)}; font-size: 0.65rem;"><b>{suffix(percentile, "english")}</b></sup>
        &nbsp;percentile:
    </div>
    <div class="graph">
      <div class="graph-container">
        <div class="colorBoxShort" style="background-color: #DF2120;"></div>
        <div class="colorBox" style="background-color: #DF2120;"></div>
        <div class="colorBox" style="background-color: #F2800D;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #13A195;"></div>
        <div class="colorBox" style="background-color: #015566;"></div>
        <div class="colorBoxShort" style="background-color: #015566;"></div>

        <div class="slider" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
          <svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="24" rx="4" fill="{getColorRedToBlueWithPercentile(percentile)}"/>
          </svg>
        </div>

        <div class="slider-number" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
          <b>{percentile}<sup style="font-size: 0.5rem;">{suffix(percentile, "english")}</sup> percentile</b>
        </div>

        <div class="slider-triangle" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.8 6.93333C6.4 7.46667 5.6 7.46667 5.2 6.93333L0 8.07577e-07L12 0L6.8 6.93333Z" fill="{getColorRedToBlueWithPercentile(percentile)}"/>
          </svg>
        </div>

        <div class="text-left" style="width: 34.7%;">
          Suboptimal
        </div>
        <div class="text-middle" style="width: 29.5%;">
          Average
        </div>
        <div class="text-right" style="width: 34.7%;">
          Optimal
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