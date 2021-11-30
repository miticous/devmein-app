module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.svg': '<rootDir>/src/assets/UIKit/icons/svg.mock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // setupFiles: ['<rootDir>/src/config/jest.js'],
  moduleDirectories: ['node_modules'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transformIgnorePatterns: ['node_modules/?!(static-container)'],
  clearMocks: true,
  // setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!src/**/*.type.{ts}',
    '!src/utils/test-utils.tsx',
    '!src/**/*.d.ts',
    '!src/ducks',
  ],
};
