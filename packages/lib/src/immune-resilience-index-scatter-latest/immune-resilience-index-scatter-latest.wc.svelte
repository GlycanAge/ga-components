<svelte:options customElement={{ tag: 'ga-immune-resilience-index-scatter-latest', shadow: 'none' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';
  import * as echarts from 'echarts';

  export let service: Service = window.GaReportService;

  let reportData: any;
  let resilienceData: any;
  let score = 0;
  let chart: any = {};
  let gender = '';
  let chronoAge = 0;
  let g2 = 0;
  let g0 = 0;
  let el: HTMLElement;
  let percentile = 0;

  function getDashColor(): string {
    if (percentile < 32) return '#F5AB00';
    if (percentile <= 68) return '#40C59B';
    return '#119999';
  }

  function quantile(sorted: number[], q: number): number {
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    }
    return sorted[base];
  }

  function computeBands(data: any[]) {
    const ageMap: Map<number, number[]> = new Map();
    for (const item of data) {
      const age = Math.round(item.CA);
      if (!ageMap.has(age)) ageMap.set(age, []);
      ageMap.get(age)!.push(item.SS);
    }

    const ages: number[] = [];
    const p10: number[] = [];
    const p25: number[] = [];
    const p50: number[] = [];
    const p75: number[] = [];
    const p90: number[] = [];

    const sortedAges = Array.from(ageMap.keys()).sort((a, b) => a - b);
    for (const age of sortedAges) {
      const vals = ageMap.get(age)!.sort((a, b) => a - b);
      if (vals.length < 5) continue;
      ages.push(age);
      p10.push(quantile(vals, 0.1));
      p25.push(quantile(vals, 0.25));
      p50.push(quantile(vals, 0.5));
      p75.push(quantile(vals, 0.75));
      p90.push(quantile(vals, 0.9));
    }

    return { ages, p10, p25, p50, p75, p90 };
  }

  function drawGraph() {
    if (el) {
      chart = echarts.init(el, null, {
        devicePixelRatio: 4,
        renderer: 'svg'
      });
    }

    const { ages, p10, p25, p50, p75, p90 } = computeBands(resilienceData.data);

    const medianLine = ages.map((age, i) => [age, p50[i]]);

    const chartRect = el.getBoundingClientRect();
    const dashColor = getDashColor();
    const bandColor = '#40C59B';

    const option: any = {
      textStyle: { fontFamily: 'Sen, sans-serif' },
      animation: false,
      backgroundColor: 'transparent',
      title: {
        text: 'Age-adjusted distribution',
        left: 'center',
        top: 10,
        textStyle: {
          fontFamily: 'Sen, sans-serif',
          fontSize: 15,
          fontWeight: 'bold',
          color: '#09341F'
        }
      },
      grid: {
        top: '52px',
        left: '65px',
        right: '30px',
        bottom: '45px'
      },
      tooltip: { show: false },
      xAxis: {
        type: 'value',
        min: 15,
        max: 95,
        interval: 20,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          show: true,
          color: '#09341F',
          opacity: 0.8,
          fontFamily: 'Sen, sans-serif',
          fontSize: 11
        },
        splitLine: {
          show: true,
          lineStyle: { color: '#09341F', opacity: 0.1 }
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 4,
        interval: 0.5,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          show: true,
          color: '#09341F',
          opacity: 0.8,
          fontFamily: 'Sen, sans-serif',
          fontSize: 11,
          formatter: (val: number) => val === 0 ? '' : val.toFixed(1)
        },
        splitLine: {
          show: true,
          lineStyle: { color: '#09341F', opacity: 0.1 }
        }
      },
      series: [
        {
          type: 'line',
          data: medianLine,
          symbol: 'none',
          smooth: true,
          lineStyle: { color: '#09341F', width: 2, opacity: 0.85 },
          silent: true
        }
      ],
      graphic: []
    };

    // Render axes + median first so convertToPixel is available
    chart.setOption(option);

    // Helper: convert data coords → pixel coords
    function px(age: number, val: number): [number, number] {
      return chart.convertToPixel({ xAxisIndex: 0, yAxisIndex: 0 }, [age, val]) as [number, number];
    }

    // Build a closed polygon point array between two parallel data arrays
    function bandPoints(lower: number[], upper: number[]): number[][] {
      const pts: number[][] = [];
      for (let i = 0; i < ages.length; i++) {
        pts.push(px(ages[i], upper[i]) as number[]);
      }
      for (let i = ages.length - 1; i >= 0; i--) {
        pts.push(px(ages[i], lower[i]) as number[]);
      }
      return pts;
    }

    // Outer band: p10 → p90
    option.graphic.push({
      type: 'polygon', zlevel: 5, z: 5,
      shape: { points: bandPoints(p10, p90) },
      style: { fill: 'rgba(64, 197, 155, 0.18)', stroke: 'none' }
    });
    // Inner band: p25 → p75
    option.graphic.push({
      type: 'polygon', zlevel: 6, z: 6,
      shape: { points: bandPoints(p25, p75) },
      style: { fill: 'rgba(64, 197, 155, 0.30)', stroke: 'none' }
    });

    // Dashed crosshair lines
    const dashLength = 10;
    const gapLength = 6;
    const dashThickness = 2;
    const dashRadius = 1.5;
    const outlineWidth = 1.5;

    // Vertical dashed line: from bottom to score at chronoAge
    {
      const x = chart.convertToPixel('xAxis', chronoAge);
      const yStart = chart.convertToPixel('yAxis', 0);
      const yEnd = chart.convertToPixel('yAxis', score);
      const totalLen = Math.abs(yEnd - yStart);
      let offset = 0;
      while (offset < totalLen) {
        const segLen = Math.min(dashLength, totalLen - offset);
        const yTop = yStart - offset - segLen;
        option.graphic.push({
          type: 'rect', zlevel: 10,
          shape: { x: x - dashThickness / 2 - outlineWidth, y: yTop - outlineWidth, width: dashThickness + outlineWidth * 2, height: segLen + outlineWidth * 2, r: dashRadius + outlineWidth },
          style: { fill: '#FFFFFF' }, z: 14
        });
        option.graphic.push({
          type: 'rect', zlevel: 10,
          shape: { x: x - dashThickness / 2, y: yTop, width: dashThickness, height: segLen, r: dashRadius },
          style: { fill: dashColor }, z: 15
        });
        offset += dashLength + gapLength;
      }
    }

    // Horizontal dashed line: from left to chronoAge at score
    {
      const y = chart.convertToPixel('yAxis', score);
      const xStart = chart.convertToPixel('xAxis', 15);
      const xEnd = chart.convertToPixel('xAxis', chronoAge);
      const totalLen = Math.abs(xEnd - xStart);
      let offset = 0;
      while (offset < totalLen) {
        const segLen = Math.min(dashLength, totalLen - offset);
        const xLeft = xStart + offset;
        option.graphic.push({
          type: 'rect', zlevel: 10,
          shape: { x: xLeft - outlineWidth, y: y - dashThickness / 2 - outlineWidth, width: segLen + outlineWidth * 2, height: dashThickness + outlineWidth * 2, r: dashRadius + outlineWidth },
          style: { fill: '#FFFFFF' }, z: 14
        });
        option.graphic.push({
          type: 'rect', zlevel: 10,
          shape: { x: xLeft, y: y - dashThickness / 2, width: segLen, height: dashThickness, r: dashRadius },
          style: { fill: dashColor }, z: 15
        });
        offset += dashLength + gapLength;
      }
    }

    // Intersection dot
    option.graphic.push({
      type: 'circle', zlevel: 10,
      shape: {
        cx: chart.convertToPixel('xAxis', chronoAge),
        cy: chart.convertToPixel('yAxis', score),
        r: 6
      },
      style: { fill: dashColor, stroke: '#FFFFFF', lineWidth: 2 },
      z: 15
    });

    chart.setOption(option);

    // Tooltip pill: "43 · M"
    const xPixel = chart.convertToPixel('xAxis', chronoAge);
    const yPixel = chart.convertToPixel('yAxis', score);

    const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    newSvg.setAttribute('width', '75');
    newSvg.setAttribute('height', '36');
    newSvg.setAttribute('viewBox', '-2 -2 75 36');
    newSvg.setAttribute('fill', 'none');
    newSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M7 4C7 1.79086 8.79086 0 11 0H67C69.2091 0 71 1.79086 71 4V28C71 30.2091 69.2091 32 67 32H11C8.79086 32 7 30.2091 7 28V4Z');
    path1.setAttribute('fill', dashColor);
    path1.setAttribute('stroke', '#FFFFFF');
    path1.setAttribute('stroke-width', '4');
    path1.setAttribute('paint-order', 'stroke');

    const path2Outline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2Outline.setAttribute('d', 'M7 10L1.13333 14.4C0.0666666 15.2 0.0666666 16.8 1.13333 17.6L7 22');
    path2Outline.setAttribute('fill', 'none');
    path2Outline.setAttribute('stroke', '#FFFFFF');
    path2Outline.setAttribute('stroke-width', '2.5');
    path2Outline.setAttribute('stroke-linejoin', 'round');
    path2Outline.setAttribute('stroke-linecap', 'round');

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M1.13333 17.6C0.0666666 16.8 0.0666666 15.2 1.13333 14.4L7 10L7 22L1.13333 17.6Z');
    path2.setAttribute('fill', dashColor);

    newSvg.appendChild(path2Outline);
    newSvg.appendChild(path1);
    newSvg.appendChild(path2);
    newSvg.style.position = 'absolute';
    newSvg.style.left = `${chartRect.left + xPixel + 8}px`;
    newSvg.style.top = `${chartRect.top + yPixel - 17}px`;
    newSvg.style.zIndex = '8';

    const scoreHolder = document.createElement('div');
    scoreHolder.innerText = `${chronoAge} · ${gender}`;
    scoreHolder.style.position = 'absolute';
    scoreHolder.style.left = `${chartRect.left + xPixel + 22}px`;
    scoreHolder.style.top = `${chartRect.top + yPixel - 8}px`;
    scoreHolder.style.font = 'bold 14px Sen, sans-serif';
    scoreHolder.style.color = 'white';
    scoreHolder.style.zIndex = '999';
    scoreHolder.style.whiteSpace = 'nowrap';

    document.body.appendChild(scoreHolder);
    document.body.appendChild(newSvg);
  }

  onMount(async () => {
    reportData = await service.getReport();
    gender = reportData.sex;
    resilienceData = await service.getResilienceData(gender);
    g0 = Number(reportData.G0yourscore);
    g2 = Number(reportData.G2yourscore);
    chronoAge = Number(reportData.chronologicalage);

    score = Number((g2 / g0).toFixed(3));

    const filteredData = resilienceData.data.filter((item: any) => item.CA >= chronoAge - 5 && item.CA <= chronoAge + 5);
    const under = filteredData.filter((item: any) => item.SS < score).length;
    const total = filteredData.length;
    percentile = Math.round((under / total) * 100);

    if (percentile === 100 || percentile === 0) {
      percentile = percentile === 100 ? 99 : 1;
    }

    drawGraph();
  });
</script>

<div style="width: 100%; height: 100%; position: relative; border: 1px solid #09341F33; border-radius: 10px;">
  <div bind:this={el} style="width: 100%; height: 100%;"></div>
  <div style="position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); font-family: Sen, sans-serif; font-size: 12px; color: #09341F; opacity: 0.8;">Age</div>
  <div style="position: absolute; top: 50%; left: -30px; transform: translateY(-50%) rotate(-90deg); font-family: Sen, sans-serif; font-size: 12px; color: #09341F; opacity: 0.8; white-space: nowrap;">Immune Resilience</div>
</div>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap" rel="stylesheet">
</svelte:head>