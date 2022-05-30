<script>
  import '@/js/networking.js';
  import { isFirstLaunch, users, solved } from '@/js/store.js';
  import { confettiCelebration, showError } from '@/js/actions.js';
  import { log } from '@/js/utils.js';

  import { FirstLaunchPrompt, Game, Keyboard } from '@/components';

  $: log('users:', $users);
  $: if ($solved) confettiCelebration();
</script>

<canvas id="confetti" />
<Keyboard />
<main>
  {#if $isFirstLaunch}
    <FirstLaunchPrompt />
  {:else}
    <Game on:error={(e) => showError(e.detail)} />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  :global(body) {
    overflow-x: hidden;
  }

  :global(button:hover) {
    cursor: pointer;
  }

  :global(*:focus) {
    outline: none;
  }

  #confetti {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    pointer-events: none;
  }

  :root {
    --light-blue: #03a9f4;
    --amber: #ffc107;
    --yellow: #ffeb3b;
    --green: #4caf50;
    --red: #f44336;
    --grey: #cccccc;
    --light-grey: #f0f1f2;
    --primary-color: var(--light-blue);
    --hovered-letter-color: var(--yellow);
    --selected-letter-color: var(--amber);
    --solved-text-color: var(--green);
    --panel-title-bg-color: var(--light-grey);
    --panel-title-color: #505152;
    --no-occurence-color: #f5f5f5;
    --no-occurence-bg-color: #4a4a4a;
  }
</style>
