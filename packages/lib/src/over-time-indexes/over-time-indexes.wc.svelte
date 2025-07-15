<svelte:options customElement={{ tag: 'ga-over-time-indexes', shadow: 'none' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';
  // import * as echarts from 'echarts';
  import { getTranslation } from '../shared/functions/helpers';

  export let service: Service = window.GaReportService;
  export let type: string;
  export let lang: string;

  let label = '';
  let description = '';

  let subtypes = [
    {
      name: 'shield',
      label: 'GLYCAN_SHIELD',
      description: 'ANTI_INFLAMMATORY_INDEX',
      value: 'Spercentile'
    },
    {
      name: 'youth',
      label: 'GLYCAN_YOUTH',
      description: 'ANTI_INFLAMMATORY_INDEX',
      value: 'G2percentile'
    },
    {
      name: 'mature',
      label: 'GLYCAN_MATURE',
      description: 'PRO_INFLAMMATORY_INDEX',
      value: 'G0percentile'
    },
    {
      name: 'median',
      label: 'GLYCAN_MEDIAN',
      description: 'SUPPORTIVE_INDEX',
      value: 'G1percentile'
    },
    {
      name: 'lifestyle',
      label: 'GLYCAN_LIFESTYLE_B',
      description: 'SUPPORTIVE_INDEX',
      value: 'Bpercentile'
    }
  ];

  const details = subtypes.find(x => x.name === type);

  let chart: any = {};
  let el: HTMLElement;

  let overTimeData: any;
  let resultIndex: number;

  function getColor(percentile: number) {

     if (type === 'shield' || type === 'youth') {
       if (percentile <= 17) {
         return '#DD2222';
       } else if (percentile > 17 && percentile <= 33) {
         return '#EE6600';
       } else if (percentile > 33 && percentile <= 66) {
         return '#66CCAA';
       } else if (percentile > 66 && percentile <= 82) {
         return '#119999';
       } else {
         return '#005566';
       }
     }

      if (type === 'mature' || type === 'lifestyle') {
        if (percentile <= 17) {
          return '#005566';
        } else if (percentile > 17 && percentile <= 33) {
          return '#119999';
        } else if (percentile > 33 && percentile <= 66) {
          return '#66CCAA';
        } else if (percentile > 66 && percentile <= 82) {
          return '#EE6600';
        } else {
          return '#DD2222';
        }
    }

      if (type === 'median') {
        if (percentile === 1 || percentile === 100 || percentile === 0 || percentile === 99) {
          return '#DD2222';
        } else if (percentile >= 2 && percentile <= 17) {
          return '#EE6600';
        } else if (percentile >= 83 && percentile <= 98) {
          return '#EE6600';
        } else if (percentile >= 18 && percentile <= 33) {
          return '#119999';
        } else if (percentile >= 67 && percentile <= 82) {
          return '#119999';
        } else {
          return '#005566';
        }
      }
  }

  function drawGraph() {
    if (el) {
      chart = echarts.init(el, null, {
        devicePixelRatio: 4,
        renderer: 'svg'
      });
    }

    const chartRect = el.getBoundingClientRect();

    const cur = subtypes.find((it) => it.name === type).value;

    console.log('cur:', cur);

    var glycanData = overTimeData.data.map((item, index) => [index, item[cur]]);

    var option = {
      textStyle: {
        fontFamily: "Sen, sans serif"
      },
      animation: false,
      backgroundColor: 'transparent',
      grid: {
        top: '2px',
        left: '2px',
        right: '2px',
        bottom: '2px'
      },
      dataset: [
        {
          source: glycanData
        }
      ],
      tooltip: {
        show: false
      },
      xAxis: {
        min: overTimeData.data.map((item, index) => [index, item[cur]])[0][0],
        max: overTimeData.data.map((item, index) => [index, item[cur]])[overTimeData.data.length - 1][0],
        name: '',
        interval: 1,
        axisLine: {
          show: false,
          symbol: ['none', 'arrow'],
          symbolSize: [5, 10],
          symbolOffset: [8]
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        min: Math.min(...overTimeData.data.map(item => Math.min(item[cur]))) - 5,
        max: Math.max(...overTimeData.data.map(item => Math.max(item[cur]))) + 5,
        name: '',
        axisLine: {
          show: false,
          symbol: ['none', 'arrow'],
          symbolSize: [5, 10],
          symbolOffset: [5]
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        }
      },
      series: [
        {
          name: 'Chrono Age',
          type: 'line',
          smooth: true,
          datasetIndex: 0,
          symbol: 'line',
          lineStyle: {
            color: '#416D57',
            width: 5,
          },
          showSymbol: false,
          z: 10
        }
      ],
      graphic: []
    };

    chart.setOption(option);

    for (let k = 0; k < overTimeData.data.length; k++) {
      if (overTimeData.data[k].x < overTimeData.data[k].y || overTimeData.data[k].x === overTimeData.data[k].y) {
        const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const scoreHolder = document.createElement('div');

        newSvg.setAttribute("width", "28");
        newSvg.setAttribute("height", "33");
        newSvg.setAttribute("viewBox", "0 0 28 33");
        newSvg.setAttribute("fill", "none");
        newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M14.0003 32.5418C13.6114 32.5418 13.2225 32.4724 12.8337 32.3335C12.4448 32.1946 12.0975 31.9863 11.792 31.7085C9.98644 30.0418 8.38921 28.4168 7.00033 26.8335C5.61144 25.2502 4.45171 23.7154 3.52116 22.2293C2.5906 20.7432 1.88227 19.3127 1.39616 17.9377C0.910048 16.5627 0.666992 15.2502 0.666992 14.0002C0.666992 9.8335 2.00727 6.51405 4.68783 4.04183C7.36838 1.56961 10.4725 0.333496 14.0003 0.333496C17.5281 0.333496 20.6323 1.56961 23.3128 4.04183C25.9934 6.51405 27.3337 9.8335 27.3337 14.0002C27.3337 15.2502 27.0906 16.5627 26.6045 17.9377C26.1184 19.3127 25.41 20.7432 24.4795 22.2293C23.5489 23.7154 22.3892 25.2502 21.0003 26.8335C19.6114 28.4168 18.0142 30.0418 16.2087 31.7085C15.9031 31.9863 15.5559 32.1946 15.167 32.3335C14.7781 32.4724 14.3892 32.5418 14.0003 32.5418Z");
        path1.setAttribute("fill", getColor(overTimeData.data[k][cur]));
        newSvg.appendChild(path1);
        newSvg.style.position = 'absolute';
        newSvg.style.left = `${chartRect.left + chart.convertToPixel('xAxis', k) - 14}px`;
        newSvg.style.top = `${chartRect.top + chart.convertToPixel('yAxis', glycanData[k][1]) - 37}px`;
        newSvg.style.zIndex = '8';
        newSvg.style.opacity = overTimeData.data[k].result ? '1' : '0.5';

        scoreHolder.innerText = `${overTimeData.data[k][cur]}`;
        scoreHolder.style.position = 'absolute';
        scoreHolder.style.left = `${chartRect.left + chart.convertToPixel('xAxis', k) - (overTimeData.data[k][cur] < 10 ? 4 : overTimeData.data[k][cur] === 100 ? 10 : 7)}px`;
        scoreHolder.style.top = `${chartRect.top + chart.convertToPixel('yAxis', glycanData[k][1]) + -30}px`;
        scoreHolder.style.font = 'bold 12px sans-serif';
        scoreHolder.style.color = 'white';
        scoreHolder.style.zIndex = '19';
        scoreHolder.style.fontFamily = 'Sen';
        scoreHolder.style.opacity = overTimeData.data[k].result ? '1' : '0.8';

        document.body.appendChild(scoreHolder);
        document.body.appendChild(newSvg);
      } else {
        const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const scoreHolder = document.createElement('div');

        newSvg.setAttribute("width", "28");
        newSvg.setAttribute("height", "33");
        newSvg.setAttribute("viewBox", "0 0 28 33");
        newSvg.setAttribute("fill", "none");
        newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M13.9997 0.458167C14.3886 0.458167 14.7775 0.52761 15.1663 0.666499C15.5552 0.805388 15.9025 1.01372 16.208 1.2915C18.0136 2.95817 19.6108 4.58317 20.9997 6.1665C22.3886 7.74983 23.5483 9.28456 24.4788 10.7707C25.4094 12.2568 26.1177 13.6873 26.6038 15.0623C27.09 16.4373 27.333 17.7498 27.333 18.9998C27.333 23.1665 25.9927 26.4859 23.3122 28.9582C20.6316 31.4304 17.5275 32.6665 13.9997 32.6665C10.4719 32.6665 7.36773 31.4304 4.68717 28.9582C2.00662 26.4859 0.666341 23.1665 0.666341 18.9998C0.666341 17.7498 0.909397 16.4373 1.39551 15.0623C1.88162 13.6873 2.58995 12.2568 3.52051 10.7707C4.45107 9.28456 5.61079 7.74983 6.99968 6.1665C8.38857 4.58316 9.98579 2.95816 11.7913 1.2915C12.0969 1.01372 12.4441 0.805388 12.833 0.666499C13.2219 0.52761 13.6108 0.458167 13.9997 0.458167Z");
        path1.setAttribute("fill", getColor(overTimeData.data[k].x, overTimeData.data[k].y));
        newSvg.appendChild(path1);
        newSvg.style.position = 'absolute';
        newSvg.style.left = `${chartRect.left + chart.convertToPixel('xAxis', k) - 14}px`;
        newSvg.style.top = `${chartRect.top + chart.convertToPixel('yAxis', glycanData[k][1]) + 8}px`;
        newSvg.style.zIndex = '8';
        newSvg.style.opacity = overTimeData.data[k].result ? '1' : '0.5';

        scoreHolder.innerText = `${overTimeData.data[k].y}`;
        scoreHolder.style.position = 'absolute';
        scoreHolder.style.left = `${chartRect.left + chart.convertToPixel('xAxis', k) - 7}px`;
        scoreHolder.style.top = `${chartRect.top + chart.convertToPixel('yAxis', glycanData[k][1]) + 18}px`;
        scoreHolder.style.font = 'bold 12px sans-serif';
        scoreHolder.style.color = 'white';
        scoreHolder.style.zIndex = '999';
        scoreHolder.style.fontFamily = 'Sen';
        scoreHolder.style.opacity = overTimeData.data[k].result ? '1' : '0.8';

        document.body.appendChild(scoreHolder);
        document.body.appendChild(newSvg);
      }
    }

    chart.setOption(option);
  }

  onMount(async () => {
    overTimeData = await service.getOverTimeDataIndexes();
    resultIndex = overTimeData.data.findIndex(item => item.result === true);

    drawGraph();

    if (details) {
      label = details.label;
      description = details.description;
    }
  });
</script>

<!--<div bind:this={el} style="width: 100%; height: 100%; position: relative;"></div>-->

<div class="main">
  <div class="label">
    <div class="label-container">
      <b style="font-size: {lang === 'slovenian' ? 0.70 : 0.8}rem;">{getTranslation(lang, label)}</b>
      <div style="font-size: 0.7rem;">
        {getTranslation(lang, description)}
      </div>
    </div>
  </div>
  <div style="display: flex; align-items: center; margin-bottom: 1rem; height: 45%; width: 100%; position: relative;" bind:this={el}>

  </div>
</div>

<style>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: end;
    }

    .label {
        width: 40%;
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        height: 100%;
    }

    .label-container {
        display: flex;
        flex-direction: column;
    }
</style>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap" rel="stylesheet">
</svelte:head>