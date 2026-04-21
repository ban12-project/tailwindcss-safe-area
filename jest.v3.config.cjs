const base = require('./jest.base.config.cjs')

module.exports = {
  ...base,
  testMatch: ['<rootDir>/tests/index.test.ts'],
  moduleNameMapper: {
    ...base.moduleNameMapper,
    '^tailwindcss$': '<rootDir>/node_modules/tailwindcss-v3',
    '^tailwindcss/plugin$': '<rootDir>/node_modules/tailwindcss-v3/plugin',
  },
}
