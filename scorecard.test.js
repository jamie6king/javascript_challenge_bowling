const Scorecard = require("./scorecard.js");

describe("scorecard", () => {

    it("starts with 0 points", () => {
        
        const scorecard = new Scorecard();
        expect(scorecard.calculateScore()).toBe(0);

    });

    it("can add frames", () => {

        const scorecard = new Scorecard();
        scorecard.addFrame(2, 5);
        scorecard.addFrame(3, 5);
        expect(scorecard.calculateScore()).toBe(15);
    });

    it("can calculate a strike", () => {

        const scorecard = new Scorecard();
        scorecard.addFrame(10);
        scorecard.addFrame(2, 5);
        expect(scorecard.calculateScore()).toBe(24);

    });

    it("can calculate a spare", () => {

        const scorecard = new Scorecard();
        scorecard.addFrame(9, 1);
        scorecard.addFrame(3, 5);
        expect(scorecard.calculateScore()).toBe(21);

    });

    it("can calculate a full (example) game", () => {

        const scorecard = new Scorecard();
        
        scorecard.addFrame(1, 4);
        scorecard.addFrame(4, 5);
        scorecard.addFrame(6, 4);
        scorecard.addFrame(5, 5);
        scorecard.addFrame(10);
        scorecard.addFrame(0, 1);
        scorecard.addFrame(7, 3);
        scorecard.addFrame(6, 4);
        scorecard.addFrame(10);
        scorecard.addFrame(2, 8, 6);

        expect(scorecard.calculateScore()).toBe(133);
    });

    it("can calculate a perfect game", () => {

        const scorecard = new Scorecard();

        for (let i = 0; i < 9; i++) {
            scorecard.addFrame(10);
        };

        scorecard.addFrame(10, 10, 10);

        expect(scorecard.calculateScore()).toBe(300);
    });
});