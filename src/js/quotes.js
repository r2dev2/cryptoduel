import { amountChunks } from './meta.js';

/** @typedef {{ author: string, text: string }} Quote */
/** @typedef {Quote & { plaintext: string, ciphertext: string }} EncryptedQuote */

export const getQuoteGenerator = () => {
  let quoteIndex = 0;

  const chunk = fetch(
    `./quotes/${Math.floor(Math.random() * (amountChunks - 1))}.json`
  )
    .then((r) => r.json())
    .then(shuffleArray);

  const newQuote = async () => {
    const quotes = /** @type {{ quoteAuthor: string, quoteText: string }[]} */ (
      await chunk
    );
    const quote = quotes[quoteIndex++ % quotes.length];
    return { author: quote.quoteAuthor, text: cleanUpText(quote.quoteText) };
  };

  return newQuote;
};

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * @template T
 * @param {Array<T>} arr
 * @returns {Array<T>}
 */
const shuffleArray = (arr) =>
  arr
    .map((a) => /** @type {[number, T]} */ ([Math.random(), a]))
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);

/** @type {() => string[]} */
const generateRandomEncryption = () => {
  const encMap = shuffleArray([...Array(26).keys()]);
  if (encMap.some((x, i) => x === i)) return generateRandomEncryption();
  return encMap.map((i) => alphabet[i]);
};

/** @type {(quote: Quote) => EncryptedQuote} */
export const toAristocratCipher = (quote) => {
  const plaintext = quote.text.toUpperCase();
  const encryptionAlphabet = generateRandomEncryption();
  const ciphertext = [...plaintext]
    .map((char) => encryptionAlphabet[alphabet.indexOf(char)] ?? char)
    .join('');

  return { ...quote, plaintext, ciphertext };
};

/** @type {(text: string) => string[]} */
export const splitQuote = (text) => [...text.split(/\s+/g)];

/** @type {(text: string) => string} */
// eslint-disable-next-line no-control-regex
const cleanUpText = (text) => text.replace(/[^\x00-\x7F]+/g, ''); // ascii-only
