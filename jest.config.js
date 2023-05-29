module.exports = {
  verbose: true,
  preset: 'jest-expo',
  clearMocks: true,
  modulePathIgnorePatterns: [
    '<rootDir>/examples/',
    '<rootDir>/node_modules/',
    '<rootDir>/lib/',
    '<rootDir>/src/types/',
  ],
  watchPathIgnorePatterns: [
    '<rootDir>/examples/',
    '<rootDir>/node_modules/',
    '<rootDir>/lib/',
    '<rootDir>/src/types/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/types.ts',
    '!src/index.*',
    '!src/assets/**/*',
    '!src/config/ReactotronConfig.ts',
    '!src/services/index.ts*',
    '!src/routes/**/*',
    '!src/routes.tsx*',
    '!src/main/**/*',
  ],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec).[jt]s?(x)'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 88,
      lines: 88,
      statements: 88,
    },
  },
  setupFiles: ['<rootDir>/jestSetup.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/config/jest/assetsTransformer.js',
    '\\.(html)$': '<rootDir>/__mocks__/fileMock.js',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setupFilesAfterEnv.ts'],
};
