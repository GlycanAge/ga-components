<svelte:options
	customElement={{
		tag: "ga-overlap-list",
		shadow: "open",
	}}
/>

<script lang="ts">
	import { Language } from '../shared/interfaces/language.interface';

	export let language: Language;

	const items: Array<{
		id: string;
		label: string;
		overlap: "none" | "some" | "significant";
	}> = [];
</script>

{#each items as item}
	<div>
		<span class="label">{language[item.label]}</span>
		<span class="overlap overlap-{item.overlap}">{language[item.overlap]}</span>
	</div>
{/each}
