<svelte:options customElement={{ tag: 'ga-scatter-plot', shadow: 'none' }}/>

<script lang="ts">
    import {onMount} from 'svelte';
    import {Service} from '../shared/utils/service';
    // import * as echarts from 'echarts';
    // import * as ecStat from 'echarts-stat';
    import {getColorRedToBlueWithPercentile, getColorMedianWithPercentile, getColorBlueToRedWithPercentile} from '../shared/functions/helpers';

    export let type: string;
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
    let percentile = 0;
    let score = 0;
    let chart: any = {};
    let gender = '';
    let glycanAge = 0;
    let el: HTMLElement;

    const details = types.find(x => x.name === type);

    function getColor() {
        if (type == 'median') {
            return getColorMedianWithPercentile(percentile);
        }
        if (type == 'shield' || type == 'youth'){
            return getColorRedToBlueWithPercentile(percentile);
        }
        if (type == 'mature' || type == 'lifestyle'){
            return getColorBlueToRedWithPercentile(percentile);
        }
    }

    function drawGraph() {
        if (el) {
            chart = echarts.init(el, null, {
                devicePixelRatio: 4
            });
        }
        const chartRect = el.getBoundingClientRect();
        echarts.registerTransform(ecStat['transform'].regression);

        var option = {
            textStyle: {
                fontFamily: 'Sen',
                fontStyle: 'normal',
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 19.2,
                letterSpacing: 0.06
            },
            animation: false,
            backgroundColor: 'transparent',
            grid: {
                top: '65px',
                left: '50px',
                right: '55px',
                bottom: '40px'
            },
            dataset: [
                {
                    source: scatterData.data.map(item => [item.x, item.y])
                },
                {
                    transform: {
                        type: 'ecStat:regression',
                        config: { method: 'polynomial', order: 3 }
                    }
                }
            ],
            tooltip: {
                show: false
            },
            xAxis: {
                min: 0,
                max: 100,
                interval: 20,
                name: 'Age',
                nameTextStyle: {
                    color: '#09341F',
                    opacity: 0.8
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
                name: 'Index score',
                nameTextStyle: {
                    color: '#09341F',
                    opacity: 0.8
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
                    name: 'Measured result',
                    type: 'scatter',
                    data: [{ x: glycanAge, y: score }],
                    symbolSize: 10,
                    itemStyle: {
                        color: getColor()
                    },
                    showSymbol:true
                },
                {
                    name: 'Population average',
                    type: 'line',
                    smooth: true,
                    datasetIndex: 1,
                    symbol: 'line',
                    lineStyle: {
                        name: 'line',
                        type: 'line',
                        color: '#B5C2BD',
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
                top: '3%',
                left: '70%',
                itemGap: 0.2,
                textStyle: {
                    color: '#09341F',
                    opacity: 0.8
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
                x1: chart.convertToPixel('xAxis', glycanAge),
                y1: chart.convertToPixel('yAxis', 0),
                x2: chart.convertToPixel('xAxis', glycanAge),
                y2: chart.convertToPixel('yAxis', score)
            },
            style: {
                stroke: getColor(),
                lineDash: [8, 8],
                lineWidth: 3
            },
            z: 8
        });

        option.graphic.push({
            type: 'line',
            shape: {
                x1: chart.convertToPixel('xAxis', 0),
                y1: chart.convertToPixel('yAxis', score),
                x2: chart.convertToPixel('xAxis', glycanAge),
                y2: chart.convertToPixel('yAxis', score)
            },
            style: {
                stroke: getColor(),
                lineDash: [8, 8],
                lineWidth: 3
            },
            z: 8
        });

        option.graphic.push({
            name: 'Measured result',
            type: 'circle',
            shape: {
                cx: chart.convertToPixel('xAxis', glycanAge),
                cy: chart.convertToPixel('yAxis', score),
                r: 7
            },
            style: {
                fill: getColor()
            },
            z: 15
        });

        // Using position absolute we create result since we need SVG
        const xPixel = chart.convertToPixel('xAxis', glycanAge);
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
        path1.setAttribute("fill", getColor());
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M1.13333 17.6C0.0666666 16.8 0.0666666 15.2 1.13333 14.4L7 10L7 22L1.13333 17.6Z");
        path2.setAttribute("fill", getColor());
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
        scatterData = await service.getScatterData(type, gender);
        glycanAge = Number(reportData.glycanage);

        if (details) {
            percentile = Number(reportData[details.csvPerc]);
            score = Number(reportData[details.csvScore]);
        }

        drawGraph();
    })
</script>

<div bind:this={el} style="width: 100%; height: 100%; position: relative;"></div>

<style>
    @font-face {
        font-family: "Sen";
        src: url("https://dev.back-office.ga-internals-91.com/assets/fonts/Sen-Regular.ttf") format("truetype");
        font-weight: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Sen";
        src: url("https://dev.back-office.ga-internals-91.com/assets/fonts/Sen-Bold.ttf") format("truetype");
        font-weight: bold;
        font-display: swap;
    }
</style>