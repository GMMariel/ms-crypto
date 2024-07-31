module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/test/**/**/*.ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js'],
	testTimeout: 60000,
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
	},
	moduleDirectories: ['node_modules', 'src'],
};
