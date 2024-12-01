const fs = require('fs')

const example = fs.readFileSync("./eg", { encoding: "utf8" }).trim()
const input = fs.readFileSync("./in", { encoding: "utf8" }).trim()

function main(str) {
    const lines = str.split("\n");
    const cardMap = lines.map(() => 1);
    lines.forEach((card, cardIdx) => {
        const nums = card.split(": ")[1];
        const [wins, given] = nums.split(" | ").map((half) =>
            half.split(" ").filter(s => s !== "").map((n) => Number(n))
        );

        let matchCount = 0;
        given.forEach(n => {
            if (wins.includes(n)) matchCount++;
        });

        if (matchCount > 0) {
            const cardInstances = cardMap[cardIdx];
            const startIdx = cardIdx + 1;
            const endIdx = Math.min(lines.length - 1, cardIdx + matchCount)
            for (let i = startIdx; i <= endIdx; i++) {
                cardMap[i] += cardInstances;
            }
        }
    })

    let ans = cardMap.reduce((acc, count) => (acc += count), 0)
    console.log({ans})
}

main(example)
main(input)