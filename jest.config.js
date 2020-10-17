module.exports = {
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  roots: ["<rootDir>/tests", "<rootDir>/src"],
  testEnvironment: "jsdom",
  testRegex: "/tests/.*.test.tsx?$",
  transform: { "^.+\\.tsx?$": "ts-jest" },
};
