const fs = require('fs');

const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim();
const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim();

const buttonConstants = (line) => {
    const [x, y] = line.split(": ")[1].split(", ");
    const a = parseInt(x.split("+")[1]);
    const b = parseInt(y.split("+")[1]);
    return [a, b];
};

const prizeConstants = (line) => {
    const [x, y] = line.split(": ")[1].split(", ");
    const a = parseInt(x.split("=")[1]) + 10000000000000;
    const b = parseInt(y.split("=")[1]) + 10000000000000;
    return [a, b];
};

const calculateX = (constants) => {
    const { a, b, c1, c2, c3, c4 } = constants;
    const determinant = c1 * c4 - c2 * c3;
    if (determinant === 0) {
        throw new Error("The determinant is zero; the system has no unique solution.");
    }
    return (c4 * a - c3 * b) / determinant;
};

const calculateY = (constants) => {
    const { a, b, c1, c2, c3, c4 } = constants;
    const determinant = c1 * c4 - c2 * c3;
    if (determinant === 0) {
        throw new Error("The determinant is zero; the system has no unique solution.");
    }
    return (-c2 * a + c1 * b) / determinant;
};

function calculatePrizeCost(block) {
    const lines = block.split("\n");
    const [c1, c2] = buttonConstants(lines[0]);
    const [c3, c4] = buttonConstants(lines[1]);
    const [a, b] = prizeConstants(lines[2]);

    const pressesForA = calculateX({ c1, c2, c3, c4, a, b });
    const pressesForB = calculateY({ c1, c2, c3, c4, a, b });

    // If the number of steps is not a whole number, then it is not possible to win the prize
    if (pressesForA % 1 !== 0 || pressesForB % 1 !== 0 || pressesForA < 0 || pressesForB < 0) {
        // console.log("Cannot win prize, skipping...");
        return 0;
    }

    return (3 * pressesForA) + pressesForB;
}

function main(str) {
    return str.split("\n\n").reduce((cost, block) => cost + calculatePrizeCost(block), 0);
}

console.log(main(example), 480);
console.log(main(input));
