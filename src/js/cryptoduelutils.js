/**
 * Utilities with logic specific to cryptoduel
 */

import { choose, fmtTime } from './utils.js';
import { congratulationTitles } from './constants.js';

/** @typedef {import('./quotes.js').EncryptedQuote} EncryptedQuote */

/** @type {(gp: EncryptedQuote | null) => boolean[]} */
export const getEmptyProgress = (gp) =>
  gp === null ? [] : [...gp.ciphertext].map((_) => false);

/** @type {(timeTaken: number) => string} */
export const getCongratulationsMessage = (timeTaken) => {
  return `You solved the quote in ${fmtTime(timeTaken)}!`;
};

/** @type {() => string} */
export const getCongratulationsTitle = () => choose(congratulationTitles);
