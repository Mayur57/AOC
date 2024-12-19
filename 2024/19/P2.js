const fs = require('fs')

const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()

function processInput(raw) {
  const [d, t] = raw.split('\n\n')
  const designs = d.split(', ')
  const towels = t.split('\n')
  return { designs, towels }
}

function waysToDesign(string, designs) {
  const dp = Array(string.length + 1).fill(0)
  dp[0] = 1 // empty string -> constructible

  for (let i = 1; i <= string.length; i++) {
    for (const d of designs) {
      if (i >= d.length && string.slice(i - d.length, i) === d && dp[i - d.length]) {
        dp[i] += dp[i - d.length]
      }
    }
  }

  return dp[string.length]
}

function possibleDesigns(designs, stringsToCheck) {
  let count = 0
  for (const str of stringsToCheck) {
    count += waysToDesign(str, designs)
  }

  return count
}

function main(str) {
  const { designs, towels } = processInput(str)
  const parts = designs
  const stringsToCheck = towels
  return possibleDesigns(parts, stringsToCheck)
}

console.log(main(example), 16)
console.log(main(input))
