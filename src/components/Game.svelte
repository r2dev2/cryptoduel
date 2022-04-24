<script>
  import NameChooser from './NameChooser.svelte';
  import OpponentProgress from './OpponentProgress.svelte';
  import CryptogramSolver from './CryptogramSolver.svelte';
  import JoinLink from './JoinLink.svelte';
  import Lobby from './Lobby.svelte';
  import Panel from './Panel.svelte';

  import { getQuoteGenerator, toAristocratCipher } from '@/js/quotes.js';
  import { isHivemindBrain, hivemindBrain } from '@/js/constants.js';
  import {
    progress,
    gameProblem,
    solved,
    users,
    hivemindConnection,
  } from '@/js/store.js';

  const getNewQuote = getQuoteGenerator();

  const newProblem = () => {
    getNewQuote().then((quote) => gameProblem.set(toAristocratCipher(quote)));
  };

  $: connectingToHivemind = !isHivemindBrain && $hivemindConnection === null;
</script>

<div class="game">
  <div class="row">
    <Panel>
      <NameChooser />
    </Panel>
    <Panel style="flex-grow: 3;">
      <JoinLink />
    </Panel>
  </div>
  {#if connectingToHivemind}
    <Panel>
      Connecting to {hivemindBrain ?? ''}
    </Panel>
  {:else if $users.length > 0}
    <Panel>
      <Lobby />
    </Panel>
  {/if}
  {#if $users.length > 0 && $gameProblem}
    <Panel>
      <OpponentProgress />
    </Panel>
  {/if}
  {#if $gameProblem || isHivemindBrain}
    <Panel>
      {#if $gameProblem}
        <CryptogramSolver
          problem={$gameProblem}
          on:progress={(e) => progress.set(e.detail.progress)}
          on:solved={() => solved.set(true)}
          on:error
        />
      {/if}
      {#if isHivemindBrain}
        <button on:click={newProblem}>New Problem</button>
      {/if}
    </Panel>
  {/if}
</div>

<style>
  .game {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0.5rem;
  }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>