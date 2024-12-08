const fs = require('fs')

const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()

// Helper function to check if a point is within map bounds
function isValid(point, width, height) {
  return point.x >= 0 && point.x < width && point.y >= 0 && point.y < height
}

function main(str) {
  const antennas = new Map()
  const rows = str.split('\n').filter(row => row.trim() !== '')

  const height = rows.length
  const width = rows[0].length

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const freq = rows[y][x]
      if (freq !== '.') {
        if (!antennas.has(freq)) {
          antennas.set(freq, [])
        }
        antennas.get(freq).push({ x, y })
      }
    }
  }

  const antinodes = new Set()

  for (const [_, locations] of antennas) {
    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const a1 = locations[i]
        const a2 = locations[j]

        const dx = a2.x - a1.x
        const dy = a2.y - a1.y

        const antinode1 = {
          x: a1.x - dx,
          y: a1.y - dy,
        }
        const antinode2 = {
          x: a2.x + dx,
          y: a2.y + dy,
        }

        if (isValid(antinode1, width, height)) {
          antinodes.add(`${antinode1.x},${antinode1.y}`)
        }
        if (isValid(antinode2, width, height)) {
          antinodes.add(`${antinode2.x},${antinode2.y}`)
        }
      }
    }
  }

  return antinodes.size
}

console.log(main(example), 14)
console.log(main(input))
