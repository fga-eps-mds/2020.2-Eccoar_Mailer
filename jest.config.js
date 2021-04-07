module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  testPathIgnorePatterns: ["build"],
  testResultsProcessor: "jest-sonar-reporter",
  coveragePathIgnorePatterns: ["/node_modules/", "/test/", "/db/"],
  moduleNameMapper: {
		'@controllers/(.*)': '<rootDir>/src/controllers/$1',
		'@services/(.*)': '<rootDir>/src/services/$1',
		'@utils/(.*)': '<rootDir>/src/utils/$1',
	},
};
