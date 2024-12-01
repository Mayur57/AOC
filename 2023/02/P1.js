const fs = require("fs")

const example = fs.readFileSync("./eg.dat", { encoding: "utf8" }).trim()
const input = fs.readFileSync("./in.dat", { encoding: "utf8" }).trim()

function parse(str) {
  const allGames = []
  const games = str.split("\n")
  games.forEach(game => {
    const gameId = parseInt(game.split(":")[0].split(" ")[1])
    const pulls = game.split(":")[1].split(";")
    let colors = {
      red: [],
      green: [],
      blue: []
    }
    pulls.forEach((pull) => {
      pull.split(",").forEach(col => {
        if (col.includes("red")) colors.red.push(parseInt(col.split(" ").filter(c => c !== "")[0]))
        if (col.includes("blue")) colors.blue.push(parseInt(col.split(" ").filter(c => c !== "")[0]))
        if (col.includes("green")) colors.green.push(parseInt(col.split(" ").filter(c => c !== "")[0]))
      })
    })

    allGames.push({ gameId, colors })
  })
  return allGames
}

function makeFilterList(parsedInput) {
  const blacklist = new Set()
  for (let i = 0; i < parsedInput.length; i++) {
    const { colors, gameId } = parsedInput[i]
    for (let j = 0; j < colors.red.length; j++) {
      if (colors.red[j] > 12) {
        blacklist.add(gameId)
      }
    }
    for (let j = 0; j < colors.blue.length; j++) {
      if (colors.blue[j] > 14) {
        blacklist.add(gameId)
      }
    }
    for (let j = 0; j < colors.green.length; j++) {
      if (colors.green[j] > 13) {
        blacklist.add(gameId)
      }
    }
  }
  return blacklist
}

function main(str) {
  const parsed = parse(str)
  let ans = 0
  let idxs = []
  parsed.forEach((obj) => idxs.push(obj.gameId))
  const discardList = makeFilterList(parsed)
  ans = idxs.filter(idx => !discardList.has(idx)).reduce((acc, val) => acc += val)
  console.log({ ans })
}

main(example) // 2476
main(input) // 2476