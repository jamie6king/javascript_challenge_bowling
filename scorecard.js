class Scorecard {

    constructor() {
        this._game = [];
        this._frame = 1;
    };

    calculateScore() {
        return this._game.reduce(
            (gamePoints, currentGame) => gamePoints + currentGame.totalPoints,
            0,
        );
    };

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
            console.debug(previous_frame)
            
            if (previous_frame.isStrike) {

                previous_frame.totalPoints += first + second;

                if (this._frame > 2) {

                    let previous_previous_frame = this._game[this._frame - 3];

                    if (previous_previous_frame.isStrike) {

                        previous_previous_frame.totalPoints += first;
                        this._game[this._frame - 3] = previous_previous_frame;
                    }

                }

            } else if (previous_frame.isSpare) {

                previous_frame.totalPoints += first;

            };

            this._game[this._frame - 2] = previous_frame;
        }

        // increment frame
        console.debug("Frame over!")
        this._frame++;

    }
};

module.exports = Scorecard;
