const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  let ans = 0
  const doSplits = str.split('do()')
  const validMulStrings = []
  const validMuls = []
  const regex = /mul\(\d{1,3},\d{1,3}\)/g

  doSplits.forEach(d => validMulStrings.push(d.split("don't()")[0]))
  validMulStrings.forEach(mvs => validMuls.push(...mvs.match(regex)))
  validMuls.forEach(vm => {
    const [p1, p2] = vm.split(',')
    ans += Number(p1.replace('mul(', '')) * Number(p2.replace(')', ''))
  })

  return ans
}

console.log(main(example), 48)
console.log(main(input), 107862689)
