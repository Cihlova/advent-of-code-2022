const { promises: fsPromises } = require("fs");
async function asyncReadFile(filename) {
  try {
    // Input Txt File
    const contents = await fsPromises.readFile(filename, "utf-8");

    // Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line
    const arr = contents.split("\n\n");

    // --- Part One ---
    // Function to find the total amount of calories of each Elf's inventory
    function sumInv(cal) {
      return cal
        .split("\n")
        .map(Number)
        .reduce((total, num) => total + num, 0);
    }

    // Function to find the Elf carrying the most Calories
    function maxInv(calArr) {
      return Math.max.apply(null, calArr);
    }

    // Find the Elf carrying the most Calories
    const array = arr.map(sumInv);

    // How many total Calories is that Elf carrying?
    console.log(maxInv(array)); // Answer: 71471

    // --- Part TWO ---
    // Function to sum the top three Elves' Calories
    function sumTop(topCal) {
      return topCal.reduce((total, num) => total + num, 0);
    }

    // Sorting the Elves' Calories from the largest to the lowest
    array.sort((a, b) => b - a);

    // Finding the top three Elves
    var topThree = array.slice(0, 3);

    // The total Calories carried by the top three Elves carrying the most Calories
    console.log(sumTop(topThree)); // Answer: 211189
  } catch (error) {
    console.log("Ho ho, this is an Advent Error!", error);
  }
}

asyncReadFile("input/day01.txt");
