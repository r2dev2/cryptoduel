<script>
  import { getQuoteGenerator, toAristocratCipher } from './quotes.js';

  import CryptogramSolver from './CryptogramSolver.svelte';

  const getNewQuote = getQuoteGenerator();

  const quote = getNewQuote();
</script>

<main>
  {#await quote}
    <p>Loading Quote</p>
  {:then quote}
    <CryptogramSolver problem={toAristocratCipher(quote)} />
  {/await}
</main>

<style>
  :root {
    --amber: #ffc107;
    --yellow: #ffeb3b;
    --hovered-letter-color: var(--yellow);
    --selected-letter-color: var(--amber);
  }
</style>
