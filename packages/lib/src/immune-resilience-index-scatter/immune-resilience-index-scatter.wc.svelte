<svelte:options customElement={{ tag: 'ga-immune-resilience-index-scatter', shadow: 'none' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';
  // import * as echarts from 'echarts';
  import { getColorRedToBlueWithPercentile } from '../shared/functions/helpers';

  export let service: Service = window.GaReportService;

  let reportData: any;
  let scatterData: any;
  let score = 0;
  let chart: any = {};
  let gender = '';
  let chronoAge = 0;
  let g2 = 0;
  let g0 = 0;
  let el: HTMLElement;
  let percentile = 0;

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
        top: '25px',
        left: '50px',
        right: '45px',
        bottom: '40px'
      },
      dataset: [
        {
          source: scatterData.data.map(item => [item.x, item.y])
        }
        // {
        //   source: lineData.data.map(item => [item.x, item.y])
        // }
      ],
      tooltip: {
        show: false
      },
      xAxis: {
        min: 0,
        max: 100,
        interval: 20,
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
        min:0,
        max:2,
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
            opacity: 0.4,
            borderWidth: 1,
            lineWidth: 12
          }
        },
        {
          name: 'Resilience index',
          type: 'scatter',
          data: [{ x: chronoAge, y: score }],
          itemStyle: {
            color: getColorRedToBlueWithPercentile(percentile)
          }
        },
      ],
      graphic: []
    };

    chart.setOption(option);

    option.graphic.push({
      type: 'line',
      shape: {
        x1: chart.convertToPixel('xAxis', chronoAge),
        y1: chart.convertToPixel('yAxis', 0),
        x2: chart.convertToPixel('xAxis', chronoAge),
        y2: chart.convertToPixel('yAxis', score)
      },
      style: {
        stroke: getColorRedToBlueWithPercentile(percentile),
        lineDash: [8, 8],
        lineWidth: 1
      },
      z: 8
    });

    option.graphic.push({
      type: 'line',
      shape: {
        x1: chart.convertToPixel('xAxis', 0),
        y1: chart.convertToPixel('yAxis', score),
        x2: chart.convertToPixel('xAxis', chronoAge),
        y2: chart.convertToPixel('yAxis', score)
      },
      style: {
        stroke: getColorRedToBlueWithPercentile(percentile),
        lineDash: [8, 8],
        lineWidth: 1
      },
      z: 8
    });

    option.graphic.push({
      name: 'Measured result',
      type: 'circle',
      shape: {
        cx: chart.convertToPixel('xAxis', chronoAge),
        cy: chart.convertToPixel('yAxis', score),
        r: 6
      },
      style: {
        fill: getColorRedToBlueWithPercentile(percentile),
        stroke: '#FFFFFF',
        lineWidth: 1
      },
      z: 15
    });

    // Using position absolute we create result since we need SVG
    const xPixel = chart.convertToPixel('xAxis', chronoAge);
    const yPixel = chart.convertToPixel('yAxis', score);

    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const scoreHolder = document.createElement('div');

    newSvg.setAttribute("width", "71");
    newSvg.setAttribute("height", "32");
    newSvg.setAttribute("viewBox", "0 0 71 32");
    newSvg.setAttribute("fill", "none");
    newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M7 4C7 1.79086 8.79086 0 11 0H67C69.2091 0 71 1.79086 71 4V28C71 30.2091 69.2091 32 67 32H11C8.79086 32 7 30.2091 7 28V4Z");
    path1.setAttribute("fill", getColorRedToBlueWithPercentile(percentile));
    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M1.13333 17.6C0.0666666 16.8 0.0666666 15.2 1.13333 14.4L7 10L7 22L1.13333 17.6Z");
    path2.setAttribute("fill", getColorRedToBlueWithPercentile(percentile));
    newSvg.appendChild(path1);
    newSvg.appendChild(path2);
    newSvg.style.position = 'absolute';
    newSvg.style.left = `${chartRect.left + xPixel + 10}px`;
    newSvg.style.top = `${chartRect.top + yPixel - 15}px`;
    newSvg.style.zIndex = '8';

    scoreHolder.innerText = `${Number.parseFloat(score).toFixed(3)}`;
    scoreHolder.style.position = 'absolute';
    scoreHolder.style.left = `${chartRect.left + xPixel + 28}px`
    scoreHolder.style.top = `${chartRect.top + yPixel - 8}px`;
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
    scatterData = await service.getResilienceData(gender);
    g0 = Number(reportData.G0yourscore);
    g2 = Number(reportData.G2yourscore);
    chronoAge = Number(reportData.chronologicalage);

    score = Number((g2/g0).toFixed(3));

    let under = scatterData.data.filter((item: any) => item.y < score).length;
    let total = scatterData.data.length;
    percentile = Math.round((under / total) * 100);

    if (percentile === 100 || percentile === 0) {
      percentile = percentile === 100 ? 99 : 1;
    }

    drawGraph();
  })
</script>

<div style="width: 100%; height: 100%; position: relative;">
  <div bind:this={el} style="width: 100%; height: 100%;"></div>
  <div style="position: absolute; bottom: 3px; left: 50%; transform: translateX(-50%); font-family: Sen, sans-serif; font-size: 12px; color: #09341F; opacity: 0.8;">Age</div>
  <div style="position: absolute; top: 50%; right: 83%; transform: translateY(-50%) rotate(-90deg); font-family: Sen, sans-serif; font-size: 12px; color: #09341F; opacity: 0.8; white-space: nowrap;">Immune resilience index</div>
</div>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap" rel="stylesheet">
</svelte:head>