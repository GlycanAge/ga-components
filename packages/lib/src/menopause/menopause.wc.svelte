<svelte:options customElement={{tag: "ga-menopause",shadow: "open",}}/>

<script lang="ts">
    import type {Language} from '../shared/interfaces/language.interface';
    import {onMount} from 'svelte';
    import {getPadding, getMargin, getBorderRadius, moveDiv, suffix} from '../shared/functions/helpers';
    import {Service} from '../shared/utils/service';
    // Language of the rendered list
    export let language: Language;

    // ID of the report
    export let report: string;
    export let type: string;
    export let service: Service = window.GaReportService;
    let reportData: any;

    let min1 = 0; // G0xmin
    let max1 = 0; // G0xmax
    let mid1 = 0; // G0xaverage
    let res1 = 0; // G0yourscore
    let perc1 = 0; // G0percentile

    let min2 = 0; // G1xmin
    let max2 = 0; // G1xmax
    let mid2 = 0;  // G1xaverage
    let res2 = 0; // G1yourscore
    let perc2 = 0; // G1percentile

    let min3 = 0; // G2xmin
    let max3 = 0; // G2xmax
    let mid3 = 0; //G2xaverage
    let res3 = 0; // G2yourscore
    let perc3 = 0; // G2percentile

    let min4 = 0; // Sxmin
    let max4 = 0; // Sxmax
    let mid4 = 0; //Sxaverage
    let res4 = 0; // Syourscore
    let perc4 = 0; // Spercentile

    let min5 = 0; // Bxmin
    let max5 = 0; // Bxmax
    let mid5 = 0; //Bxaverage
    let res5 = 0; // Byourscore
    let perc5 = 0; // Bpercentile

    let overlap = false;
    let someOverlap = false;
    let noOverlap = false;

    function getColor() {
        if (res1 > mid1 && res2 < mid2 && res3 < mid3 && res4 < mid4 && res5 > mid5) {
            return '#CC0000';
        }
        if (res1 > mid1 || res2 < mid2 || res3 < mid3 || res4 < mid4 || res5 > mid5) {
            return '#EE9933';
        }

        if (res1 < mid1 && res2 > mid2 && res3 > mid3 && res4 > mid4 && res5 < mid5) {
            return '#00AA44';
        }

        return '#00AA44';
    }

    function getBackground() {
        if (res1 > mid1 && res2 < mid2 && res3 < mid3 && res4 < mid4 && res5 > mid5) {
            return 'rgba(204,0,0,0.15)';
        }
        if (res1 > mid1 || res2 < mid2 || res3 < mid3 || res4 < mid4 || res5 > mid5) {
            return 'rgba(238,153,51,0.15)';
        }

        if (res1 < mid1 && res2 > mid2 && res3 > mid3 && res4 > mid4 && res5 < mid5) {
            return 'rgba(0,170,68,0.15)';
        }

        return 'rgba(0,170,68,0.15)';
    }

    function getBodyBackground() {
        if (res1 > mid1 && res2 < mid2 && res3 < mid3 && res4 < mid4 && res5 > mid5) {
            return 'rgba(204,0,0,0.05)';
        }
        if (res1 > mid1 || res2 < mid2 || res3 < mid3 || res4 < mid4 || res5 > mid5) {
            return 'rgba(238,153,51,0.05)';
        }

        if (res1 < mid1 && res2 > mid2 && res3 > mid3 && res4 > mid4 && res5 < mid5) {
            return 'rgba(0,170,68,0.05)';
        }

        return 'rgba(0,170,68,0.05)';
    }

    function getWording() {
        if (res1 > mid1 && res2 < mid2 && res3 < mid3 && res4 < mid4 && res5 > mid5) {
            return 'a significant overlap';
        }
        if (res1 > mid1 || res2 < mid2 || res3 < mid3 || res4 < mid4 || res5 > mid5) {
            return 'some overlap';
        }

        if (res1 < mid1 && res2 > mid2 && res3 > mid3 && res4 > mid4 && res5 < mid5) {
            return 'no significant overlap';
        }

        return 'no significant overlap';
    }

    onMount(() => {
        reportData = service.getReport(undefined);
        min1 = reportData.G0xmin;
        max1 =  reportData.G0xmax;
        mid1 =  reportData.G0xaverage;
        res1 =  reportData.G0yourscore;
        perc1 =  reportData.G0percentile;
        min2 =  reportData.G1xmin;
        max2 =  reportData.G1xmax;
        mid2 =  reportData.G1xaverage;
        res2 =  reportData.G1yourscore;
        perc2 =  reportData.G1percentile;
        min3 =  reportData.G2xmin;
        max3 =  reportData.G2xmax;
        mid3 =  reportData.G2xaverage;
        res3 =  reportData.G2yourscore;
        perc3 =  reportData.G2percentile;
        min4 =  reportData.Sxmin;
        max4 =  reportData.Sxmax;
        mid4 =  reportData.Sxaverage;
        res4 =  reportData.Syourscore;
        perc4 =  reportData.Spercentile;
        min5 =  reportData.Bxmin;
        max5 =  reportData.Bxmax;
        mid5 =  reportData.Bxaverage;
        res5 =  reportData.Byourscore;
        perc5 =  reportData.Bpercentile;
        if (res1 > mid1 && res2 < mid2 && res3 < mid3 && res4 < mid4 && res5 > mid5) {
            overlap = true;
            return;
        }
        if (res1 > mid1 || res2 < mid2 || res3 < mid3 || res4 < mid4 || res5 > mid5) {
            someOverlap = true;
            return;
        }

        if (res1 < mid1 && res2 > mid2 && res3 > mid3 && res4 > mid4 && res5 < mid5) {
            noOverlap = true;
            return;
        }
        noOverlap = true;
    })
</script>


<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,1,0"/>
</head>
{#if type === 'header'}
    <div class="header">
        {#if overlap}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#CC0000" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
            &nbsp; Significant overlap
        {/if}
        {#if someOverlap}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#EE9933" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
            &nbsp; Some overlap
        {/if}
        {#if noOverlap}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#00AA44" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
            &nbsp; No overlap
        {/if}
    </div>
{:else if type === 'summary'}
    <div class="summaryMain" style="border: 2px solid {getColor()};">
        <div class="summaryHeader" style="background-color: {getBackground()}; border-bottom: 2px solid {getColor()};">
            <div style="width: 10%; padding-left: 1.5rem; padding-right: 1rem;">
                {#if overlap}
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#CC0000" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
                {/if}
                {#if someOverlap}
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#EE9933" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
                {/if}
                {#if noOverlap}
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#00AA44" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
                {/if}
            </div>
            <div style="width: 90%;">There is <b>{getWording()}</b> of glycan indexes <br> between your patient and peri/menopausal patients.</div>
        </div>
        <div class="summaryBody" style="background-color: {getBodyBackground()};">
            <div style="font-size: 1.2rem; padding-bottom: 1rem;">Symptomps to check for:</div>
            <div style="font-size: 0.7rem; padding-bottom: 0.4rem;"><b>Irregular periods:</b> Hormonal fluctuations during perimenopause lead to
                changes in <br>menstrual cycle patterns.</div>
            <div style="font-size: 0.7rem; padding-bottom: 0.4rem;"><b>Hot flashes:</b>  Sudden feelings of warmth, usually in the upper body, are
                caused <br>by hormonal changes.</div>
            <div style="font-size: 0.7rem; padding-bottom: 0.4rem;"><b>Sleep disturbances:</b>  Hormonal changes during this period can lead to sleep<br>
                problems including insomnia.</div>
            <div style="font-size: 1.2rem; padding-top: 1.2rem;padding-bottom: 1rem;">Possible follow-up tests:</div>
            <div style="font-size: 0.7rem; padding-bottom: 0.4rem;"><b>Hormone testing:</b>Blood tests measuring hormone levels can help in
                assessing <br> menopausal status.</div>
            <div style="font-size: 0.7rem; padding-bottom: 0.4rem;"><b>Bone density test:</b>  This test assesses the risk of osteoporosis, which
                increases <br> post-menopause.</div>
            <div style="font-size: 0.7rem; padding-bottom: 0.4rem;"><b>Cholesterol and blood pressure check:</b>  These are important to evaluate <br>
                cardiovascular health post-menopause.</div>
        </div>
    </div>
{:else}
    <div class="main">
        <div class="row">
            <div class="label">Glycan<br> <b>Mature</b></div>
            <div class="content">
                <div class="min"><b>{min1}</b></div>
                <div class="max"><b>{max1}</b></div>
                <div class="middleParent">
                    <div class="xAxis"></div>
                    <div class="yAxis"></div>
                    <div class="diseaseArea" style="border-radius: 0 6px 6px 0; left: 50.3%;"></div>
                    <div class="result"
                         style="padding: {getPadding(res1, mid1, perc1)}; margin: {getMargin(res1, mid1, perc1)}; border-radius: {getBorderRadius(res1, mid1, perc1)}">
                        <div class="resultDisplay" style="right: {moveDiv(res1, mid1, perc1)};">
                            <div class="message"><b>{res1} ({perc1}<sup>{suffix(perc1)}</sup> percentile)</b></div>
                            <div class="triangle-down"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="label">Glycan<br> <b>Median</b></div>
            <div class="content">
                <div class="min"><b>{min2}</b></div>
                <div class="max"><b>{max2}</b></div>
                <div class="middleParent">
                    <div class="xAxis"></div>
                    <div class="yAxis"></div>
                    <div class="diseaseArea" style="border-radius: 6px 0 0 6px; right: 50.3%;"></div>
                    <div class="result2"
                         style="padding: {getPadding(res2, mid2, perc2)}; margin: {getMargin(res2, mid2, perc2)}; border-radius: {getBorderRadius(res2, mid2, perc2)}">
                        <div class="resultDisplay" style="right: {moveDiv(res2, mid2, perc2)};">
                            <div class="message"><b>{res2} ({perc2}<sup>{suffix(perc2)}</sup> percentile)</b></div>
                            <div class="triangle-down"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="label">Glycan<br> <b>Youth</b></div>
            <div class="content">
                <div class="min"><b>{min3}</b></div>
                <div class="max"><b>{max3}</b></div>
                <div class="middleParent">
                    <div class="xAxis"></div>
                    <div class="yAxis"></div>
                    <div class="diseaseArea" style="border-radius: 6px 0 0 6px; right: 50.3%;"></div>
                    <div class="result3"
                         style="padding: {getPadding(res3, mid3, perc3)}; margin: {getMargin(res3, mid3, perc3)}; border-radius: {getBorderRadius(res3, mid3, perc3)}">
                        <div class="resultDisplay" style="right: {moveDiv(res3, mid3, perc3)};">
                            <div class="message"><b>{res3} ({perc3}<sup>{suffix(perc3)}</sup> percentile)</b></div>
                            <div class="triangle-down"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="label">Glycan<br> <b>Shield</b></div>
            <div class="content">
                <div class="min"><b>{min4}</b></div>
                <div class="max"><b>{max4}</b></div>
                <div class="middleParent">
                    <div class="xAxis"></div>
                    <div class="yAxis"></div>
                    <div class="diseaseArea" style="border-radius: 6px 0 0 6px; right: 50.3%;"></div>
                    <div class="result3"
                         style="padding: {getPadding(res4, mid4, perc4)}; margin: {getMargin(res4, mid4, perc4)}; border-radius: {getBorderRadius(res4, mid4, perc4)}">
                        <div class="resultDisplay" style="right: {moveDiv(res4, mid4, perc4)};">
                            <div class="message"><b>{res4} ({perc4}<sup>{suffix(perc4)}</sup> percentile)</b></div>
                            <div class="triangle-down"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="label">Glycan<br> <b>Lifestyle</b></div>
            <div class="content">
                <div class="min"><b>{min5}</b></div>
                <div class="max"><b>{max5}</b></div>
                <div class="middleParent">
                    <div class="xAxis"></div>
                    <div class="yAxis"></div>
                    <div class="diseaseArea" style="border-radius: 0 6px 6px 0; left: 50.3%;"></div>
                    <div class="result3"
                         style="padding: {getPadding(res5, mid5, perc5)}; margin: {getMargin(res5, mid5, perc5)}; border-radius: {getBorderRadius(res5, mid5, perc5)}">
                        <div class="resultDisplay" style="right: {moveDiv(res5, mid5, perc5)};">
                            <div class="message"><b>{res5} ({perc5}<sup>{suffix(perc5)}</sup> percentile)</b></div>
                            <div class="triangle-down"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="lastRow">
            <div class="dot1"></div>
            <div style="font-size: 0.8rem;">Peri/menopause</div>
            <div class="dot2"></div>
            <div style="font-size: 0.8rem;">Your patient</div>
        </div>
    </div>
{/if}

<style>
    .main {
        width: 450px;
        height: 300px;
        background-color: #F0F6F5;
        border: 2px solid #C8DBD0;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .summaryMain {
        width: 500px;
        height: 500px;
        border-radius: 10px;
    }

    .summaryHeader {
        width: 100%;
        height: 20%;
        border-radius: 8px 8px 0 0;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
    }

    .summaryBody {
        width: 95%;
        height: 75%;
        padding: 1.5rem 0 0 1.5rem;
    }

    .row {
        width: 100%;
        height: 12%;
        display: flex;
        margin: 0.2rem 0 0.2rem 0;
    }

    .label {
        width: 14%;
        height: 100%;
        margin-left: 1.5rem;
        font-size: 0.7rem;
        line-height: 0.9rem;
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
    }

    .content {
        width: 86%;
        height: 100%;
        position: relative;
    }

    .min {
        position: absolute;
        top: 34%;
        left: 1.6%;
        font-size: 0.6rem;
        color: #6B8678;
    }

    .middleParent {
        position: absolute;
        width: 76%;
        height: 80%;
        left: 10%;
        top: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .xAxis {
        position: absolute;
        left: 0;
        top: 48%;
        width: 100%;
        height: 0.1rem;
        background-color: #08341F;
        border-radius: 10px;
        z-index: 9999;
    }

    .diseaseArea {
        position: absolute;
        width: 46%;
        top: 10%;
        height: 80%;
        background-color: #C8DBD0;
    }

    .result {
        width: 1.5%;
        height: 24%;
        background-color: #33664D;
        z-index: 9998;
        position: relative;
    }

    .result2 {
        width: 1.5%;
        height: 24%;
        background-color: #33664D;
        z-index: 9998;
        position: relative;
    }

    .result3 {
        width: 1.5%;
        height: 24%;
        background-color: #33664D;
        z-index: 9998;
        position: relative;
    }


    .yAxis {
        position: absolute;
        left: 49.72%;
        width: 0.1rem;
        height: 88%;
        background-color: #08341F;
        border-radius: 10px;
    }

    .max {
        position: absolute;
        top: 34%;
        right: 5.5%;
        font-size: 0.6rem;
        color: #6B8678;
    }

    .lastRow {
        width: 100%;
        height: 11%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 12px;
    }

    .dot1 {
        height: 10px;
        width: 10px;
        border-radius: 99px;
        background-color: #C8DBD0;
        border: 1px solid black;
        margin-right: 6px;
    }

    .dot2 {
        height: 10px;
        width: 10px;
        border-radius: 99px;
        background-color: #33664D;
        border: 1px solid black;
        margin: 0 6px 0 36px;
    }

    .resultDisplay {
        position: absolute;
        bottom: 50%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .message {
        color: #33664D;
        z-index: 99999;
        min-width: 100px;
        font-size: 0.48rem;
        margin-bottom: -6px;
    }

    .triangle-down {
        margin-top: 0.6rem;
        margin-bottom: 0.4rem;
        width: 0;
        height: 0;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-top: 6px solid #33664D;
    }

    .header {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>