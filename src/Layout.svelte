<style>
  .main {
    display: flex;
    justify-content: center;

    padding-top: 50px;
    padding: 50px 20px 0 20px;
  }

  .app {
    width: 1240px;
    max-width: 100%;
    margin: 0 auto;
  }
</style>


<div class="main">
  <div class="app">
    <slot></slot>
  </div>
</div>
