module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest/custom-matchers.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
}
