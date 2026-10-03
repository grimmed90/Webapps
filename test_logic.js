const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('Arbete/oml-tid/index.html', 'utf8');
const shiftConfigCode = fs.readFileSync('Arbete/oml-tid/shiftConfig.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "outside-only" });
const window = dom.window;

// Define shiftConfig manually on window
eval(shiftConfigCode);

// Extract the getShift function from the HTML
const scriptTags = dom.window.document.querySelectorAll('script');
let logicScript = '';
scriptTags.forEach(script => {
    if(script.textContent.includes('function getShift')) {
        logicScript = script.textContent;
    }
});

// Create a context to run the function
const testContext = {
    window: window,
    console: console,
    Math: Math,
    Date: Date
};

// We will just evaluate a simplified test script
const testLogic = `
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    function getShift(targetDate, teamOffset) {
        if (!window.shiftConfig) return 'L';
        const anchorDate = new Date(window.shiftConfig.anchorDate);
        const diffTime = targetDate.getTime() - anchorDate.getTime();
        const diffDays = Math.floor(diffTime / MS_PER_DAY);

        const cycleLength = window.shiftConfig.pattern.length;
        let shiftIndex = ((diffDays - teamOffset) % cycleLength + cycleLength) % cycleLength;
        return window.shiftConfig.pattern[shiftIndex];
    }

    const anchor = new Date(window.shiftConfig.anchorDate);
    console.log("Day 0 (Anchor): " + getShift(anchor, 0) + " (Expected: " + window.shiftConfig.pattern[0] + ")");

    const day1 = new Date(anchor); day1.setDate(day1.getDate() + 1);
    console.log("Day 1: " + getShift(day1, 0) + " (Expected: " + window.shiftConfig.pattern[1] + ")");

    const day7 = new Date(anchor); day7.setDate(day7.getDate() + 7);
    console.log("Day 7: " + getShift(day7, 0) + " (Expected: " + window.shiftConfig.pattern[7] + ")");

    // Team B is offset by 7 days. On Day 7, Team B should have what Team A had on Day 0
    console.log("Team B Day 7: " + getShift(day7, 7) + " (Expected: " + window.shiftConfig.pattern[0] + ")");
`;

eval(testLogic);
