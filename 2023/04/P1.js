const fs = require('fs')

const example = fs.readFileSync('./eg', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in', { encoding: 'utf8' }).trim()

function lineToNumArray(line) {
  const arr = []
  line
    .trim()
    .split(' ')
    .filter(f => f !== '')
    .forEach(s => arr.push(Number(s)))
  return arr
}

function main(str) {
  const parsed = []
  let ans = 0
  str
    .split('\n')
    .filter(f => f !== '')
    .forEach(line => {
      const card = Number(line.split(':')[0].split(' ')[1].trim())
      const winning = lineToNumArray(line.split(':')[1].split('|')[0])
      const given = lineToNumArray(line.split(':')[1].split('|')[1])
      parsed.push({ card, winning, given })
    })

  parsed.forEach(cardObj => {
    const { winning, given } = cardObj
    const m = new Map()
    winning.forEach(num => {
      const freq = given.indexOf(num) !== -1
      freq && m.set(num, freq)
    })
    ans += m.size && Math.pow(2, m.size - 1)
  })
  console.log({ ans })
}

main(example)
main(input)
