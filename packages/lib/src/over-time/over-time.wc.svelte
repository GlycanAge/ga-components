<svelte:options customElement={{ tag: 'ga-over-time', shadow: 'none' }}/>

<script lang="ts">
    import {onMount} from 'svelte';
    import {Service} from '../shared/utils/service';
    // import * as echarts from 'echarts';

    export let service: Service = window.GaReportService;

    let chart: any = {};
    let el: HTMLElement;

    let overTimeData: any;
    let resultIndex: number;

    function getColor(chrono: number, glycanage: number) {
        let diff = Math.abs(chrono - glycanage);

        if (glycanage > chrono) {
            if (diff === 0 || diff <= 5) {
                return '#66CCAA';
            } else if (diff > 5 && diff <= 11) {
                return '#EE6600';
            } else {
                return '#DD2222';
            }
        } else {
            if (diff === 0 || diff <= 5) {
                return '#66CCAA';
            } else if (diff > 5 && diff <= 11) {
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

        var chronoData = overTimeData.data.map((item, index) => [index, item.x]);
        var glycanData = overTimeData.data.map((item, index) => [index, item.y]);

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
                    source: chronoData
                },
                {
                    source: glycanData
                }
            ],
            tooltip: {
                show: false
            },
            xAxis: {
                min: overTimeData.data.map((item, index) => [index, item.x])[0][0],
                max: overTimeData.data.map((item, index) => [index, item.x])[overTimeData.data.length - 1][0],
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
                min: Math.min(...overTimeData.data.map(item => Math.min(item.x, item.y))) - 5,
                max: Math.max(...overTimeData.data.map(item => Math.max(item.x, item.y))) + 5,
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
                        color: '#BCD2C7',
                        width: 5,
                    },
                    showSymbol: false,
                    z: 10
                },
                {
                    name: 'Glycan Age',
                    type: 'line',
                    smooth: true,
                    datasetIndex: 1,
                    lineStyle: {
                        color: '#416D57',
                        width: 5,
                    },
                    showSymbol: false,
                    z: 20
                },
                {
                    name: 'Glycan Age Outer White line',
                    type: 'line',
                    smooth: true,
                    datasetIndex: 1,
                    lineStyle: {
                        color: '#FAFAFA',
                        width: 12
                    },
                    showSymbol: false,
                    z: 19
                }
            ],
            graphic: []
        };

        chart.setOption(option);

        for (let j = 0; j < chronoData.length; j++) {
            if (j !== resultIndex) {
                option.graphic.push({
                    type: 'line',
                    shape: {
                        x1: chart.convertToPixel('xAxis', j),
                        y1: chart.convertToPixel('yAxis', 0),
                        x2: chart.convertToPixel('xAxis', j),
                        y2: chart.convertToPixel('yAxis', Math.max(...overTimeData.data.map(item => Math.max(item.x, item.y))) + 5)
                    },
                    style: {
                        stroke: '#09341F33',
                        lineDash: [6, 15],
                        lineWidth: 2
                    },
                });

                const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                const scoreHolder = document.createElement('div');

                newSvg.setAttribute("width", "28");
                newSvg.setAttribute("height", "33");
                newSvg.setAttribute("viewBox", "0 0 28 33");
                newSvg.setAttribute("fill", "none");
                newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path1.setAttribute("d", "M14.0007 0.333168C14.3895 0.333168 14.7784 0.402611 15.1673 0.5415C15.5562 0.680389 15.9034 0.888721 16.209 1.1665C18.0145 2.83317 19.6118 4.45817 21.0007 6.0415C22.3895 7.62483 23.5493 9.15956 24.4798 10.6457C25.4104 12.1318 26.1187 13.5623 26.6048 14.9373C27.0909 16.3123 27.334 17.6248 27.334 18.8748C27.334 23.0415 25.9937 26.3609 23.3132 28.8332C20.6326 31.3054 17.5284 32.5415 14.0007 32.5415C10.4729 32.5415 7.36871 31.3054 4.68815 28.8332C2.00759 26.3609 0.667316 23.0415 0.667316 18.8748C0.667316 17.6248 0.910372 16.3123 1.39648 14.9373C1.8826 13.5623 2.59093 12.1318 3.52148 10.6457C4.45204 9.15956 5.61176 7.62483 7.00065 6.0415C8.38954 4.45817 9.98676 2.83317 11.7923 1.1665C12.0979 0.888721 12.4451 0.680389 12.834 0.5415C13.2229 0.402611 13.6118 0.333168 14.0007 0.333168Z");
                path1.setAttribute("fill", '#D7E5DF');
                newSvg.appendChild(path1);
                newSvg.style.position = 'absolute';
                newSvg.style.left = `${chartRect.left + chart.convertToPixel('xAxis', j) - 14}px`;
                newSvg.style.top = `${chartRect.top + chart.convertToPixel('yAxis', chronoData[j][1]) + 8}px`;
                newSvg.style.zIndex = '8';
                newSvg.style.opacity = '0.5';

                scoreHolder.innerText = `${chronoData[j][1]}`;
                scoreHolder.style.position = 'absolute';
                scoreHolder.style.left = `${chartRect.left + chart.convertToPixel('xAxis', j) - 7}px`;
                scoreHolder.style.top = `${chartRect.top + chart.convertToPixel('yAxis', chronoData[j][1]) + 18}px`;
                scoreHolder.style.font = 'bold 12px sans-serif';
                scoreHolder.style.color = '#09341F80';
                scoreHolder.style.zIndex = '19';
                scoreHolder.style.fontFamily = 'Sen';
                scoreHolder.style.opacity = '0.5';

                document.body.appendChild(scoreHolder);
                document.body.appendChild(newSvg);
            } else {
                option.graphic.push({
                    type: 'line',
                    shape: {
                        x1: chart.convertToPixel('xAxis', j),
                        y1: chart.convertToPixel('yAxis', 0),
                        x2: chart.convertToPixel('xAxis', j),
                        y2: chart.convertToPixel('yAxis', Math.max(...overTimeData.data.map(item => Math.max(item.x, item.y))) + 5)
                    },
                    style: {
                        stroke: '#416D57',
                        lineDash: [6, 15],
                        lineWidth: 2
                    },
                });

                const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                const scoreHolder = document.createElement('div');

                newSvg.setAttribute("width", "28");
                newSvg.setAttribute("height", "33");
                newSvg.setAttribute("viewBox", "0 0 28 33");
                newSvg.setAttribute("fill", "none");
                newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path1.setAttribute("d", "M14.0007 0.333168C14.3895 0.333168 14.7784 0.402611 15.1673 0.5415C15.5562 0.680389 15.9034 0.888721 16.209 1.1665C18.0145 2.83317 19.6118 4.45817 21.0007 6.0415C22.3895 7.62483 23.5493 9.15956 24.4798 10.6457C25.4104 12.1318 26.1187 13.5623 26.6048 14.9373C27.0909 16.3123 27.334 17.6248 27.334 18.8748C27.334 23.0415 25.9937 26.3609 23.3132 28.8332C20.6326 31.3054 17.5284 32.5415 14.0007 32.5415C10.4729 32.5415 7.36871 31.3054 4.68815 28.8332C2.00759 26.3609 0.667316 23.0415 0.667316 18.8748C0.667316 17.6248 0.910372 16.3123 1.39648 14.9373C1.8826 13.5623 2.59093 12.1318 3.52148 10.6457C4.45204 9.15956 5.61176 7.62483 7.00065 6.0415C8.38954 4.45817 9.98676 2.83317 11.7923 1.1665C12.0979 0.888721 12.4451 0.680389 12.834 0.5415C13.2229 0.402611 13.6118 0.333168 14.0007 0.333168Z");
                path1.setAttribute("fill", '#D7E5DF');
                newSvg.appendChild(path1);
                newSvg.style.position = 'absolute';
                newSvg.style.left = `${chartRect.left + chart.convertToPixel('xAxis', j) - 14}px`;
                newSvg.style.top = `${chartRect.top + chart.convertToPixel('yAxis', chronoData[j][1]) + 8}px`;
                newSvg.style.zIndex = '8';

                scoreHolder.innerText = `${chronoData[j][1]}`;
                scoreHolder.style.position = 'absolute';
                scoreHolder.style.left = `${chartRect.left + chart.convertToPixel('xAxis', j) - 7}px`;
                scoreHolder.style.top = `${chartRect.top + chart.convertToPixel('yAxis', chronoData[j][1]) + 18}px`;
                scoreHolder.style.font = 'bold 12px sans-serif';
                scoreHolder.style.color = '#09341F80';
                scoreHolder.style.zIndex = '19';
                scoreHolder.style.fontFamily = 'Sen';

                document.body.appendChild(scoreHolder);
                document.body.appendChild(newSvg);
            }


        }

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
                path1.setAttribute("fill", getColor(overTimeData.data[k].x, overTimeData.data[k].y));
                newSvg.appendChild(path1);
                newSvg.style.position = 'absolute';
                newSvg.style.left = `${chartRect.left + chart.convertToPixel('xAxis', k) - 14}px`;
                newSvg.style.top = `${chartRect.top + chart.convertToPixel('yAxis', glycanData[k][1]) - 47}px`;
                newSvg.style.zIndex = '8';
                newSvg.style.opacity = overTimeData.data[k].result ? '1' : '0.5';

                scoreHolder.innerText = `${overTimeData.data[k].y}`;
                scoreHolder.style.position = 'absolute';
                scoreHolder.style.left = `${chartRect.left + chart.convertToPixel('xAxis', k) - 7}px`;
                scoreHolder.style.top = `${chartRect.top + chart.convertToPixel('yAxis', glycanData[k][1]) + -40}px`;
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

            const messageHolder =  document.createElement('div');

            if (overTimeData.data[k].result) {
                messageHolder.style.position = 'absolute';
                messageHolder.style.left = k === overTimeData.data.length-1 ?  `${chartRect.left + chart.convertToPixel('xAxis', k) - 25}px` : `${chartRect.left + chart.convertToPixel('xAxis', k) - 60}px`;
                messageHolder.style.top = `76%`;
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
                messageDiv.innerText = k === overTimeData.data.length-1 ? `This test` : `Results from this test`;
                messageHolder.appendChild(arrowSvg);
                messageHolder.appendChild(messageDiv);

                document.body.appendChild(messageHolder);
            }
        }

        chart.setOption(option);
    }

    onMount(async () => {
        overTimeData = await service.getOverTimeData();
        resultIndex = overTimeData.data.findIndex(item => item.result === true);

        drawGraph();
    })
</script>

<div bind:this={el} style="width: 100%; height: 100%; position: relative;"></div>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap" rel="stylesheet">
</svelte:head>