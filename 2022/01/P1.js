const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  const blocks = str.split('\n\n')
  let ans = 0
  blocks.forEach(b => {
    const cals = b.split('\n')
    const newCals = cals.reduce((acc, c) => acc + Number(c), 0)
    ans = newCals > ans ? newCals : ans
  })

  return ans
}

console.log(main(example))
console.log(main(input))
