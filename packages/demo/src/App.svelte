<script lang="ts">
  import { onMount } from 'svelte';
  import '../../../dist/arthritis.wc.js';
  // import '../../../dist/colitis.wc.js';

  let el: HTMLDivElement;

  onMount(() => {
   
  });
</script>

<div bind:this={el} class="p-4">
      <div class="flex">
              <ga-arthritis report="1K4GyKDgsB9ATQflwio7"></ga-arthritis>
              <div class="p-20"></div>
<!--              <ga-colitis report="1K4GyKDgsB9ATQflwio7"></ga-colitis>-->
      </div>
</div>

