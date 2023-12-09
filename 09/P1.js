const fs = require("fs")

const example = fs.readFileSync("./eg.dat", { encoding: "utf8" }).trim()
const input = fs.readFileSync("./in.dat", { encoding: "utf8" }).trim()

function main(str) {
    const sequences = str.split("\n").map(line => line.split(" ").filter(f => f !== "").map(num => Number(num)))
    const arr = sequences.map(s => {
        let curr = s
        let all = [curr]
        while (curr.some(e => e !== 0)) {
            let next = []
            for (let i = 0; i < curr.length - 1; i++)
                    next.push(curr[i + 1] - curr[i])
            all.push(next)
            curr = Array.from(next)
        }
        let last = 0
        for (const line of all.reverse()) {
            last = line.at(-1) + last
        }
        return last
    })
    console.log(arr)
    return arr.reduce((acc, val) => acc + val)
}

console.log(main(example))
console.log(main(input))