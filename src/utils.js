export const log = (...args) => !process.env.PRODUCTION && console.log(...args);
