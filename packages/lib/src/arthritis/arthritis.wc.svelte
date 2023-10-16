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
	export let reportData: any;
</script>

<div style="background-color: #CBDBD1; width: 100%; height: 100%; border-radius: 12px;">
	{reportData}
</div>
