<svelte:options customElement={{ tag: 'ga-action-steps-three-clp-ch', shadow: 'open' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';

  export let service: Service = window.GaReportService;
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
  let g0Perc = 0;
  let g1Perc = 0;
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
    if (sPerc >= 67 && g2Perc >= 67 && g0Perc <= 33) {primaryTitle = '维持并保护当前的炎症调节和免疫老化状态';primaryDescription = '评估这些最佳结果是否主要由药物干预（如 HRT、TRT、甲状腺素、GLP-1 促效剂等肠促素类治疗、抗炎药物）、有利的遗传特征（如与长寿或有益糖基化相关的基因变体）或生活方式因素所驱动。如果存在风险因素或慢性疾病，该结果说明当前策略已成功控制炎症。'; primaryFurther = '除非出现新症状，否则无需超出常规年度预防性检查。';}
    if (sPerc >= 67 && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='减少低度炎症诱因，避免免疫系统进一步老化';primaryDescription='为减轻持续性的免疫激活，应评估潜在诱因，如近期或未完全恢复的感染。重点减少促炎性食物，纠正能量代谢失衡，并限制酒精摄入。强化规律睡眠模式，并提供有助于压力调节与恢复的策略。';primaryFurther='可考虑检测 hs-CRP 及其他炎症指标、25-羟维生素D、铁蛋白及铁代谢相关指标。评估血脂和空腹血糖–胰岛素以判断心代谢负荷。';}
    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle='优化身体活动以维护免疫年轻化';primaryDescription='建议采取平衡的训练方式，避免过度高强度有氧运动，加入或保持力量训练，并优先考虑恢复策略，以支持长期的免疫年轻化。如果存在个人或家族自身免疫性疾病史，应密切关注 Glycan Youth 的趋势，因为维持该指标在遗传易感人群中尤为重要。';primaryFurther='若存在个人或家族自身免疫或炎症性疾病史，可评估 ESR、hs-CRP、ANA 筛查、甲状腺基础功能（TSH、fT4、fT3），并监测维生素D水平。';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && g0Perc <= 33) {primaryTitle='通过肠道、营养和运动支持炎症解决通路';primaryDescription='可重点通过针对性益生菌、益生元和多样化膳食纤维改善肠道健康；通过全食物和抗炎营养成分提升饮食的营养密度；必要时评估微量营养素缺乏情况；并通过增强体能来提升整体免疫韧性。';primaryFurther='可考虑进行微量营养素评估（omega-3 指数、锌、镁、维生素D、维生素B12、叶酸）、hs-CRP，以及在临床怀疑时进行靶向肠道健康评估（如粪便分析、微生物组评估或肠道通透性指标）。';}
    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='通过结构化恢复来平衡高负荷的生活方式';primaryDescription='支持来访者建立规律的休息例程，加强压力调节策略，并使日常习惯与昼夜节律相协调。对于处于高压力环境的个人，可实施实用的恢复方法，如安排固定的休息时间、呼吸训练或短暂的身体活动，以帮助免疫系统应对持续负荷。监测心代谢健康指标，及早识别并处理潜在的不平衡，避免免疫系统进一步受压。';primaryFurther='建议评估血脂谱、hs-CRP、25-羟维生素D、空腹血糖–胰岛素、ANA 筛查。可考虑评估睡眠质量和 HRV（心率变异性）以监测恢复状况。';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='通过针对性生活方式支持增强血管韧性';primaryDescription='建议采用富含 omega-3 来源、富含硝酸盐类蔬菜及多酚类食物的饮食模式，同时限制加工食品、过量钠盐和添加糖。建议规律进行中等强度的有氧运动，并保持一致的恢复和睡眠节奏。如有个人或家族心血管疾病史，应密切监测心血管健康。';primaryFurther='建议检测血脂谱、血压（包括波动性）、hs-CRP 及空腹血糖–胰岛素。可考虑评估 Omega-3 Index 和同型半胱氨酸以制定心血管支持计划。';}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle='通过支持恢复、节律与核心系统来改善免疫反应能力';primaryDescription='建议建立结构化的睡前放松流程和稳定的就寝时间以维持昼夜节律，引入主动恢复策略，并通过增加膳食纤维多样性、十字花科蔬菜及循证的免疫调节营养成分来支持肠道和肝功能，以提升免疫系统的调节能力。';primaryFurther='微量营养素评估（锌、镁、维生素D、维生素B12、叶酸、omega-3 index）、hs-CRP、空腹血糖–胰岛素。如症状持续，可进一步评估性激素和甲状腺功能，以判断系统恢复能力。';}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='通过系统性干预逆转早期免疫老化趋势';primaryDescription='建议在营养方面进行结构化改善（如抗炎、营养密度高且能量平衡稳定的饮食模式），增加包含有氧和抗阻训练的身体活动，强化规律且高质量的睡眠，并实施日常的压力恢复策略。该模式可能提示早期代谢负荷增加，因此需要更有针对性和全面的干预以恢复免疫韧性。';primaryFurther='完整心代谢检测（血脂、血糖–胰岛素、hs-CRP）、维生素D及特定微量营养素、ANA 筛查。如生活方式压力持续，可考虑进行基础激素评估。';}

    if (sPerc >= 67 && g2Perc >= 67 && g0Perc >= 67) {primaryTitle='降低慢性炎症负荷以减缓生物老化进程';primaryDescription='优先通过抗炎且代谢平衡的饮食模式降低炎症负荷，同时处理核心驱动因素，如胰岛素抵抗、血脂异常或激素失衡，并实施日常压力调节策略。';primaryFurther='建议评估血压、血糖控制、血脂谱、激素状态及全身炎症指标，以指导更有针对性的干预。';}
    if (sPerc >= 67 && g2Perc <= 33 && g0Perc <= 33) {primaryTitle='通过调节核心代谢与生理调控系统恢复免疫适应性';primaryDescription='改善身体组成、稳定昼夜节律并优化能量摄入。建议采用平衡的训练方法，限制过量有氧训练，引入或维持力量训练，并优先考虑恢复策略。如存在个人或家族自身免疫病史，应密切监测 Glycan Youth 的变化趋势。';primaryFurther='可考虑评估代谢健康指标、性激素水平及自身免疫相关指标，以识别潜在驱动因素。';}
    if (sPerc <= 33 && g2Perc >= 67 && g0Perc <= 33) {primaryTitle='通过恢复肠道–营养–压力轴改善炎症消退能力';primaryDescription=' 通过增加膳食纤维多样性、发酵食品摄入及必要时的消化功能评估来支持肠道完整性；优化微量营养素和糖链前体供应（如锌、镁、omega-3、维生素D）；并通过规律的恢复例程和昼夜节律同步减少累积性压力。';primaryFurther='可考虑评估消化功能、全身炎症状态及性激素平衡，以识别并纠正妨碍免疫炎症解决的潜在因素。';}
    if (sPerc >= 67 && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle='通过针对代谢与免疫超负荷来逆转慢性炎症';primaryDescription='建议采用结构化的抗炎方案，以改善代谢健康、优化身体组成、稳定血糖，并减少饮食和生活方式驱动的炎症触发因素。';primaryFurther='评估血压、血脂状况、性激素平衡及全身炎症指标，以识别主要驱动因素并实施针对性干预，从而逆转免疫老化趋势。';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc >= 67 && g0Perc >= 67) {primaryTitle='通过减少炎症诱因并增强恢复来降低免疫负荷';primaryDescription='重点改善肠道健康，减少饮食及环境毒素暴露，消除加工和促炎性食物摄入。';primaryFurther='评估血压、血糖控制、血脂状况、性激素平衡及全身炎症指标，以指导有针对性的干预，保护长期免疫韧性并防止免疫老化。';}
    if (sPerc >= 67 && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='通过重建核心调节能力来支持免疫恢复';primaryDescription='改善身体组成，同时避免过度训练；强调运动质量与充分恢复；通过规律的睡眠–觉醒节律稳定昼夜节律；并通过多样化且抗炎的饮食模式优化能量状态。';primaryFurther='评估代谢指标、激素水平及自身免疫风险，以识别并处理导致免疫老化的深层因素。';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && g0Perc <= 33) {primaryTitle='通过平衡压力、运动与恢复来重建免疫年轻化';primaryDescription='通过规律的睡眠–觉醒节律、适度且均衡的身体活动，以及有结构的休息计划来支持恢复。确保充足营养摄入并优化每日能量平衡。';primaryFurther='建议评估代谢指标、甲状腺功能、性激素水平及自身免疫风险，以识别并处理驱动免疫老化的深层因素。';}
    if (sPerc <= 33 && g2Perc >= 67 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='通过支持肠道完整性并减少免疫刺激物来加强免疫调节';primaryDescription='重点通过膳食纤维多样性和支持微生物群的策略改善肠道健康；支持解毒与代谢排泄通路；减少酒精、食物敏感原和环境毒素等常见免疫刺激物的暴露。';primaryFurther='可考虑评估消化功能指标（如微生物组分析、zonulin）、全身炎症状态、关键微量营养素、性激素平衡及自身抗体（如临床指示）。';}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && g0Perc <= 33) {primaryTitle='通过支持肠–肝轴和营养充足性来改善免疫恢复能力';primaryDescription='通过富含膳食纤维和抗炎食物来加强肠道和肝脏功能，并在需要时进行针对性支持；强化结构化的恢复流程；确保关键微量营养素和糖链构建所需营养素的摄入充足。';primaryFurther='可考虑评估铁状态、维生素B12、叶酸、维生素D、锌、镁以及消化功能（如微生物组分析、粪便指标、zonulin）；若存在自身免疫风险，建议筛查自身抗体。';}
    if ((sPerc > 33 && sPerc < 67) && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle='通过系统性的生活方式与环境干预降低炎症负荷';primaryDescription='建议采用营养密度高的抗炎饮食；重建稳定的睡眠–觉醒节律；强化日常压力调节；引入规律、适度的身体活动；并通过改善身体组成降低代谢压力。为减少累积性免疫负荷，应减少环境暴露，如酒精、内分泌干扰物和污染源。';primaryFurther='评估心代谢指标、激素平衡、全身炎症状态，必要时进行自身免疫相关检查。';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='通过重新平衡压力、运动与营养来重建免疫韧性';primaryDescription='通过规律的睡眠–觉醒周期和结构化的休息计划来支持深层恢复；在身体活动与恢复之间找到适当平衡，避免过度训练或训练不足。优化宏量与微量营养素摄入，特别是蛋白质、矿物质和抗炎营养成分。建议评估甲状腺功能、皮质醇节律、胰岛素敏感性、身体组成和睡眠质量，以识别导致免疫能力下降的关键因素。';primaryFurther='CBC、肝/肾功能、炎症指标、血糖–胰岛素面板、全套甲状腺与肾上腺评估、维生素D、肠道功能（粪便、微生物组、呼气试验）、毒素筛查及必要时的自身免疫指标。HRV、VO₂max 和身体组成等功能性指标可用于追踪恢复情况。';}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='通过支持肠道健康和恢复信号来促进免疫炎症解决';primaryDescription='通过提高膳食纤维多样性和支持微生物群的策略来进行肠道修复；减少加工食品、酒精和环境毒素等免疫刺激物暴露；并通过规律睡眠、温和运动和结构化的压力调节策略来增强身体的恢复能力。';primaryFurther='可考虑评估肠道通透性或微生物组平衡、营养吸收能力（如锌、镁、B族维生素）、皮质醇节律及其他提示屏障功能受损的指标。';}
    if (sPerc >= 67 && g2Perc <= 33 && g0Perc >= 67) {primaryTitle='通过恢复昼夜节律与激素调节来重建免疫平衡';primaryDescription='建议进行全面健康评估以识别潜在驱动因素。优先重建昼夜节律，与稳定的睡眠–觉醒时间保持一致；在日常工作中融入短暂但规律的恢复练习（如短距离步行、呼吸训练、简单伸展等）；避免过度依赖高强度训练，转而选择力量训练与灵活性训练的平衡组合。同时应关注免疫失衡的核心驱动因素，如高血压、胰岛素抵抗、血脂异常或激素失衡。';primaryFurther='CBC、肝肾功能、血脂、血糖–胰岛素面板、全套甲状腺、肾上腺及性激素评估、炎症指标（含 hs-CRP）、维生素D、铁代谢、维生素B12、叶酸、镁、锌、同型半胱氨酸、Omega-3 Index、肠道功能检测（粪便、微生物组、呼气试验），必要时检测自身免疫指标。HRV、VO₂max 和身体组成等功能性指标有助于恢复追踪。';}
    if (sPerc <= 33 && g2Perc >= 67 && g0Perc >= 67) {primaryTitle='降低全身炎症负荷并保护心血管健康';primaryDescription='建议进行全面健康评估以识别潜在驱动因素。采用抗炎、营养密度高的饮食模式，并改善口腔与肠道健康以清除可能的持续性免疫激活来源。通过规律且中等强度的身体活动、压力管理和良好睡眠来加强心血管系统支持。';primaryFurther='CBC、肝肾功能、血脂、血糖–胰岛素面板、全套甲状腺、肾上腺及性激素评估、炎症指标（含 hs-CRP）、维生素D、铁代谢、维生素B12、叶酸、镁、锌、同型半胱氨酸、Omega-3 Index、肠道功能检测（粪便分析、微生物组、呼气试验），必要时评估自身免疫指标。HRV、VO₂max 和身体组成等功能性指标同样可用于恢复监测。';}
    if (sPerc <= 33 && g2Perc <= 33 && g0Perc <= 33) {primaryTitle='通过恢复与增强韧性来重建免疫适应能力';primaryDescription='建议进行全面健康评估以明确潜在驱动因素。重点通过多样化且富含蛋白质和微量营养素的饮食补充营养储备；支持消化功能以优化吸收；并通过规律的睡眠、压力管理与温和递进式的身体活动来实施结构化恢复计划。';primaryFurther='CBC、肝肾功能、血脂、血糖–胰岛素面板、全套甲状腺、肾上腺及性激素评估、炎症指标（含 hs-CRP）、维生素D、铁代谢、B12、叶酸、镁、锌、同型半胱氨酸、Omega-3 Index、肠道功能检测（粪便分析、微生物组、呼气试验），如有需要，进行自身免疫指标检测。HRV、VO₂max 和身体组成等功能性指标可用于跟踪恢复进展。';}
    if ((sPerc > 33 && sPerc < 67) && g2Perc <= 33 && g0Perc >= 67) {primaryTitle='解决系统性免疫压力和慢性炎症的根本驱动因素';primaryDescription='建议进行全面健康评估以识别潜在驱动因素。干预重点包括减少炎症负荷（来自饮食、环境或肠道）、通过睡眠、营养和压力调节重建恢复能力，并恢复代谢及激素平衡，以逆转免疫系统老化趋势。';primaryFurther='CBC、肝肾功能、血脂、血糖–胰岛素面板、全套甲状腺、肾上腺及性激素评估、炎症指标（含 hs-CRP）、维生素D、铁代谢、B12、叶酸、镁、锌、同型半胱氨酸、Omega-3 Index、肠道功能检测（粪便分析、微生物组、呼气试验），必要时进行自身免疫指标检测。HRV、VO₂max 和身体组成可作为恢复跟踪指标。';}
    if (sPerc <= 33 && (g2Perc > 33 && g2Perc < 67) && g0Perc >= 67) {primaryTitle='解决系统性免疫压力与慢性炎症的根本驱动因素';primaryDescription='建议进行全面健康评估以识别潜在驱动因素。重点评估并处理肠道/屏障功能障碍、内分泌失衡、毒素暴露及慢性压力；在此基础上减少饮食与环境炎症来源，同时通过高质量睡眠、针对性营养和压力调节策略来恢复炎症消退能力。';primaryFurther='CBC、肝肾功能、血脂、血糖–胰岛素面板、全套甲状腺、肾上腺及性激素评估、炎症指标（含 hs-CRP）、维生素D、铁状态、B12、叶酸、镁、锌、同型半胱氨酸、Omega-3 Index、肠道功能评估（粪便、微生物组、呼气试验），必要时进行自身免疫指标检测。HRV、VO₂max 和身体组成可用于恢复跟踪。';}
    if (sPerc <= 33 && g2Perc <= 33 && (g0Perc > 33 && g0Perc < 67)) {primaryTitle='通过恢复与增强韧性来重建免疫适应能力';primaryDescription='建议进行全面健康评估以识别潜在驱动因素。重点通过多样化、富含蛋白质和微量营养素的饮食补充营养储备；支持消化功能以提高营养吸收；并通过规律睡眠、压力管理以及温和、渐进式的身体活动来建立结构化恢复流程。同时应努力恢复代谢与激素平衡。';primaryFurther='CBC、肝肾功能、血脂、血糖–胰岛素面板、全套甲状腺、肾上腺及性激素评估、炎症指标（含 hs-CRP）、维生素D、铁状态、B12、叶酸、镁、锌、同型半胱氨酸、Omega-3 Index、肠道功能评估（粪便、微生物组、呼气试验），必要时进行自身免疫指标检测。HRV、VO₂max 和身体组成可作为恢复追踪指标。';}
    if (sPerc <= 33 && g2Perc <= 33 && g0Perc >= 67) {primaryTitle='降低炎症负荷并恢复系统性韧性';primaryDescription='建议进行全面健康评估以识别潜在驱动因素。重点在于减少炎症负荷（来自饮食、环境、肠道）、通过睡眠、营养和压力调节重建恢复能力，并恢复代谢和激素平衡。';primaryFurther='CBC、肝肾功能、血脂、血糖–胰岛素面板、全套甲状腺、肾上腺及性激素评估、炎症指标（含 hs-CRP）、维生素D、铁状态、B12、叶酸、镁、锌、同型半胱氨酸、Omega-3 Index、肠道功能检测（粪便分析、微生物组、呼气试验），必要时评估自身免疫指标。HRV、VO₂max 和身体组成可用于恢复追踪。';}

    // Supportive calculation
    if (g1Perc <= 33 && bPerc >= 67) {
      supportiveTitle = '减轻系统性与环境压力以稳定血管–呼吸系统韧性';
      supportiveDescription = '通过改善昼夜节律、建立结构化恢复流程，并减少如空气污染、吸烟或职业性刺激物等环境暴露来缓解自主神经负担。通过适度的有氧训练支持心血管与呼吸系统功能，并定期监测血压和肺功能。';
      supportiveFurther = '血压监测（包括波动性）、肺功能测试、完整心代谢指标检测。若存在风险因素或家族史，可考虑进行血管影像学评估。必要时进行睡眠研究以排除睡眠呼吸暂停，并结合 HRV 或类似指标评估自主神经调节状态。';
    }

    if (g1Perc <= 33 && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = '增强血管韧性并稳定自主神经功能';
      supportiveDescription = '保持规律的有氧与抗阻训练，并通过改善睡眠与压力管理提升恢复质量。减少影响血管功能的因素，如过量饮酒、高钠饮食或未管理的高血压。';
      supportiveFurther = '心血管筛查（包括血压及其波动性监测）、血脂分析、血糖–胰岛素检测。通过睡眠质量评估与 HRV 监测评估昼夜节律稳定性与恢复能力；如有风险或家族史，可考虑进行血管影像学评估。';
    }

    if (g1Perc <= 33 && bPerc <= 33) {
      supportiveTitle = '针对血管脆弱性并监测早期疾病标志物';
      supportiveDescription = '通过心血管保护型饮食、规律有氧运动以及维持血压和血脂的最佳平衡来增强血管完整性。如存在相关家族史，建议考虑进行针对性筛查。';
      supportiveFurther = '血脂分析、血糖–胰岛素评估、hsCRP、以及在必要时进行心血管风险高级筛查（如冠脉钙化评分或颈动脉内中膜厚度评估）。如病史或主要指标提示自身免疫特征，可考虑相关自身免疫检测。';
    }

    if ((g1Perc > 33 && g1Perc < 67) && bPerc >= 67) {
      supportiveTitle = '减少环境压力负荷';
      supportiveDescription = '减少炎症诱因、改善空气质量、管理压力，并优化身体组成。';
      supportiveFurther = '吸烟状态确认、血压变异性检测、HRV 用于评估压力负荷、睡眠质量评估、环境毒素暴露筛查以及身体成分分析。';
    }

    if ((g1Perc > 33 && g1Perc < 67) && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = '保持平衡并定期监测';
      supportiveDescription = '检查生活节律、营养充足性，以及是否存在轻微心血管或呼吸系统压力迹象。';
      supportiveFurther = '定期复查血压和 HRV 以跟踪稳定性。';
    }

    if ((g1Perc > 33 && g1Perc < 67) && bPerc <= 33) {
      supportiveTitle = '支持血管稳定性';
      supportiveDescription = '维持心血管健康管理，并在时间维度上观察趋势变化。';
      supportiveFurther = '在常规体检中监测血压和血脂指标。';
    }

    if (g1Perc >= 67 && bPerc >= 67) {
      supportiveTitle = '减少环境压力负荷';
      supportiveDescription = '处理毒素暴露、睡眠紊乱和呼吸系统压力等因素。';
      supportiveFurther = '评估血压变异性、HRV、睡眠质量以及环境毒素暴露情况。';
    }

    if (g1Perc >= 67 && (bPerc > 33 && bPerc < 67)) {
      supportiveTitle = '防止自主神经压力加重';
      supportiveDescription = '持续支持昼夜节律稳定、呼吸系统健康及压力调节相关的生活方式策略。如若出现症状或主要指标变化，需进一步随访。';
      supportiveFurther = '定期评估血压、HRV 和睡眠模式。';
    }

    if (g1Perc >= 67 && bPerc <= 33) {
      supportiveTitle = '维持最佳辅助平衡状态';
      supportiveDescription = '继续当前的预防性健康策略并定期监测。';
      supportiveFurther = '无需额外检测，除非主要指标出现异常变化。';
    }

    show = true;
  });
</script>

{#if show}
  {#if type === 'primary'}
    <div class="main">
      <div style="font-size: 14px;"><b>{primaryTitle}</b></div>
      <div style="font-size: 78%">{primaryDescription}</div>
      <div style="height: 24px"></div>
      <div class="further">建议进一步检查:</div>
      <div style="font-size: 68%">{primaryFurther}</div>
    </div>
  {:else}
    <div class="main">
      <div style="font-size: 14px;"><b>{supportiveTitle}</b></div>
      <div style="font-size: 78%">{supportiveDescription}</div>
      <div style="height: 24px"></div>
      <div class="further">建议进一步检查：:</div>
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
        font-size: 14px;
        line-height: 160%;
        letter-spacing: 0.005em;
    }
</style>