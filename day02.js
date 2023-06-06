const { promises: fsPromises } = require("fs");
async function asyncReadFile(filename) {
  try {
    // Input Txt File
    const contents = await fsPromises.readFile(filename, "utf-8");
    const guideArr = contents.split("\n");

    // --- Part One ---
    // Scores for each sign
    const assumedSignScore = { X: 1, Y: 2, Z: 3 };
    const assumedMoveResult = {
      A: { X: 3, Y: 6, Z: 0 },
      B: { X: 0, Y: 3, Z: 6 },
      C: { X: 6, Y: 0, Z: 3 },
    };

    // Calculating assumed scores
    const whoWins = (rounds) => {
      const [player01, player02] = rounds.split(" ");
      const moveValue = assumedSignScore[player02];
      const myValue = assumedMoveResult[player01][player02];
      return moveValue + myValue;
    };

    // Function to sum scores
    function sumScore(sum) {
      return sum.reduce((total, num) => total + num, 0);
    }

    // What would your total score be if everything goes exactly according to your strategy guide?
    const assumedScores = guideArr.map(whoWins);
    console.log(sumScore(assumedScores)); // Answer: 10941

    // --- Part Two ---
    // X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
    // Actual moves
    const realMoveResult = {
      A: { X: "S", Y: "R", Z: "P" },
      B: { X: "R", Y: "P", Z: "S" },
      C: { X: "P", Y: "S", Z: "R" },
    };
    const realSignScore = { P: 2, R: 1, S: 3 };
    const realMoveScore = { X: 0, Y: 3, Z: 6 };

    // Calculating actual scores
    const whoReallyWins = (newrounds) => {
      const [player01, player02] = newrounds.split(" ");
      const myRequiredValue = realMoveResult[player01][player02];
      const reguiredValueScore = realMoveScore[player02];
      const myRealScore = realSignScore[myRequiredValue];
      return reguiredValueScore + myRealScore;
    };

    // Following the Elf's instructions for the second column,
    // what would your total score be if everything goes exactly according to your strategy guide?
    const realScores = guideArr.map(whoReallyWins);
    console.log(sumScore(realScores)); // Answer: 13071

  } catch (error) {
    console.log("Ho ho, this is an Advent Error!", error);
  }
}

asyncReadFile("input/day02.txt");
