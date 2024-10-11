<svelte:options customElement={{ tag: 'ga-scatter-plot', shadow: 'none' }}/>

<script lang="ts">
    import {onMount} from 'svelte';
    import {Service} from '../shared/utils/service';
    import * as echarts from 'echarts';
    import * as ecStat from 'echarts-stat';
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

    const details = types.find(x => x.name === type);

    function getColor(){
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

        const chartElement = document.getElementById('chart') as HTMLElement;
        if (chartElement) {
            chart = echarts.init(chartElement, null, {
                devicePixelRatio: 4
            });
        }

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
                        opacity: 0.1,
                    }
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
                    show: true,
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
                    }
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
            series: [{
                type: 'scatter',
                tooltip: {},
                itemStyle: {
                    color: '#09341F',
                    opacity: 0.2,
                    borderWidth: 1
                },
                showInLegend: false
            },
                {
                    name: 'Measured result',
                    type: 'scatter',
                    data: [{ x: glycanAge, y: score }],
                    symbolSize: 10,
                    itemStyle: {
                        color: getColor(),
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
                        width: 5,
                    },
                    showSymbol: false,
                }
            ],
            graphic: [],
            legend: {
                show: true,
                right: '50%',
                top: '1%',
                left: '70%',
                textStyle: {
                    color: '#09341F',
                    opacity: 0.8,
                },
                selected: {
                    'Measured result': true,
                    'Population average': true,
                },
                inactiveColor: '#fff',
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
            type: 'text',
            style: {
                x: chart.convertToPixel('xAxis', glycanAge) + 25,
                y: chart.convertToPixel('yAxis', score) - 10,
                text: `${Number.parseFloat(score).toFixed(5)}`,
                fill: 'white',
                font: 'bold 17px sans-serif',
                borderColor: getColor(),
                borderWidth: 10,
                borderRadius: 2,
                backgroundColor: getColor(),
            },
            z: 10
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
                fill: getColor(),
            },
            z: 15
        });

        chart.setOption(option);
    }

    function downloadChart() {
        const imageURL = chart.getDataURL({
            type: 'png',
            pixelRatio: 4,
            backgroundColor: '#fff'
        });
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'chart.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    onMount(async () => {
        reportData = await service.getReport();
        gender= reportData.sex;
        scatterData = await service.getScatterData(type, gender);
        glycanAge = Number(reportData.glycanage);

        if (details) {
            percentile = Number(reportData[details.csvPerc]);
            score = Number(reportData[details.csvScore]);
        }

        drawGraph();
    })
</script>

<div id="chart" style="width: 100%; height: 100%; position: relative;"></div>
<div class="top-left"></div>
<div class="top-right"></div>
<div class="bottom-down"></div>
<div class="bottom-up"></div>
<button on:click={downloadChart} style="border: 1px solid black; border-radius: 10px;">Download chart image</button>

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

    .top-left {
        position: absolute;
        top: 26%;
        left: 37.65%;
        height: 1px; width: 8px; background-color: #09341F1A; border-radius: 4px; transform: rotate(-135deg);
    }

    .top-right {
        position: absolute;
        top: 26%;
        left: 37.35%;
        height: 1px; width: 8px; background-color: #09341F1A; border-radius: 4px; transform: rotate(135deg);
    }

    .bottom-up {
        position: absolute;
        top: 63.51%;
        left: 61.9%;
        height: 1px; width: 8px; background-color: #09341F1A; border-radius: 4px; transform: rotate(45deg);
    }

    .bottom-down {
        position: absolute;
        top: 64.1%;
        left: 61.9%;
        height: 1px; width: 8px; background-color: #09341F1A; border-radius: 4px; transform: rotate(-45deg);
    }
</style>