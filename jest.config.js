const config = {
    verbose: true,
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/"],
    testMatch: ["**/**/services/*.test.js"],
    forceExit: true,
};

module.exports = config;
