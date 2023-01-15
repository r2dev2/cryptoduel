<script>
  export let verbose = false;
</script>

<p>
  An aristocrat cryptogram is a quote encrypted by substituting each letter with
  another letter. A patristocrat cryptogram is an aristocrat with all whitespace
  and punctuation removed.
</p>
<p>
  In cryptoduel, you compete with friends to see who can decrypt the quote the
  fastest!
</p>
{#if verbose}
  <p>
    The table given shows the amount of times each character appears in the
    quote as well as the replacement for each character. You may either enter
    replacment characters into the table or under each character of the quote.
  </p>
{/if}
