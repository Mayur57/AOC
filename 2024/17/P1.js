const fs = require('fs')

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()

/*
calculating combo operands: combo(a)
0 -> 0
1 -> 1
2 -> 2
3 -> 3
4 -> ra
5 -> rb
6 -> rc
7 -> invalid

summary of operations:
0 adv: ra / pow(2, combo(input)) => ra
1 bxl: XOR(rb, input) => rb
2 bst: combo(input) % 8 => rb
3 jnz: a !== 0 && i = input - 2
4 bxc: XOR(rb, rc) => rb
5 out: combo(input) % 8 => print
6 bdv: ra / pow(2, combo(input)) => rb
7 cdv: ra / pow(2, combo(input)) => rc
*/

function main(str) {
  const [registers, p] = str.split('\n\n')
  let [ra, rb, rc] = registers.split('\n').map(r => Number(r.split(': ')[1]))
  const chunk = p.split(': ')[1]
  const program = chunk.split(',').map(n => Number(n))

  const combo = operand => {
    if (operand >= 0 && operand <= 3) return operand
    if (operand === 4) return ra
    if (operand === 5) return rb
    if (operand === 6) return rc
    if (operand === 7) throw new Error('check input')
  }

  let out = ''
  for (let i = 0; i < program.length; i += 2) {
    let operand = program[i + 1]
    switch (program[i]) {
      case 0:
        ra >>= combo(operand)
        break

      case 1:
        rb ^= operand
        break

      case 2:
        rb = combo(operand) % 8
        break

      case 3:
        if (ra !== 0 && operand < program.length) {
          i = operand - 2
          continue
        }
        break

      case 4:
        rb ^= rc
        break

      case 5:
        out += (combo(operand) % 8) + ','
        break

      case 6:
        rb = ra >> combo(operand)
        break

      case 7:
        rc = ra >> combo(operand)
        break

      default:
        console.log(`invalid opcode: ${program[i]}`)
        break
    }
  }

  return out.slice(0, -1)
}

console.log(main(example), main(example) === '4,6,3,5,6,3,5,2,1,0' ? 'CORRECT' : 'ERROR')
console.log(main(input))
