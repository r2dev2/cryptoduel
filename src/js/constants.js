/** @typedef {{ id: Errors, msg: string }} Error */

export const external = {
  // @ts-ignore
  Peer: window.Peer,
};

/** @enum {number} */
export const Messages = {
  INIT_STATE: 0,
  NEW_PROBLEM: 1,
  UPDATE_SERVER_STATE: 2,
  UPDATE_CLIENT_STATE: 3,
};

export const hivemindBrain = new URLSearchParams(location.search).get('game');
export const isHivemindBrain = hivemindBrain === null;

/** @enum {string} */
export const Errors = {
  NO_SELF_DECODE: 'no-self-decode',
};

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// random strings to keep track of
export const noshow = 'dontshow';
export const firstlaunch = 'has-launched';

export const congratulationTitles = [
  'Congratulations!',
  "Let's gooo",
  'I knew you could do it',
  'What a speedy boi',
  'Sheeesh',
  "Are you sonic, cause you're fast",
  'You faster than an MIT boy',
  'Zoom zoom',
  'Vroom vroom',
  'You just broke the sound barrier',
  "Are you 30k mph, cause you're faster than escape velocity",
  'Too smart, too fast',
  'ZHOOOOOM',
  'Haha cryptogram go brrr',
  "I'm proud of you",
  'Most speedy cryptonerd',
  'I *c* you',
  "Deja vu, although I've never seen such speed before",
];
