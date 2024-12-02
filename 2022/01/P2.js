const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  const blocks = str.split('\n\n')
  const blockCals = []
  blocks.forEach(b => {
    const cals = b.split('\n')
    blockCals.push(cals.reduce((acc, c) => acc + Number(c), 0))
  })

  return blockCals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, c) => acc + c, 0)
}

console.log(main(example))
console.log(main(input))
