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

<div style="background-color: #CBDBD1; width: 400px; height: 210px; border-radius: 12px;">
	<span>{report}</span>
	<p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
	<p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
	<p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
	<p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
	<p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
	<p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
</div>
