<script>
  import '@/js/networking.js';
  import { users, solved } from '@/js/store.js';
  import { confettiCelebration, showError } from '@/js/actions.js';
  import { log } from '@/js/utils.js';

  import { Game } from '@/components';
  // import {
  //   NameChooser,
  //   JoinLink,
  //   CryptogramSolver,
  //   OpponentProgress,
  //   Lobby,
  //   FirstLaunchPrompt,
  // } from '@/components';

  $: log('users:', $users);
  $: if ($solved) confettiCelebration();
</script>

<canvas id="confetti" />
<main>
  <Game on:error={(e) => showError(e.detail)} />

  <!--
  {#if isHivemindBrain}
    <JoinLink />
  {:else}
    {#await connectTo(hivemindBrain ?? '')}
      <p>Connecting to {hivemindBrain}</p>
    {:then _}
      <p>Successfully connected to {hivemindBrain}</p>
    {/await}
  {/if}

  {#if $isFirstLaunch}
    <FirstLaunchPrompt />
  {/if}

  <NameChooser />
  <Lobby />

  {#if $gameProblem}
    <OpponentProgress />
    <CryptogramSolver
      problem={$gameProblem}
      on:progress={(e) => progress.set(e.detail.progress)}
      on:solved={() => solved.set(true)}
      on:error={(e) => showError(e.detail)}
    />
  {/if}
  {#if isHivemindBrain}
    <button on:click={newProblem}> New Problem </button>
  {/if}
  -->
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
  }
</style>
