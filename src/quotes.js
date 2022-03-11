import { amountChunks } from './meta.js';


/** @typedef {{ author: string, text: string }} Quote */
/** @typedef {Quote & { plaintext: string, ciphertext: string }} EncryptedQuote */


export const getQuoteGenerator = () => {
  const chunk = fetch(`./quotes/${parseInt(Math.random() * (amountChunks - 1))}.json`)
    .then(r => r.json());

  const newQuote = async () => {
    const quotes = await chunk;
    const quote = quotes[parseInt(Math.random() * quotes.length)];
    return { author: quote.quoteAuthor, text: cleanUpText(quote.quoteText) };
  };

  return newQuote;
};

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shuffleArray = arr => arr
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1]);

const generateRandomEncryption = () => {
  const encMap = shuffleArray([...Array(26).keys()]);
  if (encMap.some((x, i) => x == i)) return generateRandomEncryption();
  return encMap.map(i => alphabet[i]);
};

/** @type {(quote: Quote) => EncryptedQuote} */
export const toAristocratCipher = quote => {
  const plaintext = quote.text.toUpperCase();
  const encryptionAlphabet = generateRandomEncryption();
  const ciphertext = [...plaintext]
    .map(char => encryptionAlphabet[alphabet.indexOf(char)] ?? char)
    .join('');

  return { ...quote, plaintext, ciphertext };
};

/** @type {(text: string) => string[]} */
export const splitQuote = text => [...text.split(/\s+/g)];

/** @type {(text: string) => string} */
const cleanUpText = text => text.replace(/[^\x00-\x7F]+/g, ''); // ascii-only

