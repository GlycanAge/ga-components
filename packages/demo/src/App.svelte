<script lang="ts">
  import { onMount } from 'svelte';
  import '../../../dist/arthritis.wc.js';

  let el: HTMLDivElement;

  onMount(() => {
   
  });
</script>

<div bind:this={el} class="p-4" style="background-color: lightcyan;">
    <div style="width: 400px; height: 210px; background-color: red;">
        <ga-arthritis report="1K4GyKDgsB9ATQflwio7"></ga-arthritis>
    </div>
</div>

