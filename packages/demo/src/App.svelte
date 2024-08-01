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
  import { MockService } from './mock-service';

  let el: HTMLDivElement;

  onMount(() => {
    window.GaReportService = new MockService();
  });
</script>

<div bind:this={el} class="p-4">
  <!--<ga-chronic></ga-chronic>-->
  <div class="flex flex-col">
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
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-pre-hypertension report="1K4GyKDgsB9ATQflwio7"></ga-pre-hypertension></div>
        <div style="height: 60px;"></div>
        header
        <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-pre-hypertension type="header" report="1K4GyKDgsB9ATQflwio7"></ga-pre-hypertension></div>
      </div>
      <div style="width: 200px;"></div>
      <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-pre-hypertension style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-pre-hypertension></div>
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
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-myocardial subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-myocardial subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-myocardial subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-myocardial subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>
        <div style="height: 20px;"></div>
<!--        female-->
<!--        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-myocardial subtype="peak" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>-->
        <div style="height: 20px;"></div>
        header
        <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-myocardial type="header" report="1K4GyKDgsB9ATQflwio7"></ga-myocardial></div>
      </div>
      <div style="width: 200px;"></div>
      <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-myocardial style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-myocardial></div>
    </div>
    <div class="flex">
      Atherosclerosis (only Female) &nbsp;
      <div class="flex flex-col">
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-atherosclerosis subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-atherosclerosis subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-atherosclerosis subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-atherosclerosis subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-atherosclerosis subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
        <div style="height: 40px;"></div>
        header
        <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-atherosclerosis type="header" report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis></div>
      </div>
      <div style="width: 200px;"></div>
      <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-atherosclerosis style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-atherosclerosis></div>
    </div>
    <div class="flex">
      CORONARY (only Female) &nbsp;
      <div class="flex flex-col">
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-coronary subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-coronary></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-coronary subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-coronary></div>
        <div style="height: 20px;"></div>
        header
        <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-coronary type="header" report="1K4GyKDgsB9ATQflwio7"></ga-coronary></div>
      </div>
      <div style="width: 200px;"></div>
      <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-coronary style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-coronary></div>
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
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colitis subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-colitis></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colitis subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-colitis></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-colitis subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-colitis></div>
        <div style="height: 20px;"></div>
        header
        <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-colitis type="header" report="1K4GyKDgsB9ATQflwio7"></ga-colitis></div>
      </div>
      <div style="width: 200px;"></div>
      <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-colitis style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-colitis></div>
    </div>
    <div class="flex">
      CROHN &nbsp;
      <div class="flex flex-col">
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-crohn subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-crohn subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-crohn subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-crohn subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-crohn subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
        <div style="height: 20px;"></div>
        header
        <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-crohn type="header" report="1K4GyKDgsB9ATQflwio7"></ga-crohn></div>
      </div>
      <div style="width: 200px;"></div>
      <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-crohn style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-crohn></div>
    </div>
    <div class="flex">
      LUPUS (SLE) &nbsp;
      <div class="flex flex-col">
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-lupus subtype="peak18" report="1K4GyKDgsB9ATQflwio7"></ga-lupus></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-lupus subtype="peak22" report="1K4GyKDgsB9ATQflwio7"></ga-lupus></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-lupus subtype="peak23" report="1K4GyKDgsB9ATQflwio7"></ga-lupus></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-lupus subtype="peak26" report="1K4GyKDgsB9ATQflwio7"></ga-lupus></div>
        <div style="height: 20px;"></div>
        header
        <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-lupus type="header" report="1K4GyKDgsB9ATQflwio7"></ga-lupus></div>
      </div>
      <div style="width: 200px;"></div>
      <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-lupus style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-lupus></div>
    </div>
    <div class="flex">
      DIABETES &nbsp;
      <div class="flex flex-col">
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-diabetes subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-diabetes subtype="median" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-diabetes subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-diabetes subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-diabetes subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
        <div style="height: 20px;"></div>
        header
        <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-diabetes type="header" report="1K4GyKDgsB9ATQflwio7"></ga-diabetes></div>
      </div>
      <div style="width: 200px;"></div>
      <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-diabetes style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-diabetes></div>
    </div>
    <div class="flex">
      DYSLIPIDEMIA &nbsp;
      <div class="flex flex-col">
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-dyslipidemia subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-dyslipidemia></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-dyslipidemia subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-dyslipidemia></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-dyslipidemia subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-dyslipidemia></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-dyslipidemia subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-dyslipidemia></div>
        <div style="height: 20px;"></div>
        header
        <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-dyslipidemia type="header" report="1K4GyKDgsB9ATQflwio7"></ga-dyslipidemia></div>
      </div>
      <div style="width: 200px;"></div>
      <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-dyslipidemia style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-dyslipidemia></div>
    </div>

    <div class="flex">
      COPD &nbsp;
      <div class="flex flex-col">
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-copd subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-copd></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-copd subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-copd></div>
        <div style="height: 20px;"></div>
        header
        <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-copd type="header" report="1K4GyKDgsB9ATQflwio7"></ga-copd></div>
      </div>
      <div style="width: 200px;"></div>
      <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-copd style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-copd></div>
    </div>

    <div class="flex">
      MENOPAUSE (FEMALE ONLY) &nbsp;
      <div class="flex flex-col">
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-menopause subtype="mature" report="1K4GyKDgsB9ATQflwio7"></ga-menopause></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-menopause subtype="youth" report="1K4GyKDgsB9ATQflwio7"></ga-menopause></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-menopause subtype="shield" report="1K4GyKDgsB9ATQflwio7"></ga-menopause></div>
        <div style="height: 20px;"></div>
        <div style="width: 630px;height: 49px; border: 1px solid red;"><ga-menopause subtype="lifestyle" report="1K4GyKDgsB9ATQflwio7"></ga-menopause></div>
        <div style="height: 20px;"></div>
        header
        <div style="width: 240px;height: 49px; border: 1px solid red;"><ga-menopause type="header" report="1K4GyKDgsB9ATQflwio7"></ga-menopause></div>
      </div>
      <div style="width: 200px;"></div>
      <div style="width: 520px;height: 928px;border: 1px solid red;"><ga-menopause style="width:50%;" report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-menopause></div>
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
