export const log = (...args) => !process.env.PRODUCTION && console.log(...args);

export const fmtTime = ms => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds}`;
};
