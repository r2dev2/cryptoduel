import { get } from 'svelte/store';

import ConfettiGenerator from 'js-confetti';
import Swal from 'sweetalert2';
import {
  getCongratulationsMessage,
  getCongratulationsTitle,
} from './cryptoduelutils.js';
import { noshow } from './constants.js';
import { problemStart } from './store.js';

/** @typedef {import('./constants.js').Error} Error */

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
  Swal.fire({
    title: getCongratulationsTitle(),
    text: getCongratulationsMessage(Date.now() - get(problemStart)),
    icon: 'success',
    confirmButtonColor: 'var(--primary-color)',
  });

  confetti.addConfetti();
};

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
    confirmButtonColor: 'var(--primary-color)',
    denyButtonColor: 'var(--red)',
  }).then((r) => {
    if (r.isDenied) {
      localStorage.setItem(errKey, noshow);
    }
  });
};
