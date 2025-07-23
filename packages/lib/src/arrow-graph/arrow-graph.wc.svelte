<svelte:options customElement={{ tag: 'ga-arrow-graph', shadow: 'open' }}/>

<script lang="ts">
    import {onMount} from 'svelte';
    import {Service} from '../shared/utils/service';
    import {getTranslation} from '../shared/functions/helpers';
    import Arrow2 from '../shared/components/Arrow2.svelte';

    export let lang: string;
    export let subtype: string;
    export let direction: string;
    export let service: Service = window.GaReportService;

    let subtypes = [
        {
            name: 'mature',
            label: 'Mature',
            csvName: 'G0percentile',
            chineseLabel: '老化糖链（G0)'
        },
        {
            name: 'youth',
            label: 'Youth',
            csvName: 'G2percentile',
            chineseLabel: '青年糖链（G2)'
        },
        {
            name: 'shield',
            label: 'Shield',
            csvName: 'Spercentile',
            chineseLabel: '少年糖链（S)'
        },
        {
            name: 'lifestyle',
            label: 'Lifestyle',
            csvName: 'Bpercentile',
            chineseLabel: '受损糖链（B)'
        },
        {
            name: 'median',
            label: 'Median',
            csvName: 'G1percentile',
            chineseLabel: '中性糖链（G1)'
        },
        {
            name: 'peak18',
            label: '18',
            csvName: 'P18percentile',
        },
        {
            name: 'peak22',
            label: '22',
            csvName: 'P22percentile',
        },
        {
            name: 'peak23',
            label: '23',
            csvName: 'P23percentile',
        },
        {
            name: 'peak26',
            label: '26',
            csvName: 'P26percentile',
        }

    ]

    let reportData: any;

    let message = '';
    let color = '';
    let percentile = 0;

    const details = subtypes.find(x => x.name === subtype);

    function getMessage() {
        if (percentile < 34) {
            return getTranslation(lang, 'BELOW_AVERAGE');
        }
        if (percentile >= 34 && percentile <= 66) {
            return getTranslation(lang, 'AROUND_AVERAGE');
        }
        if (percentile > 66) {
            return getTranslation(lang, 'ABOVE_AVERAGE');
        }
    }

    function getColor(perc: number, dir: string) {
        if (dir === 'left') {
            return perc >= 34 ? '#119999' : perc > 18 && perc < 34 ? '#EE6600' : '#DD2222';
        } else {
            return perc <= 66 ? '#119999' : perc > 66 && perc < 82 ? '#EE6600' : '#DD2222';
        }
    }

    onMount(async () => {
        reportData = await service.getReport();

        if (details) {
            percentile = Number(reportData[details.csvName]);
            message = getMessage();
        }

        if (percentile === 100 || percentile === 0) {
            percentile = percentile === 100 ? 99 : 1;
        }

        color = getColor(percentile, direction);

        return;
    });
</script>


<div class="main">
    <div class="label" style="font-size: 0.8rem;">
        <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
            {#if lang === 'chinese'}
                <div style="font-size: 0.9rem;"><b>{details.chineseLabel}</b></div>
            {:else}
                <div style="font-size: 0.9rem;"><b>{getTranslation(lang, 'GLYCAN')}</b> <b>{details.label}</b></div>
            {/if}
            <div>{message}</div>
        </div>
    </div>
    <div style="width: 70%; display: flex; align-items: center; justify-content: center;">
        <Arrow2 {direction} {percentile} />
    </div>
    <div style="width: 5%; height: 100%; display: flex; align-items: center;">
        {#if color === '#119999'}
            <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.599 14.9335L11.6656 13.0335C11.4212 12.789 11.1156 12.6668 10.749 12.6668C10.3823 12.6668 10.0656 12.8002 9.79896 13.0668C9.55451 13.3113 9.43229 13.6224 9.43229 14.0002C9.43229 14.3779 9.55451 14.689 9.79896 14.9335L12.6656 17.8002C12.9323 18.0668 13.2434 18.2002 13.599 18.2002C13.9545 18.2002 14.2656 18.0668 14.5323 17.8002L20.199 12.1335C20.4656 11.8668 20.5934 11.5557 20.5823 11.2002C20.5712 10.8446 20.4434 10.5335 20.199 10.2668C19.9323 10.0002 19.6156 9.86127 19.249 9.85016C18.8823 9.83905 18.5656 9.96683 18.299 10.2335L13.599 14.9335ZM9.86563 27.0002L7.93229 23.7335L4.26563 22.9335C3.93229 22.8668 3.66563 22.6946 3.46563 22.4168C3.26563 22.1391 3.18785 21.8335 3.23229 21.5002L3.59896 17.7335L1.09896 14.8668C0.876736 14.6224 0.765625 14.3335 0.765625 14.0002C0.765625 13.6668 0.876736 13.3779 1.09896 13.1335L3.59896 10.2668L3.23229 6.50016C3.18785 6.16683 3.26563 5.86127 3.46563 5.58349C3.66563 5.30571 3.93229 5.13349 4.26563 5.06683L7.93229 4.26683L9.86563 1.00016C10.0434 0.711269 10.2878 0.516825 10.599 0.416825C10.9101 0.316825 11.2212 0.333491 11.5323 0.466825L14.999 1.93349L18.4656 0.466825C18.7767 0.333491 19.0878 0.316825 19.399 0.416825C19.7101 0.516825 19.9545 0.711269 20.1323 1.00016L22.0656 4.26683L25.7323 5.06683C26.0656 5.13349 26.3323 5.30571 26.5323 5.58349C26.7323 5.86127 26.8101 6.16683 26.7656 6.50016L26.399 10.2668L28.899 13.1335C29.1212 13.3779 29.2323 13.6668 29.2323 14.0002C29.2323 14.3335 29.1212 14.6224 28.899 14.8668L26.399 17.7335L26.7656 21.5002C26.8101 21.8335 26.7323 22.1391 26.5323 22.4168C26.3323 22.6946 26.0656 22.8668 25.7323 22.9335L22.0656 23.7335L20.1323 27.0002C19.9545 27.2891 19.7101 27.4835 19.399 27.5835C19.0878 27.6835 18.7767 27.6668 18.4656 27.5335L14.999 26.0668L11.5323 27.5335C11.2212 27.6668 10.9101 27.6835 10.599 27.5835C10.2878 27.4835 10.0434 27.2891 9.86563 27.0002Z"
                      fill="#119999"/>
            </svg>
        {:else}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8656 29.0002L8.93229 25.7335L5.26563 24.9335C4.93229 24.8668 4.66563 24.6946 4.46563 24.4168C4.26563 24.139 4.18785 23.8335 4.23229 23.5002L4.59896 19.7335L2.09896 16.8668C1.87674 16.6224 1.76562 16.3335 1.76562 16.0002C1.76562 15.6668 1.87674 15.3779 2.09896 15.1335L4.59896 12.2668L4.23229 8.50016C4.18785 8.16682 4.26563 7.86127 4.46563 7.58349C4.66563 7.30571 4.93229 7.13349 5.26563 7.06682L8.93229 6.26682L10.8656 3.00016C11.0434 2.71127 11.2878 2.51682 11.599 2.41682C11.9101 2.31682 12.2212 2.33349 12.5323 2.46682L15.999 3.93349L19.4656 2.46682C19.7767 2.33349 20.0878 2.31682 20.399 2.41682C20.7101 2.51682 20.9545 2.71127 21.1323 3.00016L23.0656 6.26682L26.7323 7.06682C27.0656 7.13349 27.3323 7.30571 27.5323 7.58349C27.7323 7.86127 27.8101 8.16682 27.7656 8.50016L27.399 12.2668L29.899 15.1335C30.1212 15.3779 30.2323 15.6668 30.2323 16.0002C30.2323 16.3335 30.1212 16.6224 29.899 16.8668L27.399 19.7335L27.7656 23.5002C27.8101 23.8335 27.7323 24.139 27.5323 24.4168C27.3323 24.6946 27.0656 24.8668 26.7323 24.9335L23.0656 25.7335L21.1323 29.0002C20.9545 29.289 20.7101 29.4835 20.399 29.5835C20.0878 29.6835 19.7767 29.6668 19.4656 29.5335L15.999 28.0668L12.5323 29.5335C12.2212 29.6668 11.9101 29.6835 11.599 29.5835C11.2878 29.4835 11.0434 29.289 10.8656 29.0002ZM15.999 22.6668C16.3767 22.6668 16.6934 22.539 16.949 22.2835C17.2045 22.0279 17.3323 21.7113 17.3323 21.3335C17.3323 20.9557 17.2045 20.639 16.949 20.3835C16.6934 20.1279 16.3767 20.0002 15.999 20.0002C15.6212 20.0002 15.3045 20.1279 15.049 20.3835C14.7934 20.639 14.6656 20.9557 14.6656 21.3335C14.6656 21.7113 14.7934 22.0279 15.049 22.2835C15.3045 22.539 15.6212 22.6668 15.999 22.6668ZM15.999 17.3335C16.3767 17.3335 16.6934 17.2057 16.949 16.9502C17.2045 16.6946 17.3323 16.3779 17.3323 16.0002V10.6668C17.3323 10.289 17.2045 9.97238 16.949 9.71682C16.6934 9.46127 16.3767 9.33349 15.999 9.33349C15.6212 9.33349 15.3045 9.46127 15.049 9.71682C14.7934 9.97238 14.6656 10.289 14.6656 10.6668V16.0002C14.6656 16.3779 14.7934 16.6946 15.049 16.9502C15.3045 17.2057 15.6212 17.3335 15.999 17.3335Z"
                      fill="{color === '#EE6600' ? '#EE6600' : '#DD2222'}"/>
            </svg>
        {/if}
    </div>
</div>


<style>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
    }

    .label {
        width: 25%;
        display: flex;
        align-items: center;
    }
</style>