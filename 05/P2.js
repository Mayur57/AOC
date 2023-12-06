const fs = require('fs')

const inputs = fs.readFileSync("./in", { encoding: "utf8" }).trim()

function parseSeeds(input) {
  const seedsArray = input.replace(/\n/g, "").match(/seeds: ([\d\s]+)/)[1].split(" ").map(Number);
  const seedsObj = {};

  seedsArray.forEach((seed, index) => {
    if (index % 2 === 0) {
      seedsObj[seed] = seedsArray[index + 1];
    }
  });

  return seedsObj;
}

function parseMaps(input) {
  return input
    .split(/\n+[a-z\-]+ map:\n/)
    .splice(1)
    .map((x) => x.split(/\n/).map((y) => y.split(" ").map(Number)));
}

function sortAndReverseMaps(maps) {
  return maps.reverse().map((x) => x.sort((a, b) => a[0] - b[0]));
}

function findLowestStart(locations, otherMaps, seedsObj) {
  let lowestStart;
  for (let locationSet of locations) {
    let currentNumber = locationSet[1];
    for (let i = locationSet[1]; i < locationSet[1] + locationSet[2]; i++) {
      currentNumber = i;
      otherMaps.forEach((otherMap) => {
        for (let set of otherMap) {
          if (currentNumber >= set[0] && currentNumber < set[0] + set[2]) {
            currentNumber = set[1] + (currentNumber - set[0]);
            break;
          }
        }
      });
      for (seed of Object.keys(seedsObj)) {
        if (currentNumber >= +seed && currentNumber < +seed + seedsObj[seed]) {
          lowestStart = i - locationSet[1];
          break;
        }
      }
      if (lowestStart >= 0) {
        break;
      }
    }
    if (lowestStart >= 0) {
      break;
    }
  }
  return lowestStart;
}

function main(input) {
  const seedsObj = parseSeeds(input);
  const maps = parseMaps(input);
  const newMaps = sortAndReverseMaps(maps);
  const locations = newMaps[0];
  const otherMaps = newMaps.splice(1);
  return findLowestStart(locations, otherMaps, seedsObj);
}

/** <-------------------- ONLY REQUIRED FOR RECORDING PERFORMANCE --------------------> */
function timestamp() {
    const currentDate = new Date();
    const microseconds = performance.now() * 1000;
    const timestamp = currentDate.getTime() * 1000 + microseconds;
    console.log(`Timestamp recorded: ${timestamp} µs`);
    return timestamp
}

function executionTimes(startMicroseconds, endMicroseconds) {
    const durationMicroseconds = endMicroseconds - startMicroseconds;
    const minutes = Math.floor(durationMicroseconds / 60000000);
    const remainingMicrosecondsAfterMinutes = durationMicroseconds % 60000000;
    const seconds = Math.floor(remainingMicrosecondsAfterMinutes / 1000000);
    const remainingMicrosecondsAfterSeconds = remainingMicrosecondsAfterMinutes % 1000000;
    const milliseconds = Math.floor(remainingMicrosecondsAfterSeconds / 1000);
    const microseconds = remainingMicrosecondsAfterSeconds % 1000;
    const micro = `It took ${durationMicroseconds} µs to compute the solution.`
    const formattedDuration = `That is: ${minutes}:${seconds}:${milliseconds}:${microseconds}`;
    console.log(formattedDuration)
    console.log(micro)
}
/** <-------------------- ONLY REQUIRED FOR RECORDING PERFORMANCE --------------------> */

const start = timestamp() // Uncomment performance stats
console.log({ans : main(inputs)});
const end = timestamp() // Uncomment performance stats
executionTimes(start, end) // Uncomment performance stats