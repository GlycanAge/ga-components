<svelte:options
	customElement={{
		tag: "ga-arthritis",
		shadow: "open",
	}}
/>

<script lang="ts">
	import { Language } from '../shared/interfaces/language.interface';

	/**
	 * Language of the rendered list
	 */
	export let language: Language;

	/**
	 * ID of the report
	 */
	export let report: string;
</script>

<div style="background-color: #F0F6F5; width: 530px; height: 230px; border-radius: 12px; display: flex; flex-direction: column; justify-content: center; border: 2px solid #C8DBD0;">
	<div style="width: 100%; height: 23%; display: flex;">
		<div style="width: 14%; height: 100%; margin-left: 2.5rem; font-size: 0.8rem; display: flex; align-items: start; justify-content: center; flex-direction: column;">Glycan<br> <b>Mature</b></div>
		<div style="width: 86%; height: 100%; position: relative; margin-right: 1rem;">
			<div id="min" style="position: absolute; top: 34%; left: 1.6%; font-size: 0.7rem; color: #6B8678;"><b>0.081</b></div>
			<div id="max" style="position: absolute; top: 34%; right: 5.5%; font-size: 0.7rem; color: #6B8678;"><b>0.185</b></div>
			<div class="middleParent" style="position: absolute; width: 76%; height: 80%; left: 10%; top: 10%;">
				<div class="xAxis" style="position: absolute; left:0; top:49%; width: 100%; height: 2px; background-color: black; border-radius: 10px; z-index: 9999;"></div>
				<div class="yAxis" style="position: absolute; left:50%; width: 2px; height: 100%; background-color: black; border-radius: 10px;"></div>
				<div class="arthritisArea" style="position: absolute;width: 46%; left: 50.6%; top: 5%; height: 90%; background-color: #C8DBD0; border-radius: 0 6px 6px 0;"></div>
			</div>
		</div>
	</div>
	<div style="width: 100%; height: 23%; display: flex;">
		<div style="width: 14%; height: 100%; margin-left: 2.5rem; font-size: 0.8rem; display: flex; align-items: start; justify-content: center; flex-direction: column;">Glycan<br> <b>Median</b></div>
		<div style="width: 86%; height: 100%; position: relative; margin-right: 1rem;">
			<div id="min" style="position: absolute; top: 34%; left: 1.6%; font-size: 0.7rem; color: #6B8678;"><b>0.091</b></div>
			<div id="max" style="position: absolute; top: 34%; right: 5.5%; font-size: 0.7rem; color: #6B8678;"><b>0.216</b></div>
			<div class="middleParent" style="position: absolute; width: 76%; height: 80%; left: 10%; top: 10%;">
				<div class="xAxis" style="position: absolute; left:0; top:49%; width: 100%; height: 2px; background-color: black; border-radius: 10px; z-index: 9999;"></div>
				<div class="yAxis" style="position: absolute; left:50%; width: 2px; height: 100%; background-color: black; border-radius: 10px;"></div>
				<div class="arthritisArea" style="position: absolute; width: 46%; right: 50%; top: 5%; height: 90%; background-color: #C8DBD0; border-radius: 6px 0 0 6px;"></div>
			</div>
		</div>
	</div>
	<div style="width: 100%; height: 23%; display: flex;">
		<div style="width: 14%; height: 100%; margin-left: 2.5rem; font-size: 0.8rem; display: flex; align-items: start; justify-content: center; flex-direction: column;">Glycan<br> <b>Youth</b></div>
		<div style="width: 86%; height: 100%; position: relative; margin-right: 1rem;">
			<div id="min" style="position: absolute; top: 34%; left: 1.6%; font-size: 0.7rem; color: #6B8678;"><b>0.109</b></div>
			<div id="max" style="position: absolute; top: 34%; right: 5.5%; font-size: 0.7rem; color: #6B8678;"><b>0.175</b></div>
			<div class="middleParent" style="position: absolute; width: 76%; height: 80%; left: 10%; top: 10%;">
				<div class="xAxis" style="position: absolute; left:0; top:49%; width: 100%; height: 2px; background-color: black; border-radius: 10px; z-index: 9999;"></div>
				<div class="yAxis" style="position: absolute; left:50%; width: 2px; height: 100%; background-color: black; border-radius: 10px;"></div>
				<div class="arthritisArea" style="position: absolute; width: 46%; right: 50%; top: 5%; height: 90%; background-color: #C8DBD0; border-radius: 6px 0 0 6px;"></div>
			</div>
		</div>
	</div>
	<div style="width: 100%; height: 11%; display: flex; align-items: center; justify-content: center; margin-top: 12px;">
		<div style="height: 12px; width: 12px; border-radius: 99px; background-color: #C8DBD0; border: 1px solid black; margin-right: 6px;"></div>
		<div>Rheumatoid arthritis</div>
		<div style="height: 12px; width: 12px; border-radius: 99px; background-color: #33664D; border: 1px solid black; margin: 0 6px 0 36px;"></div>
		<div>Your patient</div>
	</div>
</div>
