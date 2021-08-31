<script>
  import Link from './Link.svelte';

  let links = process.env.LINKS;
  let search = "";

  const linkMatches = (link, query) => {
    return link.name.toLowerCase().includes(query.toLowerCase())
  }

  $: filteredLinks = links.filter(link => linkMatches(link, search));
</script>


<input bind:value={search}
       placeholder="Type to search..."
       autofocus
       >

<div class="links">
  {#each filteredLinks as link, i}
    <Link {...link} />
  {/each}
</div>
