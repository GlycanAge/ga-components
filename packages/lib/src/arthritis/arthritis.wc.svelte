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

<div style="background-color: #CBDBD1; width: 100%; height: 100%; border-radius: 12px;">
	<span>{report}</span>
</div>
