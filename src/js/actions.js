import ConfettiGenerator from 'js-confetti';
import Swal from 'sweetalert2';

/** @type {any | undefined} */
let confetti;
setTimeout(() => {
  confetti = new ConfettiGenerator({
    // @ts-ignore
    canvas: document.querySelector('#confetti'),
  });
}, 10);
// @ts-ignore
window.$cryptoduel$confetti = confetti;

export const confettiCelebration = () => {
  confetti.addConfetti();
};

export const showError = (
  /** @type {import('./constants.js').Error} */ err
) => {
  Swal.fire(`Error (${err.id})`, err.msg, 'error');
};
