<script>
  import { getQuoteGenerator, toAristocratCipher } from './quotes.js';
  import { connectTo } from './networking.js';
  import { gameProblem, users, progress, solved } from './store.js';
  import { hivemindBrain, isHivemindBrain } from './constants.js';
  import { confettiCelebration } from './actions.js';
  import { log } from './utils.js';

  import NameChooser from './NameChooser.svelte';
  import JoinLink from './JoinLink.svelte';
  import CryptogramSolver from './CryptogramSolver.svelte';
  import OpponentProgress from './OpponentProgress.svelte';

  const getNewQuote = getQuoteGenerator();

  const newProblem = () => {
    getNewQuote().then(quote => gameProblem.set(toAristocratCipher(quote)));
  };

  $: log('users:', $users);
  $: if ($solved) confettiCelebration();
</script>

<canvas id="confetti" />
<main>
  {#if isHivemindBrain}
    <JoinLink />
  {:else}
    {#await connectTo(hivemindBrain)}
      <p>Connecting to {hivemindBrain}</p>
    {:then conn}
      <p>Successfully connected to {hivemindBrain}</p>
    {/await}
  {/if}

  <NameChooser />

  {#if $gameProblem}
    <OpponentProgress />
    <CryptogramSolver
      problem={$gameProblem}
      on:progress={e => progress.set(e.detail.progress)}
      on:solved={() => solved.set(true)}
    />
  {/if}
  {#if isHivemindBrain}
    <button on:click={newProblem}>
      New Problem
    </button>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  button:focus {
    border: 1px solid #ccc;
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
    z-index: 99;
    pointer-events: none;
  }

  :root {
    --amber: #ffc107;
    --yellow: #ffeb3b;
    --green: #4caf50;
    --hovered-letter-color: var(--yellow);
    --selected-letter-color: var(--amber);
    --solved-text-color: var(--green);
  }
</style>
