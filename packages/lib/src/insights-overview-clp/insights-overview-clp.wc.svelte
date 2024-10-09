<svelte:options customElement={{ tag: 'ga-insights-overview-clp', shadow: 'open' }}/>

<script lang="ts">
    import {onMount} from 'svelte';
    import {Service} from '../shared/utils/service';

    export let lang: string;
    export let service: Service = window.GaReportService;

    let reportData: any;

    let gender = '';

    let hyperCounter = 0;
    let cvaCounter = 0;
    let cvaFCounter = 0;
    let atheroCounter = 0;
    let coronaryCounter = 0;
    let diabetesCounter = 0;
    let dyslipidemiaCounter = 0;
    let arthritisCounter = 0;
    let colitisCounter = 0;
    let sleCounter = 0;
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
            cvaCounter++;
            atheroCounter++;
            diabetesCounter++;
            dyslipidemiaCounter++;
            arthritisCounter++;
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
            periCounter++;
        }

        if (g1Percentile < 32) {
            hyperCounter++;
            atheroCounter++;
            diabetesCounter++;
            arthritisCounter++;
            colitisCounter++;
        }

        if (g2Percentile < 32) {
            hyperCounter++;
            cvaCounter++;
            atheroCounter++;
            diabetesCounter++;
            dyslipidemiaCounter++;
            arthritisCounter++;
            colitisCounter++;
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

        show = true;
    });
</script>

{#if show}
    <div class="main">
        <div class="title">
            <div style="flex: 1;">Area</div>
            <div style="flex: 1.32;">Condition</div>
            <div style="flex: 1.38;">Overlaps</div>
        </div>
        <div class="row-parent">
            <div class="row">
                <div style="flex: 1;"><b>Cardiovascular</b></div>
                <div class="diseases">
                    <span class="mbtm">Hypertension</span>
                    <span class="mbtm">MI & CVA</span>
                    {#if gender === 'F'}
                        <span class="mbtm">Atherosclerosis</span>
                        <span class="mbtm">Coronary artery disease</span>
                    {/if}
                </div>
                <div class="overlaps">
                    <div class="overlap-row">
                        <div style="width: 30px;"><b>{hyperCounter}/3</b></div>
                        {#if hyperCounter < 2}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                                      fill="#119999" />
                            </svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
                                      fill="{hyperCounter === 2 ? '#FFAA00' : '#EE6600'}" />
                            </svg>
                        {/if}
                        {hyperCounter < 2 ? 'No significant overlap' : hyperCounter === 2 ? 'Minor overlap' : 'Some overlap'}
                    </div>
                    <div class="overlap-row">
                        <div style="width: 30px;"><b>{gender === 'F' ? cvaFCounter : cvaCounter}/{gender === 'F' ? '1' : '4'}</b></div>
                        {#if gender === 'F'}
                            {#if cvaFCounter === 0}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                    <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                                          fill="#119999" />
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                    <path
                                            fill="#EE6600"
                                            d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/>
                                </svg>
                            {/if}
                        {:else}
                            {#if cvaCounter < 3}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                    <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                                          fill="#119999" />
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                    <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
                                          fill="{cvaCounter === 3 ? '#FFAA00' : '#EE6600'}" />
                                </svg>
                            {/if}
                        {/if}
                        {#if gender === 'F'}
                            {cvaFCounter === 0 ? 'No significant overlap' : 'Some overlap'}
                        {:else}
                            {cvaCounter < 3 ? 'No significant overlap' : cvaCounter === 3 ? 'Minor overlap' : 'Some overlap'}
                        {/if}
                    </div>
                    {#if gender === 'F'}
                        <div class="overlap-row">
                            <div style="width: 30px;"><b>{atheroCounter}/5</b></div>
                            {#if atheroCounter < 3}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                    <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                                          fill="#119999" />
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                    <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
                                          fill="{atheroCounter === 5 ? '#EE6600' : '#FFAA00'}" />
                                </svg>
                            {/if}
                            {atheroCounter < 3 ? 'No significant overlap' : atheroCounter === 5 ? 'Some overlap' : 'Minor overlap'}
                        </div>
                        <div class="overlap-row">
                            <div style="width: 30px;"><b>{coronaryCounter}/2</b></div>
                            {#if coronaryCounter === 0}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                    <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                                          fill="#119999" />
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                    <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
                                          fill="{coronaryCounter === 1 ? '#FFAA00' : '#EE6600'}" />
                                </svg>
                            {/if}
                            {coronaryCounter === 0 ? 'No significant overlap' : coronaryCounter === 1 ? 'Minor overlap' : 'Some overlap'}
                        </div>
                    {/if}
                </div>
            </div>
            <div class="row">
                <div style="flex: 1;"><b>Metabolic</b></div>
                <div class="diseases">
                    <span class="mbtm">Type 2 diabetes</span>
                    <span class="mbtm">Dyslipidemia</span>
                </div>
                <div class="overlaps">
                    <div class="overlap-row">
                        <div style="width: 30px;"><b>{diabetesCounter}/5</b></div>
                        {#if diabetesCounter < 3}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                                      fill="#119999" />
                            </svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
                                      fill="{diabetesCounter === 5 ? '#EE6600' : '#FFAA00'}" />
                            </svg>
                        {/if}
                        {diabetesCounter < 3 ? 'No significant overlap' : diabetesCounter === 5 ? 'Some overlap' : 'Minor overlap'}
                    </div>
                    <div class="overlap-row">
                        <div style="width: 30px;"><b>{dyslipidemiaCounter}/4</b></div>
                        {#if dyslipidemiaCounter < 3}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                                      fill="#119999" />
                            </svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
                                      fill="{dyslipidemiaCounter === 3 ? '#FFAA00' : '#EE6600'}" />
                            </svg>
                        {/if}
                        {dyslipidemiaCounter < 3 ? 'No significant overlap' : dyslipidemiaCounter === 3 ? 'Minor overlap' : 'Some overlap'}
                    </div>
                </div>
            </div>
            <div class="row">
                <div style="flex: 1;"><b>Autoimmune</b></div>
                <div class="diseases">
                    <span class="mbtm">Rheumatoid arthritis</span>
                    <span class="mbtm">Ulcerative colitis</span>
                    <span class="mbtm">SLE</span>
                </div>
                <div class="overlaps">
                    <div class="overlap-row">
                        <div style="width: 30px;"><b>{arthritisCounter}/4</b></div>
                        {#if arthritisCounter < 3}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                                      fill="#119999" />
                            </svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
                                      fill="{arthritisCounter === 3 ? '#FFAA00' : '#EE6600'}" />
                            </svg>
                        {/if}
                        {arthritisCounter < 3 ? 'No significant overlap' : arthritisCounter === 3 ? 'Minor overlap' : 'Some overlap'}
                    </div>
                    <div class="overlap-row">
                        <div style="width: 30px;"><b>{colitisCounter}/4</b></div>
                        {#if colitisCounter < 3}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                                      fill="#119999" />
                            </svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
                                      fill="{colitisCounter === 3 ? '#FFAA00' : '#EE6600'}" />
                            </svg>
                        {/if}
                        {colitisCounter < 3 ? 'No significant overlap' : colitisCounter === 3 ? 'Minor overlap' : 'Some overlap'}
                    </div>
                    <div class="overlap-row">
                        <div style="width: 30px;"><b>{sleCounter}/4</b></div>
                        {#if sleCounter < 3}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                                      fill="#119999" />
                            </svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
                                      fill="{sleCounter === 3 ? '#FFAA00' : '#EE6600'}" />
                            </svg>
                        {/if}
                        {sleCounter < 3 ? 'No significant overlap' : sleCounter === 3 ? 'Minor overlap' : 'Some overlap'}
                    </div>
                </div>
            </div>
            {#if gender === 'F'}
                <div class="row">
                    <div style="flex: 1;"><b>Female</b></div>
                    <div class="diseases">
                        <span class="mbtm">Perimenopause</span>
                    </div>
                    <div class="overlaps">
                        <div class="overlap-row">
                            <div style="width: 30px;"><b>{periCounter}/4</b></div>
                            {#if periCounter < 3}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                    <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"
                                          fill="#119999" />
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="margin-right: 8px;">
                                    <path d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"
                                          fill="{periCounter === 3 ? '#FFAA00' : '#EE6600'}" />
                                </svg>
                            {/if}
                            {periCounter < 3 ? 'No significant overlap' : periCounter === 3 ? 'Minor overlap' : 'Some overlap'}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        color: #575756;
    }

    .title {
        height: 10%;
        display: flex;
        font-size: 1.1rem;
        align-items: end;
        padding-bottom: 0.8rem;
    }

    .row-parent {
        display: flex;
        flex-direction: column;
        height: 90%;
    }

    .row {
        border-top: 1px solid #09341F33;
        display: flex;
        padding-top: 0.8rem;
        padding-bottom: 1rem;
    }

    .diseases {
        flex: 1.32;
        display: flex;
        flex-direction: column;
        font-size: 0.90rem;
    }

    .mbtm {
        margin-bottom: 0.44rem;
    }

    .overlap-row {
        display: flex;
        align-items: center;
        margin-bottom: 0.26rem;
        font-size: 0.85rem;
    }

    .overlaps {
        flex: 1.38;
    }
</style>