<script>
  // panel inspired by bugzilla panels
  // reference: https://bugzilla.mozilla.org/show_bug.cgi?id=956573

  import { writable as lswritable } from 'svelte-local-storage-store';

  export let style = '';
  export let flyInMs = 300;
  export let title = '';
  export let closed = false;
  export let dense = false;

  const expanded = lswritable(`panel-${title}`, !closed);

  $: closed = !$expanded;

  $: style_ = `${style} --fly-in-duration: ${flyInMs}ms`;
</script>

<div class="panel" class:expanded={$expanded} class:dense style={style_}>
  <div class="panel-title" on:click={() => expanded.update((e) => !e)}>
    <span class="dropdown-arrow" />
    <span class="title-text">{title}</span>
  </div>
  <div class="panel-content">
    <slot />
  </div>
</div>

<style>
  /**
   * IMPORTANT!!!!!
   *
   * In this style section, we use explicit > instead of all child selector
   * to support nested <Panel />.
   *
   * This is needed because if .expanded is set for a parent panel,
   * .expanded .panel-content will match panel content of all subpanels.
   */

  .panel {
    --one-bounce-spring: cubic-bezier(0.31, 0.65, 0.36, 1.18);
    --expansion-transition-duration: 300ms;
    --expansion-transition: var(--expansion-transition-duration) ease-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 0 min-content;
    border-radius: var(--border-radius);
    box-shadow: var(--elevation-2);
    transition: var(--expansion-transition);
    animation: fly-from-left var(--fly-in-duration) var(--one-bounce-spring);
  }

  @media (prefers-reduced-motion: reduce) {
    .panel {
      animation: fade-in var(--expansion-transition-duration)
        var(--one-bounce-spring);
    }
  }

  .panel:not(.expanded) {
    height: max-content;
  }

  .panel-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    color: var(--panel-title-color);
    background-color: var(--panel-title-bg-color);
    padding: 0.25rem 0.5rem;
  }

  .panel-title:hover {
    cursor: pointer;
  }

  .dropdown-arrow {
    --base-length: 5px;
    --side-length: 3px;
    border-width: var(--side-length) 0 var(--side-length) var(--base-length);
    border-style: solid;
    border-color: transparent transparent transparent currentColor;
    height: 0;
    width: 0;
    transform-origin: left center;
    transition: var(--expansion-transition);
  }

  .expanded > * > .dropdown-arrow {
    transform: translateX(50%) rotate(90deg);
  }

  .panel-content {
    --main-props-transition: height var(--expansion-transition),
      padding var(--expansion-transition), filter var(--expansion-transition);
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    gap: 1rem;
    padding: 0 0.75rem;
    height: 0;
    transform-origin: top center;
    transform: scaleY(0);
    filter: opacity(0);
    transition: var(--main-props-transition), transform 0ms ease-out;
  }

  .dense > .panel-content {
    gap: 0;
  }

  .expanded > .panel-content {
    height: unset;
    padding: 0.75rem 0.75rem;
    transform: scaleY(1);
    filter: opacity(1);
    transition: var(--expansion-transition);
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

  @keyframes fade-in {
    from {
      filter: opacity(0);
    }

    to {
      filter: opacity(1);
    }
  }
</style>
