const Scorecard = require("./scorecard.js");
const ScorecardUI = require("./ui.js");

const scorecard = new Scorecard();
const ui = new ScorecardUI(scorecard);

// run for 10 rounds
for (let i = 0; i < 10; i++) {
    console.log("\x1Bc")
    ui.playFrame(i + 1)
}

// show the results at the end
console.log("\x1Bc")
ui.showResults()