<div class="panel">
  <slot />
</div>

<style>
  .panel {
    padding: 2rem;
    /* Elevation 2 from https://vuetifyjs.com/en/styles/elevation/#usage */
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
  }
</style>
