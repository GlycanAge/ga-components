<svelte:options customElement={{ tag: 'ga-biological-age-rank', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {
    calculateSliderPositionWithPercentile,
    getColorBlueToRedWithPercentile,
    suffix
  } from '../shared/functions/helpers';
  import {Service} from '../shared/utils/service';

  export let service: Service = window.GaReportService;

  let reportData: any;
  let ageData: any;

  let gender = '';
  let glycanage = 0;
  let percentile = 0;

  let show = false;

  onMount(async () => {
    reportData = await service.getReport();
    gender = reportData.sex;
    ageData = await service.getAgeData(gender);

    glycanage = Number(reportData.glycanage);

    let under = ageData.data.filter((item: any) => item.y < glycanage).length;
    let total = ageData.data.length;
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
      Biological age ranks in the&nbsp;
      <span style="color: {getColorBlueToRedWithPercentile(percentile)}; height: 80%; display: flex;">
          <b>{percentile}</b>
      </span>
      <sup style="color: {getColorBlueToRedWithPercentile(percentile)}; font-size: 0.65rem;"><b>{suffix(percentile, "english")}</b></sup>
      &nbsp;percentile:
    </div>
    <div class="graph">
      <div class="graph-container">
        <div class="colorBoxShort" style="background-color: #015566;"></div>
        <div class="colorBox" style="background-color: #015566;"></div>
        <div class="colorBox" style="background-color: #13A195;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #66CCAA;"></div>
        <div class="colorBox" style="background-color: #F2800D;"></div>
        <div class="colorBox" style="background-color: #DF2120;"></div>
        <div class="colorBoxShort" style="background-color: #DF2120;"></div>

        <div class="slider" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
          <svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="24" rx="4" fill="{getColorBlueToRedWithPercentile(percentile)}"/>
          </svg>
        </div>

        <div class="slider-number" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
          <b>{percentile}<sup style="font-size: 0.5rem;">{suffix(percentile, "english")}</sup> percentile</b>
        </div>

        <div class="slider-triangle" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.8 6.93333C6.4 7.46667 5.6 7.46667 5.2 6.93333L0 8.07577e-07L12 0L6.8 6.93333Z" fill="{getColorBlueToRedWithPercentile(percentile)}"/>
          </svg>
        </div>

        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, 30%);">
          <path d="M4.39707 0.25C4.58952 -0.083333 5.07064 -0.0833333 5.26309 0.25L9.59322 7.75C9.78567 8.08333 9.5451 8.5 9.1602 8.5H0.499951C0.115051 8.5 -0.125512 8.08333 0.0669386 7.75L4.39707 0.25Z" fill="#66CCAA"/>
        </svg>

        <div class="text-left" style="width: 34.7%;">
          Better than peers
        </div>
        <div class="text-middle" style="width: 29.5%;">
          Average/Median
        </div>
        <div class="text-right" style="width: 34.7%;">
          Worse than peers
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
        top: 58%;
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
        top: 58%;
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
        top: 58%;
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