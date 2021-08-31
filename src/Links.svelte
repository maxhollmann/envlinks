<script>
  import Link from './Link.svelte';

  export let links;
</script>


<style>
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
</style>

<div class="links">
  {#each links as link, i}
    <Link {...link} />
  {/each}
</div>
