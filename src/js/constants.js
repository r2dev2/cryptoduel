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

export const noshow = 'dontshow';

/** @typedef {{ id: Errors, msg: string }} Error */
