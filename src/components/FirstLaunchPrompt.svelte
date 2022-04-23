<script>
</script>

<div class="container">
  <h1>Welcome to <span class="cryptoduel"><i>Cryptoduel</i></span></h1>
  <p>
    A cryptogram is a quote which has been encrypted by substituting each letter
    with another letter.
  </p>
  <p>
    In cryptoduel, you compete with friends to see who can decrypt the quote the
    fastest!
  </p>
</div>

<style>
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 99999;
    width: 100vw;
    height: 100vh;
    background-color: white;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  h1 {
    --expansion-factor: 1.05;
    position: relative;
    display: block;
    font-size: 4rem;
    animation: pulse 1.4s ease-in-out alternate infinite;
  }

  @keyframes pulse {
    to {
      transform: scale(var(--expansion-factor));
    }
  }
</style>
