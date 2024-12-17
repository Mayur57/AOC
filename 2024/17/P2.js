const fs = require('fs')

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()

/* Leaving these notes here as they are crucial for understanding the solution.
---
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
0 adv: ra >> combo(input) => ra
1 bxl: rb ^ input => rb
2 bst: combo(input) % 8 => rb
3 jnz: a !== 0 && i = input - 2
4 bxc: rb ^ rc => rb
5 out: combo(input) % 8 => print
6 bdv: ra >> combo(input) => rb
7 cdv: ra >> combo(input) => rc

2,4,1,3,7,5,0,3,1,4,4,7,5,5,3,0

decompiled program:
2,4 : bst(4) -> ra % 8 => rb
1,3 : bxl(3) -> rb ^ 3 => rb
7,5 : cdv(5) -> ra >> rb => rc
0,3 : adv(3) -> ra >> 3 => ra
1,4 : bxl(4) -> rb ^ 4 => rb
4,7 : bxc(7) -> rb ^ rc => rb
5,5 : out(5) -> print rb % 8 value
3,0 : jnz(0) -> loop from idx 0 till ra == 0

condensed register transformations:
ra -> ra>>3
rb -> XOR(rb, rc, 6)
rc -> ra >> rb

Since the value of register ra is right shifted by 3 bits after each iteration, 
we lose information of three bits i.e. [0-7]. We can check the ra seed value 
for all 2^3 = 8 guesses and shortlist every value (ra * 8 + guess) and check for
the next power of 8 using that possible seed value. Guess is the wrong word since
this isn't a probabilistic solution but I think you get the point.

Since recursive values might get big, consider increasing heap memory using:
`node --max-old-space-size=4096 P2.js`

*/

function runProgram(a, b, c) {
  let out = []
  while (a !== 0n) {
    b = a % 8n
    b = b ^ 3n
    c = a >> b
    a >>= 3n
    b = b ^ 4n
    b ^= c
    out.push(Number(b % 8n))
  }
  return out
}

function getRegisterA(program, ptr, guess) {
  for (let i = 0n; i < 8n; i++) {
    let newGuess = guess * 8n + i
    const computedString = runProgram(newGuess, 0, 0)
      .map(i => i.toString())
      .join(',')
    const givenString = program
      .slice(ptr)
      .map(i => i.toString())
      .join(',')
    if (computedString === givenString) {
      if (ptr === 0) {
        return newGuess
      }
      const remaining = getRegisterA(program, ptr - 1, newGuess)
      if (remaining !== '') return remaining
    }
  }
  return ''
}

function main(str) {
  const [_, p] = str.split('\n\n')
  const chunk = p.split(': ')[1]
  const program = chunk.split(',').map(n => BigInt(n))
  return getRegisterA(program, program.length - 1, 0n)
}

console.log(main(input))
