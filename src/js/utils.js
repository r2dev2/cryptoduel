export const log = (...args) => !process.env.PRODUCTION && console.log(...args);

const padTime = num => `${Math.floor(num)}`.padStart(2, '0');

export const fmtTime = ms => {
  const hours = padTime((ms / 60000) / 60);
  const minutes = padTime((ms / 60000) % 60);
  const seconds = padTime((ms % 60000) / 1000);
  const res = hours != '00'
    ? `${hours}:${minutes}:${seconds}`
    : `${minutes}:${seconds}`;
  return res.replace(/^0+/g, '');
};

export const sleep = ms => new Promise(res => setTimeout(res, ms));
