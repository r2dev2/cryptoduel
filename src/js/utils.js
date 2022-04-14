/** @type {(...args: any[]) => any} */
export const log = (...args) => !process.env.PRODUCTION && console.log(...args);

/** @type {(num: number) => string} */
const padTime = (num) => `${Math.floor(num)}`.padStart(2, '0');

/** @type {(ms: number) => string} */
export const fmtTime = (ms) => {
  const hours = padTime(ms / 60000 / 60);
  const minutes = padTime((ms / 60000) % 60);
  const seconds = padTime((ms % 60000) / 1000);
  if (hours !== '00') {
    return `${hours}:${minutes}:${seconds}`.replace(/^0+/g, '');
  }
  if (minutes !== '00') {
    return `${minutes}:${seconds}`.replace(/^0+/g, '');
  }
  return `00:${seconds}`;
};

/** @type {(ms: number) => Promise<void>} */
export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * @template T
 * @param {Array<T>} arr
 * @returns {Set<T>}
 */
export const getDuplicates = (arr) => {
  const duplicates = new Set();
  /** @type {typeof duplicates} */
  const visited = new Set();

  for (const entry of arr) {
    if (visited.has(entry)) {
      duplicates.add(entry);
    }
    visited.add(entry);
  }

  return duplicates;
};

/**
 * @template T
 * @param {Array<T>} arr
 * @returns {T}
 */
export const choose = (arr) => arr[Math.floor(Math.random() * arr.length)];
