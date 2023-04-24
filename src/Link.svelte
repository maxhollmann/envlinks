<script>
  export let index;
  export let name;
  export let url;
  export let icon = null;
</script>


<style>
  .link {
    display: flex;
    width: 285px;
    color: inherit;
    padding: 1rem 0;
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }

  .link-icon {
    flex-grow: 0;
    width: 35px;
    align-self: center;
  }

  .link-title {
    flex-grow: 1;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 1rem;
  }
</style>


<div class="link-container">
  <a href={url}
     class="link"
     >
    {#if icon}
    <div class="link-icon">
      <span class="mdi mdi-{icon}"></span>
    </div>
    {/if}

    <div class="link-title">
      {name}
    </div>
  </a>
</div>
