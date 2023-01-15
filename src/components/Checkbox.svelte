<script>
  export let checked = false;
  export let id = '';
  export let label = '';
  export let disabled = false;
</script>

<div class="checkbox-option">
  <input
    {id}
    class="moe-component"
    {disabled}
    type="checkbox"
    name={id}
    bind:checked
  />
  <label for={id}>{label}</label>
</div>

<style>
  input {
    margin: 0;
    height: 1.25rem;
    width: 1.25rem;
    box-shadow: none;
    filter: none !important;
  }

  input:not(:disabled):active {
    transform: translate(1px, 1px);
  }

  .checkbox-option {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    user-select: none;
  }
</style>
