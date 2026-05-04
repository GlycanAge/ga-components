<svelte:options customElement={{ tag: 'ga-main-result-three-immune', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';

  export let lang: string;
  export let service: Service = window.GaReportService;

  let reportData: any;
  let glycanage = 0;
  let chronoage = 0;
  let diff = 0;

  // 5-tier: 1=ExtremelyGood, 2=Good, 3=Average, 4=Bad, 5=ExtremelyBad
  function getTier(): number {
    if (diff <= 6) return 3;
    if (glycanage < chronoage) return diff <= 12 ? 2 : 1;
    return diff <= 12 ? 4 : 5;
  }

  function getColor(): string {
    switch (getTier()) {
      case 1: return '#119999';
      case 2: return '#22B7B7';
      case 3: return '#40C59B';
      case 4: return '#F5AB00';
      case 5: return '#E97900';
      default: return '#40C59B';
    }
  }

  function getSummary(): string {
    switch (getTier()) {
      case 1: return "Your client's immune age is substantially lower than their chronological age.";
      case 2: return "Your client's immune age is lower than their chronological age.";
      case 3: return "Your client's immune age is aligned with their chronological age.";
      case 4: return "Your client's immune age exceeds their chronological age.";
      case 5: return "Your client's immune age exceeds their chronological age substantially.";
      default: return '';
    }
  }

  function getBottomParagraph(): string {
    switch (getTier()) {
      case 1: return 'This suggests superior control of chronic systemic inflammation and a favorable inflammatory aging profile. Retesting over time can help your client maintain their positive results.';
      case 2: return 'This suggests optimal control of chronic systemic inflammation and a favorable inflammatory aging profile. Retesting over time can help your client maintain their positive results.';
      case 3: return 'This suggests adequate, age-appropriate control of chronic systemic inflammation. Retesting over time can help your client maintain or improve their result.';
      case 4: return `This suggests reduced control of chronic systemic inflammation and an elevated inflammatory burden. Retesting over time can show whether your client's result is improving with interventions.`;
      case 5: return `This suggests notably reduced control of chronic systemic inflammation and a considerably elevated inflammatory burden. Retesting over time can show whether your client's result is improving with interventions.`;
      default: return '';
    }
  }

  function calc(): number {
    if (glycanage === chronoage) return 50;
    if (glycanage < chronoage) {
      if (diff <= 6)  return 49 - (2 * diff + diff * 0.3);
      if (diff <= 12) return 48 - (diff + 2 * diff * 0.65);
      if (diff <= 18) return 45 - (2 * diff + diff * 0.20);
      return 2.8;
    }
    if (diff <= 6)  return 51 + (2 * diff + diff * 0.3);
    if (diff <= 12) return 52 + (diff + 2 * diff * 0.65);
    if (diff <= 18) return 55 + (2 * diff + diff * 0.20);
    return 97.2;
  }

  let show = false;

  onMount(async () => {
    reportData = await service.getReport();
    glycanage = Number(reportData.glycanage);
    chronoage = Number(reportData.chronologicalage);
    diff = Math.abs(glycanage - chronoage);
    show = true;
  });
</script>

{#if show}
  <div class="main">
    <div class="glycanage" style="color: {getColor()};">
      {glycanage}
    </div>

    <div class="summary">
      {getSummary()}
    </div>

    <div class="graph-container">
      <div class="slider">
        <div class="slider-pin" style="left: {calc()}%;">
          <svg width="44" height="52" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.0002 0.133165C22.6224 0.133165 23.2446 0.244272 23.8668 0.466494C24.4891 0.688719 25.0446 1.02205 25.5335 1.46649C28.4224 4.13316 30.9779 6.73316 33.2002 9.2665C35.4224 11.7998 37.2779 14.2554 38.7668 16.6332C40.2557 19.0109 41.3891 21.2998 42.1668 23.4998C42.9446 25.6998 43.3335 27.7998 43.3335 29.7998C43.3335 36.4665 41.1891 41.7776 36.9002 45.7332C32.6113 49.6887 27.6446 51.6665 22.0002 51.6665C16.3557 51.6665 11.3891 49.6887 7.10016 45.7332C2.81128 41.7776 0.666833 36.4665 0.666834 29.7998C0.666834 27.7998 1.05572 25.6998 1.8335 23.4998C2.61128 21.2998 3.74461 19.0109 5.2335 16.6332C6.72239 14.2554 8.57795 11.7998 10.8002 9.2665C13.0224 6.73316 15.5779 4.13316 18.4668 1.46649C18.9557 1.02205 19.5113 0.688719 20.1335 0.466493C20.7557 0.244272 21.3779 0.133165 22.0002 0.133165Z"
                  fill="{getColor()}"/>
          </svg>
          <b class="slider-number">{glycanage}</b>
        </div>
      </div>

      <div class="slider-bar">
        <div class="colorBoxShort" style="background-color: #119999;"></div>
        <div class="colorBox" style="background-color: #119999;"></div>
        <div class="colorBox" style="background-color: #22B7B7;"></div>
        <div class="colorBoxWide" style="background-color: #40C59B;"></div>
        <div class="colorBox" style="background-color: #F5AB00;"></div>
        <div class="colorBox" style="background-color: #E97900;"></div>
        <div class="colorBoxShort" style="background-color: #E97900;"></div>
      </div>

      <div class="texts">
        <div class="text-left">Optimal</div>
        <div class="text-middle">
          <svg width="44" height="52" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.0002 0.133165C22.6224 0.133165 23.2446 0.244272 23.8668 0.466494C24.4891 0.688719 25.0446 1.02205 25.5335 1.46649C28.4224 4.13316 30.9779 6.73316 33.2002 9.2665C35.4224 11.7998 37.2779 14.2554 38.7668 16.6332C40.2557 19.0109 41.3891 21.2998 42.1668 23.4998C42.9446 25.6998 43.3335 27.7998 43.3335 29.7998C43.3335 36.4665 41.1891 41.7776 36.9002 45.7332C32.6113 49.6887 27.6446 51.6665 22.0002 51.6665C16.3557 51.6665 11.3891 49.6887 7.10016 45.7332C2.81128 41.7776 0.666833 36.4665 0.666834 29.7998C0.666834 27.7998 1.05572 25.6998 1.8335 23.4998C2.61128 21.2998 3.74461 19.0109 5.2335 16.6332C6.72239 14.2554 8.57795 11.7998 10.8002 9.2665C13.0224 6.73316 15.5779 4.13316 18.4668 1.46649C18.9557 1.02205 19.5113 0.688719 20.1335 0.466493C20.7557 0.244272 21.3779 0.133165 22.0002 0.133165Z"
                  fill="#D7E4DE"/>
          </svg>
          <b class="text-middle-number">{chronoage}</b>
        </div>
        <div class="text-right">Suboptimal</div>
      </div>
    </div>

    <div class="bottom-paragraph">
      {getBottomParagraph()}
    </div>
  </div>
{/if}

<style>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .glycanage {
        display: flex;
        font-size: 10rem;
        justify-content: center;
        align-items: center;
        line-height: 1;
    }

    .summary {
        text-align: center;
        font-size: 1.1rem;
        color: #09341FCC;
        margin-bottom: 1rem;
        padding: 0 1rem;
    }

    .graph-container {
        width: 100%;
        gap: .25rem;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .colorBox {
        height: 7px;
        width: 14.3%;
        border-radius: 24px;
    }

    .colorBoxWide {
        height: 7px;
        width: 28.6%;
        border-radius: 24px;
    }

    .colorBoxShort {
        height: 7px;
        width: 5%;
        border-radius: 24px;
    }

    .slider-number {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        color: white;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -12.5%);
    }

    .slider {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 3.5rem;
    }

    .slider-pin {
        position: absolute;
        transform: translate(-50%, .5rem);
        bottom: 0;
    }

    .slider-pin svg {
        transform: rotate(180deg);
    }

    .slider-bar {
        width: 100%;
        display: flex;
        gap: .25rem;
        margin-bottom: .875rem;
    }

    .texts {
        display: flex;
        gap: .25rem;
    }

    .text-left {
        border-left: 1px solid #09341F33;
        border-right: 1px solid #09341F33;
        display: flex;
        flex: 2.5 2.5 0;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        color: #09341F80;
        max-height: 1rem;
    }

    .text-middle {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        flex: 2 2 0;
        color: #09341F80;
        transform: translateY(-1rem);
    }

    .text-middle-number {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        bottom: 25%;
        left: 50%;
        transform: translate(-50%, 12.5%);
    }

    .text-right {
        border-left: 1px solid #09341F33;
        border-right: 1px solid #09341F33;
        display: flex;
        flex: 2.5 2.5 0;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        color: #09341F80;
        max-height: 1rem;
    }

    .bottom-paragraph {
        text-align: center;
        font-size: 1rem;
        color: #09341FCC;
        margin-top: 1rem;
        padding: 0 1rem;
        line-height: 1.5;
    }
</style>
