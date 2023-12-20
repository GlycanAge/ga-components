<script lang="ts">
  import { onMount } from 'svelte';
  import '../../../dist/arthritis.wc.js';
  import '../../../dist/colitis.wc.js';
  import '../../../dist/crohn.wc.js';
  import '../../../dist/lupus.wc.js';
  import '../../../dist/diabetes.wc.js';
  import '../../../dist/myocardial.wc.js';
  import '../../../dist/colorectal.wc.js';
  import '../../../dist/menopause.wc.js';
  import '../../../dist/endometrial.wc.js';
  import '../../../dist/ovarian.wc.js';
  import '../../../dist/dyslipidemia.wc.js';
  import '../../../dist/atherosclerosis.wc.js';
  import '../../../dist/coronary.wc.js';
  import '../../../dist/copd.wc.js';
  import '../../../dist/hypertension.wc.js';
  import '../../../dist/chronic.wc.js';
  import {MockService} from './mock-service';

  let el: HTMLDivElement;

  onMount(() => {
   window.GaReportService = new MockService();
  });
</script>

<div bind:this={el} class="p-4">
    <ga-chronic></ga-chronic>
      <div class="flex flex-col">
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-dyslipidemia report="1K4GyKDgsB9ATQflwio7"></ga-dyslipidemia>
                  <div class="p-10"></div>
                  <ga-dyslipidemia report="1K4GyKDgsB9ATQflwio7" type="header"></ga-dyslipidemia>
              </div>
              <ga-dyslipidemia report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-dyslipidemia>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-atherosclerosis report="1K4GyKDgsB9ATQflwio7"></ga-atherosclerosis>
                  <div class="p-10"></div>
                  <ga-atherosclerosis report="1K4GyKDgsB9ATQflwio7" type="header"></ga-atherosclerosis>
              </div>
              <ga-atherosclerosis report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-atherosclerosis>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-coronary report="1K4GyKDgsB9ATQflwio7"></ga-coronary>
                  <div class="p-10"></div>
                  <ga-coronary report="1K4GyKDgsB9ATQflwio7" type="header"></ga-coronary>
              </div>
              <ga-coronary report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-coronary>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-copd report="1K4GyKDgsB9ATQflwio7"></ga-copd>
                  <div class="p-10"></div>
                  <ga-copd report="1K4GyKDgsB9ATQflwio7" type="header"></ga-copd>
              </div>
              <ga-copd report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-copd>
          </div>
          <div class="flex justify-evenly pb-8">
                  <div class="flex flex-col items-center">
                      <ga-arthritis report="1K4GyKDgsB9ATQflwio7"></ga-arthritis>
                      <div class="p-10"></div>
                      <ga-arthritis report="1K4GyKDgsB9ATQflwio7" type="header"></ga-arthritis>
                  </div>
                  <ga-arthritis report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-arthritis>

              </div>
          <div class="flex justify-evenly pb-8">
                <div class="flex flex-col items-center">
                    <ga-colitis report="1K4GyKDgsB9ATQflwio7"></ga-colitis>
                    <div class="p-10"></div>
                    <ga-colitis report="1K4GyKDgsB9ATQflwio7" type="header"></ga-colitis>
                </div>
              <ga-colitis report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-colitis>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-crohn report="1K4GyKDgsB9ATQflwio7"></ga-crohn>
                  <div class="p-10"></div>
                  <ga-crohn report="1K4GyKDgsB9ATQflwio7" type="header"></ga-crohn>
              </div>
              <ga-crohn report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-crohn>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-lupus report="1K4GyKDgsB9ATQflwio7"></ga-lupus>
                  <div class="p-10"></div>
                  <ga-lupus report="1K4GyKDgsB9ATQflwio7" type="header"></ga-lupus>
              </div>
              <ga-lupus report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-lupus>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-diabetes report="1K4GyKDgsB9ATQflwio7"></ga-diabetes>
                  <div class="p-10"></div>
                  <ga-diabetes report="1K4GyKDgsB9ATQflwio7" type="header"></ga-diabetes>
              </div>
              <ga-diabetes report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-diabetes>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-myocardial report="1K4GyKDgsB9ATQflwio7"></ga-myocardial>
                  <div class="p-10"></div>
                  <ga-myocardial report="1K4GyKDgsB9ATQflwio7" type="header"></ga-myocardial>
              </div>
              <ga-myocardial report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-myocardial>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-colorectal report="1K4GyKDgsB9ATQflwio7"></ga-colorectal>
                  <div class="p-10"></div>
                  <ga-colorectal report="1K4GyKDgsB9ATQflwio7" type="header"></ga-colorectal>
              </div>
              <ga-colorectal report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-colorectal>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-menopause report="1K4GyKDgsB9ATQflwio7"></ga-menopause>
                  <div class="p-10"></div>
                  <ga-menopause report="1K4GyKDgsB9ATQflwio7" type="header"></ga-menopause>
              </div>
              <ga-menopause report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-menopause>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-endometrial report="1K4GyKDgsB9ATQflwio7"></ga-endometrial>
                  <div class="p-10"></div>
                  <ga-endometrial report="1K4GyKDgsB9ATQflwio7" type="header"></ga-endometrial>
              </div>
              <ga-endometrial report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-endometrial>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-ovarian report="1K4GyKDgsB9ATQflwio7"></ga-ovarian>
                  <div class="p-10"></div>
                  <ga-ovarian report="1K4GyKDgsB9ATQflwio7" type="header"></ga-ovarian>
              </div>
              <ga-ovarian report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-ovarian>
          </div>
          <div class="flex justify-evenly pb-8">
              <div class="flex flex-col items-center">
                  <ga-hypertension report="1K4GyKDgsB9ATQflwio7"></ga-hypertension>
                  <div class="p-10"></div>
                  <ga-hypertension report="1K4GyKDgsB9ATQflwio7" type="header"></ga-hypertension>
              </div>
              <ga-hypertension report="1K4GyKDgsB9ATQflwio7" type="summary"></ga-hypertension>
          </div>
      </div>
</div>

