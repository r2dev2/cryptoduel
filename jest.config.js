module.exports = {
  moduleFileExtensions: ['js', 'svelte'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: [
    // '<rootDir>/jest.setup.js',
    '@testing-library/jest-dom/extend-expect',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': ['svelte-jester'],
  },
};
