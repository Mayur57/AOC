const fs = require('fs')

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()
const example2 = fs.readFileSync('eg2.dat', { encoding: 'utf8' }).trim()

function parseInput(str) {
  const [wireSection, gateSection] = str.split('\n\n').map(section => section.trim())

  const wires = {}
  wireSection.split('\n').forEach(line => {
    const [wire, value] = line.split(': ').map(s => s.trim())
    wires[wire] = parseInt(value, 10)
  })

  const gates = []
  gateSection.split('\n').forEach(line => {
    const [inputs, out] = line.split(' -> ').map(s => s.trim())
    const [in1, gate, in2] = inputs.split(' ')
    gates.push({ in1, in2, gate, out })
  })

  return { wires, gates }
}

function logicGate(o1, o2, op) {
  if (op === 'AND') return o1 & o2
  if (op === 'XOR') return o1 ^ o2
  if (op === 'OR') return o1 | o2
}

function makeCircuit({ wires, gates }) {
  const toProcess = [...gates]

  while (toProcess.length > 0) {
    const unprocessed = []
    toProcess.forEach(({ in1, in2, gate, out }) => {
      if (wires[in1] !== undefined && wires[in2] !== undefined) {
        wires[out] = logicGate(wires[in1], wires[in2], gate)
      } else {
        // don't eval when previous inputs not present
        unprocessed.push({ in1, in2, gate, out })
      }
    })

    toProcess.splice(0, toProcess.length)
    toProcess.push(...unprocessed)
  }

  // make and convert the binary number from wires starting with 'z' to base 10
  return parseInt(
    Object.keys(wires)
      .filter(key => key.startsWith('z'))
      .sort((a, b) => parseInt(b.slice(1), 10) - parseInt(a.slice(1), 10))
      .map(key => wires[key] || 0)
      .join(''),
    2
  )
}

function main(str) {
  const { wires, gates } = parseInput(str)
  const result = makeCircuit({ wires, gates })
  return result
}

console.log(main(example), 4)
console.log(main(example2), 2024)
console.log(main(input))
