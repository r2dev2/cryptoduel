<script>
  import OpponentProgress from './OpponentProgress.svelte';
  import CryptogramSolver from './CryptogramSolver.svelte';
  import JoinLink from './JoinLink.svelte';
  import Panel from './Panel.svelte';

  import { isHivemindBrain } from '@/js/constants.js';
  import { progress, gameProblem } from '@/js/store.js';
</script>

<div class="game">
  <Panel>
    <JoinLink />
  </Panel>
</div>
