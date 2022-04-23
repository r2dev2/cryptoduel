<script>
</script>

<div class="container">
  <h1>Welcome to <span class="cryptoduel"><i>Cryptoduel</i></span></h1>
  <img alt="cryptogram logo" src="./cryptoduel-logo.svg" width="200" />
  <p>
    An aristocrat cryptogram is a quote encrypted by substituting each letter
    with another letter.
  </p>
  <p>
    In cryptoduel, you compete with friends to see who can decrypt the quote the
    fastest!
  </p>
  <button class="play-button"> Play </button>
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
    margin-bottom: 1rem;
  }

  .play-button {
    --vibrate-dist: 0.25rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    width: 6rem;
    text-transform: uppercase;
    transform: translateX(0);
    transition: 100ms ease-out;
  }

  .play-button:hover {
    animation: vibrate 100ms ease-in-out alternate infinite;
  }

  .play-button:active {
    position: relative;
    background-color: var(--primary-color);
    filter: brightness(70%);
    animation: rotate-quarter 100ms ease-out;
    transform: rotate(90deg);
  }

  .play-button:active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999999;
    background-color: var(--primary-color);
    width: 0.5rem;
    height: 2rem;
    animation: bullet-left 100ms linear 100ms;
  }

  @keyframes pulse {
    to {
      transform: scale(var(--expansion-factor));
    }
  }

  @keyframes vibrate {
    from {
      transform: translateX(calc(0 - var(--vibrate-dist)));
    }

    to {
      transform: translateX(var(--vibrate-dist));
    }
  }

  @keyframes rotate-quarter {
    to {
      transform: rotate(90deg);
    }
  }

  @keyframes bullet-left {
    to {
      transform: translateY(100vw);
    }
  }
</style>
