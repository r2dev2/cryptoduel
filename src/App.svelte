<script>
  import { getQuoteGenerator, toAristocratCipher } from './quotes.js';
  import { connectTo } from './networking.js';
  import { gameProblem, users, id, progress, solved } from './store.js';
  import { hivemindBrain, isHivemindBrain } from './constants.js';

  import CryptogramSolver from './CryptogramSolver.svelte';
  import OpponentProgress from './OpponentProgress.svelte';

  const getNewQuote = getQuoteGenerator();

  const newProblem = () => {
    getNewQuote().then(quote => gameProblem.set(toAristocratCipher(quote)));
  };

  $: joinLink = `${location.href}?game=${encodeURIComponent($id)}`;
  $: console.log('users:', $users);
</script>

<main>
  {#if isHivemindBrain}
    <p><a href={joinLink}>{joinLink}</a></p>
  {:else}
    {#await connectTo(hivemindBrain)}
      <p>Connecting to {hivemindBrain}</p>
    {:then conn}
      <p>Successfully connected to {hivemindBrain}</p>
    {/await}
  {/if}
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
  button {
    margin-top: 2rem;
  }

  button:focus {
    border: 1px solid #ccc;
  }

  :global(*:focus) {
    outline: none;
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
