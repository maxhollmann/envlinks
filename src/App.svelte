<script>
  import Layout from './Layout.svelte';
  import Search from './Search.svelte';
  import Links from './Links.svelte';
  import filterLinks from './filter-links.js';

  let links = process.env.LINKS;
  let search = "";
  let searchElement;
  let activeElement = null;

  $: filteredLinks = filterLinks(links, search);


  const handleKeydown = (event) => {
    if (event.ctrlKey) return;
    if (event.altKey) return;
    if (event.metaKey) return;

    if (event.key == 'Escape') {
      searchElement.clear();
      if (activeElement) {
        activeElement.blur();
      }
    } else if (event.key == 'Enter'
               || event.target != searchElement.getInput() && event.key == ' ') {
      if (activeElement && activeElement.classList.contains('link') && activeElement.href) {
        window.location = activeElement.href;
      } else if (filteredLinks.length > 0) {
        window.location = filteredLinks[0].url;
      }
    } else if (event.target != searchElement.getInput() && event.key.length == 1) {
      searchElement.reset(event.key)
    } else {
      return;
    }

    event.preventDefault();
  }

  const updateActiveElement = (event) => {
    activeElement = document.activeElement;
  }

  document.addEventListener('focus', updateActiveElement, true)
  document.addEventListener('blur', updateActiveElement, true)

</script>


<style>
</style>


<svelte:window on:keydown={handleKeydown} />

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.2.96/css/materialdesignicons.min.css">
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
