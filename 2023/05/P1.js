const fs = require('fs')

const example = fs.readFileSync('./eg', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in', { encoding: 'utf8' }).trim()

function parser(str) {
  const seeds = str
    .replace(/\n/g, '')
    .match(/seeds: ([\d\s]+)/)[1]
    .split(' ')
    .map(x => +x)
  const maps = str
    .split(/\n+[a-z\-]+ map:\n/)
    .splice(1)
    .map(x => x.split(/\n/).map(y => y.split(' ').map(z => +z)))
  return { seeds, maps }
}

function findSeedDestinations(seeds, maps) {
  const final = []
  seeds.forEach(seed => {
    let curr = seed
    maps.forEach(map => {
      for (set of map) {
        if (curr >= set[1] && curr < set[1] + set[2]) {
          curr = set[0] + (curr - set[1])
          break
        }
      }
    })
    final.push(curr)
  })
  return final
}

function main(str) {
  const { seeds, maps } = parser(str)
  const finalSeeds = findSeedDestinations(seeds, maps)
  return Math.min(...finalSeeds)
}

console.log({ example: main(example) })
console.log({ input: main(input) })
