import ConfettiGenerator from 'js-confetti';

let confetti;
setTimeout(() => {
  confetti = new ConfettiGenerator({
    canvas: document.querySelector('#confetti')
  });
}, 10);
window.$cryptoduel$confetti = confetti;

export const confettiCelebration = () => {
  confetti.addConfetti();
}
