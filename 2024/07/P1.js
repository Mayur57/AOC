const fs = require('fs')

const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()

function main(input) {
    const equations = input.trim().split('\n');
    let totalCalibrationResult = 0;

    for (let equation of equations) {
        const [testValue, numbers] = equation.split(':');
        const target = parseInt(testValue.trim(), 10);
        const numArray = numbers.trim().split(' ').map(Number);

        const dp = Array(numArray.length).fill(null).map(() => new Map());

        dp[0].set(numArray[0], true);

        for (let i = 1; i < numArray.length; i++) {
            for (const [val] of dp[i - 1]) {
                dp[i].set(val + numArray[i], true);

                dp[i].set(val * numArray[i], true);
            }
        }

        // console.log(dp);

        // Check if target is reachable
        if (dp[numArray.length - 1].has(target)) {
            totalCalibrationResult += target;
        }
    }

    return totalCalibrationResult;
}

console.log(main(example), 3749)
console.log(main(input))