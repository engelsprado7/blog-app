// playwright.config.js
module.exports = {
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 5000,
    },
    use: {
        baseURL: 'http://localhost:3000', // Make sure this is correct
        headless: false, // Set to false if you want to see the browser during tests
    },
};
