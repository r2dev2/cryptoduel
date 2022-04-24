<script>
  import { onMount } from 'svelte';
  import { name, isFirstLaunch } from '@/js/store.js';
  import NameChooser from './NameChooser.svelte';

  let exiting = false;
  const gotoGame = () => {
    exiting = true;
    setTimeout(() => isFirstLaunch.set(false), 2000);
  };

  onMount(() => name.update((n) => n)); // make it persist in localstorage
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
  <button tabindex="0" class="play-button" on:click={gotoGame}>Play</button>
</div>

<style>
  .container {
    --spin-duration: 100ms;
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
    transition-delay: var(--spin-duration);
  }

  .exiting.container {
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
    animation: rotate-quarter var(--spin-duration) ease-out;
    transform: rotate(90deg);
  }

  .exiting .play-button {
    transform: rotate(90deg);
    animation: none;
  }

  .exiting .play-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999999;
    background-color: var(--primary-color);
    width: 1rem;
    height: 2rem;
    border-radius: 0 0 50% 50%;
    animation: bullet-left var(--bullet-launch-duration) linear
      var(--spin-duration);
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

  @keyframes bullet-left {
    to {
      transform: translateY(200vw);
    }
  }
</style>
