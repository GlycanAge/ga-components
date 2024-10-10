<svelte:options customElement={{ tag: 'ga-scatter-plot', shadow: 'none' }}/>

<script lang="ts">
    import {onMount} from 'svelte';
    import {Service} from '../shared/utils/service';
    import * as echarts from 'echarts';
    import * as ecStat from 'echarts-stat'

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
    let show = false;
    let chart: any = {};
    let gender = ''  ;

    const details = types.find(x => x.name === type);

    function drawGraph() {

        const chartElement = document.getElementById('chart') as HTMLElement;
        if (chartElement) {
            chart = echarts.init(chartElement);

        } else {
            console.error("Chart element not found.");
        }

        var wanted_age = 44;
        var selectedIndex = scatterData.data.findIndex(subarray => subarray.x === wanted_age);


        var age = scatterData.data[selectedIndex].x;
        var indexScore = scatterData.data[selectedIndex].y;


        echarts.registerTransform(ecStat['transform'].regression);

        var option = {
    animation: false,
    backgroundColor: 'transparent',
    dataset: [{
        source: scatterData.data.map(item => [item.x, item.y])
    }, {
        transform: {
            type: 'ecStat:regression',
            config: { method: 'polynomial', order: 3 }
        }
    }],
    tooltip: {
        show: false // Hide tooltips for all points
    },
    xAxis: {
        min: 0,           // Minimum value of the X-axis
        max: 100,         // Maximum value of the X-axis
        interval: 20,
        name: 'Age',
        axisLine: {
            show: false // Hide the X axis line
        },
        axisTick: {
            show: false // Hide the X axis ticks
        },
        axisLabel: {
            show: true, // Show the X axis labels
            color: 'black', // Optional: Customize label color
            formatter: function(value) {
                // Only show labels for 20, 40, 60, and 80
                return value === 0 || value === 100 ? '' : value;
            }
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        min:0,
        max:0.5,
        name: 'Index score',
        axisLine: {
            show: false // Hide the Y axis line
        },
        axisTick: {
            show: false // Hide the Y axis ticks
        },
        axisLabel: {
            show: true, // Show the Y axis labels
            color: 'black', // Optional: Customize label color
            formatter: function(value) {
                // Only show labels for 20, 40, 60, and 80
                return value === 0 ? '' : value;
            }
        },
        splitLine: {
            show: false
        }
    },
    series: [{
        //name: 'scatter', // Scatter series for dots, appears first
        type: 'scatter',
        tooltip: {}, // Enable tooltip for scatter points if needed
        itemStyle: {
            color: '#D3D3D3',
            opacity: 0.5,
            borderWidth: 1,

        },
        showInLegend: false //

    },
    {
            name: 'Measured result',
            type: 'scatter',
            data: [{ x: age, y: indexScore }],
            symbolSize: 10,
            itemStyle: {
                color: 'rgb(17,153,153)',
            },
            showSymbol:true
        },
    {
        name: 'Population average',
        type: 'line',
        smooth: true,
        datasetIndex: 1,
        symbol: 'none',
        color: '#D3D3D3',
        z: 5,
        lineStyle: {
            name: 'line',
            type: 'line',
            color: '#808080',
            symbol:'none',
            width: 5,
            opacity: 0.7,
    },

    showSymbol: false,
    },

],
    graphic: [],
    legend: {
        show: true,
        right: '50%',
        top: '5%',
        left: '70%',
        textStyle: {
            color: 'black'
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
            x1: chart.convertToPixel('xAxis', age),
            y1: chart.convertToPixel('yAxis', 0),
            x2: chart.convertToPixel('xAxis', age),
            y2: chart.convertToPixel('yAxis', indexScore)
            },
            style: {
            stroke: 'rgb(17,153,153)',
            lineDash: [8, 8],
            lineWidth: 3
            },
            z: 8
        });

        option.graphic.push({
            type: 'line',
            shape: {
            x1: chart.convertToPixel('xAxis', 0),
            y1: chart.convertToPixel('yAxis', indexScore),
            x2: chart.convertToPixel('xAxis', age),
            y2: chart.convertToPixel('yAxis', indexScore)
            },
            style: {
            stroke: 'rgb(17,153,153)',
            lineDash: [8, 8],
            lineWidth: 3
            },
            z: 8
        });
        option.graphic.push({
            type: 'text',
            style: {
            x: chart.convertToPixel('xAxis', age) + 25,
            y: chart.convertToPixel('yAxis', indexScore) - 10,
            text: `${Number.parseFloat(indexScore).toFixed(5)}`,
            fill: 'white', // Text color
            font: 'bold 17px sans-serif',
            //width:'5px',
            borderColor: 'rgb(17,153,153)',
            borderWidth: 10,
            borderRadius: 2,
            backgroundColor: 'rgb(17,153,153)',
            },
            z: 10
        });
        const largerDotSize = 7; // Adjust the size as needed
        option.graphic.push({
            name: 'Measured result',
            type: 'circle',
            shape: {
                cx: chart.convertToPixel('xAxis', age),
                cy: chart.convertToPixel('yAxis', indexScore),
                r: largerDotSize // Set the radius of the larger dot
            },
            style: {
                fill: 'rgb(17,153,153)', // Color of the larger dot
                //stroke: 'white',
                //lineWidth: 2
            },
            z: 15 // Ensure it is drawn on top of everything
        });

    chart.setOption(option); // Set the final options to the chart
}

    onMount(async () => {
        reportData = await service.getReport();
        gender= reportData.sex;
        scatterData = await service.getScatterData(type, gender);

        console.log('reportData:', reportData);
        console.log('scatterData', scatterData['data']);

        if (details) {
            percentile = Number(reportData[details.csvPerc]);
            score = Number(reportData[details.csvScore]);
        }

        drawGraph();
    })
</script>

<div id="chart" style="width: 100%; height: 100%;"></div>
