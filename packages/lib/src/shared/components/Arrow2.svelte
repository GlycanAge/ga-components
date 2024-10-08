<script lang="ts">
    import {scale} from '../functions/helpers';

    export let percentile = 0;
    export let direction = '';

    function calculate(perc: number) {
        if (perc === 50) {
            return 50;
        } else if (perc < 2) {
            return 9;
        } else if (perc > 98) {
            return 91;
        } else if (perc >= 2 && perc < 50) {
            return scale(perc, 9.2, 50, 13, 50);
        } else if (perc > 50 && perc <= 98) {
            return scale(perc, 50, 90.8, 50, 86.8);
        }
    }

    function color(perc: number, dir: string) {
        if (dir === 'left') {
            return perc >= 34 ? '#119999' : perc > 18 && perc < 34 ? '#EE6600' : '#DD2222';
        } else {
            return perc <= 66 ? '#119999' : perc > 66 && perc < 82 ? '#EE6600' : '#DD2222';
        }
    }
</script>


<div style="position: relative; width: 92%; height: 4px; display: flex; justify-content: space-between; gap: 4px;">
    <div style="position: relative; height: 100%; flex: 1; background-color: {direction === 'left' ? '#DD2222' : '#CADBD1'}; border-radius: 4px;">
        {#if direction === 'left'}
            <div style="position: absolute; right: 10px; bottom: 5px; height: 3px; width: 14px; background-color: #DD2222; border-radius: 4px; transform: rotate(135deg);"></div>
            <div style="position: absolute; right: 10px; top: 5px; height: 3px; width: 14px; background-color: #DD2222; border-radius: 4px; transform: rotate(-135deg);"></div>
        {/if}
    </div>
    <div style="height: 100%; flex: 2; background-color: {direction === 'left' ? '#DD2222' : '#CADBD1'}; border-radius: 4px;"></div>
    <div style="height: 100%; flex: 2; background-color: {direction === 'left' ? '#EE6600' : '#CADBD1'}; border-radius: 4px;"></div>
    <div style="position: relative; height: 100%; flex: 2; background-color: #CADBD1; border-radius: 4px;"></div>
    <div style="height: 100%; flex: 2; background-color: #CADBD1; border-radius: 4px;"></div>
    <div style="height: 100%; flex: 2; background-color: {direction === 'left' ? '#CADBD1' : '#EE6600'}; border-radius: 4px;"></div>
    <div style="height: 100%; flex: 2; background-color: {direction === 'left' ? '#CADBD1' : '#DD2222'}; border-radius: 4px;"></div>
    <div style="position: relative; height: 100%; flex: 1; background-color: {direction === 'left' ? '#CADBD1' : '#DD2222'}; border-radius: 4px;">
        {#if direction === 'right'}
            <div style="position: absolute; left: 11px; bottom: 5px; height: 3px; width: 14px; background-color: #DD2222; border-radius: 4px; transform: rotate(45deg);"></div>
            <div style="position: absolute; left: 11px; top: 5px; height: 3px; width: 14px; background-color: #DD2222; border-radius: 4px; transform: rotate(-45deg);"></div>
        {/if}
    </div>

    <div style="left: {calculate(percentile)}%; position: absolute; transform: translate(-50%, -100%); display: flex; align-items: center; flex-direction: column; width: 100px; height: 38px;">
        <svg style="position: relative;" width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0001 35.5418C19.6112 35.5418 19.2223 35.4724 18.8334 35.3335C18.4445 35.1946 18.0973 34.9863 17.7917 34.7085C15.9862 33.0418 14.389 31.4168 13.0001 29.8335C11.6112 28.2502 10.4515 26.7154 9.52091 25.2293C8.59036 23.7432 7.88203 22.3127 7.39591 20.9377C6.9098 19.5627 6.66675 18.2502 6.66675 17.0002C6.66675 12.8335 8.00703 9.51405 10.6876 7.04183C13.3681 4.56961 16.4723 3.3335 20.0001 3.3335C23.5279 3.3335 26.632 4.56961 29.3126 7.04183C31.9931 9.51405 33.3334 12.8335 33.3334 17.0002C33.3334 18.2502 33.0904 19.5627 32.6042 20.9377C32.1181 22.3127 31.4098 23.7432 30.4792 25.2293C29.5487 26.7154 28.389 28.2502 27.0001 29.8335C25.6112 31.4168 24.014 33.0418 22.2084 34.7085C21.9029 34.9863 21.5556 35.1946 21.1667 35.3335C20.7779 35.4724 20.389 35.5418 20.0001 35.5418Z"
                  fill="{color(percentile, direction)}"/>
        </svg>
    </div>
    <div style="left: {calculate(percentile)}%; position: absolute; transform: translate(-50%, -80%); display: flex; align-items: center; flex-direction: column; width: 100px; height: 38px; color: white; font-size: 0.75rem;">
        <b>{percentile}</b>
    </div>
</div>