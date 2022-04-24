<script>
  export let style = '';
  export let flyInMs = 300;

  $: style_ = `${style} --fly-in-duration: ${flyInMs}ms`;
</script>

<div class="panel" style={style_}>
  <slot />
</div>

<style>
  .panel {
    --one-bounce-spring: cubic-bezier(0.31, 0.65, 0.36, 1.18);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    flex-grow: 1;
    padding: 1.5rem;
    /* Elevation 2 from https://vuetifyjs.com/en/styles/elevation/#usage */
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    animation: fly-from-left var(--fly-in-duration) var(--one-bounce-spring);
  }

  @keyframes fly-from-left {
    from {
      filter: opacity(0);
      transform: translateX(-100vw);
    }

    to {
      filter: opacity(1);
      transform: translateX(0);
    }
  }
</style>
