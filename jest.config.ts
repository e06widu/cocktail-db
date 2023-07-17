/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.scss'],
    moduleNameMapper: {
      "^.+\\.svg$": "jest-svg-transformer",
        "\\.(scss|sass|css)$": "identity-obj-proxy"
      },
};