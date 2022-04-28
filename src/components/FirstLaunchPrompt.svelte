<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { name, isFirstLaunch } from '@/js/store.js';
  import NameChooser from './NameChooser.svelte';

  const handleHasExtended = writable(false);
  let focussedOnButton = false;
  let exiting = false;
  let extendHandleId = -1;

  /* TODO working on making gun animation a handle */
  const gotoGame = () => {
    const unsub = handleHasExtended.subscribe((extended) => {
      if (!extended) return;
      exiting = true;
      setTimeout(() => isFirstLaunch.set(false), 500);
      setTimeout(() => unsub());
    });
  };

  onMount(() => name.update((n) => n)); // make it persist in localstorage

  $: if (focussedOnButton) {
    clearTimeout(extendHandleId);
    handleHasExtended.set(false);
    extendHandleId = setTimeout(
      () => handleHasExtended.set(focussedOnButton),
      200
    );
  }
</script>

<div class="container" class:exiting>
  <h1>Welcome to <span class="cryptoduel"><i>Cryptoduel</i></span></h1>
  <img alt="cryptogram logo" src="./cryptoduel-logo.svg" width="200" />
  <p>
    An aristocrat cryptogram is a quote encrypted by substituting each letter
    with another letter.
  </p>
  <p>
    In cryptoduel, you compete with friends to see who can decrypt the quote the
    fastest!
  </p>
  <NameChooser label="Choose your cryptographer alias" />
  <button
    tabindex="0"
    class="play-button"
    on:click={gotoGame}
    on:focus={() => (focussedOnButton = true)}
    on:blur={() => (focussedOnButton = false)}
  >
    Play
  </button>
</div>

<style>
  .container {
    --extend-gun-duration: 100ms;
    --bullet-launch-duration: 700ms;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 99999;
    width: 100vw;
    height: 100vh;
    background-color: white;
    transform: translate(-50%, -50%);
    text-align: center;
    transition: var(--bullet-launch-duration) linear;
  }

  .exiting.container {
    background-color: transparent;
    filter: opacity(0);
    transform: translate(calc(100vw - 50%), -50%);
  }

  .container :global(.name-chooser) {
    margin-top: 1.5rem;
  }

  h1 {
    --expansion-factor: 1.05;
    position: relative;
    display: block;
    font-size: 4rem;
    animation: pulse 1.4s ease-in-out alternate infinite;
    margin-bottom: 1rem;
  }

  .play-button {
    --vibrate-dist: 0.25rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    width: 6rem;
    margin-top: 1.5rem;
    text-transform: uppercase;
    transform: translateX(0);
    transition: 100ms ease-out;
  }

  .play-button:hover {
    animation: vibrate 100ms ease-in-out alternate infinite;
  }

  .play-button:focus {
    position: relative;
    background-color: var(--primary-color);
    filter: brightness(70%);
    /* animation: rotate-quarter var(--spin-duration) ease-out; */
    animation: none;
  }

  .exiting .play-button {
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
    transform-origin: top center;
    transform: rotate(-10deg);
    animation: extend-gun var(--extend-gun-duration) ease-out;
  }

  /* ::before is the bullet */
  .exiting .play-button::before {
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

  @keyframes pulse {
    to {
      transform: scale(var(--expansion-factor));
    }
  }

  @keyframes vibrate {
    from {
      transform: translateX(calc(0 - var(--vibrate-dist)));
    }

    to {
      transform: translateX(var(--vibrate-dist));
    }
  }

  @keyframes rotate-quarter {
    to {
      transform: rotate(90deg);
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
      transform: rotate(-20deg);
    }

    to {
      transform: rotate(-20deg) translateX(-200vw);
    }
  }
</style>
