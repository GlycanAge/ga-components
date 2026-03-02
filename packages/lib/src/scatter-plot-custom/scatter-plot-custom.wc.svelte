<svelte:options customElement={{ tag: 'ga-scatter-plot-custom', shadow: 'none' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';
  import * as echarts from 'echarts';
  import {getColorRedToBlueWithPercentile, getColorBlueToRedWithPercentile, getTranslation} from '../shared/functions/helpers';

  export let type: string;
  export let lang: string;
  export let service: Service = window.GaReportService;

  let types = [
    {
      name: 'mature',
      csvPerc: 'G0percentile',
      csvScore: 'G0yourscore'
    },
    {
      name: 'youth',
      csvPerc: 'G2percentile',
      csvScore: 'G2yourscore'
    },
    {
      name: 'shield',
      csvPerc: 'Spercentile',
      csvScore: 'Syourscore'
    },
    {
      name: 'lifestyle',
      csvPerc: 'Bpercentile',
      csvScore: 'Byourscore'
    },
    {
      name: 'median',
      csvPerc: 'G1percentile',
      csvScore: 'G1yourscore'
    }
  ]

  let reportData: any;
  let scatterData: any;
  let lineData: any;
  let percentile = 0;
  let score = 0;
  let chart: any = {};
  let gender = '';
  let chronoAge = 0;
  let el: HTMLElement;

  const details = types.find(x => x.name === type);

  function getColor() {
    if (type == 'shield' || type == 'youth' || type == 'median'){
      return getColorRedToBlueWithPercentile(percentile);
    }
    if (type == 'mature' || type == 'lifestyle'){
      return getColorBlueToRedWithPercentile(percentile);
    }
  }

  function useDummyData() {
    reportData = { chronologicalage: 42, sex: 'M' };
    gender = 'M';
    chronoAge = 42;
    percentile = 25;
    score = 0.41;
    scatterData = {
      data: [
        { x: 25, y: 0.35 }, { x: 28, y: 0.38 }, { x: 30, y: 0.36 }, { x: 32, y: 0.40 }, { x: 33, y: 0.39 },
        { x: 35, y: 0.42 }, { x: 38, y: 0.41 }, { x: 40, y: 0.44 }, { x: 42, y: 0.43 }, { x: 45, y: 0.46 },
        { x: 48, y: 0.45 }, { x: 50, y: 0.48 }, { x: 52, y: 0.47 }, { x: 55, y: 0.50 }, { x: 58, y: 0.49 },
        { x: 60, y: 0.52 }, { x: 62, y: 0.51 }, { x: 65, y: 0.54 }, { x: 68, y: 0.53 }, { x: 70, y: 0.55 },
        { x: 22, y: 0.32 }, { x: 26, y: 0.37 }, { x: 34, y: 0.40 }, { x: 36, y: 0.41 }, { x: 44, y: 0.45 },
        { x: 46, y: 0.44 }, { x: 54, y: 0.49 }, { x: 56, y: 0.48 }, { x: 64, y: 0.52 }, { x: 66, y: 0.51 }
      ]
    };
    lineData = {
      data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80].map((x, i) => ({
        x,
        y: 0.25 + (i / 13) * 0.25
      }))
    };
  }

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
        top: '34px',
        left: '37px',
        right: '44px',
        bottom: '28px'
      },
      dataset: [
        {
          source: scatterData.data.map(item => [item.x, item.y])
        },
        {
          source: lineData.data.map(item => [item.x, item.y])
        }
      ],
      tooltip: {
        show: false
      },
      xAxis: {
        min: 0,
        max: 100,
        interval: 20,
        name: getTranslation(lang, 'AGE'),
        nameTextStyle: {
          color: '#09341F',
          opacity: 0.8,
          fontSize: 8
        },
        axisLine: {
          show: true,
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
          fontSize: 8,
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
        max:0.6,
        name: getTranslation(lang, 'INDEX_SCORE'),
        nameTextStyle: {
          color: '#09341F',
          opacity: 0.8,
          fontSize: 8
        },
        axisLine: {
          show: true,
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
          show: true,
          color: '#09341F',
          fontSize: 8,
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
          itemStyle: {
            color: '#09341F',
            opacity: 0.1,
            borderWidth: 1
          }
        },
        {
          name: 'Rezultat',
          type: 'scatter',
          data: [{ x: chronoAge, y: score }],
          itemStyle: {
            color: getColor(),
          },
        },
        {
          name: 'Prosječna populacija',
          type: 'line',
          smooth: true,
          datasetIndex: 1,
          symbol: 'line',
          lineStyle: {
            name: 'line',
            type: 'line',
            color: '#09341F',
            opacity: 0.5,
            symbol:'none',
            width: 5
          },
          showSymbol: false
        }
      ],
      graphic: [],
      legend: {
        show: true,
        right: '50%',
        top: '1%',
        left: '67%',
        itemGap: 0.2,
        itemWidth: 10,
        itemHeight: 6,
        textStyle: {
          color: '#09341F',
          opacity: 0.8,
          fontSize: 8,
        },
        selected: {
          'Measured result': true,
          'Population average': true
        },
        inactiveColor: '#fff'
      }
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
        stroke: getColor(),
        lineDash: [8, 8],
        lineWidth: 1.7
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
        stroke: getColor(),
        lineDash: [8, 8],
        lineWidth: 1.7
      },
      z: 8
    });

    option.graphic.push({
      name: 'Measured result',
      type: 'circle',
      shape: {
        cx: chart.convertToPixel('xAxis', chronoAge),
        cy: chart.convertToPixel('yAxis', score),
        r: 4
      },
      style: {
        fill: getColor(),
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

    newSvg.setAttribute("width", "52");
    newSvg.setAttribute("height", "18");
    newSvg.setAttribute("viewBox", "0 0 71 32");
    newSvg.setAttribute("fill", "none");
    newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M7 4C7 1.79086 8.79086 0 11 0H67C69.2091 0 71 1.79086 71 4V28C71 30.2091 69.2091 32 67 32H11C8.79086 32 7 30.2091 7 28V4Z");
    path1.setAttribute("fill", getColor());
    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M1.13333 17.6C0.0666666 16.8 0.0666666 15.2 1.13333 14.4L7 10L7 22L1.13333 17.6Z");
    path2.setAttribute("fill", getColor());
    newSvg.appendChild(path1);
    newSvg.appendChild(path2);
    newSvg.style.position = 'absolute';
    newSvg.style.left = `${chartRect.left + xPixel - 95}px`;
    newSvg.style.top = `${chartRect.top + yPixel - 10}px`;
    newSvg.style.zIndex = '8';

    scoreHolder.innerText = `${Number.parseFloat(score).toFixed(3)}`;
    scoreHolder.style.position = 'absolute';
    scoreHolder.style.left = `${chartRect.left + xPixel - 79}px`
    scoreHolder.style.top = `${chartRect.top + yPixel - 7}px`;
    scoreHolder.style.font = 'bold 10px sans-serif';
    scoreHolder.style.color = 'white';
    scoreHolder.style.zIndex = '999';
    scoreHolder.style.fontFamily = 'Sen';

    document.body.appendChild(scoreHolder);
    document.body.appendChild(newSvg);

    chart.setOption(option);
  }

  onMount(async () => {
    const svc = service || (typeof window !== 'undefined' ? window.GaReportService : null);
    if (svc && typeof svc.getReport === 'function') {
      try {
        reportData = await svc.getReport();
        gender = reportData?.sex ?? 'M';
        scatterData = await svc.getScatterData(type, gender);
        lineData = await svc.getLineData(type, gender);
        chronoAge = Number(reportData?.chronologicalage ?? 42);
        if (details && reportData) {
          percentile = Number(reportData[details.csvPerc]);
          score = Number(reportData[details.csvScore]);
        }
      } catch (_) {
        useDummyData();
      }
    }
    if (!scatterData?.data?.length || !lineData?.data?.length) {
      useDummyData();
    }
    drawGraph();
  });
</script>

<div bind:this={el} style="width: 100%; height: 100%; position: relative;"></div>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap" rel="stylesheet">
</svelte:head>