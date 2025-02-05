// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   transform: {
//     '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
//   },
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
//   testMatch: ['/**/*.test.ts?(x)'],
// }

export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.app.json' }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
