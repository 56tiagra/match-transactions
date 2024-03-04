module.exports = {
    // Indicates which environment Jest should use
    testEnvironment: 'jsdom',
    // The root directory that Jest should scan for tests and modules
    roots: ['src'],
    // File extensions that Jest will look for
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    // Regex pattern for selecting test files
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    // Transform files with ts-jest
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    // Module paths for resolving modules
    modulePaths: ['<rootDir>'],
    // Default collect coverage from these directories
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!**/*.d.ts'],
    // Test coverage report format
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
  };
  