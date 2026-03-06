<svelte:options customElement={{ tag: 'ga-biological-age-rank', shadow: 'open' }}/>

<script lang="ts">
  import { suffix } from '../shared/functions/helpers';
  import { calculateSliderPositionWithPercentile } from '../shared/functions/helpers';

  /** Biological age rank percentile (1–99). From HTML attributes may be string. */
  export let percentile: number | string = 50;

  // Coerce attribute (from Handlebars/HTML it may arrive as string)
  $: perc = typeof percentile === 'string' ? parseInt(percentile, 10) : Number(percentile);
  $: ordinal = suffix(Math.round(perc), 'english');

  // Bar: left = low % (e.g. 25th), right = high % (e.g. 75th). Better = left, worse = right.
  $: markerPosition = calculateSliderPositionWithPercentile(perc);
  $: zone = markerPosition < 34.5 ? 'better' : markerPosition < 64.5 ? 'average' : 'worse';
  $: accentColor = zone === 'worse' ? '#d92429' : '#008f8c';
</script>

<div class="biological-age-rank">
  <p class="title">
    Biological age ranks in the
    <span class="title-percentile" style="color: {accentColor};">
      {Math.round(perc)}{ordinal}
    </span>
    percentile:
  </p>
  <div class="graph-card" role="img" aria-label="Biological age rank in the {Math.round(perc)}{ordinal} percentile, from better than peers to worse than peers">
  <div class="bar-wrap">
    <div class="bubble" style="left: {markerPosition}%;">
      <span class="bubble-text">{Math.round(perc)}{ordinal} percentile</span>
      <div class="bubble-arrow"></div>
    </div>
    <div class="slider-bar">
      <div class="colorBoxShort seg-1"></div>
      <div class="colorBox seg-2"></div>
      <div class="colorBox seg-3"></div>
      <div class="colorBox seg-4"></div>
      <div class="colorBox seg-5"></div>
      <div class="colorBox seg-6"></div>
      <div class="colorBox seg-7"></div>
      <div class="colorBoxShort seg-8"></div>
    </div>
    <div class="median-triangle" style="left: 50%;" aria-hidden="true" title="50th percentile (median)"></div>
    <div class="marker-triangle" style="left: {markerPosition}%; border-bottom-color: {accentColor};" aria-hidden="true"></div>
  </div>
  <div class="labels">
    <span class="label label-better">Better than peers</span>
    <span class="label label-average">Average/Median</span>
    <span class="label label-worse">Worse than peers</span>
  </div>
  </div>
</div>

<style>
  .biological-age-rank {
    font-family: inherit;
  }

  .title {
    margin: 0 0 0.5rem 0;
    font-size: 0.8rem;
    color: #575756;
    text-align: center;
    width: 100%;
  }

  .title-percentile {
    font-weight: 600;
    margin: 0 0.15rem;
  }

  .graph-card {
    font-family: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 560px;
    height: 133px;
    padding: 52px 1.25rem 1rem;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
  }

  .bubble {
    position: absolute;
    bottom: 18px;
    display: inline-block;
    transform: translateX(-50%);
  }

  .bubble-text {
    display: block;
    padding: 0.35rem 0.75rem;
    background: #008f8c;
    color: #fff;
    font-weight: bold;
    font-size: 0.875rem;
    border-radius: 6px;
    white-space: nowrap;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }

  .bubble-arrow {
    position: absolute;
    left: 50%;
    bottom: -6px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #008f8c;
  }

  .bar-wrap {
    position: relative;
    width: fit-content;
    max-width: 100%;
    margin-bottom: 8px;
  }

  .slider-bar {
    display: flex;
    gap: 2px;
    width: fit-content;
  }

  .colorBox,
  .colorBoxShort {
    height: 7px;
    flex-shrink: 0;
    border-radius: 24px;
  }

  .colorBoxShort {
    width: 16px;
  }

  .colorBox {
    width: 64px;
  }

  .seg-1 { background-color: #005566; }
  .seg-2 { background-color: #005566; }
  .seg-3 { background-color: #119999; }
  .seg-4, .seg-5 { background-color: #66CCAA; }
  .seg-6 { background-color: #EE6600; }
  .seg-7 { background-color: #DD2222; }
  .seg-8 { background-color: #DD2222; }

  .median-triangle {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid #5dade2;
    pointer-events: none;
    z-index: 0;
  }

  .marker-triangle {
    position: absolute;
    bottom: -2px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    pointer-events: none;
    z-index: 1;
  }

  .labels {
    display: flex;
    gap: 2px;
    width: fit-content;
    font-size: 0.7rem;
    color: #9e9e9e;
    align-items: center;
  }

  .label {
    text-align: center;
    flex-shrink: 0;
    box-sizing: border-box;
    border-left: 1px solid #d0d0d0;
    padding: 0 4px;
  }

  .label-worse {
    border-right: 1px solid #d0d0d0;
  }

  .label-better { width: 148px; }
  .label-average { width: 130px; }
  .label-worse { width: 148px; }
</style>
