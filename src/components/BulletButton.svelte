<script>
  import { writable } from 'svelte/store';
  import { isFirstLaunch } from '@/js/store.js';

  export let exiting = false;
  export let startingExit = false;
  export let handleExtensionWait = 200;

  const handleHasExtended = writable(false);

  let focussedOnButton = false;
  let extendHandleId = -1;

  const gotoGame = () => {
    startingExit = true;
    if (!focussedOnButton) {
      extendHandle(true);
    }

    const unsub = handleHasExtended.subscribe((extended) => {
      if (!extended) return;
      exiting = true;
      setTimeout(() => isFirstLaunch.set(false), 500);
      setTimeout(() => unsub());
    });
  };

  const extendHandle = (override = false) => {
    clearTimeout(extendHandleId);
    handleHasExtended.set(false);
    extendHandleId = setTimeout(() => {
      handleHasExtended.set(focussedOnButton || override);
    }, handleExtensionWait);
  };

  $: if (focussedOnButton) {
    extendHandle();
  }
</script>

<button
  tabindex="0"
  class="play-button"
  class:exiting
  class:starting-exit={startingExit}
  on:click={gotoGame}
  on:touchstart={gotoGame}
  on:focus={() => (focussedOnButton = true)}
  on:blur={() => (focussedOnButton = false)}
>
  <slot>Play</slot>
</button>

<style>
  .play-button {
    --vibrate-dist: 0.25rem;
    --extend-gun-duration: 100ms;
    --bullet-launch-duration: 700ms;
    background-color: var(--primary-color);
    color: white;
    border: none;
    width: 6rem;
    margin-top: 1.5rem;
    text-transform: uppercase;
    transform: translateX(0);
    transition: 100ms ease-out;
  }

  .play-button:not(.starting-exit):hover {
    animation: vibrate 100ms ease-in-out alternate infinite;
  }

  .play-button:focus {
    position: relative;
    background-color: var(--primary-color);
    filter: brightness(70%);
    /* animation: rotate-quarter var(--spin-duration) ease-out; */
    animation: none;
  }

  .play-button.exiting {
    transform: rotate(20deg);
    animation: none;
  }

  /* ::after is the gun handle */
  .play-button:focus::after {
    content: '';
    position: absolute;
    top: 1.5rem;
    right: 0.5rem;
    background-color: var(--primary-color);
    width: 1.5rem;
    height: 2.5rem;
    border-radius: var(--border-radius);
    transform-origin: top center;
    transform: rotate(-10deg);
    animation: extend-gun var(--extend-gun-duration) ease-out;
  }

  /* ::before is the bullet */
  .play-button.exiting::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999999;
    background-color: var(--primary-color);
    width: 2rem;
    height: 1rem;
    border-radius: 50% 0 0% 50%;
    animation: bullet-left var(--bullet-launch-duration);
  }

  @keyframes vibrate {
    from {
      transform: translateX(calc(0 - var(--vibrate-dist)));
    }

    to {
      transform: translateX(var(--vibrate-dist));
    }
  }

  @keyframes extend-gun {
    from {
      transform-origin: top center;
      transform: scaleY(0) rotate(-10deg);
    }

    to {
      transform-origin: top center;
      transform: scaleY(1) rotate(-10deg);
    }
  }

  @keyframes bullet-left {
    0% {
      transform: rotate(0);
    }

    5% {
      transform: rotate(-20deg);
    }

    100% {
      transform: rotate(-20deg) translateX(-200vw);
    }
  }
</style>
