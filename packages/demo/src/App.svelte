<script lang="ts">
  import { onMount } from 'svelte';
  import '../../../dist/arthritis.wc.js';
  import '../../../dist/colitis.wc.js';
  import '../../../dist/crohn.wc.js';
  import '../../../dist/lupus.wc.js';
  import '../../../dist/diabetes.wc.js';
  import '../../../dist/myocardial.wc.js';
  import '../../../dist/menopause.wc.js';
  import '../../../dist/dyslipidemia.wc.js';
  import '../../../dist/atherosclerosis.wc.js';
  import '../../../dist/coronary.wc.js';
  import '../../../dist/copd.wc.js';
  import '../../../dist/hypertension.wc.js';
  import '../../../dist/hypertension-risk.wc.js';
  import '../../../dist/pre-hypertension.wc.js';
  import '../../../dist/chronic.wc.js';
  import '../../../dist/colorectal.wc.js';
  import '../../../dist/endometrial.wc.js';
  import '../../../dist/ovarian.wc.js';
  import '../../../dist/age-graph.wc.js';
  import '../../../dist/index-graph.wc.js';
  import '../../../dist/median-graph.wc.js';
  import '../../../dist/index-graph-japanese.wc.js';
  import '../../../dist/median-graph-japanese.wc.js';
  import '../../../dist/results-overview.wc.js';
  import '../../../dist/single-overview.wc.js';
  import '../../../dist/main-result.wc.js';
  import '../../../dist/insights-overview.wc.js';
  import '../../../dist/arrow-graph.wc.js';
  import '../../../dist/overlap-title.wc.js';
  import { MockService } from './mock-service';

  let stuff1 = false;
  let stuff2 = true;

  onMount(() => {
    window.GaReportService = new MockService();
  });
</script>

<div style="width: 100%; height: 100px; display: flex; justify-content: start; gap: 1rem; border-bottom: 3px solid #E76538; align-items: center; position: fixed; overflow: hidden; top: 0; z-index: 1000; background-color: #ffefe7; padding: 0.6rem;">
  <div on:click={() => {stuff1 = true; stuff2 = false;}} role="button" style="width: 150px; height: 60px; border-radius: 10px; border: 2px solid #E76538; color: {stuff1 ? 'white' : '#E76538'}; display:  flex; align-items: center; justify-content: center; font-size: 1.5rem; background-color: {stuff1 ? '#E76538' : ''};">b2b v1.4</div>
  <div on:click={() => {stuff1 = false; stuff2 = true;}} role="button" style="width: 150px; height: 60px; border-radius: 10px; border: 2px solid #E76538; color: {stuff2 ? 'white' : '#E76538'}; display:  flex; align-items: center; justify-content: center; font-size: 1.5rem; background-color: {stuff2 ? '#E76538' : ''};">b2b v2.0</div>
</div>

{#if stuff1}
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 120px">
    <div class="flex flex-col items-center" style="width: 80%; border-bottom: 2px dashed black; padding: 2rem 0 2rem 0;">
      <b>1. age-graph.wc.svelte</b>
      <div style="margin: 50px;"></div>
      <div style="width: 34rem; border: 1px dashed lightcoral;">
        <!-- width is set to 34rem to match the width from handlebars for easier development-->
        <ga-age-graph lang="english"></ga-age-graph>
      </div>
      <div style="margin: 30px;"></div>
    </div>
    <div class="flex flex-col items-center" style="width: 80%; border-bottom: 2px dashed black; padding: 2rem 0 2rem 0;">
      <b>2. index-graph.wc.svelte</b>
      <div style="margin: 40px;"></div>
      <div style="width: 70ch; border: 1px dashed lightcoral;">
        <!-- width is set to 78ch to match the width from handlebars for easier development-->
        <ga-index-graph type="shield" lang="english"></ga-index-graph>
      </div>
      <div style="margin: 50px;"></div>
    </div>
    <div class="flex flex-col items-center" style="width: 80%; border-bottom: 2px dashed black; padding: 2rem 0 2rem 0;">
      <b>3. median-graph.wc.svelte</b>
      <div style="margin: 60px;"></div>
      <div style="width: 70ch; border: 1px dashed lightcoral;">
        <!-- width is set to 78ch to match the width from handlebars for easier development-->
        <ga-median-graph></ga-median-graph>
      </div>
      <div style="margin: 60px;"></div>
    </div>
    <div class="flex flex-col items-center" style="width: 80%; border-bottom: 2px dashed black; padding: 2rem 0 2rem 0;">
      <b>4. index-graph-japanese.wc.svelte</b>
      <div style="margin: 60px;"></div>
      <div style="width: 70ch; border: 1px dashed lightcoral;">
        <!-- width is set to 78ch to match the width from handlebars for easier development-->
        <ga-index-graph-japanese type="youth"></ga-index-graph-japanese>
      </div>
      <div style="margin: 60px;"></div>
    </div>
    <div style="width: 80%; border-bottom: 2px dashed black; padding: 2rem 0 2rem 0;" class="flex flex-col items-center">
      <div style="height: 5rem; width: 25rem; border: 1px dashed lightcoral;">
        <ga-chronic></ga-chronic>
      </div>
    </div>
    <div class="flex flex-col">
      <div style="margin: 50px;"></div>
      <div class="flex">
        HYPERTENSION RISK &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-hypertension-risk report="1K4GyKDgsB9ATQflwio7"></ga-hypertension-risk></div>
          <div style="height: 60px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-hypertension-risk report="1K4GyKDgsB9ATQflwio7" type="header"></ga-hypertension-risk></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-hypertension-risk style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-hypertension-risk></div>
      </div>
      <div class="flex">
        PREHYPERTENSION &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-pre-hypertension lang="polish" report="1K4GyKDgsB9ATQflwio7"></ga-pre-hypertension></div>
          <div style="height: 60px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-pre-hypertension lang="polish" type="header" report="1K4GyKDgsB9ATQflwio7"></ga-pre-hypertension></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-pre-hypertension lang="polish" style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-pre-hypertension></div>
      </div>
      <div class="flex">
        HYPERTension &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-hypertension subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-hypertension></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-hypertension subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-hypertension></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-hypertension subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-hypertension></div>
          <div style="height: 60px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-hypertension type="header" report="1K4GyKDgsB9ATQflwio7"></ga-hypertension></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-hypertension style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-hypertension></div>
      </div>
      <div class="flex">
        MYOCARDIAL DIFFERENT FOR FEMALE/MALE &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-myocardial lang="polish" subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-myocardial lang="polish" subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-myocardial lang="polish" subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-myocardial lang="polish" subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>
          <div style="height: 20px;"></div>
          <!--        female-->
          <!--        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-myocardial subtype="peak" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>-->
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-myocardial lang="polish" type="header" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-myocardial lang="polish" style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-myocardial></div>
      </div>
      <div class="flex">
        Atherosclerosis (only Female) &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-atherosclerosis lang="polish" subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-atherosclerosis lang="polish" subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-atherosclerosis lang="polish" subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-atherosclerosis lang="polish" subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-atherosclerosis lang="polish" subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
          <div style="height: 40px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-atherosclerosis lang="polish" type="header" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-atherosclerosis lang="polish" style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-atherosclerosis></div>
      </div>
      <div class="flex">
        CORONARY (only Female) &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-coronary lang="polish" subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-coronary></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-coronary lang="polish" subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-coronary></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-coronary lang="polish" type="header" report="1K4GyKDgsB9ATQflwio7"></ga-coronary></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-coronary lang="polish" style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-coronary></div>
      </div>
      <div class="flex">
        ARTHRITIS &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-arthritis subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-arthritis></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-arthritis subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-arthritis></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-arthritis subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-arthritis></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-arthritis subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-arthritis></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-arthritis type="header" report="1K4GyKDgsB9ATQflwio7"></ga-arthritis></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-arthritis style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-arthritis></div>
      </div>
      <div class="flex">
        COLITIS
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colitis subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-colitis></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colitis lang="polish" subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-colitis></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colitis lang="polish" subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-colitis></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colitis lang="polish" subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-colitis></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-colitis lang="polish" type="header" report="1K4GyKDgsB9ATQflwio7"></ga-colitis></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-colitis lang="polish" style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-colitis></div>
      </div>
      <div class="flex">
        CROHN &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-crohn lang="polish" subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-crohn lang="polish" subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-crohn lang="polish" subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-crohn lang="polish" subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-crohn lang="polish" subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-crohn lang="polish" type="header" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-crohn lang="polish" style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-crohn></div>
      </div>
      <div class="flex">
        LUPUS (SLE) &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-lupus lang="polish" subtype="peak18" report="1K4GyKDgsB9ATQflwio7"></ga-lupus></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-lupus lang="polish" subtype="peak22" report="1K4GyKDgsB9ATQflwio7"></ga-lupus></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-lupus lang="polish" subtype="peak23" report="1K4GyKDgsB9ATQflwio7"></ga-lupus></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-lupus lang="polish" subtype="peak26" report="1K4GyKDgsB9ATQflwio7"></ga-lupus></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-lupus lang="polish" type="header" report="1K4GyKDgsB9ATQflwio7"></ga-lupus></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-lupus lang="polish" style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-lupus></div>
      </div>
      <div class="flex">
        DIABETES &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-diabetes lang="polish" subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-diabetes lang="polish" subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-diabetes lang="polish" subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-diabetes lang="polish" subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-diabetes lang="polish" subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-diabetes lang="polish" type="header" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-diabetes lang="polish" style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-diabetes></div>
      </div>
      <div class="flex">
        DYSLIPIDEMIA &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-dyslipidemia lang="polish" subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-dyslipidemia></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-dyslipidemia lang="polish" subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-dyslipidemia></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-dyslipidemia lang="polish" subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-dyslipidemia></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-dyslipidemia lang="polish" subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-dyslipidemia></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-dyslipidemia lang="polish" type="header" report="1K4GyKDgsB9ATQflwio7"></ga-dyslipidemia></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-dyslipidemia lang="polish" style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-dyslipidemia></div>
      </div>

      <div class="flex">
        COPD &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-copd lang="polish" subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-copd></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-copd lang="polish" subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-copd></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-copd lang="polish" type="header" report="1K4GyKDgsB9ATQflwio7"></ga-copd></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-copd lang="polish" style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-copd></div>
      </div>

      <div class="flex">
        MENOPAUSE (FEMALE ONLY) &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-menopause lang="polish" subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-menopause></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-menopause lang="polish" subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-menopause></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-menopause lang="polish" subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-menopause></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-menopause lang="polish" subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-menopause></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-menopause lang="polish" type="header" report="1K4GyKDgsB9ATQflwio7"></ga-menopause></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-menopause lang="polish" style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-menopause></div>
      </div>

      <div class="flex">
        COLORECTAL &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colorectal subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-colorectal></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colorectal subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-colorectal></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colorectal subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-colorectal></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colorectal subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-colorectal></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colorectal subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-colorectal></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-colorectal type="header" report="1K4GyKDgsB9ATQflwio7"></ga-colorectal></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-colorectal style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-colorectal></div>
      </div>

      <div class="flex">
        ENDOMETRIAL &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-endometrial subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-endometrial></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-endometrial subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-endometrial></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-endometrial subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-endometrial></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-endometrial subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-endometrial></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-endometrial subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-endometrial></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-endometrial type="header" report="1K4GyKDgsB9ATQflwio7"></ga-endometrial></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-endometrial style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-endometrial></div>
      </div>

      <div class="flex">
        OVARIAN &nbsp;
        <div class="flex flex-col">
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-ovarian subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-ovarian></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-ovarian subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-ovarian></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-ovarian subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-ovarian></div>
          <div style="height: 20px;"></div>
          <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-ovarian subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-ovarian></div>
          <div style="height: 20px;"></div>
          header
          <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-ovarian type="header" report="1K4GyKDgsB9ATQflwio7"></ga-ovarian></div>
        </div>
        <div style="width: 200px;"></div>
        <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-ovarian style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-ovarian></div>
      </div>
    </div>
  </div>
{/if}

{#if stuff2}
  <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 120px;">
    <div class="flex flex-col items-center" style="padding: 2rem 0 2rem 0; width: 80%; border-bottom: 2px dashed black;">
        <b>1. main-result.wc.svelte</b>
        <div style="border: 1px dashed lightcoral; width: 550px; height: 30rem;">
            <ga-main-result lang="english"></ga-main-result>
        </div>
      </div>
    <div style="border-bottom: 2px dashed black; display: flex; flex-direction: column; align-items: center; width: 80%; padding: 2rem 0 2rem 0;">
      <b>2. overlap-title.wc.svelte</b>
      <div style="width: 66ch;height: 11ch; border: 1px dashed lightcoral;">
        <ga-overlap-title disease="dyslipidemia"></ga-overlap-title>
      </div>
      <div style="margin: 4px;"></div>
      <div style="width: 66ch;height: 11ch; border: 1px dashed lightcoral;">
        <ga-overlap-title disease="coronary"></ga-overlap-title>
      </div>
      <div style="margin: 4px;"></div>
      <div style="width: 66ch;height: 11ch; border: 1px dashed lightcoral;">
        <ga-overlap-title disease="risk"></ga-overlap-title>
      </div>
    </div>
    <div class="flex flex-col items-center" style="padding: 2rem 0 2rem 0; width: 80%; border-bottom: 2px dashed black;">
        <b>3. results-overview.wc.svelte</b>
        <div style="display: flex; flex-direction: column; height: 588px; width: 550px; border: 1px dashed lightcoral;">
          <div style="width: 100%; height: 98px;">
            <ga-results-overview type="age" lang="english"></ga-results-overview>
          </div>
          <div style="width: 100%; height: 98px; border-top: 2px solid #09341F33;">
            <ga-results-overview type="shield" lang="english"></ga-results-overview>
          </div>
          <div style="width: 100%; height: 98px; border-top: 2px solid #09341F33;">
            <ga-results-overview type="youth" lang="english"></ga-results-overview>
          </div>
          <div style="width: 100%; height: 98px; border-top: 2px solid #09341F33;">
            <ga-results-overview type="mature" lang="english"></ga-results-overview>
          </div>
          <div style="width: 100%; height: 98px; border-top: 2px solid #09341F33;">
            <ga-results-overview type="median" lang="english"></ga-results-overview>
          </div>
          <div style="width: 100%; height: 98px; border-top: 2px solid #09341F33;">
            <ga-results-overview type="lifestyle" lang="english"></ga-results-overview>
          </div>
        </div>
    </div>
    <div class="flex flex-col items-center" style="padding: 2rem 0 2rem 0; width: 80%; border-bottom: 2px dashed black;">
        <b>4. insights-overview.wc.svelte</b>
        <div style="height: 588px; width: 550px; border: 1px dashed lightcoral;">
          <ga-insights-overview lang="english"></ga-insights-overview>
        </div>
      </div>
    <div class="flex flex-col items-center" style="padding: 2rem 0 2rem 0; width: 80%; border-bottom: 2px dashed black;">
        <b>5. single-overview.wc.svelte</b>
        <div style="width: 550px; height: 200px; border: 1px dashed lightcoral;">
          <ga-single-overview type="shield" lang="english"></ga-single-overview>
        </div>
        <div style="margin: 5px;"></div>
        <div style="width: 550px; height: 200px; border: 1px dashed lightcoral;">
          <ga-single-overview type="youth" lang="english"></ga-single-overview>
        </div>
        <div style="margin: 5px;"></div>
        <div style="width: 550px; height: 200px; border: 1px dashed lightcoral;">
          <ga-single-overview type="mature" lang="english"></ga-single-overview>
        </div>
        <div style="margin: 5px;"></div>
        <div style="width: 550px; height: 200px; border: 1px dashed lightcoral;">
          <ga-single-overview type="median" lang="english"></ga-single-overview>
        </div>
        <div style="margin: 5px;"></div>
        <div style="width: 550px; height: 200px; border: 1px dashed lightcoral;">
          <ga-single-overview type="lifestyle" lang="english"></ga-single-overview>
        </div>
    </div>
    <div class="flex flex-col items-center" style="padding: 2rem 0 2rem 0; width: 80%; border-bottom: 2px dashed black;">
      <b>6. arrow-graph.wc.svelte</b>
      <div style="width: 550px; height: 82px; border: 1px dashed lightcoral;">
        <ga-arrow-graph subtype="mature" direction="right"></ga-arrow-graph>
      </div>
      <div style="margin: 5px;"></div>
      <div style="width: 550px; height: 82px; border: 1px dashed lightcoral;">
        <ga-arrow-graph subtype="youth" direction="left"></ga-arrow-graph>
      </div>
      <div style="margin: 5px;"></div>
      <div style="width: 550px; height: 82px; border: 1px dashed lightcoral;">
        <ga-arrow-graph subtype="shield" direction="left"></ga-arrow-graph>
      </div>
      <div style="margin: 5px;"></div>
      <div style="width: 550px; height: 82px; border: 1px dashed lightcoral;">
        <ga-arrow-graph subtype="lifestyle" direction="right"></ga-arrow-graph>
      </div>
      <div style="margin: 5px;"></div>
      <div style="width: 550px; height: 82px; border: 1px dashed lightcoral;">
        <ga-arrow-graph subtype="median" direction="left"></ga-arrow-graph>
      </div>
    </div>
    <div style="margin: 200px;"></div>
  </div>
{/if}


