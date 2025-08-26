<svelte:options customElement={{ tag: 'ga-action-steps-three-client', shadow: 'open' }}/>

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
    if (sPerc >= 67 && g2Perc >= 67 && g0Perc <= 33) {primaryTitle = 'Keep doing what works';primaryDescription = 'Think about what’s been supporting your health recently, whether it’s a balanced lifestyle, specific therapies (like hormone support, thyroid treatment, or anti-inflammatory medication), or other habits, and make sure you continue them. The key is to maintain the routines, diet, and recovery practices that are keeping your immune system in top shape.'; primaryFurther = 'No extra testing needed unless you notice new symptoms or your lifestyle changes significantly. Routine annual health checks are enough.';}
    if (sPerc >= 67 && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Reduce everyday inflammation triggers';primaryDescription='Focus on steady energy from balanced meals, limit alcohol and heavily processed foods, and make sure you’re getting enough rest and recovery. If you’ve been sick recently, allow extra time for full recovery before returning to intense activity.';primaryFurther='(Optional) You might want to check vitamin D, an inflammation marker like hs-CRP, and iron storage (ferritin) to make sure your body has what it needs for recovery.';}
    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle='Balance your exercise routine';primaryDescription='Avoid overdoing high-intensity cardio, make sure you include strength training, and allow your body time to recover. If you have a personal or family history of autoimmune conditions, keep an eye on this marker over time, as maintaining it is important for long-term health.';primaryFurther='If there’s a family history of autoimmune conditions, you might ask your doctor about basic hormone and inflammation checks.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && g0Perc <= 33) {primaryTitle='Support your body’s recovery systems';primaryDescription=' Eat more whole, nutrient-rich foods (especially colourful vegetables, healthy fats, and fiber), look after your gut with a variety of plant foods and possibly probiotics, and keep active to help your immune system stay responsive.';primaryFurther='Consider a basic gut health review and testing your vitamin and mineral levels (like zinc, magnesium, and vitamin D) if recovery is slower than usual.';}
    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Balance busy life with better recovery';primaryDescription='Make time for regular rest, improve sleep habits, and create short breaks for relaxation during the day. Even small changes, like a short walk, breathing exercises, or avoiding screens before bed, can help your body reset and maintain resilience.';primaryFurther='It can help to track your basic heart health with cholesterol tests, monitor inflammation (hs-CRP), and check vitamin D once or twice a year.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Support heart and immune health together';primaryDescription='Eat more omega-3-rich foods like fatty fish, walnuts, or flaxseeds, and include vegetables that support circulation, like beetroot or leafy greens. Keep processed food, added sugar, and excess salt low. Aim for regular, moderate exercise that you enjoy.';primaryFurther='You might want to check cholesterol, blood pressure, and inflammation markers like hs-CRP to keep an eye on early changes.';}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle='Improve recovery and immune flexibility';primaryDescription='Get to bed at a consistent time, include gentle recovery activities like stretching or walks, and support your liver and gut health by eating more fiber-rich vegetables and cruciferous plants like broccoli, kale, or cabbage.';primaryFurther='Consider asking your doctor to check your vitamin and mineral levels and inflammation markers if you often feel run-down.';}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Strengthen your health foundations';primaryDescription='Focus on balanced, nutrient-dense meals, regular exercise that includes both cardio and strength training, quality sleep, and daily stress-management habits like meditation, walks, or time outdoors.';primaryFurther='Routine checks like cholesterol, blood pressure, vitamin D, and inflammation markers can help track your progress.';}

    if (sPerc >= 67 && g2Perc >= 67 && g0Perc >= 67) {primaryTitle='Reduce your body’s inflammation load';primaryDescription='Eat a balanced, anti-inflammatory diet (lots of colourful vegetables, healthy fats, and lean proteins) and limit processed foods, sugar, and alcohol. Focus on maintaining a healthy weight, managing stress, and keeping active with a mix of strength and gentle cardio exercise.';primaryFurther='You may want to check cholesterol, blood sugar control (fasting glucose or HbA1c), hormone balance, vitamin D, and inflammation markers like hs-CRP.';}
    if (sPerc >= 67 && g2Perc <= 33 && g0Perc <= 33) {primaryTitle='Rebuild immune strength and adaptability';primaryDescription='Aim for a balance between activity and rest — avoid overtraining, include strength training, and make time for recovery. Support your body clock by going to bed and waking up at consistent times, and eat nourishing, varied meals to keep your energy stable.';primaryFurther='Consider checking your thyroid and sex hormones, vitamin D, blood sugar control, and inflammation markers with your healthcare provider.';}
    if (sPerc <= 33 && g2Perc >= 67 && g0Perc <= 33) {primaryTitle='Support your gut and nutrient Intake';primaryDescription=' Eat more fiber-rich foods and fermented foods (like yoghurt, kefir, or sauerkraut), focus on whole-food sources of vitamins and minerals, and add gentle stress-reducing practices to your daily routine.';primaryFurther='Gut health testing, nutrient level checks (zinc, magnesium, vitamin D), and inflammation markers like hs-CRP can help uncover underlying issues.';}

    if (sPerc >= 67 && g2Perc <= 33 && g0Perc >= 67) {primaryTitle='Restore balance and lower inflammation';primaryDescription='Focus on steady energy from balanced meals, regular but not excessive exercise, and better recovery habits, including consistent sleep and downtime. Look for ways to reduce stress, such as mindfulness, light movement, or outdoor time.';primaryFurther='Focus on steady energy from balanced meals, regular but not excessive exercise, and better recovery habits, including consistent sleep and downtime. Look for ways to reduce stress, such as mindfulness, light movement, or outdoor time.';}
    if (sPerc <= 33 && g2Perc >= 67 && g0Perc >= 67) {primaryTitle='Remove triggers and support immune recovery';primaryDescription='Work on improving digestion, balancing hormones, reducing exposure to environmental irritants, and lowering stress. Support your diet with plenty of fiber-rich plant foods, quality protein, and healthy fats. Prioritize sleep and light, restorative exercise.';primaryFurther='Consider cholesterol and blood sugar testing, thyroid and sex hormone checks, vitamin D, inflammation markers (hs-CRP), and gut microbiome testing.';}
    if (sPerc <= 33 && g2Perc <= 33 && g0Perc <= 33) {primaryTitle='Rebuild nutrient reserves and recovery capacity';primaryDescription='Eat a nutrient-dense diet rich in protein, vegetables, and healthy fats. Support digestion with fiber and possibly fermented foods. Include regular rest, avoid overtraining, and keep a consistent bedtime.';primaryFurther='It’s worth checking nutrient levels (iron, B12, folate, vitamin D, zinc, magnesium), gut health testing, inflammation markers, and thyroid and sex hormones.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && g0Perc >= 67) {primaryTitle='Focus on root causes and lifestyle balance';primaryDescription='Work on improving your diet, reducing stress, and creating stronger daily routines for sleep and recovery. Include moderate exercise and avoid pushing yourself into exhaustion.';primaryFurther='A comprehensive check-up may help, including: cholesterol, blood sugar control, vitamin D, thyroid and sex hormones, inflammation markers, and gut health testing.';}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle='Identify and address underlying stressors';primaryDescription='Support gut and liver health, improve sleep quality, reduce alcohol and processed food, and add restorative activities to your week. If symptoms are ongoing, a deeper health investigation is important.';primaryFurther=' Consider cholesterol and blood sugar control tests, thyroid and hormone checks, vitamin D, inflammation markers, gut microbiome testing, and possibly toxin exposure testing.';}
    if (sPerc <= 33 && g2Perc <= 33 && g0Perc >= 67) {primaryTitle='Take comprehensive action to reduce inflammation and restore recovery';primaryDescription='Focus on removing as many inflammation triggers as possible. This includes improving your diet, getting enough restorative sleep, reducing stress, and supporting your gut and hormone health. Gentle but regular physical activity can help, but recovery time is equally important. This is a time to take a whole-body approach and address multiple areas at once rather than focusing on a single change.';primaryFurther='It’s a good idea to have a full health evaluation with your healthcare provider. This may include tests for heart and metabolic health, such as cholesterol, blood sugar (including HbA1c), and blood pressure, as well as hormone balance checks for the thyroid, adrenal, and sex hormones. Your doctor may also suggest reviewing vitamin and mineral levels like vitamin D, iron, B12, folate, zinc, and magnesium, along with inflammation markers such as hs-CRP. A gut health assessment can help uncover digestion or microbiome issues, and in some cases, toxin exposure screening may be recommended. If you have a family history or symptoms, advanced heart health imaging or autoimmune screening might also be worth considering.';}

    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle='Reduce your body’s inflammation load';primaryDescription='Eat a balanced, anti-inflammatory diet (lots of colourful vegetables, healthy fats, and lean proteins) and limit processed foods, sugar, and alcohol. Focus on maintaining a healthy weight, managing stress, and keeping active with a mix of strength and gentle cardio exercise.';primaryFurther='You may want to check cholesterol, blood sugar control (fasting glucose or HbA1c), hormone balance, vitamin D, and inflammation markers like hs-CRP.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && g0Perc >= 67) {primaryTitle='Reduce your body’s inflammation load';primaryDescription='Eat a balanced, anti-inflammatory diet (lots of colourful vegetables, healthy fats, and lean proteins) and limit processed foods, sugar, and alcohol. Focus on maintaining a healthy weight, managing stress, and keeping active with a mix of strength and gentle cardio exercise.';primaryFurther='You may want to check cholesterol, blood sugar control (fasting glucose or HbA1c), hormone balance, vitamin D, and inflammation markers like hs-CRP.';}
    if (sPerc >= 67 && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Rebuild immune strength and adaptability';primaryDescription='Aim for a balance between activity and rest — avoid overtraining, include strength training, and make time for recovery. Support your body clock by going to bed and waking up at consistent times, and eat nourishing, varied meals to keep your energy stable.';primaryFurther='Consider checking your thyroid and sex hormones, vitamin D, blood sugar control, and inflammation markers with your healthcare provider.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && g0Perc <= 33) {primaryTitle='Rebuild immune strength and adaptability';primaryDescription='Aim for a balance between activity and rest — avoid overtraining, include strength training, and make time for recovery. Support your body clock by going to bed and waking up at consistent times, and eat nourishing, varied meals to keep your energy stable.';primaryFurther='Consider checking your thyroid and sex hormones, vitamin D, blood sugar control, and inflammation markers with your healthcare provider.';}
    if (sPerc <= 33 && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Support your gut and nutrient Intake';primaryDescription='Eat more fiber-rich foods and fermented foods (like yoghurt, kefir, or sauerkraut), focus on whole-food sources of vitamins and minerals, and add gentle stress-reducing practices to your daily routine.';primaryFurther='Gut health testing, nutrient level checks (zinc, magnesium, vitamin D), and inflammation markers like hs-CRP can help uncover underlying issues.';}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle='Support your gut and nutrient Intake';primaryDescription='Eat more fiber-rich foods and fermented foods (like yoghurt, kefir, or sauerkraut), focus on whole-food sources of vitamins and minerals, and add gentle stress-reducing practices to your daily routine.';primaryFurther='Gut health testing, nutrient level checks (zinc, magnesium, vitamin D), and inflammation markers like hs-CRP can help uncover underlying issues.';}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle='Reduce your body’s inflammation load';primaryDescription='Eat a balanced, anti-inflammatory diet (lots of colourful vegetables, healthy fats, and lean proteins) and limit processed foods, sugar, and alcohol. Focus on maintaining a healthy weight, managing stress, and keeping active with a mix of strength and gentle cardio exercise.';primaryFurther='You may want to check cholesterol, blood sugar control (fasting glucose or HbA1c), hormone balance, vitamin D, and inflammation markers like hs-CRP.';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Rebuild immune strength and adaptability';primaryDescription='Aim for a balance between activity and rest — avoid overtraining, include strength training, and make time for recovery. Support your body clock by going to bed and waking up at consistent times, and eat nourishing, varied meals to keep your energy stable.';primaryFurther='Consider checking your thyroid and sex hormones, vitamin D, blood sugar control, and inflammation markers with your healthcare provider.';}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Support your gut and nutrient Intake';primaryDescription='Eat more fiber-rich foods and fermented foods (like yoghurt, kefir, or sauerkraut), focus on whole-food sources of vitamins and minerals, and add gentle stress-reducing practices to your daily routine.';primaryFurther='Gut health testing, nutrient level checks (zinc, magnesium, vitamin D), and inflammation markers like hs-CRP can help uncover underlying issues.';}
    if (sPerc <= 33 && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='Rebuild nutrient reserves and recovery capacity';primaryDescription='Eat a nutrient-dense diet rich in protein, vegetables, and healthy fats. Support digestion with fiber and possibly fermented foods. Include regular rest, avoid overtraining, and keep a consistent bedtime.';primaryFurther='It’s worth checking nutrient levels (iron, B12, folate, vitamin D, zinc, magnesium), gut health testing, inflammation markers, and thyroid and sex hormones.';}

    // Supportive calc
    if (g1Perc <= 33 && bPerc >= 67) {
      supportiveTitle = 'Take a whole-body approach to reducing strain';
      supportiveDescription = 'Support your heart and lungs with moderate exercise, protect yourself from environmental triggers (like poor air quality or smoking), and keep a regular daily rhythm to help your body recover.';
      supportiveFurther = 'It’s worth discussing a full cardiovascular and autoimmunity review with your healthcare provider, including cholesterol, blood pressure checks, lung function testing, and inflammation and autoimmunity markers. A sleep study or heart rate variability tracking may also help identify hidden sources of stress.';
    }

    if (g1Perc <= 33 && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = 'Support and protect your heart and immune health';
      supportiveDescription = 'Build heart-supportive habits like regular walking, moderate cardio, eating heart-healthy fats (like those from fish, nuts, and olive oil), and managing stress.';
      supportiveFurther = 'You may want to check your cholesterol, blood pressure (including how it changes at different times of the day), blood sugar, and inflammation markers. If you have a family history of heart disease or autoimmune diseases, more detailed  checks may be helpful.';
    }

    if (g1Perc <= 33 && bPerc <= 33) {
      supportiveTitle = 'Investigate internal health drivers';
      supportiveDescription = 'Focus on a heart-protective lifestyle — a balanced diet rich in vegetables and healthy fats, consistent moderate exercise, and regular rest. If there’s a family history of autoimmune, heart or vascular problems, early checks are important.';
      supportiveFurther = 'Consider cholesterol and blood sugar testing, inflammation markers, and possibly more detailed cardiovascular and autoimmunity scans if your doctor feels they are appropriate.';
    }

    if ((g1Perc > 33 && g1Perc < 67) && bPerc >= 67) {
      supportiveTitle = 'Reduce environmental and lifestyle stress';
      supportiveDescription = 'Improve your sleep routine, spend time in fresh air, and use relaxation techniques daily. If you are exposed to pollutants or work in a stressful environment, take steps to minimise these effects.';
      supportiveFurther = 'You may want to monitor your sleep quality, track heart rate variability, and discuss any symptoms like shortness of breath or fatigue with your doctor.';
    }

    if ((g1Perc > 33 && g1Perc < 67) && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = 'Strengthen recovery and environmental resilience';
      supportiveDescription = 'Focus on keeping a healthy daily rhythm, supporting your cardiovascular system through regular exercise, and reducing environmental stressors like pollution or smoking.';
      supportiveFurther = 'It’s sensible to have your blood pressure checked regularly, keep track of cholesterol, and occasionally review heart rate variability if you have access to it.';
    }

    if ((g1Perc > 33 && g1Perc < 67) && bPerc <= 33) {
      supportiveTitle = 'Support long-term vascular health';
      supportiveDescription = 'Maintain good cardiovascular habits like regular exercise, balanced nutrition, and consistent sleep.';
      supportiveFurther = 'You might consider periodic checks of your blood pressure and cholesterol, and review these results with your doctor during routine health visits.';
    }

    if (g1Perc >= 67 && bPerc >= 67) {
      supportiveTitle = 'Reduce environmental and lifestyle stress';
      supportiveDescription = 'Improve your sleep routine, spend time in fresh air, and use relaxation techniques daily. If you are exposed to pollutants or work in a stressful environment, take steps to minimise these effects.';
      supportiveFurther = 'You may want to monitor your sleep quality, track heart rate variability, and discuss any symptoms like shortness of breath or fatigue with your doctor.';
    }

    if (g1Perc >= 67 && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = 'Reduce ongoing stress load';
      supportiveDescription = 'Protect your current resilience by keeping a consistent daily routine, limiting exposure to poor air quality, and using stress-reducing activities like walking, yoga, or short breaks during the day.';
      supportiveFurther = 'Occasional checks of your sleep quality, heart rate variability, and blood pressure can help you spot changes early.';
    }

    if (g1Perc >= 67 && bPerc <= 33) {
      supportiveTitle = 'Maintain your current balance';
      supportiveDescription = 'Keep up the habits that have been supporting your health. Some health habits and routines are helping your body maintain stability and resilience.';
      supportiveFurther = 'No extra testing is needed right now unless your primary indexes change or you develop new symptoms. Routine annual health checks are enough to keep track.';
    }

    show = true;
  });
</script>

{#if show}
  <div class="main">
    <div class="items-baseline" style="display: flex; background-color: #E4EDE9; height: auto; position: relative; border-radius: 12px;">
      <div class="number" style="background: #36624C; min-width: 15rem;">Primary focus — based on primary indexes</div>
      <div style="padding: 1.5rem 2rem 1.1rem 2rem;">
        <div style="margin-bottom: 0.3rem; font-size: 12px;"><b>{primaryTitle}</b></div>
        <div style="font-size: 68%">{primaryDescription}</div>
        <div style="height: 10px"></div>
        <div class="further">Further testing suggested:</div>
        <div style="font-size: 68%">{primaryFurther}</div>
      </div>
    </div>
    <div class="items-baseline" style="display: flex; background-color: #F2F6F4; border-radius: 12px; height: auto; position: relative;">
      <div class="number" style="background: #86AF9A; min-width: 17rem;">Secondary focus — based on secondary indexes</div>
      <div style="padding: 1.5rem 2rem 1.1rem 2rem;">
        <div style="margin-bottom: 0.3rem; font-size: 12px;"><b>{supportiveTitle}</b></div>
        <div style="font-size: 68%">{supportiveDescription}</div>
        <div style="height: 10px"></div>
        <div class="further">Further testing suggested:</div>
        <div style="font-size: 68%">{supportiveFurther}</div>
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
        gap: 25px;
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
        top: -5%;
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