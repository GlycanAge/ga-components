<svelte:options customElement={{tag: "ga-colitis",shadow: "open",}}/>

<script lang="ts">
    import {Language} from '../shared/interfaces/language.interface';
    import TriangleSmallDown from 'svelte-material-icons/TriangleSmallDown.svelte';

    // Language of the rendered list
    export let language: Language;

    // ID of the report
    export let report: string;

    let min1 = 0.081; // G0xmin
    let max1 = 0.185; // G0xmax
    let mid1 = 0.133; // G0xaverage
    let res1 = 0.110; // G0yourscore
    let perc1 = 12; // G0percentile

    let min2 = 0.091; // G1xmin
    let max2 = 0.216; // G1xmax
    let mid2 = 0.199;  // G1xaverage
    let res2 = 0.180; // G1yourscore
    let perc2 = 39; // G1percentile

    let min3 = 0.109; // G2xmin
    let max3 = 0.175; // G2xmax
    let mid3 = 0.140; //G2xaverage
    let res3 = 0.180; // G2yourscore
    let perc3 = 85; // G2percentile

    let min4 = 0.109; // Bxmin
    let max4 = 0.175; // Bxmax
    let mid4 = 0.140; //Bxaverage
    let res4 = 0.130; // Byourscore
    let perc4 = 29; // Bpercentile

    function getPadding(res: number, mid: number, perc: number) {
        if (perc === 50) {
            return `0 0 0 0`;
        } else {
            if (res > mid) {
                return perc > 90
                    ? `0 ${perc - 37 + (1.55 * (perc-51))}px 0 0`
                    : `0 ${perc - 37 + (1.6 * (perc-51))}px 0 0`;
            } else {
                return perc < 10
                    ? `0 0 0 ${100 - perc - 37 + (1.6 * (100 - perc-51))}px`
                    : `0 0 0 ${100 - perc - 37 + (1.7 * (100 - perc-51))}px`;
            }
        }
    }

    function getMargin(res: number, mid: number, perc: number) {
        if (perc === 50) {
            return `0 0 0 0`;
        } else {
            if (res > mid) {
                return perc > 90
                    ? `0 0 0 ${perc - 37 + 4 + (1.55 * (perc-51))}px`
                    : `0 0 0 ${perc - 37 + 4 + (1.6 * (perc-51))}px`;
            } else {
                return perc < 10
                    ? `0 ${(100 - perc - 37) + 4 + (1.6 * (100 - perc -51))}px 0 0`
                    : `0 ${(100 - perc - 37) + 4 + (1.7 * (100 - perc -51))}px 0 0`;
            }
        }
    }

    function getBorderRadius(res: number, mid: number, perc: number) {
        if (perc === 50) {
            return `0 0 0 0`;
        } else {
            if (res > mid) {
                return '0 6px 6px 0';
            } else {
                return '6px 0 0 6px';
            }
        }
    }

    function moveDiv(res: number, mid: number, perc: number) {
        if (perc === 50) {
            return `-1030%`;
        } else {
            if (res > mid) {
                if (perc > 50 && perc < 55) {return `${-270 + (perc-51) * 30}%`;}
                if (perc >= 55 && perc < 60) {return `${-170 + (perc-55) * 10}%`;}
                if (perc >= 60 && perc < 65) {return `${-120 + (perc-60) * 8}%`;}
                if (perc >= 65 && perc < 70) {return `${-90 + (perc-65 + 2) * 2}%`;}
                if (perc >= 70 && perc < 75) {return `${-70 + (perc-70) * 2}%`;}
                if (perc >= 75 && perc < 80) {return `${-60 + (perc-75) * 2}%`;}
                if (perc >= 80 && perc < 85) {return `${-52 + (perc-80-1) * 2}%`;}
                if (perc >= 85 && perc < 90) {return `${-48 + (perc-85) * 2}%`;}
                if (perc >= 90 && perc < 95) {return `${-40}%`;}
                if (perc >= 95) {return `${-38 + (perc-95-1)}%`;}
            } else
            {
                if (perc >= 0 && perc <= 5){return `${61 + ((100 - perc - 95)*1.1)}%`;}
                if (perc > 5 && perc <= 10){return `${60}%`;}
                if (perc > 10 && perc <= 15){return `${54 + ((100 - perc - 85)*1.4)}%`;}
                if (perc > 15 && perc <= 20) {return `${48 + ((100 - perc - 80)*1.7)}%`;}
                if (perc > 20 && perc <= 25) {return `${40 + ((100 - perc - 75)*2)}%`;}
                if (perc > 25 && perc <= 30) {return `${28 + ((100 - perc - 70)*3)}%`;}
                if (perc > 30 && perc <= 35) {return `${10 + ((100 - perc - 65)*4)}%`;}
                if (perc > 35 && perc <= 40) {return `${-20 + ((100 - perc - 60)*8)}%`;}
                if (perc > 40 && perc <= 45) {return `${-70 + ((100 - perc - 55)*12)}%`;}
                if (perc > 45) {return `${-170 + ((100 - perc - 51)*30)}%`;}
            }
        }
    }

    function suffix(perc: number) {
        let lastDigit = perc.toString().split('').pop();
        switch (lastDigit) {
            case '1':
                return 'st';
            case '2':
                return 'nd';
            case '3':
                return 'rd';
            default:
                return 'th';
        }
    }
</script>

<div class="main">
    <div class="row">
        <div class="label">Glycan<br> <b>Mature</b></div>
        <div class="content">
            <div class="min"><b>{min1}</b></div>
            <div class="max"><b>{max1}</b></div>
            <div class="middleParent">
                <div class="xAxis"></div>
                <div class="yAxis"></div>
                <div class="arthritisArea" style="border-radius: 0 6px 6px 0; left: 50.3%;"></div>
                <div class="result"
                     style="padding: {getPadding(res1, mid1, perc1)}; margin: {getMargin(res1, mid1, perc1)}; border-radius: {getBorderRadius(res1, mid1, perc1)}">
                    <div class="resultDisplay" style="right: {moveDiv(res1, mid1, perc1)};">
                        <div class="message"><b>{res1} ({perc1}<sup>{suffix(perc1)}</sup> percentile)</b></div>
                        <TriangleSmallDown color="#33664D" size="22"/>
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
                <div class="arthritisArea" style="border-radius: 6px 0 0 6px; right: 50.3%;"></div>
                <div class="result2"
                     style="padding: {getPadding(res2, mid2, perc2)}; margin: {getMargin(res2, mid2, perc2)}; border-radius: {getBorderRadius(res2, mid2, perc2)}">
                    <div class="resultDisplay" style="right: {moveDiv(res2, mid2, perc2)};">
                        <div class="message"><b>{res2} ({perc2}<sup>{suffix(perc2)}</sup> percentile)</b></div>
                        <TriangleSmallDown color="#33664D" size="22"/>
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
                <div class="arthritisArea" style="border-radius: 6px 0 0 6px; right: 50.3%;"></div>
                <div class="result3"
                     style="padding: {getPadding(res3, mid3, perc3)}; margin: {getMargin(res3, mid3, perc3)}; border-radius: {getBorderRadius(res3, mid3, perc3)}">
                    <div class="resultDisplay" style="right: {moveDiv(res3, mid3, perc3)};">
                        <div class="message"><b>{res3} ({perc3}<sup>{suffix(perc3)}</sup> percentile)</b></div>
                        <TriangleSmallDown color="#33664D" size="22"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="label">Glycan<br> <b>Lifestyle</b></div>
        <div class="content">
            <div class="min"><b>{min4}</b></div>
            <div class="max"><b>{max4}</b></div>
            <div class="middleParent">
                <div class="xAxis"></div>
                <div class="yAxis"></div>
                <div class="arthritisArea" style="border-radius: 6px 0 0 6px; right: 50.3%;"></div>
                <div class="result3"
                     style="padding: {getPadding(res4, mid4, perc4)}; margin: {getMargin(res4, mid4, perc4)}; border-radius: {getBorderRadius(res4, mid4, perc4)}">
                    <div class="resultDisplay" style="right: {moveDiv(res4, mid4, perc4)};">
                        <div class="message"><b>{res4} ({perc4}<sup>{suffix(perc4)}</sup> percentile)</b></div>
                        <TriangleSmallDown color="#33664D" size="22"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="lastRow">
        <div class="dot1"></div>
        <div style="font-size: 0.8rem;">Ulcerative colitis</div>
        <div class="dot2"></div>
        <div style="font-size: 0.8rem;">Your patient</div>
    </div>
</div>

<style>
    .main {
        width: 530px;
        height: 320px;
        background-color: #F0F6F5;
        border: 2px solid #C8DBD0;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .row {
        width: 100%;
        height: 23%;
        max-height: 58px;
        display: flex;
    }

    .label {
        width: 14%;
        height: 100%;
        margin-left: 2.5rem;
        font-size: 0.8rem;
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
        margin-right: 1rem;
    }

    .min {
        position: absolute;
        top: 34%;
        left: 1.6%;
        font-size: 0.7rem;
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

    .arthritisArea {
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
        left: 49.75%;
        width: 0.1rem;
        height: 88%;
        background-color: #08341F;
        border-radius: 10px;
    }

    .max {
        position: absolute;
        top: 34%;
        right: 5.5%;
        font-size: 0.7rem;
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
        bottom: 60%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .message {
        color: #33664D;
        z-index: 99999;
        min-width: 100px;
        font-size: 0.5rem;
        margin-bottom: -6px;
    }
</style>