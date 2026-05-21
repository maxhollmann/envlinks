<script>
  import Link from './Link.svelte';

  export let links;
  export let newTab = false;
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
    <Link {...link} {newTab} />
  {/each}
</div>
