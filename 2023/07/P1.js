const fs = require('fs')

const example = fs.readFileSync('eg', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('in', { encoding: 'utf8' }).trim()

const valueMap = {
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
}

function calcPriority(counts) {
  if (Object.keys(counts).length == 1) return 6
  if (Object.keys(counts).length == 2) {
    let values = Object.values(counts)
    if (values.includes(4)) return 5
    if (values.includes(3)) return 4
  }
  if (Object.keys(counts).length == 3) {
    let values = Object.values(counts)
    if (values.includes(3)) return 3
    if (values.includes(2)) return 2
  }
  if (Object.keys(counts).length == 4) return 1
  return 0
}

function calcScore(line) {
  return (
    line[3] * 10000000000 +
    line[0][0] * 100000000 +
    line[0][1] * 1000000 +
    line[0][2] * 10000 +
    line[0][3] * 100 +
    line[0][4]
  )
}

function parser(line) {
  const values = line[0].split('').map(v => valueMap[v] || parseInt(v))
  const count = parseInt(line[1])
  const counts = values.reduce((counts, v) => {
    counts[v] = (counts[v] || 0) + 1
    return counts
  }, {})
  const priority = calcPriority(counts)
  const score = calcScore([values, count, counts, priority])
  return [score, count]
}

function main(str) {
  const lines = str.split('\n').filter(line => line !== '')
  const parsed = lines.map(line => line.split(' ')).map(parser)
  const sorted = parsed.sort((a, b) => a[0] - b[0])
  const ans = sorted.reduce((score, line, idx) => score + line[1] * (idx + 1), 0)
  return ans
}

console.log(main(example))
console.log(main(input))
