<svelte:options customElement={{ tag: 'ga-over-time-indexes-clp-ch', shadow: 'none' }}/>

<script lang="ts">
  import {onMount} from 'svelte';
  import {Service} from '../shared/utils/service';
  // import * as echarts from 'echarts';

  export let service: Service = window.GaReportService;
  export let type: string;

  let label = '';
  let description = '';

  let subtypes = [
    {
      name: 'shield',
      label: 'Glycan Shield (S)',
      description: '抗炎指标',
      value: 'Spercentile'
    },
    {
      name: 'youth',
      label: 'Glycan Youth (G2)',
      description: '抗炎指标',
      value: 'G2percentile'
    },
    {
      name: 'mature',
      label: 'Glycan Mature (G0)',
      description: '促炎指标',
      value: 'G0percentile'
    },
    {
      name: 'median',
      label: 'Glycan Median (G1)',
      description: '辅助指标',
      value: 'G1percentile'
    },
    {
      name: 'lifestyle',
      label: 'Glycan Bisection (B)',
      description: '辅助指标',
      value: 'Bpercentile'
    }
  ];

  const details = subtypes.find(x => x.name === type);

  let chart: any = {};
  let el: HTMLElement;

  let overTimeData: any;
  let resultIndex: number;

  function getColor(percentile: number) {

    if (type === 'shield' || type === 'youth' || type === 'median') {
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
        min: 0,
        max: 100,
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
            width: 3,
          },
          showSymbol: false,
          z: 10
        }
      ],
      graphic: []
    };

    chart.setOption(option);

    for (let k = 0; k < overTimeData.data.length; k++) {
      const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const scoreHolder = document.createElement('div');
      const verticalLines = document.createElement('div');
      const messageHolder =  document.createElement('div');

      // Create the vertical dashed line
      verticalLines.style.position = 'absolute';
      verticalLines.style.left = `${chartRect.left + chart.convertToPixel('xAxis', k)}px`;
      verticalLines.style.top = `${chartRect.top}px`;
      verticalLines.style.height = `${chartRect.height}px`;
      verticalLines.style.width = '2px';
      verticalLines.style.display = 'flex';
      verticalLines.style.flexDirection = 'column';
      verticalLines.style.zIndex = '0';

      // Create 8 small divs for the dashed line
      for (let i = 0; i < 8; i++) {
        const dashDiv = document.createElement('div');
        dashDiv.style.width = '2px';
        dashDiv.style.height = '8px';
        dashDiv.style.borderRadius = '99px';
        dashDiv.style.marginBottom = '2px';
        dashDiv.style.opacity = overTimeData.data[k].result ? '1' : '0.5';

        if (type === 'mature' || type === 'lifestyle') {
          if (i < 2) {
            dashDiv.style.backgroundColor = '#DD2222';
          }
          if (i === 2) {
            dashDiv.style.backgroundColor = '#EE6600';
          }
          if (i === 3 || i === 4) {
            dashDiv.style.backgroundColor = '#66CCAA';
          }
          if (i === 5) {
            dashDiv.style.backgroundColor = '#119999';
          }
          if (i > 5) {
            dashDiv.style.backgroundColor = '#005566';
          }
        }

        if (type === 'shield' || type === 'youth' || type === 'median') {
          if (i < 2) {
            dashDiv.style.backgroundColor = '#005566';
          }
          if (i === 2) {
            dashDiv.style.backgroundColor = '#119999';
          }
          if (i === 3 || i === 4) {
            dashDiv.style.backgroundColor = '#66CCAA';
          }
          if (i === 5) {
            dashDiv.style.backgroundColor = '#EE6600';
          }
          if (i > 5) {
            dashDiv.style.backgroundColor = '#DD2222';
          }
        }

        verticalLines.appendChild(dashDiv);
      }

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
      newSvg.style.opacity = overTimeData.data[k].result ? '1' : '0.4';

      scoreHolder.innerText = `${overTimeData.data[k][cur]}`;
      scoreHolder.style.position = 'absolute';
      scoreHolder.style.left = `${chartRect.left + chart.convertToPixel('xAxis', k) - (overTimeData.data[k][cur] < 10 ? 4 : overTimeData.data[k][cur] === 100 ? 10 : 7)}px`;
      scoreHolder.style.top = `${chartRect.top + chart.convertToPixel('yAxis', glycanData[k][1]) + -30}px`;
      scoreHolder.style.font = 'bold 12px sans-serif';
      scoreHolder.style.color = 'white';
      scoreHolder.style.zIndex = '19';
      scoreHolder.style.fontFamily = 'Sen';
      scoreHolder.style.opacity = overTimeData.data[k].result ? '1' : '0.8';

      if (type === 'lifestyle' && overTimeData.data[k].result) {
        messageHolder.style.position = 'absolute';
        messageHolder.style.left = k === overTimeData.data.length-1 ?  `${chartRect.left + chart.convertToPixel('xAxis', k) - 36}px` : `${chartRect.left + chart.convertToPixel('xAxis', k) - 36}px`;
        messageHolder.style.top = `${chartRect.top + 86}px`;
        messageHolder.style.font = 'bold 12px sans-serif';
        messageHolder.style.color = 'black';
        messageHolder.style.zIndex = '19';
        messageHolder.style.fontFamily = 'Sen';
        messageHolder.style.display = 'flex';
        messageHolder.style.flexDirection = 'column';
        messageHolder.style.alignItems = 'center';
        const arrowSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        arrowSvg.setAttribute("width", "16");
        arrowSvg.setAttribute("height", "18");
        arrowSvg.setAttribute("viewBox", "0 0 16 18");
        arrowSvg.setAttribute("fill", "none");
        arrowSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const pathArrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathArrow.setAttribute("d", "M7 17C7 17.5523 7.44772 18 8 18C8.55228 18 9 17.5523 9 17H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM8 17H9V1H8H7V17H8Z");
        pathArrow.setAttribute("fill", '#09341F');
        arrowSvg.appendChild(pathArrow);

        const messageDiv = document.createElement('div');
        messageDiv.innerText = '本次检测结果';
        messageHolder.appendChild(arrowSvg);
        messageHolder.appendChild(messageDiv);

        document.body.appendChild(messageHolder);
      }

      document.body.appendChild(scoreHolder);
      document.body.appendChild(newSvg);
      document.body.appendChild(verticalLines);
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

<div class="main">
  <div class="label">
    <div class="label-container">
      <b style="font-size: 0.8rem;">{label}</b>
      <div style="font-size: 0.7rem;">
        {description}
      </div>
    </div>
  </div>
  <div style="display: flex; align-items: center; margin-bottom: 1rem; height: 55%; width: 100%; position: relative;" bind:this={el}>

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