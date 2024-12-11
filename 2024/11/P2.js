const fs = require('fs')

const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  const STEPS = 75
  const initialStones = []

  str.split(' ').forEach(n => initialStones.push(Number(n)))
  const cache = new Map()

  function transform(stone) {
    if (cache.has(stone)) {
      return cache.get(stone)
    }

    let result
    if (stone === 0) {
      result = [1]
    } else {
      const stoneStr = stone.toString()

      if (stoneStr.length % 2 === 0) {
        const mid = stoneStr.length / 2
        const left = parseInt(stoneStr.slice(0, mid), 10)
        const right = parseInt(stoneStr.slice(mid), 10)
        result = [left, right]
      } else {
        result = [stone * 2024]
      }
    }

    cache.set(stone, result)
    return result
  }

  let stoneCounts = new Map()

  for (const stone of initialStones) {
    stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1)
  }

  for (let i = 0; i < STEPS; i++) {
    const newStoneCounts = new Map()

    for (const [stone, count] of stoneCounts.entries()) {
      const transformedStones = transform(stone)

      for (const newStone of transformedStones) {
        newStoneCounts.set(newStone, (newStoneCounts.get(newStone) || 0) + count)
      }
    }

    stoneCounts = newStoneCounts
  }

  return Array.from(stoneCounts.values()).reduce((a, b) => a + b, 0)
}

console.log(main(input))
