<script>
  import Link from './Link.svelte';

  /**
   * @typedef {Object} Props
   * @property {any} links
   * @property {boolean} [newTab]
   */

  /** @type {Props} */
  let { links, newTab = false } = $props();
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
