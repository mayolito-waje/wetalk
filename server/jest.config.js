/** @type {import('ts-jest').JestConfigWithTsJest} * */

export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testPathIgnorePatterns: ['__tests__/helpers/'],
  transform: {
    '^.+.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};
