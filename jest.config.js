module.exports = {
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: false,
          },
          transform: {
            react: {
              runtime: 'classic',
            },
          },
        },
        module: {
          type: 'commonjs',
        },
      },
    ],
  },
}
