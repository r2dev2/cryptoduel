import { derived, get, writable } from 'svelte/store';

/** @typedef {import('./quotes.js').EncryptedQuote} EncryptedQuote */

const defaultUsers = [{
  id: '',
  name: '',
  progress: [null, [true]][0], // null if none or an array of whether the char is filled
  solved: false,
  conn: {},
}].slice(1);

/** @typedef {typeof defaultUsers[0]} User */

export const users = writable(defaultUsers);

export const id = writable('');
export const gameProblem = writable(/** @type {EncryptedQuote | null} */ (null));
export const name = writable(`person-${parseInt(Math.random() * 10000)}`);
export const hivemindConnection = writable(null);
export const progress = writable([null, [true]][0]);
export const solved = writable(false);
export const connections = new Map(); // id -> connection
export const problemStart = writable(Date.now());

export const self = derived([id, name, progress, solved], ([id, name, progress, solved]) => {
  return { id, name, progress, solved };
});

export const timeTakenByOpponents = derived([users, problemStart], ([$users, $problemStart]) => {
  return new Map($users.map(u => [
    u.id,
    u.solved
      ? get(timeTakenByOpponents).get(u.id)
      : Date.now() - $problemStart
  ]));
});
