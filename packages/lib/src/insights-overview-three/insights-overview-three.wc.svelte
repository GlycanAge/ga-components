<svelte:options customElement={{ tag: 'ga-insights-overview-three', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';
  import { getTranslation } from '../shared/functions/helpers';

  export let service: Service = window.GaReportService;
  export let type: string;
  export let lang: string;

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

  let bPercentile = 0; // Bpercentile
  let sPercentile = 0; // Spercentile
  let g0Percentile = 0; // g0percentile
  let g1Percentile = 0; // g1percentile
  let g2Percentile = 0; // g2percentile
  let p22Percentile = 0; // p22percentile
  let p18Percentile = 0; // p18percentile
  let p23Percentile = 0; // p23percentile
  let p26Percentile = 0; // p26percentile

  let show = false;

  let cardioGreen = false;
  let cardioOrange = false;
  let cardioRed = false;
  let cardioFinalGreen = false;
  let cardioFinalOrange = false;
  let cardioFinalRed = false;

  let metabolicGreen = false;
  let metabolicOrange = false;
  let metabolicRed = false;
  let metabolicFinalGreen = false;
  let metabolicFinalOrange = false;
  let metabolicFinalRed = false;

  let autoGreen = false;
  let autoOrange = false;
  let autoRed = false;
  let autoFinalGreen = false;
  let autoFinalOrange = false;
  let autoFinalRed = false;

  let respGreen = false;
  let respOrange = false;
  let respRed = false;

  let femaleGreen = false;
  let femaleOrange = false;
  let femaleRed = false;

  let badAreas = [];

  function calculateCardiovascular() {
    if (riskCounter === 1) {cardioRed = true; badAreas.push({label: 'RISK_OF_HYPER', color: 'red'});} else {cardioGreen = true;}
    if (preCounter === 1) {cardioRed = true; badAreas.push({label: 'PRE_HYPERTENSION', color: 'red'});} else {cardioGreen = true;}
    if (hyperCounter < 2) {cardioGreen = true;} else if (hyperCounter === 2) {cardioOrange = true; badAreas.push({label: 'HYPERTENSION', color: 'orange'});} else if (hyperCounter === 3) {cardioRed = true; badAreas.push({label: 'HYPERTENSION', color: 'red'});}
    if (gender === 'F') {if (cvaFCounter === 0) {cardioGreen = true} else if (cvaFCounter === 1) {cardioRed = true; badAreas.push({label: 'MI_CVA', color: 'red'});}} else {if (cvaCounter < 3) {cardioGreen = true} else if (cvaCounter === 3) {cardioOrange = true; badAreas.push({label: 'MI_CVA', color: 'orange'});} else if (cvaCounter === 4) {cardioRed = true; badAreas.push({label: 'MI_CVA', color: 'red'});}}
    if (gender === 'F') {if (atheroCounter < 3) {cardioGreen = true;} else if (atheroCounter === 5) {cardioRed = true; badAreas.push({label: 'ATHEROSCLEROSIS', color: 'red'});} else {cardioOrange = true; badAreas.push({label: 'ATHEROSCLEROSIS', color: 'orange'});}}
    if (gender === 'F') {if (coronaryCounter === 0) {cardioGreen = true} else if (coronaryCounter === 1) {cardioOrange = true; badAreas.push({label: 'CORONARY', color: 'orange'});} else if (coronaryCounter === 2) {cardioRed = true; badAreas.push({label: 'CORONARY', color: 'red'});}}

    if (cardioGreen && !cardioOrange && !cardioRed) {cardioFinalGreen = true;}

    if ((!cardioGreen && cardioOrange && !cardioRed) || (cardioGreen && cardioOrange && !cardioRed) || (cardioGreen && !cardioOrange && cardioRed) || (cardioGreen && cardioOrange && cardioRed)) {
      cardioFinalOrange = true;
    }

    if ((!cardioGreen && !cardioOrange && cardioRed) || (!cardioGreen && cardioOrange && cardioRed)) {
      cardioFinalRed = true;
    }
  }

  function calculateMetabolic() {
    if (diabetesCounter < 3) {metabolicGreen = true;} else if (diabetesCounter === 5) {metabolicRed = true; badAreas.push({label: 'TYPE_2_DIABETES', color: 'red'});} else {metabolicOrange = true; badAreas.push({label: 'TYPE_2_DIABETES', color: 'orange'});}
    if (dyslipidemiaCounter < 3) {metabolicGreen = true;} else if (dyslipidemiaCounter === 3) {metabolicOrange = true; badAreas.push({label: 'DYSLIPIDEMIA', color: 'orange'});} else {metabolicRed = true; badAreas.push({label: 'DYSLIPIDEMIA', color: 'red'});}

    if (metabolicGreen && !metabolicOrange && !metabolicRed) {
      metabolicFinalGreen = true;
    }

    if ((!metabolicGreen && metabolicOrange && !metabolicRed) || (metabolicGreen && metabolicOrange && !metabolicRed) || (metabolicGreen && !metabolicOrange && metabolicRed) || (metabolicGreen && metabolicOrange && metabolicRed)) {
      metabolicFinalOrange = true;
    }

    if ((!metabolicGreen && !metabolicOrange && metabolicRed) || (!metabolicGreen && metabolicOrange && metabolicRed)) {
      metabolicFinalRed = true;
    }
  }

  function calculateAutoimmunity() {
    if (arthritisCounter < 3) {autoGreen = true;} else if (arthritisCounter === 3) {autoOrange = true; badAreas.push({label: 'RHEUMATOID', color: 'orange'});} else {autoRed = true; badAreas.push({label: 'RHEUMATOID', color: 'red'});}
    if (colitisCounter < 3) {autoGreen = true;} else if (colitisCounter === 3) {autoOrange = true; badAreas.push({label: 'ULCERATIVE_COLITIS', color: 'orange'});} else {autoRed = true; badAreas.push({label: 'ULCERATIVE_COLITIS', color: 'red'});}
    if (crohnCounter < 3) {autoGreen = true;} else if (crohnCounter === 5) {autoRed = true; badAreas.push({label: "CROHN", color: 'red'});} else {autoOrange = true; badAreas.push({label: "CROHN", color: 'orange'});}
    if (sleCounter < 3) {autoGreen = true;} else if (sleCounter === 3) {autoOrange = true; badAreas.push({label: 'SLE', color: 'orange'});} else {autoRed = true; badAreas.push({label: 'SLE', color: 'red'});}

    if (autoGreen && !autoOrange && !autoRed) {
      autoFinalGreen = true;
    }

    if ((!autoGreen && autoOrange && !autoRed) || (autoGreen && autoOrange && !autoRed) || (autoGreen && !autoOrange && autoRed) || (autoGreen && autoOrange && autoRed)) {
      autoFinalOrange = true;
    }

    if ((!autoGreen && !autoOrange && autoRed) || (!autoGreen && autoOrange && autoRed)){
      autoFinalRed = true;
    }
  }

  function calculateResp() {
    if (copdCounter === 0) {respGreen = true;} else if (copdCounter === 1) {respOrange = true; badAreas.push({label: 'COPD', color: 'orange'});} else {respRed = true; badAreas.push({label: 'COPD', color: 'red'});}
  }

  function calculateFemale() {
    if (periCounter < 3) {femaleGreen = true;} else if (periCounter === 3) {femaleOrange = true; badAreas.push({label: 'PERIMENOPAUSE', color: 'orange'});} else {femaleRed = true; badAreas.push({label: 'PERIMENOPAUSE', color: 'red'});}
  }

  onMount(async () => {
    reportData = await service.getReport();
    gender = reportData.sex;

    bPercentile = Number(reportData.Bpercentile);
    sPercentile = Number(reportData.Spercentile);
    g0Percentile = Number(reportData.G0percentile);
    g1Percentile = Number(reportData.G1percentile);
    g2Percentile = Number(reportData.G2percentile);
    p18Percentile = Number(reportData.P18percentile);
    p22Percentile = Number(reportData.P22percentile);
    p23Percentile = Number(reportData.P23percentile);
    p26Percentile = Number(reportData.P26percentile);

    if (bPercentile >= 67) {
      riskCounter++;
      cvaCounter++;
      atheroCounter++;
      diabetesCounter++;
      dyslipidemiaCounter++;
      crohnCounter++;
      copdCounter++;
      periCounter++;
    }

    if (bPercentile <= 33) {
      colitisCounter++;
    }

    if (sPercentile <= 33) {
      cvaCounter++;
      atheroCounter++;
      coronaryCounter++;
      diabetesCounter++;
      dyslipidemiaCounter++;
      arthritisCounter++;
      crohnCounter++;
      periCounter++;
    }

    if (g0Percentile >= 67) {
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

    if (g1Percentile <= 33) {
      hyperCounter++;
      atheroCounter++;
      diabetesCounter++;
      arthritisCounter++;
      colitisCounter++;
      crohnCounter++;
      copdCounter++;
    }

    if (g2Percentile <= 33) {
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

    if (p18Percentile >= 67) {
      sleCounter++;
    }

    if (p22Percentile <= 33) {
      sleCounter++;
    }

    if (p23Percentile >= 67) {
      sleCounter++;
    }

    if (p26Percentile <= 33) {
      sleCounter++;
    }

    if (p22Percentile <= 33 && gender === 'F') {
      cvaFCounter++;
    }

    calculateCardiovascular();
    calculateMetabolic();
    calculateAutoimmunity();
    calculateResp();
    if (gender === 'F') {
      calculateFemale();
    }

    show = true;
  });
</script>

{#if show}
  {#if type === 'long'}
    <div class="main">
      <div class="row">
        <div style="flex: 1;"><b>{getTranslation(lang, 'CARDIOVASCULAR_HEALTH')}</b></div>
        {#if cardioFinalGreen}
          <div class="cause-chip good">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'OPTIMAL')}
          </div>
        {/if}
        {#if cardioFinalOrange}
          <div class="cause-chip slightly-bad">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'SLIGHTLY_OUT_OF_RANGE')}
          </div>
        {/if}
        {#if cardioFinalRed}
          <div class="cause-chip bad">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'SIGNIFICANTLY_OUT_OF_RANGE')}
          </div>
        {/if}
      </div>
      <div class="row">
        <div style="flex: 1;"><b>{getTranslation(lang, 'METABOLIC_HEALTH')}</b></div>
        {#if metabolicFinalGreen}
          <div class="cause-chip good">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'OPTIMAL')}
          </div>
        {/if}
        {#if metabolicFinalOrange}
          <div class="cause-chip slightly-bad">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'SLIGHTLY_OUT_OF_RANGE')}
          </div>
        {/if}
        {#if metabolicFinalRed}
          <div class="cause-chip bad">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'SIGNIFICANTLY_OUT_OF_RANGE')}
          </div>
        {/if}
      </div>
      <div class="row">
        <div style="flex: 1;"><b>{getTranslation(lang, 'AUTOIMMUNE_HEALTH')}</b></div>
        {#if autoFinalGreen}
          <div class="cause-chip good">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'OPTIMAL')}
          </div>
        {/if}
        {#if autoFinalOrange}
          <div class="cause-chip slightly-bad">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'SLIGHTLY_OUT_OF_RANGE')}
          </div>
        {/if}
        {#if autoFinalRed}
          <div class="cause-chip bad">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'SIGNIFICANTLY_OUT_OF_RANGE')}
          </div>
        {/if}
      </div>
      <div class="row">
        <div style="flex: 1;"><b>{getTranslation(lang, 'RESPIRATORY_HEALTH')}</b></div>
        {#if respGreen}
          <div class="cause-chip good">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'OPTIMAL')}
          </div>
        {/if}
        {#if respOrange}
          <div class="cause-chip slightly-bad">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'SLIGHTLY_OUT_OF_RANGE')}
          </div>
        {/if}
        {#if respRed}
          <div class="cause-chip bad">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, 'SIGNIFICANTLY_OUT_OF_RANGE')}
          </div>
        {/if}
      </div>
      {#if gender === 'F'}
        <div class="row" style="border-bottom: 1px solid #09341F33;">
          <div style="flex: 1;"><b>{getTranslation(lang, 'FEMALE_HEALTH')}</b></div>
          {#if femaleGreen}
            <div class="cause-chip good">
              <div class="cause-chip-dot"></div>
              {getTranslation(lang, 'OPTIMAL')}
            </div>
          {/if}
          {#if femaleOrange}
            <div class="cause-chip slightly-bad">
              <div class="cause-chip-dot"></div>
              {getTranslation(lang, 'SLIGHTLY_OUT_OF_RANGE')}
            </div>
          {/if}
          {#if femaleRed}
            <div class="cause-chip bad">
              <div class="cause-chip-dot"></div>
              {getTranslation(lang, 'SIGNIFICANTLY_OUT_OF_RANGE')}
            </div>
          {/if}
        </div>
      {/if}
    </div>
    {:else if type === 'short'}
     {#if gender === 'F'}
       {#if cardioFinalGreen && metabolicFinalGreen && autoFinalGreen && respGreen && femaleGreen && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && !femaleOrange && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed && !femaleRed}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip good">
             <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M13.5999 14.9333L11.6666 13.0333C11.4222 12.7889 11.1166 12.6666 10.7499 12.6666C10.3833 12.6666 10.0666 12.8 9.79993 13.0666C9.55549 13.3111 9.43327 13.6222 9.43327 14C9.43327 14.3778 9.55549 14.6889 9.79993 14.9333L12.6666 17.8C12.9333 18.0666 13.2444 18.2 13.5999 18.2C13.9555 18.2 14.2666 18.0666 14.5333 17.8L20.1999 12.1333C20.4666 11.8666 20.5944 11.5555 20.5833 11.2C20.5722 10.8444 20.4444 10.5333 20.1999 10.2666C19.9333 9.99998 19.6166 9.86109 19.2499 9.84998C18.8833 9.83887 18.5666 9.96664 18.2999 10.2333L13.5999 14.9333ZM9.8666 27L7.93327 23.7333L4.2666 22.9333C3.93327 22.8666 3.6666 22.6944 3.4666 22.4166C3.2666 22.1389 3.18882 21.8333 3.23327 21.5L3.59993 17.7333L1.09993 14.8666C0.877713 14.6222 0.766602 14.3333 0.766602 14C0.766602 13.6666 0.877713 13.3778 1.09993 13.1333L3.59993 10.2666L3.23327 6.49998C3.18882 6.16664 3.2666 5.86109 3.4666 5.58331C3.6666 5.30553 3.93327 5.13331 4.2666 5.06664L7.93327 4.26664L9.8666 0.999975C10.0444 0.711086 10.2888 0.516642 10.5999 0.416642C10.911 0.316642 11.2222 0.333308 11.5333 0.466642L14.9999 1.93331L18.4666 0.466642C18.7777 0.333308 19.0888 0.316642 19.3999 0.416642C19.711 0.516642 19.9555 0.711086 20.1333 0.999975L22.0666 4.26664L25.7333 5.06664C26.0666 5.13331 26.3333 5.30553 26.5333 5.58331C26.7333 5.86109 26.811 6.16664 26.7666 6.49998L26.3999 10.2666L28.8999 13.1333C29.1222 13.3778 29.2333 13.6666 29.2333 14C29.2333 14.3333 29.1222 14.6222 28.8999 14.8666L26.3999 17.7333L26.7666 21.5C26.811 21.8333 26.7333 22.1389 26.5333 22.4166C26.3333 22.6944 26.0666 22.8666 25.7333 22.9333L22.0666 23.7333L20.1333 27C19.9555 27.2889 19.711 27.4833 19.3999 27.5833C19.0888 27.6833 18.7777 27.6666 18.4666 27.5333L14.9999 26.0666L11.5333 27.5333C11.2222 27.6666 10.911 27.6833 10.5999 27.5833C10.2888 27.4833 10.0444 27.2889 9.8666 27Z" fill="#119999"/>
             </svg>
             {getTranslation(lang, 'NO_SIGNIFICANT_AREAS')}
           </div>
         </div>
       {/if}
       {#if !cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && !femaleGreen && cardioFinalOrange && metabolicFinalOrange && autoFinalOrange && respOrange && femaleOrange && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed && !femaleRed}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip good">
             <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10.8666 29L8.93327 25.7334L5.2666 24.9334C4.93327 24.8667 4.6666 24.6945 4.4666 24.4167C4.2666 24.1389 4.18882 23.8334 4.23327 23.5L4.59994 19.7334L2.09993 16.8667C1.87771 16.6223 1.7666 16.3334 1.7666 16C1.7666 15.6667 1.87771 15.3778 2.09993 15.1334L4.59994 12.2667L4.23327 8.50004C4.18882 8.1667 4.2666 7.86115 4.4666 7.58337C4.6666 7.30559 4.93327 7.13337 5.2666 7.0667L8.93327 6.2667L10.8666 3.00004C11.0444 2.71115 11.2888 2.5167 11.5999 2.4167C11.911 2.3167 12.2222 2.33337 12.5333 2.4667L15.9999 3.93337L19.4666 2.4667C19.7777 2.33337 20.0888 2.3167 20.3999 2.4167C20.711 2.5167 20.9555 2.71115 21.1333 3.00004L23.0666 6.2667L26.7333 7.0667C27.0666 7.13337 27.3333 7.30559 27.5333 7.58337C27.7333 7.86115 27.811 8.1667 27.7666 8.50004L27.3999 12.2667L29.8999 15.1334C30.1222 15.3778 30.2333 15.6667 30.2333 16C30.2333 16.3334 30.1222 16.6223 29.8999 16.8667L27.3999 19.7334L27.7666 23.5C27.811 23.8334 27.7333 24.1389 27.5333 24.4167C27.3333 24.6945 27.0666 24.8667 26.7333 24.9334L23.0666 25.7334L21.1333 29C20.9555 29.2889 20.711 29.4834 20.3999 29.5834C20.0888 29.6834 19.7777 29.6667 19.4666 29.5334L15.9999 28.0667L12.5333 29.5334C12.2222 29.6667 11.911 29.6834 11.5999 29.5834C11.2888 29.4834 11.0444 29.2889 10.8666 29ZM15.9999 22.6667C16.3777 22.6667 16.6944 22.5389 16.9499 22.2834C17.2055 22.0278 17.3333 21.7111 17.3333 21.3334C17.3333 20.9556 17.2055 20.6389 16.9499 20.3834C16.6944 20.1278 16.3777 20 15.9999 20C15.6222 20 15.3055 20.1278 15.0499 20.3834C14.7944 20.6389 14.6666 20.9556 14.6666 21.3334C14.6666 21.7111 14.7944 22.0278 15.0499 22.2834C15.3055 22.5389 15.6222 22.6667 15.9999 22.6667ZM15.9999 17.3334C16.3777 17.3334 16.6944 17.2056 16.9499 16.95C17.2055 16.6945 17.3333 16.3778 17.3333 16V10.6667C17.3333 10.2889 17.2055 9.97226 16.9499 9.7167C16.6944 9.46115 16.3777 9.33337 15.9999 9.33337C15.6222 9.33337 15.3055 9.46115 15.0499 9.7167C14.7944 9.97226 14.6666 10.2889 14.6666 10.6667V16C14.6666 16.3778 14.7944 16.6945 15.0499 16.95C15.3055 17.2056 15.6222 17.3334 15.9999 17.3334Z" fill="#119999"/>
             </svg>
             {getTranslation(lang, 'SOME_AREAS')}
           </div>
         </div>
       {/if}
       {#if !cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && !femaleGreen && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && !femaleOrange && cardioFinalRed && metabolicFinalRed && autoFinalRed && respRed && femaleRed}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip slightly-bad">
             <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M9.8666 26.9999L7.93327 23.7332L4.2666 22.9332C3.93327 22.8666 3.6666 22.6944 3.4666 22.4166C3.2666 22.1388 3.18882 21.8332 3.23327 21.4999L3.59994 17.7332L1.09993 14.8666C0.877713 14.6221 0.766602 14.3332 0.766602 13.9999C0.766602 13.6666 0.877713 13.3777 1.09993 13.1332L3.59994 10.2666L3.23327 6.49991C3.18882 6.16658 3.2666 5.86102 3.4666 5.58325C3.6666 5.30547 3.93327 5.13325 4.2666 5.06658L7.93327 4.26658L9.8666 0.999914C10.0444 0.711025 10.2888 0.516581 10.5999 0.416581C10.911 0.316581 11.2222 0.333247 11.5333 0.466581L14.9999 1.93325L18.4666 0.466581C18.7777 0.333247 19.0888 0.316581 19.3999 0.416581C19.711 0.516581 19.9555 0.711025 20.1333 0.999914L22.0666 4.26658L25.7333 5.06658C26.0666 5.13325 26.3333 5.30547 26.5333 5.58325C26.7333 5.86102 26.811 6.16658 26.7666 6.49991L26.3999 10.2666L28.8999 13.1332C29.1222 13.3777 29.2333 13.6666 29.2333 13.9999C29.2333 14.3332 29.1222 14.6221 28.8999 14.8666L26.3999 17.7332L26.7666 21.4999C26.811 21.8332 26.7333 22.1388 26.5333 22.4166C26.3333 22.6944 26.0666 22.8666 25.7333 22.9332L22.0666 23.7332L20.1333 26.9999C19.9555 27.2888 19.711 27.4832 19.3999 27.5832C19.0888 27.6832 18.7777 27.6666 18.4666 27.5332L14.9999 26.0666L11.5333 27.5332C11.2222 27.6666 10.911 27.6832 10.5999 27.5832C10.2888 27.4832 10.0444 27.2888 9.8666 26.9999ZM14.9999 20.6666C15.3777 20.6666 15.6944 20.5388 15.9499 20.2832C16.2055 20.0277 16.3333 19.711 16.3333 19.3332C16.3333 18.9555 16.2055 18.6388 15.9499 18.3832C15.6944 18.1277 15.3777 17.9999 14.9999 17.9999C14.6222 17.9999 14.3055 18.1277 14.0499 18.3832C13.7944 18.6388 13.6666 18.9555 13.6666 19.3332C13.6666 19.711 13.7944 20.0277 14.0499 20.2832C14.3055 20.5388 14.6222 20.6666 14.9999 20.6666ZM14.9999 15.3332C15.3777 15.3332 15.6944 15.2055 15.9499 14.9499C16.2055 14.6944 16.3333 14.3777 16.3333 13.9999V8.66658C16.3333 8.2888 16.2055 7.97214 15.9499 7.71658C15.6944 7.46102 15.3777 7.33325 14.9999 7.33325C14.6222 7.33325 14.3055 7.46102 14.0499 7.71658C13.7944 7.97214 13.6666 8.2888 13.6666 8.66658V13.9999C13.6666 14.3777 13.7944 14.6944 14.0499 14.9499C14.3055 15.2055 14.6222 15.3332 14.9999 15.3332Z" fill="#EE6600"/>
             </svg>
             {getTranslation(lang, 'SIGNIFICANT_AREAS')}
           </div>
         </div>
       {/if}
       {#if (cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen || femaleGreen) && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange || femaleOrange) && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed && !femaleRed}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip good">
             <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10.8666 29L8.93327 25.7334L5.2666 24.9334C4.93327 24.8667 4.6666 24.6945 4.4666 24.4167C4.2666 24.1389 4.18882 23.8334 4.23327 23.5L4.59994 19.7334L2.09993 16.8667C1.87771 16.6223 1.7666 16.3334 1.7666 16C1.7666 15.6667 1.87771 15.3778 2.09993 15.1334L4.59994 12.2667L4.23327 8.50004C4.18882 8.1667 4.2666 7.86115 4.4666 7.58337C4.6666 7.30559 4.93327 7.13337 5.2666 7.0667L8.93327 6.2667L10.8666 3.00004C11.0444 2.71115 11.2888 2.5167 11.5999 2.4167C11.911 2.3167 12.2222 2.33337 12.5333 2.4667L15.9999 3.93337L19.4666 2.4667C19.7777 2.33337 20.0888 2.3167 20.3999 2.4167C20.711 2.5167 20.9555 2.71115 21.1333 3.00004L23.0666 6.2667L26.7333 7.0667C27.0666 7.13337 27.3333 7.30559 27.5333 7.58337C27.7333 7.86115 27.811 8.1667 27.7666 8.50004L27.3999 12.2667L29.8999 15.1334C30.1222 15.3778 30.2333 15.6667 30.2333 16C30.2333 16.3334 30.1222 16.6223 29.8999 16.8667L27.3999 19.7334L27.7666 23.5C27.811 23.8334 27.7333 24.1389 27.5333 24.4167C27.3333 24.6945 27.0666 24.8667 26.7333 24.9334L23.0666 25.7334L21.1333 29C20.9555 29.2889 20.711 29.4834 20.3999 29.5834C20.0888 29.6834 19.7777 29.6667 19.4666 29.5334L15.9999 28.0667L12.5333 29.5334C12.2222 29.6667 11.911 29.6834 11.5999 29.5834C11.2888 29.4834 11.0444 29.2889 10.8666 29ZM15.9999 22.6667C16.3777 22.6667 16.6944 22.5389 16.9499 22.2834C17.2055 22.0278 17.3333 21.7111 17.3333 21.3334C17.3333 20.9556 17.2055 20.6389 16.9499 20.3834C16.6944 20.1278 16.3777 20 15.9999 20C15.6222 20 15.3055 20.1278 15.0499 20.3834C14.7944 20.6389 14.6666 20.9556 14.6666 21.3334C14.6666 21.7111 14.7944 22.0278 15.0499 22.2834C15.3055 22.5389 15.6222 22.6667 15.9999 22.6667ZM15.9999 17.3334C16.3777 17.3334 16.6944 17.2056 16.9499 16.95C17.2055 16.6945 17.3333 16.3778 17.3333 16V10.6667C17.3333 10.2889 17.2055 9.97226 16.9499 9.7167C16.6944 9.46115 16.3777 9.33337 15.9999 9.33337C15.6222 9.33337 15.3055 9.46115 15.0499 9.7167C14.7944 9.97226 14.6666 10.2889 14.6666 10.6667V16C14.6666 16.3778 14.7944 16.6945 15.0499 16.95C15.3055 17.2056 15.6222 17.3334 15.9999 17.3334Z" fill="#119999"/>
             </svg>
             {getTranslation(lang, 'SOME_AREAS')}
           </div>
         </div>
       {/if}
       {#if (cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen || femaleGreen) && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && !femaleOrange && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed || femaleRed)}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip good">
             <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10.8666 29L8.93327 25.7334L5.2666 24.9334C4.93327 24.8667 4.6666 24.6945 4.4666 24.4167C4.2666 24.1389 4.18882 23.8334 4.23327 23.5L4.59994 19.7334L2.09993 16.8667C1.87771 16.6223 1.7666 16.3334 1.7666 16C1.7666 15.6667 1.87771 15.3778 2.09993 15.1334L4.59994 12.2667L4.23327 8.50004C4.18882 8.1667 4.2666 7.86115 4.4666 7.58337C4.6666 7.30559 4.93327 7.13337 5.2666 7.0667L8.93327 6.2667L10.8666 3.00004C11.0444 2.71115 11.2888 2.5167 11.5999 2.4167C11.911 2.3167 12.2222 2.33337 12.5333 2.4667L15.9999 3.93337L19.4666 2.4667C19.7777 2.33337 20.0888 2.3167 20.3999 2.4167C20.711 2.5167 20.9555 2.71115 21.1333 3.00004L23.0666 6.2667L26.7333 7.0667C27.0666 7.13337 27.3333 7.30559 27.5333 7.58337C27.7333 7.86115 27.811 8.1667 27.7666 8.50004L27.3999 12.2667L29.8999 15.1334C30.1222 15.3778 30.2333 15.6667 30.2333 16C30.2333 16.3334 30.1222 16.6223 29.8999 16.8667L27.3999 19.7334L27.7666 23.5C27.811 23.8334 27.7333 24.1389 27.5333 24.4167C27.3333 24.6945 27.0666 24.8667 26.7333 24.9334L23.0666 25.7334L21.1333 29C20.9555 29.2889 20.711 29.4834 20.3999 29.5834C20.0888 29.6834 19.7777 29.6667 19.4666 29.5334L15.9999 28.0667L12.5333 29.5334C12.2222 29.6667 11.911 29.6834 11.5999 29.5834C11.2888 29.4834 11.0444 29.2889 10.8666 29ZM15.9999 22.6667C16.3777 22.6667 16.6944 22.5389 16.9499 22.2834C17.2055 22.0278 17.3333 21.7111 17.3333 21.3334C17.3333 20.9556 17.2055 20.6389 16.9499 20.3834C16.6944 20.1278 16.3777 20 15.9999 20C15.6222 20 15.3055 20.1278 15.0499 20.3834C14.7944 20.6389 14.6666 20.9556 14.6666 21.3334C14.6666 21.7111 14.7944 22.0278 15.0499 22.2834C15.3055 22.5389 15.6222 22.6667 15.9999 22.6667ZM15.9999 17.3334C16.3777 17.3334 16.6944 17.2056 16.9499 16.95C17.2055 16.6945 17.3333 16.3778 17.3333 16V10.6667C17.3333 10.2889 17.2055 9.97226 16.9499 9.7167C16.6944 9.46115 16.3777 9.33337 15.9999 9.33337C15.6222 9.33337 15.3055 9.46115 15.0499 9.7167C14.7944 9.97226 14.6666 10.2889 14.6666 10.6667V16C14.6666 16.3778 14.7944 16.6945 15.0499 16.95C15.3055 17.2056 15.6222 17.3334 15.9999 17.3334Z" fill="#119999"/>
             </svg>
             {getTranslation(lang, 'SOME_AREAS')}
           </div>
         </div>
       {/if}
       {#if !cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && !femaleGreen && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange || femaleOrange) && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed || femaleRed)}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip slightly-bad">
             <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M9.8666 26.9999L7.93327 23.7332L4.2666 22.9332C3.93327 22.8666 3.6666 22.6944 3.4666 22.4166C3.2666 22.1388 3.18882 21.8332 3.23327 21.4999L3.59994 17.7332L1.09993 14.8666C0.877713 14.6221 0.766602 14.3332 0.766602 13.9999C0.766602 13.6666 0.877713 13.3777 1.09993 13.1332L3.59994 10.2666L3.23327 6.49991C3.18882 6.16658 3.2666 5.86102 3.4666 5.58325C3.6666 5.30547 3.93327 5.13325 4.2666 5.06658L7.93327 4.26658L9.8666 0.999914C10.0444 0.711025 10.2888 0.516581 10.5999 0.416581C10.911 0.316581 11.2222 0.333247 11.5333 0.466581L14.9999 1.93325L18.4666 0.466581C18.7777 0.333247 19.0888 0.316581 19.3999 0.416581C19.711 0.516581 19.9555 0.711025 20.1333 0.999914L22.0666 4.26658L25.7333 5.06658C26.0666 5.13325 26.3333 5.30547 26.5333 5.58325C26.7333 5.86102 26.811 6.16658 26.7666 6.49991L26.3999 10.2666L28.8999 13.1332C29.1222 13.3777 29.2333 13.6666 29.2333 13.9999C29.2333 14.3332 29.1222 14.6221 28.8999 14.8666L26.3999 17.7332L26.7666 21.4999C26.811 21.8332 26.7333 22.1388 26.5333 22.4166C26.3333 22.6944 26.0666 22.8666 25.7333 22.9332L22.0666 23.7332L20.1333 26.9999C19.9555 27.2888 19.711 27.4832 19.3999 27.5832C19.0888 27.6832 18.7777 27.6666 18.4666 27.5332L14.9999 26.0666L11.5333 27.5332C11.2222 27.6666 10.911 27.6832 10.5999 27.5832C10.2888 27.4832 10.0444 27.2888 9.8666 26.9999ZM14.9999 20.6666C15.3777 20.6666 15.6944 20.5388 15.9499 20.2832C16.2055 20.0277 16.3333 19.711 16.3333 19.3332C16.3333 18.9555 16.2055 18.6388 15.9499 18.3832C15.6944 18.1277 15.3777 17.9999 14.9999 17.9999C14.6222 17.9999 14.3055 18.1277 14.0499 18.3832C13.7944 18.6388 13.6666 18.9555 13.6666 19.3332C13.6666 19.711 13.7944 20.0277 14.0499 20.2832C14.3055 20.5388 14.6222 20.6666 14.9999 20.6666ZM14.9999 15.3332C15.3777 15.3332 15.6944 15.2055 15.9499 14.9499C16.2055 14.6944 16.3333 14.3777 16.3333 13.9999V8.66658C16.3333 8.2888 16.2055 7.97214 15.9499 7.71658C15.6944 7.46102 15.3777 7.33325 14.9999 7.33325C14.6222 7.33325 14.3055 7.46102 14.0499 7.71658C13.7944 7.97214 13.6666 8.2888 13.6666 8.66658V13.9999C13.6666 14.3777 13.7944 14.6944 14.0499 14.9499C14.3055 15.2055 14.6222 15.3332 14.9999 15.3332Z" fill="#EE6600"/>
             </svg>
             {getTranslation(lang, 'SIGNIFICANT_AREAS')}
           </div>
         </div>
       {/if}
       {#if (cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen || femaleGreen) && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange || femaleOrange) && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed || femaleRed)}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip good">
             <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10.8666 29L8.93327 25.7334L5.2666 24.9334C4.93327 24.8667 4.6666 24.6945 4.4666 24.4167C4.2666 24.1389 4.18882 23.8334 4.23327 23.5L4.59994 19.7334L2.09993 16.8667C1.87771 16.6223 1.7666 16.3334 1.7666 16C1.7666 15.6667 1.87771 15.3778 2.09993 15.1334L4.59994 12.2667L4.23327 8.50004C4.18882 8.1667 4.2666 7.86115 4.4666 7.58337C4.6666 7.30559 4.93327 7.13337 5.2666 7.0667L8.93327 6.2667L10.8666 3.00004C11.0444 2.71115 11.2888 2.5167 11.5999 2.4167C11.911 2.3167 12.2222 2.33337 12.5333 2.4667L15.9999 3.93337L19.4666 2.4667C19.7777 2.33337 20.0888 2.3167 20.3999 2.4167C20.711 2.5167 20.9555 2.71115 21.1333 3.00004L23.0666 6.2667L26.7333 7.0667C27.0666 7.13337 27.3333 7.30559 27.5333 7.58337C27.7333 7.86115 27.811 8.1667 27.7666 8.50004L27.3999 12.2667L29.8999 15.1334C30.1222 15.3778 30.2333 15.6667 30.2333 16C30.2333 16.3334 30.1222 16.6223 29.8999 16.8667L27.3999 19.7334L27.7666 23.5C27.811 23.8334 27.7333 24.1389 27.5333 24.4167C27.3333 24.6945 27.0666 24.8667 26.7333 24.9334L23.0666 25.7334L21.1333 29C20.9555 29.2889 20.711 29.4834 20.3999 29.5834C20.0888 29.6834 19.7777 29.6667 19.4666 29.5334L15.9999 28.0667L12.5333 29.5334C12.2222 29.6667 11.911 29.6834 11.5999 29.5834C11.2888 29.4834 11.0444 29.2889 10.8666 29ZM15.9999 22.6667C16.3777 22.6667 16.6944 22.5389 16.9499 22.2834C17.2055 22.0278 17.3333 21.7111 17.3333 21.3334C17.3333 20.9556 17.2055 20.6389 16.9499 20.3834C16.6944 20.1278 16.3777 20 15.9999 20C15.6222 20 15.3055 20.1278 15.0499 20.3834C14.7944 20.6389 14.6666 20.9556 14.6666 21.3334C14.6666 21.7111 14.7944 22.0278 15.0499 22.2834C15.3055 22.5389 15.6222 22.6667 15.9999 22.6667ZM15.9999 17.3334C16.3777 17.3334 16.6944 17.2056 16.9499 16.95C17.2055 16.6945 17.3333 16.3778 17.3333 16V10.6667C17.3333 10.2889 17.2055 9.97226 16.9499 9.7167C16.6944 9.46115 16.3777 9.33337 15.9999 9.33337C15.6222 9.33337 15.3055 9.46115 15.0499 9.7167C14.7944 9.97226 14.6666 10.2889 14.6666 10.6667V16C14.6666 16.3778 14.7944 16.6945 15.0499 16.95C15.3055 17.2056 15.6222 17.3334 15.9999 17.3334Z" fill="#119999"/>
             </svg>
             {getTranslation(lang, 'SOME_AREAS')}
           </div>
         </div>
       {/if}
     {:else}
       {#if cardioFinalGreen && metabolicFinalGreen && autoFinalGreen && respGreen && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip good">
             <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M13.5999 14.9333L11.6666 13.0333C11.4222 12.7889 11.1166 12.6666 10.7499 12.6666C10.3833 12.6666 10.0666 12.8 9.79993 13.0666C9.55549 13.3111 9.43327 13.6222 9.43327 14C9.43327 14.3778 9.55549 14.6889 9.79993 14.9333L12.6666 17.8C12.9333 18.0666 13.2444 18.2 13.5999 18.2C13.9555 18.2 14.2666 18.0666 14.5333 17.8L20.1999 12.1333C20.4666 11.8666 20.5944 11.5555 20.5833 11.2C20.5722 10.8444 20.4444 10.5333 20.1999 10.2666C19.9333 9.99998 19.6166 9.86109 19.2499 9.84998C18.8833 9.83887 18.5666 9.96664 18.2999 10.2333L13.5999 14.9333ZM9.8666 27L7.93327 23.7333L4.2666 22.9333C3.93327 22.8666 3.6666 22.6944 3.4666 22.4166C3.2666 22.1389 3.18882 21.8333 3.23327 21.5L3.59993 17.7333L1.09993 14.8666C0.877713 14.6222 0.766602 14.3333 0.766602 14C0.766602 13.6666 0.877713 13.3778 1.09993 13.1333L3.59993 10.2666L3.23327 6.49998C3.18882 6.16664 3.2666 5.86109 3.4666 5.58331C3.6666 5.30553 3.93327 5.13331 4.2666 5.06664L7.93327 4.26664L9.8666 0.999975C10.0444 0.711086 10.2888 0.516642 10.5999 0.416642C10.911 0.316642 11.2222 0.333308 11.5333 0.466642L14.9999 1.93331L18.4666 0.466642C18.7777 0.333308 19.0888 0.316642 19.3999 0.416642C19.711 0.516642 19.9555 0.711086 20.1333 0.999975L22.0666 4.26664L25.7333 5.06664C26.0666 5.13331 26.3333 5.30553 26.5333 5.58331C26.7333 5.86109 26.811 6.16664 26.7666 6.49998L26.3999 10.2666L28.8999 13.1333C29.1222 13.3778 29.2333 13.6666 29.2333 14C29.2333 14.3333 29.1222 14.6222 28.8999 14.8666L26.3999 17.7333L26.7666 21.5C26.811 21.8333 26.7333 22.1389 26.5333 22.4166C26.3333 22.6944 26.0666 22.8666 25.7333 22.9333L22.0666 23.7333L20.1333 27C19.9555 27.2889 19.711 27.4833 19.3999 27.5833C19.0888 27.6833 18.7777 27.6666 18.4666 27.5333L14.9999 26.0666L11.5333 27.5333C11.2222 27.6666 10.911 27.6833 10.5999 27.5833C10.2888 27.4833 10.0444 27.2889 9.8666 27Z" fill="#119999"/>
             </svg>
             {getTranslation(lang, 'NO_SIGNIFICANT_AREAS')}
           </div>
         </div>
       {/if}
       {#if !cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && cardioFinalOrange && metabolicFinalOrange && autoFinalOrange && respOrange && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip good">
             <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10.8666 29L8.93327 25.7334L5.2666 24.9334C4.93327 24.8667 4.6666 24.6945 4.4666 24.4167C4.2666 24.1389 4.18882 23.8334 4.23327 23.5L4.59994 19.7334L2.09993 16.8667C1.87771 16.6223 1.7666 16.3334 1.7666 16C1.7666 15.6667 1.87771 15.3778 2.09993 15.1334L4.59994 12.2667L4.23327 8.50004C4.18882 8.1667 4.2666 7.86115 4.4666 7.58337C4.6666 7.30559 4.93327 7.13337 5.2666 7.0667L8.93327 6.2667L10.8666 3.00004C11.0444 2.71115 11.2888 2.5167 11.5999 2.4167C11.911 2.3167 12.2222 2.33337 12.5333 2.4667L15.9999 3.93337L19.4666 2.4667C19.7777 2.33337 20.0888 2.3167 20.3999 2.4167C20.711 2.5167 20.9555 2.71115 21.1333 3.00004L23.0666 6.2667L26.7333 7.0667C27.0666 7.13337 27.3333 7.30559 27.5333 7.58337C27.7333 7.86115 27.811 8.1667 27.7666 8.50004L27.3999 12.2667L29.8999 15.1334C30.1222 15.3778 30.2333 15.6667 30.2333 16C30.2333 16.3334 30.1222 16.6223 29.8999 16.8667L27.3999 19.7334L27.7666 23.5C27.811 23.8334 27.7333 24.1389 27.5333 24.4167C27.3333 24.6945 27.0666 24.8667 26.7333 24.9334L23.0666 25.7334L21.1333 29C20.9555 29.2889 20.711 29.4834 20.3999 29.5834C20.0888 29.6834 19.7777 29.6667 19.4666 29.5334L15.9999 28.0667L12.5333 29.5334C12.2222 29.6667 11.911 29.6834 11.5999 29.5834C11.2888 29.4834 11.0444 29.2889 10.8666 29ZM15.9999 22.6667C16.3777 22.6667 16.6944 22.5389 16.9499 22.2834C17.2055 22.0278 17.3333 21.7111 17.3333 21.3334C17.3333 20.9556 17.2055 20.6389 16.9499 20.3834C16.6944 20.1278 16.3777 20 15.9999 20C15.6222 20 15.3055 20.1278 15.0499 20.3834C14.7944 20.6389 14.6666 20.9556 14.6666 21.3334C14.6666 21.7111 14.7944 22.0278 15.0499 22.2834C15.3055 22.5389 15.6222 22.6667 15.9999 22.6667ZM15.9999 17.3334C16.3777 17.3334 16.6944 17.2056 16.9499 16.95C17.2055 16.6945 17.3333 16.3778 17.3333 16V10.6667C17.3333 10.2889 17.2055 9.97226 16.9499 9.7167C16.6944 9.46115 16.3777 9.33337 15.9999 9.33337C15.6222 9.33337 15.3055 9.46115 15.0499 9.7167C14.7944 9.97226 14.6666 10.2889 14.6666 10.6667V16C14.6666 16.3778 14.7944 16.6945 15.0499 16.95C15.3055 17.2056 15.6222 17.3334 15.9999 17.3334Z" fill="#119999"/>
             </svg>
             {getTranslation(lang, 'SOME_AREAS')}
           </div>
         </div>
       {/if}
       {#if !cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && cardioFinalRed && metabolicFinalRed && autoFinalRed && respRed}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip slightly-bad">
             <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M9.8666 26.9999L7.93327 23.7332L4.2666 22.9332C3.93327 22.8666 3.6666 22.6944 3.4666 22.4166C3.2666 22.1388 3.18882 21.8332 3.23327 21.4999L3.59994 17.7332L1.09993 14.8666C0.877713 14.6221 0.766602 14.3332 0.766602 13.9999C0.766602 13.6666 0.877713 13.3777 1.09993 13.1332L3.59994 10.2666L3.23327 6.49991C3.18882 6.16658 3.2666 5.86102 3.4666 5.58325C3.6666 5.30547 3.93327 5.13325 4.2666 5.06658L7.93327 4.26658L9.8666 0.999914C10.0444 0.711025 10.2888 0.516581 10.5999 0.416581C10.911 0.316581 11.2222 0.333247 11.5333 0.466581L14.9999 1.93325L18.4666 0.466581C18.7777 0.333247 19.0888 0.316581 19.3999 0.416581C19.711 0.516581 19.9555 0.711025 20.1333 0.999914L22.0666 4.26658L25.7333 5.06658C26.0666 5.13325 26.3333 5.30547 26.5333 5.58325C26.7333 5.86102 26.811 6.16658 26.7666 6.49991L26.3999 10.2666L28.8999 13.1332C29.1222 13.3777 29.2333 13.6666 29.2333 13.9999C29.2333 14.3332 29.1222 14.6221 28.8999 14.8666L26.3999 17.7332L26.7666 21.4999C26.811 21.8332 26.7333 22.1388 26.5333 22.4166C26.3333 22.6944 26.0666 22.8666 25.7333 22.9332L22.0666 23.7332L20.1333 26.9999C19.9555 27.2888 19.711 27.4832 19.3999 27.5832C19.0888 27.6832 18.7777 27.6666 18.4666 27.5332L14.9999 26.0666L11.5333 27.5332C11.2222 27.6666 10.911 27.6832 10.5999 27.5832C10.2888 27.4832 10.0444 27.2888 9.8666 26.9999ZM14.9999 20.6666C15.3777 20.6666 15.6944 20.5388 15.9499 20.2832C16.2055 20.0277 16.3333 19.711 16.3333 19.3332C16.3333 18.9555 16.2055 18.6388 15.9499 18.3832C15.6944 18.1277 15.3777 17.9999 14.9999 17.9999C14.6222 17.9999 14.3055 18.1277 14.0499 18.3832C13.7944 18.6388 13.6666 18.9555 13.6666 19.3332C13.6666 19.711 13.7944 20.0277 14.0499 20.2832C14.3055 20.5388 14.6222 20.6666 14.9999 20.6666ZM14.9999 15.3332C15.3777 15.3332 15.6944 15.2055 15.9499 14.9499C16.2055 14.6944 16.3333 14.3777 16.3333 13.9999V8.66658C16.3333 8.2888 16.2055 7.97214 15.9499 7.71658C15.6944 7.46102 15.3777 7.33325 14.9999 7.33325C14.6222 7.33325 14.3055 7.46102 14.0499 7.71658C13.7944 7.97214 13.6666 8.2888 13.6666 8.66658V13.9999C13.6666 14.3777 13.7944 14.6944 14.0499 14.9499C14.3055 15.2055 14.6222 15.3332 14.9999 15.3332Z" fill="#EE6600"/>
             </svg>
             {getTranslation(lang, 'SIGNIFICANT_AREAS')}
           </div>
         </div>
       {/if}
       {#if (cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen) && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange) && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip good">
             <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10.8666 29L8.93327 25.7334L5.2666 24.9334C4.93327 24.8667 4.6666 24.6945 4.4666 24.4167C4.2666 24.1389 4.18882 23.8334 4.23327 23.5L4.59994 19.7334L2.09993 16.8667C1.87771 16.6223 1.7666 16.3334 1.7666 16C1.7666 15.6667 1.87771 15.3778 2.09993 15.1334L4.59994 12.2667L4.23327 8.50004C4.18882 8.1667 4.2666 7.86115 4.4666 7.58337C4.6666 7.30559 4.93327 7.13337 5.2666 7.0667L8.93327 6.2667L10.8666 3.00004C11.0444 2.71115 11.2888 2.5167 11.5999 2.4167C11.911 2.3167 12.2222 2.33337 12.5333 2.4667L15.9999 3.93337L19.4666 2.4667C19.7777 2.33337 20.0888 2.3167 20.3999 2.4167C20.711 2.5167 20.9555 2.71115 21.1333 3.00004L23.0666 6.2667L26.7333 7.0667C27.0666 7.13337 27.3333 7.30559 27.5333 7.58337C27.7333 7.86115 27.811 8.1667 27.7666 8.50004L27.3999 12.2667L29.8999 15.1334C30.1222 15.3778 30.2333 15.6667 30.2333 16C30.2333 16.3334 30.1222 16.6223 29.8999 16.8667L27.3999 19.7334L27.7666 23.5C27.811 23.8334 27.7333 24.1389 27.5333 24.4167C27.3333 24.6945 27.0666 24.8667 26.7333 24.9334L23.0666 25.7334L21.1333 29C20.9555 29.2889 20.711 29.4834 20.3999 29.5834C20.0888 29.6834 19.7777 29.6667 19.4666 29.5334L15.9999 28.0667L12.5333 29.5334C12.2222 29.6667 11.911 29.6834 11.5999 29.5834C11.2888 29.4834 11.0444 29.2889 10.8666 29ZM15.9999 22.6667C16.3777 22.6667 16.6944 22.5389 16.9499 22.2834C17.2055 22.0278 17.3333 21.7111 17.3333 21.3334C17.3333 20.9556 17.2055 20.6389 16.9499 20.3834C16.6944 20.1278 16.3777 20 15.9999 20C15.6222 20 15.3055 20.1278 15.0499 20.3834C14.7944 20.6389 14.6666 20.9556 14.6666 21.3334C14.6666 21.7111 14.7944 22.0278 15.0499 22.2834C15.3055 22.5389 15.6222 22.6667 15.9999 22.6667ZM15.9999 17.3334C16.3777 17.3334 16.6944 17.2056 16.9499 16.95C17.2055 16.6945 17.3333 16.3778 17.3333 16V10.6667C17.3333 10.2889 17.2055 9.97226 16.9499 9.7167C16.6944 9.46115 16.3777 9.33337 15.9999 9.33337C15.6222 9.33337 15.3055 9.46115 15.0499 9.7167C14.7944 9.97226 14.6666 10.2889 14.6666 10.6667V16C14.6666 16.3778 14.7944 16.6945 15.0499 16.95C15.3055 17.2056 15.6222 17.3334 15.9999 17.3334Z" fill="#119999"/>
             </svg>
             {getTranslation(lang, 'SOME_AREAS')}
           </div>
         </div>
       {/if}
       {#if (cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen) && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed)}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip good">
             <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10.8666 29L8.93327 25.7334L5.2666 24.9334C4.93327 24.8667 4.6666 24.6945 4.4666 24.4167C4.2666 24.1389 4.18882 23.8334 4.23327 23.5L4.59994 19.7334L2.09993 16.8667C1.87771 16.6223 1.7666 16.3334 1.7666 16C1.7666 15.6667 1.87771 15.3778 2.09993 15.1334L4.59994 12.2667L4.23327 8.50004C4.18882 8.1667 4.2666 7.86115 4.4666 7.58337C4.6666 7.30559 4.93327 7.13337 5.2666 7.0667L8.93327 6.2667L10.8666 3.00004C11.0444 2.71115 11.2888 2.5167 11.5999 2.4167C11.911 2.3167 12.2222 2.33337 12.5333 2.4667L15.9999 3.93337L19.4666 2.4667C19.7777 2.33337 20.0888 2.3167 20.3999 2.4167C20.711 2.5167 20.9555 2.71115 21.1333 3.00004L23.0666 6.2667L26.7333 7.0667C27.0666 7.13337 27.3333 7.30559 27.5333 7.58337C27.7333 7.86115 27.811 8.1667 27.7666 8.50004L27.3999 12.2667L29.8999 15.1334C30.1222 15.3778 30.2333 15.6667 30.2333 16C30.2333 16.3334 30.1222 16.6223 29.8999 16.8667L27.3999 19.7334L27.7666 23.5C27.811 23.8334 27.7333 24.1389 27.5333 24.4167C27.3333 24.6945 27.0666 24.8667 26.7333 24.9334L23.0666 25.7334L21.1333 29C20.9555 29.2889 20.711 29.4834 20.3999 29.5834C20.0888 29.6834 19.7777 29.6667 19.4666 29.5334L15.9999 28.0667L12.5333 29.5334C12.2222 29.6667 11.911 29.6834 11.5999 29.5834C11.2888 29.4834 11.0444 29.2889 10.8666 29ZM15.9999 22.6667C16.3777 22.6667 16.6944 22.5389 16.9499 22.2834C17.2055 22.0278 17.3333 21.7111 17.3333 21.3334C17.3333 20.9556 17.2055 20.6389 16.9499 20.3834C16.6944 20.1278 16.3777 20 15.9999 20C15.6222 20 15.3055 20.1278 15.0499 20.3834C14.7944 20.6389 14.6666 20.9556 14.6666 21.3334C14.6666 21.7111 14.7944 22.0278 15.0499 22.2834C15.3055 22.5389 15.6222 22.6667 15.9999 22.6667ZM15.9999 17.3334C16.3777 17.3334 16.6944 17.2056 16.9499 16.95C17.2055 16.6945 17.3333 16.3778 17.3333 16V10.6667C17.3333 10.2889 17.2055 9.97226 16.9499 9.7167C16.6944 9.46115 16.3777 9.33337 15.9999 9.33337C15.6222 9.33337 15.3055 9.46115 15.0499 9.7167C14.7944 9.97226 14.6666 10.2889 14.6666 10.6667V16C14.6666 16.3778 14.7944 16.6945 15.0499 16.95C15.3055 17.2056 15.6222 17.3334 15.9999 17.3334Z" fill="#119999"/>
             </svg>
             {getTranslation(lang, 'SOME_AREAS')}
           </div>
         </div>
       {/if}
       {#if !cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange) && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed)}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip slightly-bad">
             <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M9.8666 26.9999L7.93327 23.7332L4.2666 22.9332C3.93327 22.8666 3.6666 22.6944 3.4666 22.4166C3.2666 22.1388 3.18882 21.8332 3.23327 21.4999L3.59994 17.7332L1.09993 14.8666C0.877713 14.6221 0.766602 14.3332 0.766602 13.9999C0.766602 13.6666 0.877713 13.3777 1.09993 13.1332L3.59994 10.2666L3.23327 6.49991C3.18882 6.16658 3.2666 5.86102 3.4666 5.58325C3.6666 5.30547 3.93327 5.13325 4.2666 5.06658L7.93327 4.26658L9.8666 0.999914C10.0444 0.711025 10.2888 0.516581 10.5999 0.416581C10.911 0.316581 11.2222 0.333247 11.5333 0.466581L14.9999 1.93325L18.4666 0.466581C18.7777 0.333247 19.0888 0.316581 19.3999 0.416581C19.711 0.516581 19.9555 0.711025 20.1333 0.999914L22.0666 4.26658L25.7333 5.06658C26.0666 5.13325 26.3333 5.30547 26.5333 5.58325C26.7333 5.86102 26.811 6.16658 26.7666 6.49991L26.3999 10.2666L28.8999 13.1332C29.1222 13.3777 29.2333 13.6666 29.2333 13.9999C29.2333 14.3332 29.1222 14.6221 28.8999 14.8666L26.3999 17.7332L26.7666 21.4999C26.811 21.8332 26.7333 22.1388 26.5333 22.4166C26.3333 22.6944 26.0666 22.8666 25.7333 22.9332L22.0666 23.7332L20.1333 26.9999C19.9555 27.2888 19.711 27.4832 19.3999 27.5832C19.0888 27.6832 18.7777 27.6666 18.4666 27.5332L14.9999 26.0666L11.5333 27.5332C11.2222 27.6666 10.911 27.6832 10.5999 27.5832C10.2888 27.4832 10.0444 27.2888 9.8666 26.9999ZM14.9999 20.6666C15.3777 20.6666 15.6944 20.5388 15.9499 20.2832C16.2055 20.0277 16.3333 19.711 16.3333 19.3332C16.3333 18.9555 16.2055 18.6388 15.9499 18.3832C15.6944 18.1277 15.3777 17.9999 14.9999 17.9999C14.6222 17.9999 14.3055 18.1277 14.0499 18.3832C13.7944 18.6388 13.6666 18.9555 13.6666 19.3332C13.6666 19.711 13.7944 20.0277 14.0499 20.2832C14.3055 20.5388 14.6222 20.6666 14.9999 20.6666ZM14.9999 15.3332C15.3777 15.3332 15.6944 15.2055 15.9499 14.9499C16.2055 14.6944 16.3333 14.3777 16.3333 13.9999V8.66658C16.3333 8.2888 16.2055 7.97214 15.9499 7.71658C15.6944 7.46102 15.3777 7.33325 14.9999 7.33325C14.6222 7.33325 14.3055 7.46102 14.0499 7.71658C13.7944 7.97214 13.6666 8.2888 13.6666 8.66658V13.9999C13.6666 14.3777 13.7944 14.6944 14.0499 14.9499C14.3055 15.2055 14.6222 15.3332 14.9999 15.3332Z" fill="#EE6600"/>
             </svg>
             {getTranslation(lang, 'SIGNIFICANT_AREAS')}
           </div>
         </div>
       {/if}
       {#if (cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen) && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange) && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed)}
         <div style="display: flex; margin-bottom: 3rem;">
           <div class="indication-chip good">
             <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10.8666 29L8.93327 25.7334L5.2666 24.9334C4.93327 24.8667 4.6666 24.6945 4.4666 24.4167C4.2666 24.1389 4.18882 23.8334 4.23327 23.5L4.59994 19.7334L2.09993 16.8667C1.87771 16.6223 1.7666 16.3334 1.7666 16C1.7666 15.6667 1.87771 15.3778 2.09993 15.1334L4.59994 12.2667L4.23327 8.50004C4.18882 8.1667 4.2666 7.86115 4.4666 7.58337C4.6666 7.30559 4.93327 7.13337 5.2666 7.0667L8.93327 6.2667L10.8666 3.00004C11.0444 2.71115 11.2888 2.5167 11.5999 2.4167C11.911 2.3167 12.2222 2.33337 12.5333 2.4667L15.9999 3.93337L19.4666 2.4667C19.7777 2.33337 20.0888 2.3167 20.3999 2.4167C20.711 2.5167 20.9555 2.71115 21.1333 3.00004L23.0666 6.2667L26.7333 7.0667C27.0666 7.13337 27.3333 7.30559 27.5333 7.58337C27.7333 7.86115 27.811 8.1667 27.7666 8.50004L27.3999 12.2667L29.8999 15.1334C30.1222 15.3778 30.2333 15.6667 30.2333 16C30.2333 16.3334 30.1222 16.6223 29.8999 16.8667L27.3999 19.7334L27.7666 23.5C27.811 23.8334 27.7333 24.1389 27.5333 24.4167C27.3333 24.6945 27.0666 24.8667 26.7333 24.9334L23.0666 25.7334L21.1333 29C20.9555 29.2889 20.711 29.4834 20.3999 29.5834C20.0888 29.6834 19.7777 29.6667 19.4666 29.5334L15.9999 28.0667L12.5333 29.5334C12.2222 29.6667 11.911 29.6834 11.5999 29.5834C11.2888 29.4834 11.0444 29.2889 10.8666 29ZM15.9999 22.6667C16.3777 22.6667 16.6944 22.5389 16.9499 22.2834C17.2055 22.0278 17.3333 21.7111 17.3333 21.3334C17.3333 20.9556 17.2055 20.6389 16.9499 20.3834C16.6944 20.1278 16.3777 20 15.9999 20C15.6222 20 15.3055 20.1278 15.0499 20.3834C14.7944 20.6389 14.6666 20.9556 14.6666 21.3334C14.6666 21.7111 14.7944 22.0278 15.0499 22.2834C15.3055 22.5389 15.6222 22.6667 15.9999 22.6667ZM15.9999 17.3334C16.3777 17.3334 16.6944 17.2056 16.9499 16.95C17.2055 16.6945 17.3333 16.3778 17.3333 16V10.6667C17.3333 10.2889 17.2055 9.97226 16.9499 9.7167C16.6944 9.46115 16.3777 9.33337 15.9999 9.33337C15.6222 9.33337 15.3055 9.46115 15.0499 9.7167C14.7944 9.97226 14.6666 10.2889 14.6666 10.6667V16C14.6666 16.3778 14.7944 16.6945 15.0499 16.95C15.3055 17.2056 15.6222 17.3334 15.9999 17.3334Z" fill="#119999"/>
             </svg>
             {getTranslation(lang, 'SOME_AREAS')}
           </div>
         </div>
       {/if}
     {/if}
    {#if badAreas.length}
      <h2>{getTranslation(lang, 'AREAS_FOR_ATTENTION')}</h2>
      <div class="causes mb-6">
        {#each badAreas as area}
          <div class="cause-chip {area.color === 'red' ? 'bad' : 'slightly-bad'}">
            <div class="cause-chip-dot"></div>
            {getTranslation(lang, area.label)}
          </div>
        {/each}
      </div>
      <p class="x-small" style="max-width: 90%;"><b>{getTranslation(lang, 'PLEASE_NOTE')}</b>: {getTranslation(lang, 'PLEASE_NOTE_SENTENCE')}</p>
    {/if}
    {/if}
{/if}

<style>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .row {
        border-top: 1px solid #09341F33;
        display: flex;
        align-items: center;
        height: 70px;
    }

    .indication-chip {
        display: flex;
        align-items: center;
        font-weight: bold;
        padding: .75rem 2rem .75rem 1rem;
        border-radius: .5rem;
        gap: .75rem;
    }
    .indication-chip.good {
        background-color: rgba(17,153,153,.1);
        color: #119999;
    }
    .indication-chip.slightly-bad {
        background-color: rgba(238,102,0,.1);
        color: #EE6600;
    }
    .indication-chip.bad {
        background-color: rgba(221,34,34,.1);
        color: #DD2222;
    }

    .causes {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        margin-bottom: 3rem;
    }
    .cause-chip {
        display: flex;
        align-items: center;
        height: 2rem;
        padding: 0 1rem;
        font-size: 12px;
        gap: .5rem;
        font-weight: bold;
        border-radius: 999px;
    }
    .cause-chip-dot {
        width: 10px;
        height: 10px;
        border-radius: 999px;
    }
    .cause-chip.good  {
        background-color: rgba(17,153,153,.1);
        color: #119999;
    }
    .cause-chip.good .cause-chip-dot  {
        background-color: #119999;
    }
    .cause-chip.slightly-bad .cause-chip-dot  {
        background-color: #EE6600;
    }
    .cause-chip.bad .cause-chip-dot  {
        background-color: #DD2222;
    }
    .cause-chip.slightly-bad {
        background-color: rgba(238,102,0,.1);
        color: #EE6600;
    }
    .cause-chip.bad {
        background-color: rgba(221,34,34,.1);
        color: #DD2222;
    }
    .cause-chip.good {
        background-color: rgba(17,153,153,.1);
        color: #119999;
    }
    .cause-chip.slightly-bad {
        background-color: rgba(238,102,0,.1);
        color: #EE6600;
    }
    .cause-chip.bad {
        background-color: rgba(221,34,34,.1);
        color: #DD2222;
    }
</style>