module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["json", "text", "lcov", "cobertura"], // Include il report Cobertura
    testEnvironment: "node",
  };
  