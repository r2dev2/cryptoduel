import ConfettiGenerator from 'js-confetti';
import Swal from 'sweetalert2';
import { noshow } from './constants.js';

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

/** @typedef {import('./constants.js').Error} Error */

const getErrLocalstorageKey = (/** @type {Error} */ err) =>
  `show-err-${err.id}`;

export const showError = (
  /** @type {import('./constants.js').Error} */ err
) => {
  const errKey = getErrLocalstorageKey(err);
  if (localStorage.getItem(errKey) === noshow) return;

  Swal.fire({
    title: `Error (${err.id})`,
    text: err.msg,
    icon: 'error',
    showDenyButton: true,
    denyButtonText: "Don't show this error message again",
  }).then((r) => {
    if (r.isDenied) {
      localStorage.setItem(errKey, noshow);
    }
  });
};
