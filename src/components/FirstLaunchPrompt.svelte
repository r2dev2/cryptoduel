<script>
  import { onMount } from 'svelte';
  import { name } from '@/js/store.js';
  import NameChooser from './NameChooser.svelte';
  import BulletButton from './BulletButton.svelte';
  import HelpInfo from './HelpInfo.svelte';

  let exiting = false;

  onMount(() => name.update((n) => n)); // make it persist in localstorage
</script>

<div class="container" class:exiting>
  <h1>Welcome to <span class="cryptoduel"><i>Cryptoduel</i></span></h1>
  <img alt="cryptogram logo" src="./cryptoduel-logo.svg" width="200" />
  <HelpInfo />
  <NameChooser label="Choose your cryptographer alias" />
  <BulletButton bind:exiting>Play</BulletButton>
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

  @keyframes pulse {
    to {
      transform: scale(var(--expansion-factor));
    }
  }
</style>
