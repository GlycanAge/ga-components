<svelte:options customElement={{ tag: 'ga-biological-age-rank-scatter', shadow: 'none' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';
  // import * as echarts from 'echarts';
  import { getColorBlueToRedWithPercentile } from '../shared/functions/helpers';

  export let service: Service = window.GaReportService;

  let reportData: any;
  let ageData: any;
  let chart: any = {};
  let gender = '';
  let chronoAge = 0;
  let glycanage = 0;
  let percentile = 0;
  let el: HTMLElement;

  function drawGraph() {
    if (el) {
      chart = echarts.init(el, null, {
        devicePixelRatio: 4,
        renderer: 'svg'
      });
    }
    const chartRect = el.getBoundingClientRect();

    var option = {
      textStyle: {
        fontFamily: "Sen, sans serif"
      },
      animation: false,
      backgroundColor: 'transparent',
      grid: {
        top: '15px',
        left: '50px',
        right: '45px',
        bottom: '45px'
      },
      dataset: [
        {
          source: ageData.data.map(item => [item.x, item.y])
        }
      ],
      tooltip: {
        show: false
      },
      xAxis: {
        min: 10,
        max: 90,
        interval: 10,
        // name: 'Age',
        nameTextStyle: {
          color: '#09341F',
          opacity: 0.8
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#09341F',
            opacity: 0.1
          },
          symbol: ['none', 'arrow'],
          symbolSize: [5, 10],
          symbolOffset: [8]
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: '#09341F',
          opacity: 0.8,
          formatter: function(value) {
            return value === 0 || value === 100 ? '' : value;
          }
        },
        splitLine: {
          show: true
        }
      },
      yAxis: {
        min: 15,
        max: 85,
        // name: 'Resilience index',
        nameTextStyle: {
          color: '#09341F',
          opacity: 0.8
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#09341F',
            opacity: 0.1
          },
          symbol: ['none', 'arrow'],
          symbolSize: [5, 10],
          symbolOffset: [5]
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          color: '#09341F',
          opacity: 0.8,
          formatter: function(value) {
            return value === 0|| value === 0.6 ? '' : value;
          }
        },
        splitLine: {
          show: true
        }
      },
      series: [
        {
          type: 'scatter',
          tooltip: {},
          symbolSize: 4,
          itemStyle: {
            color: '#09341F',
            opacity: 0.15,
            borderWidth: 1,
            lineWidth: 12
          }
        }
      ],
      graphic: []
    };

    chart.setOption(option);

    // Helper: generate rounded dash rectangles along a line
    const dashLength = 10;
    const gapLength = 6;
    const dashThickness = 2;
    const dashRadius = 1.5;
    const outlineWidth = 1.5;
    const dashColor = getColorBlueToRedWithPercentile(percentile);

    // Vertical dashed line: bottom (y=0) to glycanage at chronoAge
    {
      const x = chart.convertToPixel('xAxis', chronoAge);
      const yStart = chart.convertToPixel('yAxis', 15);
      const yEnd = chart.convertToPixel('yAxis', glycanage);
      const totalLen = Math.abs(yEnd - yStart);
      const dir = yEnd < yStart ? -1 : 1;
      let offset = 0;
      while (offset < totalLen) {
        const segLen = Math.min(dashLength, totalLen - offset);
        const yTop = dir === -1 ? yStart - offset - segLen : yStart + offset;
        option.graphic.push({
          type: 'rect',
          zlevel: 10,
          shape: {
            x: x - dashThickness / 2 - outlineWidth,
            y: yTop - outlineWidth,
            width: dashThickness + outlineWidth * 2,
            height: segLen + outlineWidth * 2,
            r: dashRadius + outlineWidth
          },
          style: { fill: '#FFFFFF' },
          z: 14
        });
        option.graphic.push({
          type: 'rect',
          zlevel: 10,
          shape: {
            x: x - dashThickness / 2,
            y: yTop,
            width: dashThickness,
            height: segLen,
            r: dashRadius
          },
          style: { fill: dashColor },
          z: 15
        });
        offset += dashLength + gapLength;
      }
    }

    // Horizontal dashed line: left (x=15) to chronoAge at glycanage
    {
      const y = chart.convertToPixel('yAxis', glycanage);
      const xStart = chart.convertToPixel('xAxis', 10);
      const xEnd = chart.convertToPixel('xAxis', chronoAge);
      const totalLen = Math.abs(xEnd - xStart);
      const dir = xEnd > xStart ? 1 : -1;
      let offset = 0;
      while (offset < totalLen) {
        const segLen = Math.min(dashLength, totalLen - offset);
        const xLeft = dir === 1 ? xStart + offset : xStart - offset - segLen;
        option.graphic.push({
          type: 'rect',
          zlevel: 10,
          shape: {
            x: xLeft - outlineWidth,
            y: y - dashThickness / 2 - outlineWidth,
            width: segLen + outlineWidth * 2,
            height: dashThickness + outlineWidth * 2,
            r: dashRadius + outlineWidth
          },
          style: { fill: '#FFFFFF' },
          z: 14
        });
        option.graphic.push({
          type: 'rect',
          zlevel: 10,
          shape: {
            x: xLeft,
            y: y - dashThickness / 2,
            width: segLen,
            height: dashThickness,
            r: dashRadius
          },
          style: { fill: dashColor },
          z: 15
        });
        offset += dashLength + gapLength;
      }
    }

    option.graphic.push({
      name: 'Measured result',
      type: 'circle',
      zlevel: 10,
      shape: {
        cx: chart.convertToPixel('xAxis', chronoAge),
        cy: chart.convertToPixel('yAxis', glycanage),
        r: 6
      },
      style: {
        fill: getColorBlueToRedWithPercentile(percentile),
        stroke: '#FFFFFF',
        lineWidth: 2
      },
      z: 15
    });

    // Using position absolute we create result since we need SVG
    const xPixel = chart.convertToPixel('xAxis', chronoAge);
    const yPixel = chart.convertToPixel('yAxis', glycanage);

    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const scoreHolder = document.createElement('div');

    newSvg.setAttribute("width", "75");
    newSvg.setAttribute("height", "36");
    newSvg.setAttribute("viewBox", "-2 -2 75 36");
    newSvg.setAttribute("fill", "none");
    newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M7 4C7 1.79086 8.79086 0 11 0H67C69.2091 0 71 1.79086 71 4V28C71 30.2091 69.2091 32 67 32H11C8.79086 32 7 30.2091 7 28V4Z");
    path1.setAttribute("fill", getColorBlueToRedWithPercentile(percentile));
    path1.setAttribute("stroke", "#FFFFFF");
    path1.setAttribute("stroke-width", "4");
    path1.setAttribute("paint-order", "stroke");
    const path2Outline = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2Outline.setAttribute("d", "M7 10L1.13333 14.4C0.0666666 15.2 0.0666666 16.8 1.13333 17.6L7 22");
    path2Outline.setAttribute("fill", "none");
    path2Outline.setAttribute("stroke", "#FFFFFF");
    path2Outline.setAttribute("stroke-width", "2.5");
    path2Outline.setAttribute("stroke-linejoin", "round");
    path2Outline.setAttribute("stroke-linecap", "round");
    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M1.13333 17.6C0.0666666 16.8 0.0666666 15.2 1.13333 14.4L7 10L7 22L1.13333 17.6Z");
    path2.setAttribute("fill", getColorBlueToRedWithPercentile(percentile));
    newSvg.appendChild(path2Outline);
    newSvg.appendChild(path1);
    newSvg.appendChild(path2);
    newSvg.style.position = 'absolute';
    newSvg.style.left = `${chartRect.left + xPixel + 8}px`;
    newSvg.style.top = `${chartRect.top + yPixel - 17}px`;
    newSvg.style.zIndex = '8';

    scoreHolder.innerText = `${Number.parseFloat(percentile)} pct`;
    scoreHolder.style.position = 'absolute';
    scoreHolder.style.left = `${chartRect.left + xPixel + 26}px`
    scoreHolder.style.top = `${chartRect.top + yPixel - 10}px`;
    scoreHolder.style.font = 'bold 16px sans-serif';
    scoreHolder.style.color = 'white';
    scoreHolder.style.zIndex = '999';
    scoreHolder.style.fontFamily = 'Sen';

    document.body.appendChild(scoreHolder);
    document.body.appendChild(newSvg);

    chart.setOption(option);
  }

  onMount(async () => {
    reportData = await service.getReport();
    gender = reportData.sex;
    ageData = await service.getAgeData(gender);
    chronoAge = Number(reportData.chronologicalage);
    glycanage = Number(reportData.glycanage);

    let under = ageData.data.filter((item: any) => item.y < glycanage).length;
    let total = ageData.data.length;
    percentile = Math.round((under / total) * 100);

    if (percentile === 100 || percentile === 0) {
      percentile = percentile === 100 ? 99 : 1;
    }

    drawGraph();
  })
</script>

<div style="width: 100%; height: 100%; position: relative; border: 1px solid #09341F33; border-radius: 10px;">
  <div bind:this={el} style="width: 100%; height: 100%;"></div>
  <div style="position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); font-family: Sen, sans-serif; font-size: 12px; color: #09341F; opacity: 0.8;">Chronological age</div>
  <div style="position: absolute; top: 50%; right: 88%; transform: translateY(-50%) rotate(-90deg); font-family: Sen, sans-serif; font-size: 12px; color: #09341F; opacity: 0.8; white-space: nowrap;">Biological age</div>
</div>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap" rel="stylesheet">
</svelte:head>