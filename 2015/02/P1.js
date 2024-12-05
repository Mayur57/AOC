const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  let totalPaper = 0
  str.split('\n').forEach(dim => {
    const d = dim
      .split('x')
      .map(Number)
      .sort((a, b) => a - b)
    const [l, w, h] = d
    totalPaper += 3 * l * w + 2 * w * h + 2 * h * l
  })
  return totalPaper
}

console.log(main(example))
console.log(main(input))
