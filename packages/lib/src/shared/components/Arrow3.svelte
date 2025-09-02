<script lang="ts">
  import {
    scale,
    suffix
  } from '../functions/helpers';

  export let percentile = 0;
  export let direction = '';

  function calculate(perc: number) {
    if (perc === 50) {
      return 50;
    } else if (perc < 2) {
      return 9;
    } else if (perc > 98) {
      return 91;
    } else if (perc >= 2 && perc < 50) {
      return scale(perc, 9.2, 50, 13, 50);
    } else if (perc > 50 && perc <= 98) {
      return scale(perc, 50, 90.8, 50, 86.8);
    }
  }

  function color(perc: number, dir: string) {
    if (dir === 'left') {
      return perc >= 34 ? '#119999' : '#DD2222';
    } else {
      return perc <= 66 ? '#119999' : '#DD2222';
    }
  }
</script>


<div style="position: relative; width: 92%; height: 4px; display: flex; justify-content: space-between; gap: 4px;">
  <div style="position: relative; height: 100%; flex: 1; background-color: {direction === 'left' ? '#DD2222' : '#CADBD1'}; border-radius: 4px;">
    {#if direction === 'left'}
      <div style="position: absolute; right: 10px; bottom: 5px; height: 3px; width: 14px; background-color: #DD2222; border-radius: 4px; transform: rotate(135deg);"></div>
      <div style="position: absolute; right: 10px; top: 5px; height: 3px; width: 14px; background-color: #DD2222; border-radius: 4px; transform: rotate(-135deg);"></div>
    {/if}
  </div>
  <div style="height: 100%; flex: 2; background-color: {direction === 'left' ? '#DD2222' : '#CADBD1'}; border-radius: 4px;"></div>
  <div style="height: 100%; flex: 2; background-color: {direction === 'left' ? '#EE6600' : '#CADBD1'}; border-radius: 4px;"></div>
  <div style="position: relative; height: 100%; flex: 2; background-color: #CADBD1; border-radius: 4px;"></div>
  <div style="height: 100%; flex: 2; background-color: #CADBD1; border-radius: 4px;"></div>
  <div style="height: 100%; flex: 2; background-color: {direction === 'left' ? '#CADBD1' : '#EE6600'}; border-radius: 4px;"></div>
  <div style="height: 100%; flex: 2; background-color: {direction === 'left' ? '#CADBD1' : '#DD2222'}; border-radius: 4px;"></div>
  <div style="position: relative; height: 100%; flex: 1; background-color: {direction === 'left' ? '#CADBD1' : '#DD2222'}; border-radius: 4px;">
    {#if direction === 'right'}
      <div style="position: absolute; left: 11px; bottom: 5px; height: 3px; width: 14px; background-color: #DD2222; border-radius: 4px; transform: rotate(45deg);"></div>
      <div style="position: absolute; left: 11px; top: 5px; height: 3px; width: 14px; background-color: #DD2222; border-radius: 4px; transform: rotate(-45deg);"></div>
    {/if}
  </div>

  <div style="left: {calculate(percentile)}%; position: absolute; transform: translate(-50%, -85%); display: flex; align-items: center; flex-direction: column; width: 100px; height: 38px;">
    <svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="24" rx="4" fill="{color(percentile, direction)}"/>
    </svg>
  </div>
  <div style="left: {calculate(percentile)}%; position: absolute; transform: translate(-50%, -80%); display: flex; align-items: center; flex-direction: column; width: 100px; height: 38px; color: white; font-size: 0.75rem;">
    <b>{percentile}<sup style="font-size: 0.5rem;">{suffix(percentile)}</sup> percentile</b>
  </div>

  <div style="left: {calculate(percentile)}%; position: absolute; transform: translate(-50%, -25%); display: flex; align-items: center; flex-direction: column; width: 100px; height: 38px; color: white; font-size: 0.75rem;">
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.8 6.93333C6.4 7.46667 5.6 7.46667 5.2 6.93333L0 8.07577e-07L12 0L6.8 6.93333Z" fill="{color(percentile, direction)}"/>
    </svg>
  </div>
</div>