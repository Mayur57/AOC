const fs = require('fs')

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()

function lockHeights(grid) {
  const lines = grid.split('\n').slice(1)
  const heights = Array(lines[0].length).fill(0)
  for (let line of lines) {
    for (let pos = 0; pos < line.length; pos++) {
      if (line[pos] === '#') heights[pos]++
    }
  }
  return heights
}

function keyHeights(grid) {
  const lines = grid.split('\n')
  const heights = Array(lines[0].length).fill(lines.length)
  for (let line of lines) {
    for (let pos = 0; pos < line.length; pos++) {
      if (line[pos] === '.') heights[pos]--
    }
  }
  return heights
}

function isFit(lh, kh) {
  for (let i = 0; i < lh.length; i++) if (lh[i] + kh[i] >= 7) return 0
  return 1
}

function main(str) {
  const grids = str.split('\n\n')
  const locks = []
  const keys = []
  let ans = 0

  for (const grid of grids) {
    if (grid.startsWith('####')) locks.push(grid)
    else keys.push(grid)
  }

  const _lockHeights = locks.map(lockHeights)
  const _keyHeights = keys.map(keyHeights)
  const gridHeight = locks[0].split('\n').length

  for (let i = 0; i < _lockHeights.length; i++) {
    for (let j = 0; j < _keyHeights.length; j++) {
      ans += isFit(_lockHeights[i], _keyHeights[j], gridHeight)
    }
  }

  return ans
}

console.log(main(example))
console.log(main(input))
