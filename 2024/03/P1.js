const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  let ans = 0
  const matches = str.match(/mul\(\d{1,3},\d{1,3}\)/g)
  matches.forEach(m => {
    const [p1, p2] = m.split(',')
    ans += Number(p1.replace('mul(', '')) * Number(p2.replace(')', ''))
  })
  return ans
}

console.log(main(example), 161)
console.log(main(input), 184122457)
