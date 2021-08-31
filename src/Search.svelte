<script>
  export let query;

  let inputElement;

  export function reset(str) {
    query = str;
    inputElement.focus();
  }

  export function clear() {
    query = '';
    inputElement.blur();
  }

  export function getInput() {
    return inputElement;
  }
</script>


<style>
  .search-container {
    width: 300px;
    max-width: 100%;
    margin: 0 auto;
    margin-bottom: 50px;
  }

  .search, .search:active, .search:focus {
    width: 100%;
    outline: none;
    border: none;
    height: 3rem;
    text-align: center;
    margin: 0;
    font-size: 20px;
  }
</style>


<div class="search-container">
  <input bind:value={query}
         bind:this={inputElement}
         placeholder="Type to search..."
         class="search"
         />
</div>
