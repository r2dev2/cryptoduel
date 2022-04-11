import ConfettiGenerator from 'js-confetti';

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
