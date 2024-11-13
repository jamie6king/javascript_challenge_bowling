const readline = require("readline-sync");

class ScorecardUI {

    constructor(scorecard) {
        this._scorecard = scorecard;
    };

    _showScoreboard(finished=false) {
        const currentGame = this._scorecard.showGame()
        const scoreboard = [[], [], [], [], []]

        // 10 rounds, 10 scorecard things
        for (let i = 0; i < 10; i++) {

            // templating ASCII
            if (i == 0) {

                scoreboard[0].push("┌─┬─┬─┬")
                scoreboard[2].push("│ └─┴─┤")
                scoreboard[4].push("└─────┴")

            } else if (i == 9) {

                scoreboard[0].push("─┬─┬─┐")
                scoreboard[2].push(" └─┴─┤")
                scoreboard[4].push("─────┘")

            } else {

                scoreboard[0].push("─┬─┬─┬")
                scoreboard[2].push(" └─┴─┤")
                scoreboard[4].push("─────┴")

            }

            // scoreboard logic
            if (currentGame.length > i) {
                
                // special strike behaviour
                if (currentGame[i].isStrike) {

                    // display strike
                    scoreboard[1].push((i == 0 ) ? `│ │X│ │` : ` │X│ │`)

                    // check if next game(s) are strikes, only display final score if strike is 100% calculated
                    if (currentGame[i + 1]) {

                        if (currentGame[i + 1].isStrike) {

                            if (currentGame[i + 2]) {

                                scoreboard[3].push((i == 0) ? `│${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │` : `${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │`)

                            } else if (finished) {

                                scoreboard[3].push((i == 0) ? `│${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │` : `${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │`)

                            } else {

                                scoreboard[3].push((i == 0) ? "│     │" : "     │")

                            }

                        } else {

                            scoreboard[3].push((i == 0) ? `│${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │` : `${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │`)

                        }

                    } else if (finished) {

                        scoreboard[3].push((i == 0) ? `│${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │` : `${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │`)

                    } else {

                        scoreboard[3].push((i == 0) ? "│     │" : "     │")

                    }

                // special spare behaviour
                } else if (currentGame[i].isSpare) {

                    // display spare
                    scoreboard[1].push((i == 0 ) ? `│ │${currentGame[i].points[0]}│/│` : ` │${currentGame[i].points[0]}│/│`)

                    // display score only when spare 100% completed
                    if (currentGame.length > currentGame[i].frame || finished) {

                        scoreboard[3].push((i == 0) ? `│${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │` : `${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │`)

                    } else {

                        scoreboard[3].push((i == 0) ? "│     │" : "     │")

                    }

                // normal boring round
                } else {

                    if (i == 0) {

                        scoreboard[1].push(`│ │${currentGame[i].points[0]}│${currentGame[i].points[1]}│`)
                        scoreboard[3].push(`│${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │`)

                    } else {

                        scoreboard[1].push(` │${currentGame[i].points[0]}│${currentGame[i].points[1]}│`)
                        scoreboard[3].push(`${this._scorecard.historicScores()[i].toString().padStart(3, ' ')}  │`)

                    }
                }
            }

            // empty rounds
            if (currentGame.length < i + 1) {
                
                scoreboard[1].push((i == 0) ? "│ │ │ │" : " │ │ │")
                scoreboard[3].push((i == 0) ? "│     │" : "     │")

            }
        }

        // log the scoreboard
        scoreboard.forEach((line) => console.log(line.join("")))
    }

    // play game
    playFrame(frame) {

        // display round & scoreboard
        console.log(`\nRound ${frame}!\n`)
        
        this._showScoreboard()

        let firstBowl = null
        let firstBowlValid = false
        let secondBowl = null
        let secondBowlValid = false
        let thirdBowl = null
        let thirdBowlValid = false

        // first bowl validation
        while (!firstBowlValid) {

            firstBowl = parseInt(readline.question("First bowl: how many pins fell down: "))

            if (firstBowl > 10 || firstBowl < 0) {

                console.log("\nPlease enter a number between 0 and 10!\n")

            } else if (isNaN(firstBowl)) {

                console.log("\nPlease enter a number!\n")
                
            } else {

                firstBowlValid = true

            }
        } 

        if (firstBowl != 10 || (firstBowl == 10 && frame == 10)) {

            // second bowl validation
            while (!secondBowlValid) {

                secondBowl = parseInt(readline.question("Second bowl: how many pins fell down: "))

                if (secondBowl > 10 || secondBowl < 0) {

                    console.log("\nPlease enter a number between 0 and 10!\n")

                } else if (isNaN(secondBowl)) {

                    console.log("\nPlease enter a number!\n")
                    
                } else {

                    secondBowlValid = true

                }
            } 
        }

        if (frame == 10 && (firstBowl + secondBowl >= 10)) {

            // third bowl validation
            while (!thirdBowlValid) {

                thirdBowl = parseInt(readline.question("Third bowl: how many pins fell down: "))

                if (thirdBowl > 10 || thirdBowl < 0) {

                    console.log("\nPlease enter a number between 0 and 10!\n")

                } else if (isNaN(thirdBowl)) {

                    console.log("\nPlease enter a number!\n")
                    
                } else {

                    thirdBowlValid = true

                }
            } 
        }

        // add results to frame
        this._scorecard.addFrame(firstBowl, secondBowl, thirdBowl)
    }

    // show the results
    showResults() {
        
        console.log("\nGame Over!\n")

        this._showScoreboard(true)

        console.log(`\nYou scored ${this._scorecard.calculateScore()} points!\n`)
    }
}

module.exports = ScorecardUI;