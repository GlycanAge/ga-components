<script lang="ts">
    import {getTranslation, suffix} from '../functions/helpers';

    export let percentile = 0;
    export let type = '';
    export let lang: string = 'english' ;
</script>


<div style="position: relative; width: 100%; height: 4px; display: flex; justify-content: space-between; gap: 4px;">
    <div style="position: relative; height: 100%; flex: 1; background-color: {type === 'left' ? '#DF2020' : '#CADBD1'}; border-radius: 4px;">
        {#if type === 'left'}
            <div style="position: absolute; right: 12px; bottom: 8px; height: 3px; width: 24px; background-color: #DF2020; border-radius: 4px; transform: rotate(135deg);"></div>
            <div style="position: absolute; right: 12px; top: 8px; height: 3px; width: 24px; background-color: #DF2020; border-radius: 4px; transform: rotate(-135deg);"></div>
        {/if}
    </div>
    <div style="height: 100%; flex: 2; background-color: {type === 'left' ? '#DF2020' : '#CADBD1'}; border-radius: 4px;"></div>
    <div style="height: 100%; flex: 2; background-color: {type === 'left' ? '#F2800D' : '#CADBD1'}; border-radius: 4px;"></div>
    <div style="position: absolute; height: 10px; width: 2px; background-color: #32664C; transform: translate(-50%, -50%); border-radius: 4px; left: 50%; top: 50%;"></div>
    <div style="position: relative; height: 100%; flex: 2; background-color: #CADBD1; border-radius: 4px;"></div>
    <div style="height: 100%; flex: 2; background-color: #CADBD1; border-radius: 4px;"></div>
    <div style="height: 100%; flex: 2; background-color: {type === 'left' ? '#CADBD1' : '#F2800D'}; border-radius: 4px;"></div>
    <div style="height: 100%; flex: 2; background-color: {type === 'left' ? '#CADBD1' : '#DF2020'}; border-radius: 4px;"></div>
    <div style="position: relative; height: 100%; flex: 1; background-color: {type === 'left' ? '#CADBD1' : '#DF2020'}; border-radius: 4px;">
        {#if type === 'right'}
            <div style="position: absolute; left: 11px; bottom: 8px; height: 3px; width: 24px; background-color: #DF2020; border-radius: 4px; transform: rotate(45deg);"></div>
            <div style="position: absolute; left: 11px; top: 8px; height: 3px; width: 24px; background-color: #DF2020; border-radius: 4px; transform: rotate(-45deg);"></div>
        {/if}
    </div>

    <div style="left: {percentile}%; position: absolute; transform: translate(-50%, -100%); display: flex; align-items: center; flex-direction: column; width: 100px; height: 38px;">
        <div class="message" style="color: #09341F; z-index: 99999; min-width: 100px; font-size: 0.74rem; display: flex; justify-content: center;">
            <b>{percentile}{#if lang === 'polish'}.{/if}<sup>{suffix(percentile, lang)}</sup> {getTranslation(lang, 'SINGLE_PERCENTILE')}</b>
        </div>
        <svg class="rotateImg" style="transform: rotate(180deg);" width="24%" height="24%" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.0718 4C17.151 -1.33334 24.849 -1.33333 27.9282 4.00001L40.0525 25C43.1317 30.3333 39.2827 37 33.1243 37L8.87563 37C2.71722 37 -1.13177 30.3333 1.94743 25L14.0718 4Z" fill="#09371F"/>
        </svg>
    </div>
</div>