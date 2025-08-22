<svelte:options customElement={{ tag: 'ga-action-steps-three', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';

  export let service: Service = window.GaReportService;

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
  let g2Perc = 0; // g2percentile
  let p22Perc = 0; // p22percentile
  let p18Perc = 0; // p18percentile
  let p23Perc = 0; // p23percentile
  let p26Perc = 0; // p26percentile

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

    // Primary calc
    if (sPerc >= 67 && g2Perc >= 67 && g0Perc <= 33) {primaryTitle = 'Maintain and protect current inflammation regulation and immune aging';primaryDescription = 'Evaluate whether these optimal results are driven by pharmaceutical interventions (e.g., HRT, TRT, thyroxine, incretin therapies such as GLP-1 agonists, anti-inflammatories), favorable genetic traits (e.g., longevity-associated or glycan-beneficial variants), or lifestyle factors. If risk factors or chronic conditions are present, this profile confirms that current strategies are successfully controlling inflammation.'; primaryFurther = 'None beyond standard annual preventive labs unless new symptoms emerge.';}
    if (sPerc >= 67 && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Minimize low-grade inflammatory triggers to prevent further immune system aging';primaryDescription='To mitigate ongoing immune activation, assess for potential triggers such as recent or unresolved infections. Focus on reducing pro-inflammatory foods, correcting energy imbalances, and limiting alcohol intake. Reinforce consistent sleep patterns and provide strategies to support stress regulation and recovery.';primaryFurther='Consider hs-CRP and other inflammatory markers, 25-hydroxy vitamin D, ferritin, and iron studies. Assess lipid profile and fasting glucose–insulin to evaluate cardiometabolic load.';}
    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle='Optimize physical activity to support immune youthfulness';primaryDescription='Encourage a balanced training approach by limiting excessive higher-intensity cardio, incorporating or maintaining strength training, and prioritizing recovery strategies to support long-term immune youthfulness. If there is a personal or family history of autoimmune conditions, monitor Glycan Youth trends closely, as maintaining this index may be particularly important in genetically susceptible individuals.';primaryFurther='If there is a personal or family history of autoimmune or inflammatory conditions, evaluate ESR, hs-CRP, ANA screen, and baseline thyroid function (TSH, fT4, fT3). Monitor vitamin D status.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && g0Perc <= 33) {primaryTitle='Support resolution pathways through gut, nutrition, and fitness';primaryDescription='Focus on improving gut health with targeted probiotics, prebiotics, and fiber diversity, increase the nutrient density of the diet through whole foods and anti-inflammatory compounds, assess for micronutrient deficiencies if needed, and support overall immune resilience by enhancing physical fitness.';primaryFurther='Consider micronutrient evaluation (omega-3 index, zinc, magnesium, vitamin D, B12, folate), hs-CRP, and targeted gut health assessment (stool analysis, microbiome profile, or permeability markers) if clinical suspicion exists.';}
    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Counterbalance high-demand lifestyles with structured recovery';primaryDescription='Support the client in establishing consistent rest routines, strengthening stress regulation strategies, and aligning daily habits with circadian rhythms. For individuals in high-pressure environments, implement practical recovery tools, such as scheduled downtime, breathwork, or short movement breaks, to buffer the immune system from ongoing load. Monitor cardiometabolic health markers and address any early signs of imbalance to prevent further strain on the immune system.';primaryFurther='Evaluate lipid profile, hs-CRP, 25-hydroxy vitamin D, fasting glucose–insulin, ANA screen. Consider assessment of sleep quality and HRV for recovery monitoring.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Strengthen vascular resilience through targeted lifestyle support';primaryDescription='Recommend a dietary pattern emphasizing omega-3 sources, nitrate-containing vegetables, and polyphenol-rich foods, while limiting processed foods, excess sodium, and added sugars. Advise the client to engage in regular moderate-intensity aerobic activity alongside consistent recovery and sleep routines. Monitor cardiovascular health, particularly if there is a personal or family history of cardiovascular conditions.';primaryFurther='Check lipid profile, blood pressure (including variability), hs-CRP, and fasting glucose–insulin. Consider Omega-3 Index and homocysteine for cardiovascular support planning.';}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle='Improve immune responsiveness by supporting recovery, rhythm, and core systems';primaryDescription='Recommend implementing structured wind-down routines and consistent bedtimes to stabilise circadian rhythm, incorporate active recovery strategies, and support gut and liver health through increased fiber diversity, cruciferous vegetables, and evidence-based nutritional compounds known to enhance immune system regulation.';primaryFurther='Micronutrient profile (zinc, magnesium, vitamin D, B12, folate, omega-3 index), hs-CRP, fasting glucose–insulin. If symptoms persist, evaluate sex hormones and thyroid function for systemic recovery impact.';}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Shift early immune aging with targeted, system-wide intervention';primaryDescription='Recommend structured improvements in nutrition (e.g. anti-inflammatory, nutrient-dense meals with stable energy balance), increase physical activity with both aerobic and resistance training, reinforce consistent, high-quality sleep, and implement daily stress recovery practices. This pattern may signal early metabolic strain, so a more deliberate and comprehensive intervention is warranted to restore immune resilience.';primaryFurther='Full cardiometabolic panel (lipids, glucose–insulin, hs-CRP), vitamin D, and selected micronutrients, ANA screen. Consider baseline hormone evaluation if lifestyle strain is prolonged.';}

    if (sPerc >= 67 && g2Perc >= 67 && g0Perc >= 67) {primaryTitle='Lower chronic inflammatory burden to slow biological aging';primaryDescription='Prioritize reducing inflammatory load through an anti-inflammatory, metabolically balanced diet, address central drivers like insulin resistance, dyslipidaemia, or hormonal imbalance, and implement daily stress regulation strategies.';primaryFurther='Assess blood pressure, glucose control, lipid panel, hormone status, and systemic inflammatory markers to guide targeted intervention.';}
    if (sPerc >= 67 && g2Perc <= 33 && g0Perc <= 33) {primaryTitle='Restore immune adaptability by targeting core metabolic and regulatory systems';primaryDescription='Improve body composition, stabilise circadian rhythm, and optimize energy intake. Encourage a balanced training approach by limiting excessive cardio, introducing or maintaining strength training, and prioritizing recovery strategies. If there is a personal or family history of autoimmune conditions, monitor Glycan Youth trends closely.';primaryFurther='Consider evaluating markers of metabolic health, sex hormone levels, and autoimmunity to uncover potential underlying drivers.';}
    if (sPerc <= 33 && g2Perc >= 67 && g0Perc <= 33) {primaryTitle='Improve inflammation resolution by restoring gut–nutrient–stress axis';primaryDescription='Support gut integrity through increased fiber diversity, fermented foods, and digestive assessment if needed; optimize micronutrients and glycan precursors (e.g. zinc, magnesium, omega-3, vitamin D); and reduce cumulative stress through consistent recovery routines and circadian alignment.';primaryFurther='Consider investigating digestive function, systemic inflammation, and sex hormone balance to identify and correct underlying barriers to immune resolution.';}
    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle='Reverse chronic inflammation by targeting metabolic and immune overload';primaryDescription='Recommend a structured anti-inflammatory protocol focused on improving metabolic health, optimizing body composition, stabilising blood sugar, and reducing dietary and lifestyle-driven inflammatory triggers.';primaryFurther='Evaluate blood pressure, lipid status, sex hormone balance, and systemic inflammation to identify key drivers and implement targeted interventions that can reverse the immune aging trajectory.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && g0Perc >= 67) {primaryTitle='Lower immune load by reducing inflammatory triggers and enhancing recovery';primaryDescription='Focus on improving gut health, limiting exposure to dietary and environmental toxins, and eliminating processed, pro-inflammatory foods.';primaryFurther='Assess blood pressure, glycemic control, lipid profile, sex hormone status, and systemic inflammation to guide targeted interventions that protect long-term immune resilience and prevent immune aging.';}
    if (sPerc >= 67 && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Support immune recovery by rebuilding core regulatory capacity';primaryDescription='Focus on improving body composition while avoiding overtraining, emphasize movement quality and sufficient recovery, stabilise circadian rhythm through regular sleep–wake cycles, and address energy status with a diverse, anti-inflammatory diet.';primaryFurther='Evaluate metabolic markers, hormone levels, and autoimmune risk to uncover and address deeper drivers of immune aging.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && g0Perc <= 33) {primaryTitle='Rebuild immune youth by balancing stress, movement, and recovery';primaryDescription='Support recovery through consistent sleep–wake timing, moderate and well-balanced physical activity, and structured rest routines. Ensure adequate nourishment and optimize daily energy intake.';primaryFurther='Evaluate metabolic markers, thyroid function, hormone levels, and autoimmune risk to uncover and address deeper drivers of immune aging.';}
    if (sPerc <= 33 && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Strengthen immune regulation by supporting gut integrity and reducing immune irritants';primaryDescription='Focus on improving gut health through fiber diversity and microbiome-supportive strategies, support detoxification and elimination pathways, and reduce exposure to common immune irritants such as alcohol, food sensitivities, and environmental toxins.';primaryFurther='Consider evaluating digestive markers (e.g. microbiome profile, zonulin), systemic inflammation, key micronutrients, sex hormone balance, and autoantibodies when indicated.';}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle='Improve immune recovery by supporting gut–liver axis and nutritional sufficiency';primaryDescription='Strengthen gut and liver function through fiber-rich, anti-inflammatory foods and targeted support as needed, reinforce structured recovery routines, and ensure adequate intake of key micronutrients and glycan-building nutrients.';primaryFurther='Consider assessing iron status, B12, folate, vitamin D, zinc, magnesium, and digestive function (e.g. microbiome profile, stool markers, zonulin); screen for autoantibodies if autoimmune risk is present.';}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle='Reduce inflammatory burden through systemic lifestyle and environmental interventions';primaryDescription='Recommend a nutrient-dense, anti-inflammatory diet; restore sleep–wake rhythm; reinforce daily stress regulation; introduce consistent, moderate physical activity; and prioritize body composition improvement to reduce metabolic strain. To lower cumulative immune load, reduce environmental exposures such as alcohol, endocrine disruptors, and pollutants.';primaryFurther='Assess cardiometabolic markers, hormone balance, systemic inflammation, and autoimmune panels if indicated.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Rebuild immune resilience by rebalancing stress, movement, and nutrition';primaryDescription='Support deeper recovery through consistent sleep–wake cycles and structured rest, and help find an appropriate balance between physical activity and recovery to avoid over- or undertraining. Optimize macro- and micronutrient intake, particularly protein, minerals, and anti-inflammatory compounds, and evaluate thyroid function, cortisol rhythm, insulin sensitivity, body composition, and sleep quality to identify key contributors to immune decline.';primaryFurther='CBC, liver/kidney panels, inflammatory markers, glucose–insulin panel, full thyroid and adrenal assessment, vitamin D, gut function (stool, microbiome, breath test), toxin screen, and autoimmune markers as indicated. Functional metrics such as HRV, VO₂max, and body composition may also help track recovery.';}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Restore immune resolution by supporting gut health and recovery signals';primaryDescription='Focus on gut repair through fiber diversity and microbiome-supportive strategies, reduce immune irritants such as processed foods, alcohol, and environmental toxins, and reinforce the body’s recovery capacity with consistent sleep, gentle movement, and structured stress-regulation routines.';primaryFurther='Consider evaluating gut permeability or microbiome balance, nutrient absorption (zinc, magnesium, B vitamins), cortisol rhythm, and other signs of barrier dysfunction.';}
    if (sPerc >= 67 && g2Perc <= 33 && g0Perc >= 67) {primaryTitle='Rebuild immune balance by restoring circadian rhythm and hormonal regulation';primaryDescription='A comprehensive health evaluation is recommended to investigate underlying contributors. Prioritize circadian alignment with consistent sleep–wake schedules, integrate brief but regular recovery practices during the workday (e.g. short walks, breathwork, movement breaks), and avoid overreliance on high-intensity exercise in favour of balanced strength and mobility training. Address central drivers of immune disruption like hypertension, insulin resistance, dyslipidaemia, or hormonal imbalance.';primaryFurther='CBC, liver and kidney panels, lipid profile, glucose–insulin panel, full thyroid, adrenal, and sex hormone assessment, inflammatory markers (including hs-CRP), vitamin D, iron status, B12, folate, magnesium, zinc, homocysteine, Omega-3 Index, gut function tests (stool analysis, microbiome, breath tests), and autoimmune markers if indicated. Functional metrics such as HRV, VO₂max, and body composition can also support tracking of recovery.';}
    if (sPerc <= 33 && g2Perc >= 67 && g0Perc >= 67) {primaryTitle='Lower systemic inflammatory load and protect cardiovascular health';primaryDescription='A comprehensive health evaluation is recommended to investigate underlying contributors. Implement an anti-inflammatory, nutrient-dense diet and address oral and gut health to remove potential sources of persistent immune activation. emphasize cardiovascular support through regular, moderate physical activity, stress regulation, and optimal sleep.';primaryFurther='CBC, liver and kidney panels, lipid profile, glucose–insulin panel, full thyroid, adrenal, and sex hormone assessment, inflammatory markers (including hs-CRP), vitamin D, iron status, B12, folate, magnesium, zinc, homocysteine, Omega-3 Index, gut function tests (stool analysis, microbiome, breath tests), and autoimmune markers if indicated. Functional metrics such as HRV, VO₂max, and body composition can also support tracking of recovery.';}
    if (sPerc <= 33 && g2Perc <= 33 && g0Perc <= 33) {primaryTitle='Rebuild immune adaptability through restoration and resilience';primaryDescription='A comprehensive health evaluation is recommended to investigate underlying contributors. Focus on replenishing nutrient reserves with a diverse, protein- and micronutrient-rich diet, support digestive health to optimize absorption, and implement structured recovery through consistent sleep, stress regulation, and gentle, progressive physical activity.';primaryFurther='CBC, liver and kidney panels, lipid profile, glucose–insulin panel, full thyroid, adrenal, and sex hormone assessment, inflammatory markers (including hs-CRP), vitamin D, iron status, B12, folate, magnesium, zinc, homocysteine, Omega-3 Index, gut function tests (stool analysis, microbiome, breath tests), and autoimmune markers if indicated. Functional metrics such as HRV, VO₂max, and body composition can also support tracking of recovery.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && g0Perc >= 67) {primaryTitle='Address root drivers of systemic immune strain and chronic inflammation';primaryDescription='A comprehensive health evaluation is recommended to investigate underlying contributors. Focus on removing inflammatory load (from diet, environment, gut), rebuilding recovery capacity (through sleep, nutrition, stress regulation), and restoring metabolic and hormonal balance.';primaryFurther='CBC, liver and kidney panels, lipid profile, glucose–insulin panel, full thyroid, adrenal, and sex hormone assessment, inflammatory markers (including hs-CRP), vitamin D, iron status, B12, folate, magnesium, zinc, homocysteine, Omega-3 Index, gut function tests (stool analysis, microbiome, breath tests), and autoimmune markers if indicated. Functional metrics such as HRV, VO₂max, and body composition can also support tracking of recovery.';}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle='Address root drivers of systemic immune strain and chronic inflammation';primaryDescription='A comprehensive health evaluation is recommended to investigate underlying contributors. Evaluate and address gut/barrier dysfunction, endocrine imbalance, toxin exposures, and chronic stress; reduce dietary and environmental inflammatory load while reinforcing sleep, targeted nutrition, and stress‑regulation to re‑establish resolution capacity.';primaryFurther='CBC, liver and kidney panels, lipid profile, glucose–insulin panel, full thyroid, adrenal, and sex hormone assessment, inflammatory markers (including hs-CRP), vitamin D, iron status, B12, folate, magnesium, zinc, homocysteine, Omega-3 Index, gut function tests (stool analysis, microbiome, breath tests), and autoimmune markers if indicated. Functional metrics such as HRV, VO₂max, and body composition can also support tracking of recovery.';}
    if (sPerc <= 33 && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Rebuild immune adaptability through restoration and resilience';primaryDescription='A comprehensive health evaluation is recommended to investigate underlying contributors. Focus on replenishing nutrient reserves with a diverse, protein- and micronutrient-rich diet, support digestive health to optimize absorption, and implement structured recovery through consistent sleep, stress regulation, and gentle, progressive physical activity. Make efforts to restore metabolic and hormonal balance.';primaryFurther='CBC, liver and kidney panels, lipid profile, glucose–insulin panel, full thyroid, adrenal, and sex hormone assessment, inflammatory markers (including hs-CRP), vitamin D, iron status, B12, folate, magnesium, zinc, homocysteine, Omega-3 Index, gut function tests (stool analysis, microbiome, breath tests), and autoimmune markers if indicated. Functional metrics such as HRV, VO₂max, and body composition can also support tracking of recovery.';}
    if (sPerc <= 33 && g2Perc <= 33 && g0Perc >= 67) {primaryTitle='Reduce inflammatory burden and restore systemic resilience';primaryDescription='A comprehensive health evaluation is recommended to investigate underlying contributors. Focus on removing inflammatory load (from diet, environment, gut), rebuilding recovery capacity (through sleep, nutrition, stress regulation), and restoring metabolic and hormonal balance.';primaryFurther='CBC, liver and kidney panels, lipid profile, glucose–insulin panel, full thyroid, adrenal, and sex hormone assessment, inflammatory markers (including hs-CRP), vitamin D, iron status, B12, folate, magnesium, zinc, homocysteine, Omega-3 Index, gut function tests (stool analysis, microbiome, breath tests), and autoimmune markers if indicated. Functional metrics such as HRV, VO₂max, and body composition can also support tracking of recovery.';}

    // Supportive calc
    if (g1Perc <= 33 && bPerc >= 67) {
      supportiveTitle = 'Reduce systemic and environmental strain to stabilise vascular–respiratory resilience';
      supportiveDescription = 'Address autonomic stress by improving circadian alignment, enforcing structured recovery routines, and minimizing environmental exposures such as poor air quality, smoking, or occupational irritants. Support cardiovascular and respiratory health with moderate aerobic conditioning and regular monitoring of blood pressure and lung function.';
      supportiveFurther = 'Blood pressure assessment (including variability), lung function testing, full cardiometabolic panel. Consider advanced vascular imaging if risk factors or family history indicate. Where relevant, conduct sleep studies to rule out sleep apnoea and assess autonomic regulation using HRV or similar metrics.';
    }

    if (g1Perc <= 33 && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = 'Enhance vascular resilience and stabilise autonomic function';
      supportiveDescription = 'Maintain regular aerobic and resistance training, and improve recovery quality by addressing sleep and stress regulation. Minimise factors that impair vascular function, such as excessive alcohol, high-sodium diets, or unmanaged blood pressure.';
      supportiveFurther = 'Cardiovascular screening with blood pressure monitoring (including variability), lipid profiling, glucose–insulin testing. Assess circadian rhythm stability and recovery capacity through sleep quality assessment and HRV tracking, and consider advanced vascular imaging if risk factors or family history indicate.';
    }

    if (g1Perc <= 33 && bPerc <= 33) {
      supportiveTitle = 'Address vascular vulnerability and monitor for early disease markers';
      supportiveDescription = 'Strengthen vascular integrity through a cardioprotective diet, regular aerobic activity, and maintaining optimal blood pressure and lipid balance. Consider targeted screening if family history is present.';
      supportiveFurther = 'Lipid profiling, glucose–insulin assessment, hsCRP, and advanced cardiovascular risk screening (e.g., coronary calcium scoring or carotid intima-media thickness) when indicated. Autoimmune panels may be considered if clinical history or primary indexes suggest an autoimmune profile.';
    }

    if ((g1Perc > 33 && g1Perc < 67) && bPerc >= 67) {
      supportiveTitle = 'Reduce environmental stress load';
      supportiveDescription = 'Reduce inflammatory triggers, improve air quality, manage stress, and optimizing body composition.';
      supportiveFurther = 'Smoking status confirmation, blood pressure variation, HRV for stress load, sleep quality assessment, environmental toxin review, and body composition analysis.';
    }

    if ((g1Perc > 33 && g1Perc < 67) && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = 'Maintain balance and monitor';
      supportiveDescription = 'Review lifestyle rhythm, nutrient sufficiency, and signs of subtle cardiovascular or respiratory pressure.';
      supportiveFurther = 'Reassess blood pressure and HRV periodically to track stability.';
    }

    if ((g1Perc > 33 && g1Perc < 67) && bPerc <= 33) {
      supportiveTitle = 'Support vascular stability';
      supportiveDescription = 'Maintain cardiovascular hygiene and monitor trends over time.';
      supportiveFurther = 'Check blood pressure and lipid profile at routine intervals.';
    }

    if (g1Perc >= 67 && bPerc >= 67) {
      supportiveTitle = 'Reduce environmental stress load';
      supportiveDescription = 'Address toxin exposure, sleep disruption, and respiratory strain.';
      supportiveFurther = 'Assess blood pressure variation, HRV, sleep quality, and environmental toxin exposure profile.';
    }

    if (g1Perc >= 67 && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = 'Prevent escalation of autonomic strain';
      supportiveDescription = 'Encourage continued support for circadian rhythm, respiratory hygiene, and stress-reducing lifestyle practices. Follow up if symptoms emerge or primary indexes shift unfavorably.';
      supportiveFurther = 'Periodically assess blood pressure, HRV and sleep patterns.';
    }

    if (g1Perc >= 67 && bPerc <= 33) {
      supportiveTitle = 'Maintain optimal supportive balance';
      supportiveDescription = 'Continue current preventive strategies and monitor periodically.';
      supportiveFurther = 'No additional testing unless primary indexes indicate otherwise.';
    }

    show = true;
  });
</script>

{#if show}
    <div class="main">
        <div class="items-baseline" style="display: flex; background-color: #E4EDE9; padding: 20px 20px 0px 0px; height: auto; position: relative; border-radius: 12px;">
          <div class="number" style="background: #36624C; min-width: 15rem;">Primary focus — based on primary indexes</div>
          <div style="padding: 0 2rem 2rem 2rem;">
            <div style="margin-bottom: 0.3rem; font-size: 12px;"><b>{primaryTitle}</b></div>
            <div style="font-size: 12px;">{primaryDescription}</div>
            <div style="height: 24px"></div>
            <div class="further">Further testing suggested:</div>
            <div style="font-size: 12px;">{primaryFurther}</div>
          </div>
        </div>
        <div class="items-baseline" style="display: flex; background-color: #F2F6F4; border-radius: 12px; padding: 20px 20px 0px 0px; height: auto; position: relative;">
          <div class="number" style="background: #86AF9A; min-width: 17rem;">Secondary focus — based on secondary indexes</div>
          <div style="padding: 0 2rem 2rem 2rem;">
            <div style="margin-bottom: 0.3rem; font-size: 12px;"><b>{supportiveTitle}</b></div>
            <div style="font-size: 12px;">{supportiveDescription}</div>
            <div style="height: 24px"></div>
            <div class="further">Further testing suggested:</div>
            <div style="font-size: 12px;">{supportiveFurther}</div>
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
        gap: 40px;
    }

    .number {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        min-height: 1.7rem;
        margin-right: 1rem;
        border-radius: 48px;
        position: absolute;
        top: -9%;
        font-weight: bold;
        left: 3%;
    }
    .items-baseline {
        align-items: baseline;
    }

    .further {
        font-weight: 700;
        font-size: 10px;
        line-height: 160%;
        letter-spacing: 0.005em;
        color: rgba(9, 52, 31, 0.8);
    }
</style>