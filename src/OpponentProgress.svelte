<script>
  import { users, gameProblem, timeTakenByOpponents } from './store.js';
  import { fmtTime } from './utils.js';

  $: emptyProgress = $gameProblem === null
    ? []
    : [...$gameProblem.ciphertext].map(_ => false);
</script>

<div class="opponent-progress-container">
  {#each $users as user}
    <div
      class="user-container"
      class:solved={user.solved}
      style="--desc: 'SOLVED ({fmtTime($timeTakenByOpponents.get(user.id))})';"
    >
      <p>{user.name}:</p>
      <div class="opponent-progress">
        {#each (user.progress ?? emptyProgress) as hasFilled}
          <div class="progress-item" class:has-done={hasFilled} />
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .opponent-progress-container, .user-container {
    display: flex;
    flex-direction: column;
  }

  .opponent-progress-container {
    padding-bottom: 2rem;
    gap: 1rem;
  }

  .opponent-progress {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
  }

  .progress-item {
    width: 1rem;
    height: 1rem;
    background-color: white;
  }

  .progress-item.has-done {
    background-color: var(--green);
  }

  .opponent-progress::before, .opponent-progress::after {
    transition: 500ms ease-out;
    transform-origin: left;
  }

  .opponent-progress::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scaleX(0);
    background-color: var(--green);
  }

  .solved .opponent-progress::before {
    transform: scaleX(1);
  }

  .opponent-progress::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-5rem, -50%);
  }

  .solved .opponent-progress::after {
    content: var(--desc);
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
