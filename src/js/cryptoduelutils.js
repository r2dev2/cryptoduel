/**
 * Utilities with logic specific to cryptoduel
 */

/** @typedef {import('./quotes.js').EncryptedQuote} EncryptedQuote */

/** @type {(gp: EncryptedQuote | null) => boolean[]} */
export const getEmptyProgress = (gp) =>
  gp === null ? [] : [...gp.ciphertext].map((_) => false);
