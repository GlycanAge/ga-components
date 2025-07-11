<svelte:options customElement={{ tag: 'ga-action-steps-three', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';

  export let service: Service = window.GaReportService;

  let reportData: any;

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
  let g2Perc = 0; // g2percentile
  let p22Perc = 0; // p22percentile
  let p18Perc = 0; // p18percentile
  let p23Perc = 0; // p23percentile
  let p26Perc = 0; // p26percentile

  let primaryTitle = '';
  let primaryDescription = '';

  let supportiveTitle = '';
  let supportiveDescription = '';

  let insightsTitle = '';
  let insightsDescription = '';

  let show = false;

  function calculateCardiovascular() {
    if (riskCounter === 1) {cardioRed = true;} else {cardioGreen = true;}
    if (preCounter === 1) {cardioRed = true;} else {cardioGreen = true;}
    if (hyperCounter < 2) {cardioGreen = true;} else if (hyperCounter === 2) {cardioOrange = true;} else if (hyperCounter === 3) {cardioRed = true;}
    if (gender === 'F') {if (cvaFCounter === 0) {cardioGreen = true} else if (cvaFCounter === 1) {cardioRed = true;}} else {if (cvaCounter < 3) {cardioGreen = true} else if (cvaCounter === 3) {cardioOrange = true;} else if (cvaCounter === 4) {cardioRed = true;}}
    if (gender === 'F') {if (atheroCounter < 3) {cardioGreen = true;} else if (atheroCounter === 5) {cardioRed = true;} else {cardioOrange = true;}}
    if (gender === 'F') {if (coronaryCounter === 0) {cardioGreen = true} else if (coronaryCounter === 1) {cardioOrange = true;} else if (coronaryCounter === 2) {cardioRed = true;}}

    if (cardioGreen && !cardioOrange && !cardioRed) {cardioFinalGreen = true;}

    if ((!cardioGreen && cardioOrange && !cardioRed) || (cardioGreen && cardioOrange && !cardioRed) || (cardioGreen && !cardioOrange && cardioRed) || (cardioGreen && cardioOrange && cardioRed)) {
      cardioFinalOrange = true;
    }

    if ((!cardioGreen && !cardioOrange && cardioRed) || (!cardioGreen && cardioOrange && cardioRed)) {
      cardioFinalRed = true;
    }
  }

  function calculateMetabolic() {
    if (diabetesCounter < 3) {metabolicGreen = true;} else if (diabetesCounter === 5) {metabolicRed = true;} else {metabolicOrange = true;}
    if (dyslipidemiaCounter < 3) {metabolicGreen = true;} else if (dyslipidemiaCounter === 3) {metabolicOrange = true;} else {metabolicRed = true;}

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
    if (arthritisCounter < 3) {autoGreen = true;} else if (arthritisCounter === 3) {autoOrange = true;} else {autoRed = true;}
    if (colitisCounter < 3) {autoGreen = true;} else if (colitisCounter === 3) {autoOrange = true;} else {autoRed = true;}
    if (crohnCounter < 3) {autoGreen = true;} else if (crohnCounter === 5) {autoRed = true;} else {autoOrange = true;}
    if (sleCounter < 3) {autoGreen = true;} else if (sleCounter === 3) {autoOrange = true;} else {autoRed = true;}

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
    if (copdCounter === 0) {respGreen = true;} else if (copdCounter === 1) {respOrange = true;} else {respRed = true;}
  }

  function calculateFemale() {
    if (periCounter < 3) {femaleGreen = true;} else if (periCounter === 3) {femaleOrange = true;} else {femaleRed = true;}
  }

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

    calculateCardiovascular();
    calculateMetabolic();
    calculateAutoimmunity();
    calculateResp();
    if (gender === 'F') {
      calculateFemale();
    }

    // Primary calc

    if (sPerc >= 67 && g2Perc >= 67 && g0Perc <= 33) {primaryTitle = 'Maintain current approach';primaryDescription = 'Optimal primary indexes indicate strong immune regulation and effective control over inflammation. We highly recommend maintaining the current diet, lifestyle, and recovery strategies that are contributing to this excellent result.';}
    if ((sPerc >= 67 && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) || (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) || ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && g0Perc <= 33) || (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) || ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) || ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) || ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67))) {primaryTitle = 'Review lifestyle and inflammatory risk factors';primaryDescription = 'Average primary indexes represent a typical state but not an optimal one, suggesting there is room for improvement. Incremental improvements to lifestyle are recommended, such as optimizing micronutrient intake, enhancing sleep and fitness protocols, and continuing to monitor inflammatory risk factors.';}

    if (
        (sPerc <= 33 && g2Perc >= 67 && g0Perc <= 33) ||
        (sPerc <= 33 && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) ||
        (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) ||
        (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67))
    ) {
      primaryTitle = 'Review inflammation resolution and gut health';
      primaryDescription = 'A suboptimal Glycan Shield suggests the body may be struggling to resolve inflammation efficiently. A focus on an anti-inflammatory diet is recommended, ensuring adequate intake of key micronutrients. Prioritizing gut health, increasing polyphenol intake, and incorporating more physical activity are also advised.';
    }

    if (
      (sPerc >= 67 && g2Perc <= 33 && g0Perc <= 33) ||
      (sPerc >= 67 && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) ||
      ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && g0Perc <= 33) ||
      ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67))
    ) {
      primaryTitle = 'Review immune capacity and metabolic health';
      primaryDescription = 'A suboptimal Glycan Youth suggests a reduced anti-inflammatory capacity and a prematurely aging immune system. A review of lifestyle factors such as weight, activity levels, and sources of inflammation is advised. Assessing hormonal balance and taking steps to support overall immune health should also be considered.';
    }

    if (
      (sPerc >= 67 && g2Perc >= 67 && g0Perc >= 67) ||
      (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) ||
      ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && g0Perc >= 67) ||
      ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67)
    ) {
      primaryTitle = 'Review sources of chronic inflammation';
      primaryDescription = 'A suboptimal Glycan Mature strongly suggests the immune system is in a chronic inflammatory state. This warrants a thorough evaluation of metabolic health, hormone balance, and potential sources of chronic inflammation.';
    }

    if (
        (sPerc >= 67 && g2Perc <= 33 && g0Perc >= 67) ||
        (sPerc <= 33 && g2Perc >= 67 && g0Perc >= 67) ||
        (sPerc <= 33 && g2Perc <= 33 && g0Perc <= 33) ||
        ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && g0Perc >= 67) ||
        (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) ||
        (sPerc <= 33 && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67))
    ) {
      primaryTitle = 'Review sources of inflammation and immune health';
      primaryDescription = 'This result points to multiple areas of concern, such as difficulty resolving inflammation , a prematurely aging immune system , or a chronically inflammatory state. It is advised to review lifestyle, diet, gut health, metabolic and hormonal balance to address these interconnected issues.';
    }

    if (sPerc <= 33 && g2Perc <= 33 && g0Perc >= 67) {
      primaryTitle = 'Undertake a systemic review of chronic inflammation';
      primaryDescription = 'Suboptimal results across all primary indexes indicate a significant issue with chronic inflammation that requires a systemic approach. This warrants a thorough evaluation of all potential drivers, including metabolic health, hormone balance, diet, stress, and lifestyle, to address the underlying causes of this pro-inflammatory state.';
    }

    // Supportive calc

    if ((g1Perc >= 18 && g1Perc <= 82) && bPerc <= 33) {
      supportiveTitle = 'Maintain current approach to stress and lifestyle';
      supportiveDescription = 'Optimal supportive indexes reflect a healthy adaptive flexibility in the immune system and excellent adaptation to stress. Maintaining the current lifestyle is advised to preserve this balance.';
    }

    if ((g1Perc >= 18 && g1Perc <= 82) && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = 'Monitor and manage stress levels';
      supportiveDescription = 'An average Glycan Bisection is a typical result for the general population. In the context of a high-stress lifestyle, taking proactive steps to manage stress through improved sleep and recovery is advisable to prevent it from negatively impacting the immune system.';
    }

    if ((g1Perc <= 17 && bPerc >= 67) || (g1Perc >= 83 && bPerc >= 67)) {
      supportiveTitle = 'Review sources of stress and immune imbalance';
      supportiveDescription = 'This result indicates multiple areas for review. The focus should be on addressing chronic stress (from Glycan Bisection) and investigating the causes of immune system rigidity or transition (from Glycan Median).';
    }

    if (
      (g1Perc <= 17 && (bPerc > 33 && bPerc < 67)) || (g1Perc <= 17 && bPerc <= 33)
    ) {
      supportiveTitle = 'Review factors affecting immune flexibility';
      supportiveDescription = "A low Glycan Median indicates a certain rigidity in the immune system's ability to adapt, which is linked to immune instability and increased cardiovascular risk. The focus should be on managing overall inflammation and evaluating for underlying chronic health issues that may contribute to this state.";
    }

    if ((g1Perc >= 18 && g1Perc <= 82) && bPerc >= 67) {
      supportiveTitle = 'Review and address sources of chronic stress';
      supportiveDescription = 'A suboptimal Glycan Bisection suggests a state of chronic stress and inflammation, likely driven by sympathetic nervous system overdrive. It is highly recommended to prioritize stress management techniques, improve sleep quality, and focus on recovery.';
    }

    if (
      (g1Perc >= 83 && (bPerc > 33 && bPerc < 67)) || (g1Perc >= 83 && bPerc <= 33)
    ) {
      supportiveTitle = 'Investigate causes of immune system transition';
      supportiveDescription = 'A high Glycan Median shows the immune system is in a state of transition. This could be a positive response (e.g., recovery from illness) or a negative one (e.g., early dysregulation). This result should be interpreted in the full context of the other glycan indexes and recent lifestyle changes to determine the cause.';
    }

    // Glycan Insights calc
    if (gender === 'F') {
        if (cardioFinalGreen && metabolicFinalGreen && autoFinalGreen && respGreen && femaleGreen && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && !femaleOrange && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed && !femaleRed) {
          insightsTitle = 'Confirming system-wide balance';
          insightsDescription = "Your client's positive results are reflected across all key physiological systems. This confirms their current lifestyle is effectively controlling chronic inflammation and supporting systemic health.";
        }

        if (
          (!cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && !femaleGreen && cardioFinalOrange && metabolicFinalOrange && autoFinalOrange && respOrange && femaleOrange && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed && !femaleRed) ||
          ((cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen || femaleGreen) && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange || femaleOrange) && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed && !femaleRed) ||
          ((cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen || femaleGreen) && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && !femaleOrange && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed || femaleRed)) ||
          ((cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen || femaleGreen) && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange || femaleOrange) && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed || femaleRed))
        ) {
          insightsTitle = 'Connect drivers to affected systems';
          insightsDescription = "The imbalances from steps 1 and/or 2 are having an impact on some areas of health. Use this to explain how addressing the core glycan issues can protect these specific systems.";
        }

        if (
          (!cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && !femaleGreen && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && !femaleOrange && cardioFinalRed && metabolicFinalRed && autoFinalRed && respRed && femaleRed) ||
          (!cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && !femaleGreen && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange || femaleOrange) && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed || femaleRed))
        ) {
          insightsTitle = 'Prioritise based on systemic impact';
          insightsDescription = 'The significant glycan issues identified earlier are impacting multiple systems. This reinforces the need for a systemic review, focusing on why addressing the root causes is critical to protecting these vital areas.';
        }
    } else {
      if (cardioFinalGreen && metabolicFinalGreen && autoFinalGreen && respGreen && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed) {
        insightsTitle = 'Confirming system-wide balance';
        insightsDescription = "Your client's positive results are reflected across all key physiological systems. This confirms their current lifestyle is effectively controlling chronic inflammation and supporting systemic health.";
      }

      if (
        (!cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && cardioFinalOrange && metabolicFinalOrange && autoFinalOrange && respOrange && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed) ||
        ((cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen) && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange) && !cardioFinalRed && !metabolicFinalRed && !autoFinalRed && !respRed) ||
        ((cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen) && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed)) ||
        ((cardioFinalGreen || metabolicFinalGreen || autoFinalGreen || respGreen) && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange) && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed))
      ) {
        insightsTitle = 'Connect drivers to affected systems';
        insightsDescription = 'The imbalances from steps 1 and/or 2 are having an impact on some areas of health. Use this to explain how addressing the core glycan issues can protect these specific systems.';
      }

      if (
        (!cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && !cardioFinalOrange && !metabolicFinalOrange && !autoFinalOrange && !respOrange && cardioFinalRed && metabolicFinalRed && autoFinalRed && respRed) ||
        (!cardioFinalGreen && !metabolicFinalGreen && !autoFinalGreen && !respGreen && (cardioFinalOrange || metabolicFinalOrange || autoFinalOrange || respOrange) && (cardioFinalRed || metabolicFinalRed || autoFinalRed || respRed))
      ) {
        insightsTitle = 'Prioritise based on systemic impact';
        insightsDescription = 'The significant glycan issues identified earlier are impacting multiple systems. This reinforces the need for a systemic review, focusing on why addressing the root causes is critical to protecting these vital areas.';
      }
    }

    show = true;
  });
</script>

{#if show}
    <div class="main">
        <div class="items-baseline" style="display: flex; margin: 5 rem; border-top: 1px solid #09341F33; padding: 20px 20px 20px 0px; height: auto;">
          <div class="number">1</div>
          <div>
            <div style="margin-bottom: 1rem;"><b>{primaryTitle}</b></div>
            <div class="x-small">{primaryDescription}</div>
          </div>
        </div>
        <div class="items-baseline" style="display: flex; margin: 5 rem; border-top: 1px solid #09341F33; padding: 20px 20px 20px 0px; height: auto;">
          <div class="number">2</div>
          <div>
            <div style="margin-bottom: 1rem;"><b>{supportiveTitle}</b></div>
            <div class="x-small">{supportiveDescription}</div>
          </div>
        </div>
        <div class="items-baseline" style="display: flex; margin: 5 rem; border-top: 1px solid #09341F33; padding: 20px 20px 20px 0px; height: auto;">
          <div class="number">3</div>
          <div>
            <div style="margin-bottom: 1rem;"><b>{insightsTitle}</b></div>
            <div class="x-small">{insightsDescription}</div>
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

    .number {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--regular);
        font-weight: bold;
        color: white;
        min-width: 2rem;
        min-height: 2rem;
        margin-right: 1rem;
        background: #119999;
        border-radius: 2px;
    }
    .items-baseline {
        align-items: baseline;
    }
</style>