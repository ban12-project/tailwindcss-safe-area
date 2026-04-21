const base = require('./jest.base.config.cjs')

module.exports = {
  ...base,
  testMatch: ['<rootDir>/tests/v4.test.ts'],
  moduleNameMapper: {
    ...base.moduleNameMapper,
    '^tailwindcss$': '<rootDir>/node_modules/tailwindcss-v4/dist/lib.mjs',
    '^tailwindcss/plugin$': '<rootDir>/node_modules/tailwindcss-v4/dist/plugin.mjs',
  },
}
