class Scorecard {

    constructor() {
        this._game = [];
        this._frame = 1;
        this._historicPoints = [];
    };

    calculateScore() {
        return this._game.reduce(
            (gamePoints, currentGame) => gamePoints + currentGame.totalPoints,
            0,
        );
    };

    historicScores() {
        return this._historicPoints.map((points, index) => this._historicPoints.slice(0, index + 1).reduce((a, b) => a + b));
    }

    showGame() {
        return this._game
    };

    addFrame(first, second=null, third=null) {

        // add scores to array
        this._game.push({
            "totalPoints": first + second + third,
            "points": [first, second, third],
            "frame": this._frame,
            "isStrike": (first === 10),
            "isSpare": (first + second == 10 && first !== 10)
        });

        // check if last game was strike
        if (this._frame > 1) {

            let previous_frame = this._game[this._frame - 2];
            
            if (previous_frame.isStrike) {

                previous_frame.totalPoints += first + second;
                this._historicPoints[this._frame - 2] += first + second;

                if (this._frame > 2) {

                    let previous_previous_frame = this._game[this._frame - 3];

                    if (previous_previous_frame.isStrike) {

                        previous_previous_frame.totalPoints += first;
                        this._historicPoints[this._frame - 3] += first;
                        this._game[this._frame - 3] = previous_previous_frame;

                    }

                }

            } else if (previous_frame.isSpare) {

                this._historicPoints[this._frame - 2] += first
                previous_frame.totalPoints += first;

            };

            this._game[this._frame - 2] = previous_frame;
        }

        this._historicPoints.push(first + second + third)

        // increment frame
        this._frame++;
    }
};

module.exports = Scorecard;
