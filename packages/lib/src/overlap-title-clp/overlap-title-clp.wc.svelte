<svelte:options customElement={{ tag: 'ga-overlap-title-clp', shadow: 'open' }}/>

<script lang="ts">
    import {onMount} from 'svelte';
    import {Service} from '../shared/utils/service';

    export let lang: string;
    export let disease: string;
    export let service: Service = window.GaReportService;

    let diseases = [
        {
            name: 'risk',
            counter: 'riskCounter',
            max: 1
        },
        {
            name: 'pre',
            counter: 'preCounter',
            max: 1
        },
        {
            name: 'hyper',
            counter: 'hyperCounter',
            max: 3
        },
        {
            name: 'cva',
            counter: 'cvaCounter',
            max: 4
        },
        {
            name: 'femalecva',
            counter: 'cvaFCounter',
            max: 1
        },
        {
            name: 'atherosclerosis',
            counter: 'atheroCounter',
            max: 5
        },
        {
            name: 'coronary',
            counter: 'coronaryCounter',
            max: 2
        },
        {
            name: 'diabetes',
            counter: 'diabetesCounter',
            max: 5
        },
        {
            name: 'dyslipidemia',
            counter: 'dyslipidemiaCounter',
            max: 4
        },
        {
            name: 'arthritis',
            counter: 'arthritisCounter',
            max: 4
        },
        {
            name: 'colitis',
            counter: 'colitisCounter',
            max: 4
        },
        {
            name: 'crohn',
            counter: 'crohnCounter',
            max: 5
        },
        {
            name: 'sle',
            counter: 'sleCounter',
            max: 4
        },
        {
            name: 'copd',
            counter: 'copdCounter',
            max: 2
        },
        {
            name: 'peri',
            counter: 'periCounter',
            max: 4
        }
    ]

    let reportData: any;

    let gender = '';
    let message = 'no significant overlap';
    let color = '';
    let bgColor = '';
    let counter = 0;
    let max = 0;

    let riskCounter = 0;
    let preCounter = 0;
    let hyperCounter = 0;
    let cvaCounter = 0;
    let cvaFCounter = 0;
    let atheroCounter = 0;
    let coronaryCounter = 0;
    let diabetesCounter = 0;
    let dyslipidemiaCounter = 0;
    let arthritisCounter = 0;
    let colitisCounter = 0;
    let crohnCounter = 0;
    let sleCounter = 0;
    let copdCounter = 0;
    let periCounter = 0;

    let bPercentile = 0; // Bpercentile
    let sPercentile = 0; // Spercentile
    let g0Percentile = 0; // g0percentile
    let g1Percentile = 0; // g1percentile
    let g2Percentile = 0; // g2percentile
    let p22Percentile = 0; // p22percentile
    let p18Percentile = 0; // p18percentile
    let p23Percentile = 0; // p23percentile
    let p26Percentile = 0; // p26percentile

    let show = false;

    const details = diseases.find(x => x.name === disease);

    onMount(async () => {
        reportData = await service.getReport();

        gender = reportData.sex;

        bPercentile = Number(reportData.Bpercentile);
        sPercentile = Number(reportData.Spercentile);
        g0Percentile = Number(reportData.G0percentile);
        g1Percentile = Number(reportData.G1percentile);
        g2Percentile = Number(reportData.G2percentile);
        p18Percentile = Number(reportData.P18percentile);
        p22Percentile = Number(reportData.P22percentile);
        p23Percentile = Number(reportData.P23percentile);
        p26Percentile = Number(reportData.P26percentile);

        if (bPercentile >= 67) {
            riskCounter++;
            cvaCounter++;
            atheroCounter++;
            diabetesCounter++;
            dyslipidemiaCounter++;
            crohnCounter++;
            copdCounter++;
            periCounter++;
        }

        if (bPercentile <= 33) {
            colitisCounter++;
        }

        if (sPercentile <= 33) {
            cvaCounter++;
            atheroCounter++;
            coronaryCounter++;
            diabetesCounter++;
            dyslipidemiaCounter++;
            arthritisCounter++;
            crohnCounter++;
            periCounter++;
        }

        if (g0Percentile >= 67) {
            hyperCounter++;
            cvaCounter++;
            atheroCounter++;
            coronaryCounter++;
            diabetesCounter++;
            dyslipidemiaCounter++;
            colitisCounter++;
            crohnCounter++;
            periCounter++;
            arthritisCounter++;
        }

        if (g1Percentile <= 33) {
            hyperCounter++;
            atheroCounter++;
            diabetesCounter++;
            colitisCounter++;
            crohnCounter++;
            copdCounter++;
            arthritisCounter++;
        }

        if (g2Percentile <= 33) {
            preCounter++;
            hyperCounter++;
            cvaCounter++;
            atheroCounter++;
            diabetesCounter++;
            dyslipidemiaCounter++;
            colitisCounter++;
            crohnCounter++;
            periCounter++;
            arthritisCounter++;
        }

        if (p18Percentile >= 67) {
            sleCounter++;
        }

        if (p22Percentile <= 33) {
            sleCounter++;
        }

        if (p23Percentile >= 67) {
            sleCounter++;
        }

        if (p26Percentile <= 33) {
            sleCounter++;
        }

        if (p22Percentile <= 33 && gender === 'F') {
            cvaFCounter++;
        }

        let allCounters = {
            riskCounter,
            preCounter,
            hyperCounter,
            cvaCounter,
            cvaFCounter,
            atheroCounter,
            coronaryCounter,
            diabetesCounter,
            dyslipidemiaCounter,
            arthritisCounter,
            colitisCounter,
            crohnCounter,
            sleCounter,
            copdCounter,
            periCounter
        };

        if (details) {
            counter = allCounters[details.counter];
            max = details.max;
        }

        switch (max) {
            case 1:
                if (counter === 1) {
                    message = 'some overlap';
                }
                break;
            case 2:
                if (counter === 1) {
                    message = 'minor overlap';
                }
                if (counter === 2) {
                    message = 'some overlap';
                }
                break;
            case 3:
                if (counter === 2) {
                    message = 'minor overlap';
                }
                if (counter === 3) {
                    message = 'some overlap';
                }
                break;
            case 4:
                if (counter === 3) {
                    message = 'minor overlap';
                }
                if (counter === 4) {
                    message = 'some overlap';
                }
                break;
            case 5:
                if (counter === 3 || counter === 4) {
                    message = 'minor overlap';
                }
                if (counter === 5) {
                    message = 'some overlap';
                }
                break;
        }

        switch (message) {
            case 'no significant overlap':
                color = '#119999';
                bgColor = '#E7F5F5';
                break;
            case 'minor overlap':
                color = '#FFAA00';
                bgColor = '#FFF7E4'
                break;
            case 'some overlap':
                color = '#EE6600';
                bgColor = '#FCEFE4';
                break;
        }

        show = true;
        return;
    });
</script>

{#if show}
    <div class="main" style="background-color: {bgColor};">
        <div class="container">
            <p>There is <b style="color: {color};">{message}</b> of glycan metrics <br> between current results and this condition.</p>
            {#if message === 'no significant overlap'}
                <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.8984 22.4002L16.9984 19.5502C16.6318 19.1836 16.1734 19.0002 15.6234 19.0002C15.0734 19.0002 14.5984 19.2002 14.1984 19.6002C13.8318 19.9669 13.6484 20.4336 13.6484 21.0002C13.6484 21.5669 13.8318 22.0336 14.1984 22.4002L18.4984 26.7002C18.8984 27.1002 19.3651 27.3002 19.8984 27.3002C20.4318 27.3002 20.8984 27.1002 21.2984 26.7002L29.7984 18.2002C30.1984 17.8002 30.3901 17.3336 30.3734 16.8002C30.3568 16.2669 30.1651 15.8002 29.7984 15.4002C29.3984 15.0002 28.9234 14.7919 28.3734 14.7752C27.8234 14.7586 27.3484 14.9502 26.9484 15.3502L19.8984 22.4002ZM14.2984 40.5002L11.3984 35.6002L5.89844 34.4002C5.39844 34.3002 4.99844 34.0419 4.69844 33.6252C4.39844 33.2086 4.28177 32.7502 4.34844 32.2502L4.89844 26.6002L1.14844 22.3002C0.815104 21.9336 0.648438 21.5002 0.648438 21.0002C0.648438 20.5002 0.815104 20.0669 1.14844 19.7002L4.89844 15.4002L4.34844 9.75024C4.28177 9.25024 4.39844 8.7919 4.69844 8.37524C4.99844 7.95857 5.39844 7.70024 5.89844 7.60024L11.3984 6.40024L14.2984 1.50024C14.5651 1.0669 14.9318 0.775237 15.3984 0.625237C15.8651 0.475237 16.3318 0.500237 16.7984 0.700237L21.9984 2.90024L27.1984 0.700237C27.6651 0.500237 28.1318 0.475237 28.5984 0.625237C29.0651 0.775237 29.4318 1.0669 29.6984 1.50024L32.5984 6.40024L38.0984 7.60024C38.5984 7.70024 38.9984 7.95857 39.2984 8.37524C39.5984 8.7919 39.7151 9.25024 39.6484 9.75024L39.0984 15.4002L42.8484 19.7002C43.1818 20.0669 43.3484 20.5002 43.3484 21.0002C43.3484 21.5002 43.1818 21.9336 42.8484 22.3002L39.0984 26.6002L39.6484 32.2502C39.7151 32.7502 39.5984 33.2086 39.2984 33.6252C38.9984 34.0419 38.5984 34.3002 38.0984 34.4002L32.5984 35.6002L29.6984 40.5002C29.4318 40.9336 29.0651 41.2252 28.5984 41.3752C28.1318 41.5252 27.6651 41.5002 27.1984 41.3002L21.9984 39.1002L16.7984 41.3002C16.3318 41.5002 15.8651 41.5252 15.3984 41.3752C14.9318 41.2252 14.5651 40.9336 14.2984 40.5002Z"
                          fill="#119999"/>
                </svg>
            {:else}
                <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.2984 40.5002L11.3984 35.6002L5.89844 34.4002C5.39844 34.3002 4.99844 34.0419 4.69844 33.6252C4.39844 33.2086 4.28177 32.7502 4.34844 32.2502L4.89844 26.6002L1.14844 22.3002C0.815104 21.9336 0.648438 21.5002 0.648438 21.0002C0.648438 20.5002 0.815104 20.0669 1.14844 19.7002L4.89844 15.4002L4.34844 9.75024C4.28177 9.25024 4.39844 8.7919 4.69844 8.37524C4.99844 7.95857 5.39844 7.70024 5.89844 7.60024L11.3984 6.40024L14.2984 1.50024C14.5651 1.0669 14.9318 0.775237 15.3984 0.625237C15.8651 0.475237 16.3318 0.500237 16.7984 0.700237L21.9984 2.90024L27.1984 0.700237C27.6651 0.500237 28.1318 0.475237 28.5984 0.625237C29.0651 0.775237 29.4318 1.0669 29.6984 1.50024L32.5984 6.40024L38.0984 7.60024C38.5984 7.70024 38.9984 7.95857 39.2984 8.37524C39.5984 8.7919 39.7151 9.25024 39.6484 9.75024L39.0984 15.4002L42.8484 19.7002C43.1818 20.0669 43.3484 20.5002 43.3484 21.0002C43.3484 21.5002 43.1818 21.9336 42.8484 22.3002L39.0984 26.6002L39.6484 32.2502C39.7151 32.7502 39.5984 33.2086 39.2984 33.6252C38.9984 34.0419 38.5984 34.3002 38.0984 34.4002L32.5984 35.6002L29.6984 40.5002C29.4318 40.9336 29.0651 41.2252 28.5984 41.3752C28.1318 41.5252 27.6651 41.5002 27.1984 41.3002L21.9984 39.1002L16.7984 41.3002C16.3318 41.5002 15.8651 41.5252 15.3984 41.3752C14.9318 41.2252 14.5651 40.9336 14.2984 40.5002ZM21.9984 31.0002C22.5651 31.0002 23.0401 30.8086 23.4234 30.4252C23.8068 30.0419 23.9984 29.5669 23.9984 29.0002C23.9984 28.4336 23.8068 27.9586 23.4234 27.5752C23.0401 27.1919 22.5651 27.0002 21.9984 27.0002C21.4318 27.0002 20.9568 27.1919 20.5734 27.5752C20.1901 27.9586 19.9984 28.4336 19.9984 29.0002C19.9984 29.5669 20.1901 30.0419 20.5734 30.4252C20.9568 30.8086 21.4318 31.0002 21.9984 31.0002ZM21.9984 23.0002C22.5651 23.0002 23.0401 22.8086 23.4234 22.4252C23.8068 22.0419 23.9984 21.5669 23.9984 21.0002V13.0002C23.9984 12.4336 23.8068 11.9586 23.4234 11.5752C23.0401 11.1919 22.5651 11.0002 21.9984 11.0002C21.4318 11.0002 20.9568 11.1919 20.5734 11.5752C20.1901 11.9586 19.9984 12.4336 19.9984 13.0002V21.0002C19.9984 21.5669 20.1901 22.0419 20.5734 22.4252C20.9568 22.8086 21.4318 23.0002 21.9984 23.0002Z"
                          fill="{message === 'minor overlap' ? '#FFAA00' : '#EE6600'}"/>
                </svg>
            {/if}

        </div>
    </div>
{/if}

<style>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        border-radius: .75rem;
    }

    .container {
        width: 90%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>