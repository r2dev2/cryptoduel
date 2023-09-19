<script>
  import { dismissClearWarning, replacement } from '@/js/store.js';
  import Swal from 'sweetalert2';

  const reset = () => {
    if ($dismissClearWarning) {
      $replacement = Array(26).fill('');
      return;
    }

    Swal.fire({
      title: 'Warning!',
      text: 'Your progress will be FULLY reset.',
      icon: 'warning',
      showDenyButton: true,
      denyButtonText: "Don't show warning",
      confirmButtonText: 'Proceed',
      showCancelButton: true,
      cancelButtonText: 'Abort',
      focusConfirm: true,
      confirmButtonColor: 'var(--primary-color)',
      denyButtonColor: 'var(--red)',
    }).then((r) => {
      if (r.isDismissed) return;
      $dismissClearWarning = r.isDenied;
      $replacement = Array(26).fill('');
    });
  };
</script>

<button on:click={reset} disabled={$replacement.every((r) => r === '')}>
  Clear Progress
</button>

<style>
  button {
    width: max-content;
  }
</style>
