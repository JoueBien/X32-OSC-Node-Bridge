module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  extensionsToTreatAsEsm: [".ts"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/electron/$1",
    "@/(.*)": "<rootDir>/src/$1",
    "@/applications(.*)": "<rootDir>/src/applications/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        diagnostics: false,
        useESM: true,
        isolatedModules: true,
      },
    ],
  },
}
