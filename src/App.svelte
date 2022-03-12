<script>
  import { getQuoteGenerator, toAristocratCipher } from './quotes.js';
  import { connectTo } from './networking.js';
  import { users, id, progress, solved } from './store.js';
  import { hivemindBrain, isHivemindBrain } from './constants.js';

  import CryptogramSolver from './CryptogramSolver.svelte';

  const getNewQuote = getQuoteGenerator();

  const quote = getNewQuote();

  $: joinLink = `${location.href}?game=${encodeURIComponent($id)}`;
  $: console.log('users:', $users);
</script>

<main>
  {#if isHivemindBrain}
    <a href={joinLink}>{joinLink}</a>
    {#await quote}
      <p>Loading Quote</p>
    {:then quote}
      <CryptogramSolver
        problem={toAristocratCipher(quote)}
        on:progress={e => progress.set(e.detail.progress)}
        on:solved={() => solved.set(true)}
      />
    {/await}
  {:else}
    {#await connectTo(hivemindBrain)}
      <p>Connecting to {hivemindBrain}</p>
    {:then conn}
      <p>Successfully connected to {hivemindBrain}</p>
    {/await}
  {/if}
</main>

<style>
  a {
    display: block;
    margin-bottom: 2rem;
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
