<svelte:options customElement={{ tag: 'ga-immune-resilience-index-latest', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {
    calculateSliderPositionWithPercentile,
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
  let rankLabel = '';
  let rankColor = '';

  let show = false;

  function getThreeSegmentColor(perc: number): string {
    if (perc < 32) return '#F5AB00';
    if (perc <= 68) return '#40C59B';
    return '#119999';
  }

  onMount(async () => {
    reportData = await service.getReport();
    gender = reportData.sex;
    resilienceData = await service.getResilienceData(gender);

    console.log('resilienceData', resilienceData);

    g0 = Number(reportData.G0yourscore);
    g2 = Number(reportData.G2yourscore);
    r_index = Number(g2/g0);
    let chronoage = Number(reportData.chronologicalage);

    let filteredData = resilienceData.data.filter((item: any) => item.CA >= chronoage - 5 && item.CA <= chronoage + 5);
    console.log('filteredData', filteredData);
    let under = filteredData.filter((item: any) => item.SS < r_index).length;
    let total = filteredData.length;
    console.log('under', under, 'total', total);
    percentile = Math.round((under / total) * 100);
    console.log('percentile', percentile);

    if (percentile === 100 || percentile === 0) {
      percentile = percentile === 100 ? 99 : 1;
    }
    console.log('percentile', percentile);

    if (percentile < 32) {
      rankLabel = 'below average';
    } else if (percentile <= 68) {
      rankLabel = 'average';
    } else {
      rankLabel = 'above average';
    }
    rankColor = getThreeSegmentColor(percentile);

    show = true;
  });
</script>

{#if show}
  <div class="main">
    <div class="label">
      Ranks&nbsp;<span style="color: {rankColor};"><b>{rankLabel}</b></span>&nbsp;for age and sex:
    </div>
    <div class="graph">
      <div class="graph-container">
        <div class="colorBox" style="background-color: #F5AB00;"></div>
        <div class="colorBox" style="background-color: #40C59B;"></div>
        <div class="colorBox" style="background-color: #119999;"></div>

        <div class="slider" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
          <svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="24" rx="4" fill="{rankColor}"/>
          </svg>
        </div>

        <div class="slider-number" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
          <b>{percentile}<sup style="font-size: 0.5rem;">{suffix(percentile, "english")}</sup> percentile</b>
        </div>

        <div class="slider-triangle" style="left: {calculateSliderPositionWithPercentile(percentile)}%;">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.8 6.93333C6.4 7.46667 5.6 7.46667 5.2 6.93333L0 8.07577e-07L12 0L6.8 6.93333Z" fill="{rankColor}"/>
          </svg>
        </div>

        <div class="text-left" style="width: 32.5%;">
          Below avg.
        </div>
        <div class="text-middle" style="width: 32.5%;">
          Average
        </div>
        <div class="text-right" style="width: 32.5%;">
          Above avg.
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
        width: 32%;
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
        left: 33.5%;
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