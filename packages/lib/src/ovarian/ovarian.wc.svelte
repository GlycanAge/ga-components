<svelte:options customElement={{ tag: 'ga-ovarian', shadow: 'open' }} />

<script lang="ts">
    import { onMount } from 'svelte';
    import { Service } from '../shared/utils/service';
    import Arrow from '../shared/components/Arrow.svelte';
    import {getHeaderMessage} from '../shared/functions/helpers';

    export let report: string;
    export let type: string;
    export let subtype: string;
    export let service: Service = window.GaReportService;

    let subtypes = [
        {
            name: 'mature',
            csvName: 'G0percentile',
        },
        {
            name: 'median',
            csvName: 'G1percentile',
        },
        {
            name: 'youth',
            csvName: 'G2percentile',
        },
        {
            name: 'lifestyle',
            csvName: 'Bpercentile',
        },
    ]

    let reportData: any;

    let overlap = false;
    let minorOverlap = false;
    let showSummary = false;
    let showHeader = false;

    let message = '';
    let perc1 = 0; // G0percentile, mature
    let perc2 = 0; // G1percentile, median
    let perc3 = 0; // G2percentile, youth
    let perc4 = 0; // Bpercentile, lifestyle
    let percentile = 0;
    let counter: number = 0;

    function countOverlaps() {
        if (perc1 > 68) {
            counter++;
        }
        if (perc2 < 32) {
            counter++;
        }
        if (perc3 < 32) {
            counter++;
        }
        if (perc4 < 32) {
            counter++;
        }
    }

    const details = subtypes.find(x => x.name === subtype);

    onMount(async () => {
        reportData = await service.getReport(report);

        if (details) {
            percentile = Number(reportData[details.csvName]);
            message = getHeaderMessage(percentile);
        }

        perc1 = Number(reportData.G0percentile);
        perc2 = Number(reportData.G1percentile);
        perc3 = Number(reportData.G2percentile);
        perc4 = Number(reportData.Bpercentile);

        countOverlaps();

        if (counter === 4) {
            overlap = true;
        }

        if (counter === 3) {
            minorOverlap = true;
        }

        showHeader = true;
        showSummary = true;
        return;
    });
</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,1,0"/>
</head>

{#if type === 'header' && showHeader}
    <div class="header">
        <div style="padding-right: 10px;">
            <b>{counter}/4</b>
        </div>
        {#if overlap || minorOverlap}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                    fill={minorOverlap ? '#FFAA00' : '#F2590D'}
                    d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                    fill="#12A195"
                    d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
        {/if}
        &nbsp;&nbsp;{overlap ? 'Some overlap' : minorOverlap ? 'Minor overlap' : 'No significant overlap'}
    </div>
{:else if type === 'summary' && showSummary}
    <div class="summaryMain">
        <div class="summaryHeader">
            <div style="transform: translate(-50%);">
                {#if overlap || minorOverlap}
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#F2590D" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#12A195" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
                {/if}
            </div>
            <div>
                <b style="color: {overlap || minorOverlap ? '#F2590D' : '#12A195'}">{overlap ? 'Some overlap' : minorOverlap ? 'Minor overlap' : 'No significant overlap'}</b> of glycan indexes between your patient and this condition.
            </div>
        </div>
        <hr>
        <div class="summaryBody">
            <h5>Signs and symptoms</h5>
            <ul>
                <li>Abdominal bloating or swelling</li>
                <li>Quickly feeling full when eating</li>
                <li>Pelvic or abdominal pain</li>
            </ul>

            <h5>Possible follow-up</h5>
            <ul>
                <li>Transvaginal ultrasound</li>
                <li>CA-125 blood test</li>
                <li>Biopsy</li>
            </ul>
            <h5>Related research papers</h5>
            <a href="https://pubmed.ncbi.nlm.nih.gov/17884841/">Ovarian cancer is associated with changes in glycosylation in both acute-phase proteins and IgG</a>
            <p>Ovarian cancer is the fourth most common cancer in women in the Western world. This pilot scale study highlights changes in the total serum glycome of patients with advanced ovarian cancer that might shed insight into disease pathogenesis.</p>
            <a href="https://pubmed.ncbi.nlm.nih.gov/32477323/">Immunoglobulin G Subclass-Specific Glycosylation Changes in Primary Epithelial Ovarian Cancer</a>
            <p>Epithelial ovarian cancer (EOC) was previously shown to be associated with glycosylation changes of total serum and total IgG proteins. However, as a majority of previous studies analyzed released glycan profiles, still little is known about IgG subclass-specific alterations in ovarian cancer.</p>
        </div>
    </div>
{:else}
    {#if subtype === 'mature'}
        <div class="main">
            <div class="label" style="font-size: 0.8rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  fill={percentile <= 68 ? '#12A195' : '#F2590D'} d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
                <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
                    <div>Glycan <b>Mature (G0)</b></div>
                    <div>{message}</div>
                </div>
            </div>
            <div style="width: 70%; display: flex; align-items: center;">
                <Arrow type="right" {percentile} />
            </div>
        </div>
    {/if}
    {#if subtype === 'median'}
        <div class="main">
            <div class="label" style="font-size: 0.8rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  fill={percentile >= 32 ? '#12A195' : '#F2590D'} d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
                <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
                    <div>Glycan <b>Median (G1)</b></div>
                    <div>{message}</div>
                </div>
            </div>
            <div style="width: 70%; display: flex; align-items: center;">
                <Arrow type="left" {percentile} />
            </div>
        </div>
    {/if}
    {#if subtype === 'youth'}
        <div class="main">
            <div class="label" style="font-size: 0.8rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  fill={percentile >= 32 ? '#12A195' : '#F2590D'} d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
                <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
                    <div>Glycan <b>Youth (G2)</b></div>
                    <div>{message}</div>
                </div>
            </div>
            <div style="width: 70%; display: flex; align-items: center;">
                <Arrow type="left" {percentile} />
            </div>
        </div>
    {/if}
    {#if subtype === 'lifestyle'}
        <div class="main">
            <div class="label" style="font-size: 0.8rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  fill={percentile >= 32 ? '#12A195' : '#F2590D'} d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45ZM12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Z"/></svg>
                <div style="display: flex; flex-direction: column; padding-left: 0.3rem;">
                    <div>Glycan <b>Lifestyle (B)</b></div>
                    <div>{message}</div>
                </div>
            </div>
            <div style="width: 70%; display: flex; align-items: center;">
                <Arrow type="left" {percentile} />
            </div>
        </div>
    {/if}
{/if}

<style>
    .summaryMain {
        padding: 0 48px;
        height: 100%;
        display: flex;
        flex-direction: column;
        color: #09341FCC;
    }

    .summaryMain hr {
        border: 2px solid rgba(201, 219, 210, 1);
        border-radius: 2px;
        margin: 18px 0;
    }

    .summaryMain h5 {
        font-size: 16px;
        margin: 0;
    }

    .summaryMain ul {
        margin-top: 4px;
        margin-bottom: 24px;
        font-size: 14px;
        padding-left: 20px;
    }

    .summaryMain ul li:not(:first-child) {
        margin-top: 4px;
    }

    .summaryHeader {
        width: 100%;
        font-size: 16px;
        line-height: 115%;
        padding-top: 32px;
        display: flex;
        align-items: center;
        transform: translateX(-48px);
    }

    .summaryBody {
        width: 100%;
        height: 100%;
        margin: auto;
    }

    .summaryBody a {
        display: block;
        color: #E66439;
        font-weight: bold;
        font-size: 12px;
        margin-top: 12px;
    }

    .summaryBody svg {
        vertical-align: middle;
    }

    .summaryBody p {
        color: rgba(9, 52, 31, 0.80);
        font-size: 10px;
        margin-top: 6px;
    }

    .main {
        height: 100%;
        width: 100%;
        display: flex;
    }

    .label {
        width: 30%;
        display: flex;
        align-items: center;
    }

    .header {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>