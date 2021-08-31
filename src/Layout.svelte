<style>
  .main {
    display: flex;
    justify-content: center;

    padding-top: 50px;
    padding: 50px 20px 0 20px;
  }

  .app {
    max-width: 1240px;
    margin: 0 auto;
  }
</style>


<div class="main">
  <div class="app">
    <slot></slot>
  </div>
</div>
