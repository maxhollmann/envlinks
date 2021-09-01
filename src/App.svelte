<script>
  import Layout from './Layout.svelte';
  import Search from './Search.svelte';
  import Links from './Links.svelte';
  import filterLinks from './filter-links.js';

  let links = process.env.LINKS;
  let search = "";
  let searchElement;

  $: filteredLinks = filterLinks(links, search);


  const handleKeydown = (event) => {
    if (event.ctrlKey) return;
    if (event.altKey) return;
    if (event.metaKey) return;

    if (event.key == 'Escape') {
      searchElement.clear();
    } else if (event.key == 'Enter') {
      if (filteredLinks.length > 0)
        window.location = filteredLinks[0].url;
    } else if (event.target != searchElement.getInput() && event.key.length == 1) {
      searchElement.reset(event.key)
    } else {
      return;
    }

    event.preventDefault();
  }
</script>


<style>
</style>


<svelte:window on:keydown={handleKeydown}/>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css">
  <title>{process.env.TITLE}</title>
</svelte:head>

<Layout>
  <div class="app">
    <Search bind:query={search}
            bind:this={searchElement}
            />

    <Links links={filteredLinks} />
  </div>
</Layout>
