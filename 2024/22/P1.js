const fs = require('fs')

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()

function generateNextSecret(secret) {
  const MOD = 16777216
  secret = (secret ^ (secret * 64)) % MOD
  let divided = Math.floor(secret / 32)
  secret = (secret ^ divided) % MOD
  secret = (secret ^ (secret * 2048)) % MOD
  secret = secret < 0 ? secret + MOD : secret
  return secret
}

function main(str) {
  const secrets = str.split('\n').filter(f => f !== '')
  let result = 0
  for (let secret of secrets) {
    let ns = secret
    for (let i = 0; i < 2000; i++) {
      ns = generateNextSecret(ns)
    }
    result += ns
  }
  return result
}

console.log(main(example))
console.log(main(input))
