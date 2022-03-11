<script>
  import { getQuoteGenerator } from './quotes.js';

  const getNewQuote = getQuoteGenerator();

  const quote = getNewQuote();
</script>

<main>
  {#await quote}
    <p>Loading Quote</p>
  {:then { author, text }}
    <p>{author}</p>
    <p>{text}</p>
  {/await}
</main>

<style>
</style>
