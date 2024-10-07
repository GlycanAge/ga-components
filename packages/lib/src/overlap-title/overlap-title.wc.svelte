<svelte:options customElement={{ tag: 'ga-overlap-title', shadow: 'open' }}/>

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
        p22Percentile = Number(reportData.P22percentile);

        if (bPercentile > 68) {
            riskCounter++;
            cvaCounter++;
            atheroCounter++;
            diabetesCounter++;
            dyslipidemiaCounter++;
            arthritisCounter++;
            crohnCounter++;
            copdCounter++;
            periCounter++;
        }

        if (bPercentile < 32) {
            colitisCounter++;
        }

        if (sPercentile < 32) {
            cvaCounter++;
            atheroCounter++;
            coronaryCounter++;
            diabetesCounter++;
            dyslipidemiaCounter++;
            arthritisCounter++;
            crohnCounter++;
            periCounter++;
        }

        if (g0Percentile > 68) {
            hyperCounter++;
            cvaCounter++;
            atheroCounter++;
            coronaryCounter++;
            diabetesCounter++;
            dyslipidemiaCounter++;
            colitisCounter++;
            crohnCounter++;
            periCounter++;
        }

        if (g1Percentile < 32) {
            hyperCounter++;
            atheroCounter++;
            diabetesCounter++;
            arthritisCounter++;
            colitisCounter++;
            crohnCounter++;
            copdCounter++;
        }

        if (g2Percentile < 32) {
            preCounter++;
            hyperCounter++;
            cvaCounter++;
            atheroCounter++;
            diabetesCounter++;
            dyslipidemiaCounter++;
            arthritisCounter++;
            colitisCounter++;
            crohnCounter++;
            periCounter++;
        }

        if (p18Percentile > 68) {
            sleCounter++;
        }

        if (p22Percentile < 32) {
            sleCounter++;
        }

        if (p23Percentile > 68) {
            sleCounter++;
        }

        if (p26Percentile < 32) {
            sleCounter++;
        }

        if (p22Percentile < 32 && gender === 'F') {
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
            <p>There is <b style="color: {color};">{message}</b> of glycan metrics between current results and this condition.</p>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.3004 43.5002L13.4004 38.6002L7.90039 37.4002C7.40039 37.3002 7.00039 37.0419 6.70039 36.6252C6.40039 36.2086 6.28372 35.7502 6.35039 35.2502L6.90039 29.6002L3.15039 25.3002C2.81706 24.9336 2.65039 24.5002 2.65039 24.0002C2.65039 23.5002 2.81706 23.0669 3.15039 22.7002L6.90039 18.4002L6.35039 12.7502C6.28372 12.2502 6.40039 11.7919 6.70039 11.3752C7.00039 10.9586 7.40039 10.7002 7.90039 10.6002L13.4004 9.40024L16.3004 4.50024C16.5671 4.0669 16.9337 3.77524 17.4004 3.62524C17.8671 3.47524 18.3337 3.50024 18.8004 3.70024L24.0004 5.90024L29.2004 3.70024C29.6671 3.50024 30.1337 3.47524 30.6004 3.62524C31.0671 3.77524 31.4337 4.0669 31.7004 4.50024L34.6004 9.40024L40.1004 10.6002C40.6004 10.7002 41.0004 10.9586 41.3004 11.3752C41.6004 11.7919 41.7171 12.2502 41.6504 12.7502L41.1004 18.4002L44.8504 22.7002C45.1837 23.0669 45.3504 23.5002 45.3504 24.0002C45.3504 24.5002 45.1837 24.9336 44.8504 25.3002L41.1004 29.6002L41.6504 35.2502C41.7171 35.7502 41.6004 36.2086 41.3004 36.6252C41.0004 37.0419 40.6004 37.3002 40.1004 37.4002L34.6004 38.6002L31.7004 43.5002C31.4337 43.9336 31.0671 44.2252 30.6004 44.3752C30.1337 44.5252 29.6671 44.5002 29.2004 44.3002L24.0004 42.1002L18.8004 44.3002C18.3337 44.5002 17.8671 44.5252 17.4004 44.3752C16.9337 44.2252 16.5671 43.9336 16.3004 43.5002ZM24.0004 34.0002C24.5671 34.0002 25.0421 33.8086 25.4254 33.4252C25.8087 33.0419 26.0004 32.5669 26.0004 32.0002C26.0004 31.4336 25.8087 30.9586 25.4254 30.5752C25.0421 30.1919 24.5671 30.0002 24.0004 30.0002C23.4337 30.0002 22.9587 30.1919 22.5754 30.5752C22.1921 30.9586 22.0004 31.4336 22.0004 32.0002C22.0004 32.5669 22.1921 33.0419 22.5754 33.4252C22.9587 33.8086 23.4337 34.0002 24.0004 34.0002ZM24.0004 26.0002C24.5671 26.0002 25.0421 25.8086 25.4254 25.4252C25.8087 25.0419 26.0004 24.5669 26.0004 24.0002V16.0002C26.0004 15.4336 25.8087 14.9586 25.4254 14.5752C25.0421 14.1919 24.5671 14.0002 24.0004 14.0002C23.4337 14.0002 22.9587 14.1919 22.5754 14.5752C22.1921 14.9586 22.0004 15.4336 22.0004 16.0002V24.0002C22.0004 24.5669 22.1921 25.0419 22.5754 25.4252C22.9587 25.8086 23.4337 26.0002 24.0004 26.0002Z"
                      fill="{color}"/>
            </svg>
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

    p {
        max-width: 36ch;
    }
</style>