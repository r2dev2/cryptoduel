<!--
  Fuck you Android devs for making me do this.
  Why do y'all have to be so quirky and not implement keydown correctly
  on Android because you want devs to adapt to taking in inputs instead
  of keystrokes.
  Fuck off, even iOS manages to have a better keyboard entry mechanism
  than y'all and allows for proper keydown.
-->
<script>
  import { keyboardSubscriptions, needsKeyboardEntry } from '@/js/store.js';

  const firstRow = 'QWERTYUIOP';
  const secondRow = 'ASDFGHJKL';
  const thirdRow = 'ZXCVBNM';

  const rows = [firstRow, secondRow, thirdRow];

  const onClick =
    (/** @type {string} */ char) => (/** @type {MouseEvent} */ e) => {
      e.preventDefault();
      keyboardSubscriptions.forEach((cb) => cb(char));
    };
</script>

<div class="custom-keyboard" class:show={$needsKeyboardEntry}>
  {#each rows as row}
    <div class="keyboard-row">
      {#each row as char}
        <div class="key" on:mousedown={onClick(char)}>{char}</div>
      {/each}
    </div>
  {/each}
  <div class="keyboard-row">
    <div class="key" on:mousedown={onClick('BACKSPACE')}>----------</div>
  </div>
</div>

<style>
  .custom-keyboard {
    display: flex;
    flex-direction: column;

    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    padding-top: 0.25rem;
    width: 100%;

    background-color: var(--grey);
    transform: translateY(100%);
    transition: 300ms ease-out;
  }

  .custom-keyboard.show {
    transform: none;
  }

  .keyboard-row {
    display: flex;
    flex-direction: row;
  }

  .key {
    flex-grow: 1;
    text-align: center;
    padding: 0.25rem 0;
  }

  .key:active {
    background-color: var(--primary-color);
  }
</style>
