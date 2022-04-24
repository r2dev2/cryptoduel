<script>
  import { gameProblem as gp, name as n } from '@/js/store.js';

  export let gameProblem = gp;
  export let name = n;
  export let label = 'Username';
</script>

<div class="name-chooser">
  <label for="username">{label}</label>
  <input
    type="text"
    id="username"
    name="username"
    disabled={$gameProblem !== null}
    bind:value={$name}
  />
</div>

<style>
  .name-chooser {
    display: block;
  }
</style>
