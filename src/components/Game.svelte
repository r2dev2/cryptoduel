<script>
  import HelpInfo from './HelpInfo.svelte';
  import NameChooser from './NameChooser.svelte';
  import OpponentProgress from './OpponentProgress.svelte';
  import CryptogramSolver from './CryptogramSolver.svelte';
  import JoinLink from './JoinLink.svelte';
  import Checkbox from './Checkbox.svelte';
  import Lobby from './Lobby.svelte';
  import Panel from './Panel.svelte';

  import {
    getQuoteGenerator,
    toAristocratCipher,
    toPatristocratCipher,
  } from '@/js/quotes.js';
  import { isHivemindBrain, hivemindBrain } from '@/js/constants.js';
  import {
    patristocratEnabled,
    progress,
    gameProblem,
    solved,
    users,
    hivemindConnection,
  } from '@/js/store.js';

  const getNewQuote = getQuoteGenerator();

  /** @type {typeof toAristocratCipher} */
  const createProblem = (quote) =>
    $patristocratEnabled
      ? toPatristocratCipher(toAristocratCipher(quote))
      : toAristocratCipher(quote);

  const newProblem = () => {
    getNewQuote().then((quote) => gameProblem.set(createProblem(quote)));
  };

  $: connectingToHivemind = !isHivemindBrain && $hivemindConnection === null;
</script>

<div class="game">
  <div class="row">
    <Panel title="Join Info">
      <JoinLink />
    </Panel>
    <Panel title="Settings">
      <div class="row">
        <NameChooser />
        <Checkbox
          id="patristocrat-option"
          label="Patristocrat"
          bind:checked={$patristocratEnabled}
          disabled={$gameProblem !== null}
        />
      </div>
    </Panel>
  </div>
  <Panel title="Help" dense closed>
    <HelpInfo verbose />
  </Panel>
  {#if connectingToHivemind}
    <Panel title="Connecting...">
      Connecting to {hivemindBrain ?? ''}
    </Panel>
  {:else if $users.length > 0}
    <Panel title="Lobby">
      <Lobby />
    </Panel>
  {/if}
  {#if $users.length > 0 && $gameProblem}
    <Panel title="Progress">
      <OpponentProgress />
    </Panel>
  {/if}
  {#if $gameProblem || isHivemindBrain}
    <Panel title="Game">
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
