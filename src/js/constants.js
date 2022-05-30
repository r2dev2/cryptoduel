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
export const isAndroid = window.navigator.userAgent.includes('Android');

/** @enum {string} */
export const Errors = {
  NO_SELF_DECODE: 'no-self-decode',
};

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// random strings to keep track of
export const noshow = 'dontshow';
export const firstlaunch = 'has-launched';
export const cryptogramCharacterLabel = 'Cryptogram character';
export const occurencesCharacterLabel = 'Occurences of character';
export const replacementCharacterLabel = 'Replacement for character';

export const congratulationTitles = [
  'Congratulations!',
  "Let's gooo",
  'I knew you could do it',
  'What a speedy boi',
  'Sheeesh',
  "Are you sonic, cause you're fast",
  "Are you going to MIT, cause you're fast",
  'You almost finished as fast as an MIT boy',
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
  'You spend too much time on these puzzles, touch grass',
  'Did f appear 1 time, cause you were as fast as f1 cars',
  'You were faster than a Princeton waitlist student responding to a phone ring',
  'Quite e-e-e-legaaant',
  'Omae wa mou, SOLVEDERU',
  'Speedy and steady wins the race',
  "You're almost as fast as C",
  'Are you JIT compiled, cause that was a massive speedup',
  'That took you so little time, spacetime became just space',
  'You going so fast, you escaped a black hole',
  'You went so fast, you look red from here and blue over there',
];
