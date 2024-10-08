<svelte:options customElement={{ tag: 'ga-scatter-plot', shadow: 'open' }}/>

<script lang="ts">
    import {onMount} from 'svelte';
    import {Service} from '../shared/utils/service';

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

    const details = types.find(x => x.name === type);

    onMount(async () => {
        reportData = await service.getReport();
        scatterData = await service.getScatterData();

        console.log('reportData:', reportData);
        console.log('scatterData', scatterData['data']);
        console.log('scatterData', scatterData['data'][7].x);

        if (details) {
            percentile = Number(reportData[details.csvPerc]);
            score = Number(reportData[details.csvScore]);
        }

        show = true;
    });
</script>

{#if show}
    <div class="main">
        Temp,temp
        <!-- scatter plott html -->
    </div>
{/if}

<style>
    .main {
        height: 100%;
        width: 100%;
    }
</style>