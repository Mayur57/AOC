const fs = require('fs')

const example = fs.readFileSync("./eg", { encoding: "utf8" }).trim()
const input = fs.readFileSync("./in", { encoding: "utf8" }).trim()

function processInput(str) {
    const arr = []
    str.split("\n").forEach(l => {
        l.split(":")[1].trim().split(" ")
            .filter(l => l !== "")
            .forEach(num => arr.push(parseInt(num)))
    })
    const time = arr.slice(0, arr.length / 2)
    const dist = arr.slice(arr.length / 2)
    return { time, dist }
}

function main(str) {
    const { time, dist } = processInput(str)
    let ans = 1
    for (let i = 0; i < time.length; i++) {
        const rd = dist[i]
        const rt = time[i]
        let raceWins = 0
        for (let i = 1; i <= rt; i++) {
            const speed = i
            const timeRemaining = rt - i
            const distance = speed * timeRemaining
            if (distance > rd) raceWins++
        }
        ans = ans * raceWins
    }
    return ans
}

console.log("example: ", main(example))
console.log("input: ", main(input))