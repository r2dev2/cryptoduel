<script>
  import {
    users as u,
    gameProblem as gp,
    timeTakenByOpponents as to,
  } from '@/js/store.js';
  import { fmtTime } from '@/js/utils.js';
  import { getEmptyProgress } from '@/js/cryptoduelutils.js';
  import UserBubble from './UserBubble.svelte';

  export let users = u;
  export let gameProblem = gp;
  export let timeTakenByOpponents = to;

  $: emptyProgress = getEmptyProgress($gameProblem);
</script>

<div class="opponent-progress-container">
  {#each $users as user}
    <div
      class="user-container"
      class:solved={user.solved}
      style="--desc: 'SOLVED ({fmtTime(
        $timeTakenByOpponents.get(user.id) ?? 0
      )})';"
    >
      <UserBubble name={user.name} />
      <div class="opponent-progress">
        {#each user.progress ?? emptyProgress as hasFilled}
          <div class="progress-item" class:has-done={hasFilled} />
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .opponent-progress-container,
  .user-container {
    display: flex;
    flex-direction: column;
  }

  .user-container {
    gap: 0.25rem;
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
    background-color: var(--primary-color);
  }

  .opponent-progress::before,
  .opponent-progress::after {
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
