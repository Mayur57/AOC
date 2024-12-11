const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  let stones = str.split(' ')
  for (let i = 0; i < 25; i++) {
    let newStones = []
    for (let j = 0; j < stones.length; j++) {
      if (Number(stones[j]) === 0) {
        newStones.push('1')
      } else if (stones[j].length % 2 === 0) {
        const first = Number(stones[j].substring(0, stones[j].length / 2)).toString()
        const second = Number(stones[j].substring(stones[j].length / 2)).toString()
        newStones.push(first)
        newStones.push(second)
      } else {
        newStones.push((Number(stones[j]) * 2024).toString())
      }
    }
    // i < 6 && console.log(newStones)
    stones = newStones
  }
  return stones.length
}

console.log(main(example), 55312)
console.log(main(input))
