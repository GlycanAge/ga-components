<svelte:options customElement={{ tag: 'ga-action-steps-three-clp', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';
  import { getTranslation } from '../shared/functions/helpers';

  export let service: Service = window.GaReportService;
  export let lang: string;
  export let type: string;

  let reportData: any;

  let gender = '';

  let riskCounter = 0;
  let preCounter = 0;
  let hyperCounter = 0;
  let cvaCounter = 0;
  let cvaFCounter = 0;
  let atheroCounter = 0;
  let coronaryCounter = 0;
  let diabetesCounter = 0;
  let dyslipidemiaCounter = 0;
  let arthritisCounter = 0;
  let colitisCounter = 0;
  let crohnCounter = 0;
  let sleCounter = 0;
  let copdCounter = 0;
  let periCounter = 0;

  let bPerc = 0; // Bpercentile
  let sPerc = 0; // Spercentile
  let g0Perc = 0; // g0percentile
  let g1Perc = 0; // g1percentile
  let g2Perc = 0;
  let p22Perc = 0;
  let p18Perc = 0;
  let p23Perc = 0;
  let p26Perc = 0;

  let primaryTitle = '';
  let primaryDescription = '';
  let primaryFurther = '';

  let supportiveTitle = '';
  let supportiveDescription = '';
  let supportiveFurther = '';

  let show = false;

  onMount(async () => {
    reportData = await service.getReport();

    bPerc = Number(reportData.Bpercentile);
    sPerc = Number(reportData.Spercentile);
    g0Perc = Number(reportData.G0percentile);
    g1Perc = Number(reportData.G1percentile);
    g2Perc = Number(reportData.G2percentile);
    p18Perc = Number(reportData.P18percentile);
    p22Perc = Number(reportData.P22percentile);
    p23Perc = Number(reportData.P23percentile);
    p26Perc = Number(reportData.P26percentile);

    if (bPerc >= 67) {
      riskCounter++;
      cvaCounter++;
      atheroCounter++;
      diabetesCounter++;
      dyslipidemiaCounter++;
      crohnCounter++;
      copdCounter++;
      periCounter++;
    }

    if (bPerc <= 33) {
      colitisCounter++;
    }

    if (sPerc <= 33) {
      cvaCounter++;
      atheroCounter++;
      coronaryCounter++;
      diabetesCounter++;
      dyslipidemiaCounter++;
      arthritisCounter++;
      crohnCounter++;
      periCounter++;
    }

    if (g0Perc >= 67) {
      hyperCounter++;
      cvaCounter++;
      atheroCounter++;
      coronaryCounter++;
      diabetesCounter++;
      dyslipidemiaCounter++;
      colitisCounter++;
      crohnCounter++;
      periCounter++;
      arthritisCounter++;
    }

    if (g1Perc <= 33) {
      hyperCounter++;
      atheroCounter++;
      diabetesCounter++;
      arthritisCounter++;
      colitisCounter++;
      crohnCounter++;
      copdCounter++;
    }

    if (g2Perc <= 33) {
      preCounter++;
      hyperCounter++;
      cvaCounter++;
      atheroCounter++;
      diabetesCounter++;
      dyslipidemiaCounter++;
      arthritisCounter++;
      colitisCounter++;
      crohnCounter++;
      periCounter++;
    }

    if (p18Perc >= 67) {
      sleCounter++;
    }

    if (p22Perc <= 33) {
      sleCounter++;
    }

    if (p23Perc >= 67) {
      sleCounter++;
    }

    if (p26Perc <= 33) {
      sleCounter++;
    }

    if (p22Perc <= 33 && gender === 'F') {
      cvaFCounter++;
    }

    // Primary calculation
    if (sPerc >= 67 && g2Perc >= 67 && g0Perc <= 33) {primaryTitle = getTranslation(lang, 'PRIMARY_TITLE_1');primaryDescription = getTranslation(lang, 'PRIMARY_DESC_1'); primaryFurther = getTranslation(lang, 'PRIMARY_FURTHER_1');}
    if (sPerc >= 67 && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_2');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_2');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_2');}
    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_3');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_3');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_3');}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && g0Perc <= 33) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_4');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_4');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_4');}
    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_5');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_5');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_5');}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_6');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_6');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_6');}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_7');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_7');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_7');}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_8');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_8');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_8');}

    if (sPerc >= 67 && g2Perc >= 67 && g0Perc >= 67) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_9');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_9');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_9');}
    if (sPerc >= 67 && g2Perc <= 33 && g0Perc <= 33) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_10');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_10');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_10');}
    if (sPerc <= 33 && g2Perc >= 67 && g0Perc <= 33) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_11');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_11');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_11');}
    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_12');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_12');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_12');}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && g0Perc >= 67) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_13');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_13');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_13');}
    if (sPerc >= 67 && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_14');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_14');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_14');}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && g0Perc <= 33) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_15');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_15');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_15');}
    if (sPerc <= 33 && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_16');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_16');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_16');}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_17');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_17');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_17');}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_18');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_18');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_18');}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_19');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_19');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_19');}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_20');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_20');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_20');}
    if (sPerc >= 67 && g2Perc <= 33 && g0Perc >= 67) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_21');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_21');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_21');}
    if (sPerc <= 33 && g2Perc >= 67 && g0Perc >= 67) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_22');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_22');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_22');}
    if (sPerc <= 33 && g2Perc <= 33 && g0Perc <= 33) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_23');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_23');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_23');}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && g0Perc >= 67) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_24');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_24');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_24');}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_25');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_25');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_25');}
    if (sPerc <= 33 && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_26');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_26');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_26');}
    if (sPerc <= 33 && g2Perc <= 33 && g0Perc >= 67) {primaryTitle=getTranslation(lang, 'PRIMARY_TITLE_27');primaryDescription=getTranslation(lang, 'PRIMARY_DESC_27');primaryFurther=getTranslation(lang, 'PRIMARY_FURTHER_27');}

    // Supportive calculation
    if (g1Perc <= 33 && bPerc >= 67) {
      supportiveTitle = getTranslation(lang, 'SUPPORTIVE_TITLE_1');
      supportiveDescription = getTranslation(lang, 'SUPPORTIVE_DESC_1');
      supportiveFurther = getTranslation(lang, 'SUPPORTIVE_FURTHER_1');
    }

    if (g1Perc <= 33 && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = getTranslation(lang, 'SUPPORTIVE_TITLE_2');
      supportiveDescription = getTranslation(lang, 'SUPPORTIVE_DESC_2');
      supportiveFurther = getTranslation(lang, 'SUPPORTIVE_FURTHER_2');
    }

    if (g1Perc <= 33 && bPerc <= 33) {
      supportiveTitle = getTranslation(lang, 'SUPPORTIVE_TITLE_3');
      supportiveDescription = getTranslation(lang, 'SUPPORTIVE_DESC_3');
      supportiveFurther = getTranslation(lang, 'SUPPORTIVE_FURTHER_3');
    }

    if ((g1Perc > 33 && g1Perc < 67) && bPerc >= 67) {
      supportiveTitle = getTranslation(lang, 'SUPPORTIVE_TITLE_4');
      supportiveDescription = getTranslation(lang, 'SUPPORTIVE_DESC_4');
      supportiveFurther = getTranslation(lang, 'SUPPORTIVE_FURTHER_4');
    }

    if ((g1Perc > 33 && g1Perc < 67) && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = getTranslation(lang, 'SUPPORTIVE_TITLE_5');
      supportiveDescription = getTranslation(lang, 'SUPPORTIVE_DESC_5');
      supportiveFurther = getTranslation(lang, 'SUPPORTIVE_FURTHER_5');
    }

    if ((g1Perc > 33 && g1Perc < 67) && bPerc <= 33) {
      supportiveTitle = getTranslation(lang, 'SUPPORTIVE_TITLE_6');
      supportiveDescription = getTranslation(lang, 'SUPPORTIVE_DESC_6');
      supportiveFurther = getTranslation(lang, 'SUPPORTIVE_FURTHER_6');
    }

    if (g1Perc >= 67 && bPerc >= 67) {
      supportiveTitle = getTranslation(lang, 'SUPPORTIVE_TITLE_7');
      supportiveDescription = getTranslation(lang, 'SUPPORTIVE_DESC_7');
      supportiveFurther = getTranslation(lang, 'SUPPORTIVE_FURTHER_7');
    }

    if (g1Perc >= 67 && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = getTranslation(lang, 'SUPPORTIVE_TITLE_8');
      supportiveDescription = getTranslation(lang, 'SUPPORTIVE_DESC_8');
      supportiveFurther = getTranslation(lang, 'SUPPORTIVE_FURTHER_8');
    }

    if (g1Perc >= 67 && bPerc <= 33) {
      supportiveTitle = getTranslation(lang, 'SUPPORTIVE_TITLE_9');
      supportiveDescription = getTranslation(lang, 'SUPPORTIVE_DESC_9');
      supportiveFurther = getTranslation(lang, 'SUPPORTIVE_FURTHER_9');
    }

    show = true;
  });
</script>

{#if show}
  {#if type === 'primary'}
    <div class="main">
        <div style="font-size: 14px;"><b>{primaryTitle}</b></div>
        <div style="font-size: 68%">{primaryDescription}</div>
        <div style="height: 24px"></div>
        <div class="further">{getTranslation(lang, 'FURTHER_TESTING')}:</div>
        <div style="font-size: 68%">{primaryFurther}</div>
    </div>
  {:else}
    <div class="main">
        <div style="font-size: 14px;"><b>{supportiveTitle}</b></div>
        <div style="font-size: 68%">{supportiveDescription}</div>
        <div style="height: 24px"></div>
        <div class="further">{getTranslation(lang, 'FURTHER_TESTING')}:</div>
        <div style="font-size: 68%">{supportiveFurther}</div>
    </div>
  {/if}
{/if}

<style>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .further {
        font-weight: 700;
        font-size: 12px;
        line-height: 160%;
        letter-spacing: 0.005em;
    }
</style>