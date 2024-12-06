const fs = require('fs')

const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()

function main(mapInput) {
  const map = mapInput
    .trim()
    .split('\n')
    .map(row => row.split(''))
  const rows = map.length
  const cols = map[0].length

  // [dy, dx] -> [N, E, S, W]
  const dirVectors = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  let dirIdx = 0

  // Find initial position and direction
  let sx, sy
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if ('^>v<'.includes(map[y][x])) {
        sy = y
        sx = x
        dirIdx = '^>v<'.indexOf(map[y][x])
        map[y][x] = '.'
      }
    }
  }

  const visited = new Set()
  visited.add(`${sy},${sx}`)

  // init current coords as starting coords
  let cy = sy
  let cx = sx

  while (true) {
    const [dy, dx] = dirVectors[dirIdx]
    const ny = cy + dy // next point
    const nx = cx + dx // next point
    const outsideGrid = ny < 0 || ny >= rows || nx < 0 || nx >= cols

    if (outsideGrid) break

    if (map[ny][nx] === '#') {
      dirIdx = (dirIdx + 1) % 4
    } else {
      cy = ny
      cx = nx
      visited.add(`${cy},${cx}`)
    }
  }

  return visited.size
}

console.log(main(example), 41)
console.log(main(input))
