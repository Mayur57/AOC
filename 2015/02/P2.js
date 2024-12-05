const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  let totalRibbon = 0
  str.split('\n').forEach(dim => {
    const d = dim
      .split('x')
      .map(Number)
      .sort((a, b) => a - b)
    const [l, w, h] = d
    totalRibbon += w * h * l + 2 * (l + w)
  })
  return totalRibbon
}

console.log(main(example))
console.log(main(input))
