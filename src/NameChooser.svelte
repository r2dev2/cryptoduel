<script>
  import { gameProblem, name } from './store.js';
</script>

<div class="name-chooser">
  <label for="username">Username</label>
  <input
    type="text"
    id="username"
    name="username"
    disabled={$gameProblem != null}
    bind:value={$name}
  />
</div>

<style>
  .name-chooser {
    display: block;
  }
</style>
