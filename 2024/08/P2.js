const fs = require('fs')

const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()

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

  for (const [freq, locations] of antennas) {
    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const a1 = locations[i]
        const a2 = locations[j]

        const dx = a2.x - a1.x
        const dy = a2.y - a1.y

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            if (isColinear(a1.x, a1.y, a2.x, a2.y, x, y)) {
              antinodes.add(`${x},${y}`)
            }
          }
        }
      }
    }
  }

  return antinodes.size
}

function isColinear(x1, y1, x2, y2, px, py) {
  // MATH YAY BITCH!!!!!!!!!!!!!!!
  // Check if the point (px, py) is collinear with (x1, y1) and (x2, y2)
  // Use cross product to determine collinearity
  const crossProduct = (px - x1) * (y2 - y1) - (py - y1) * (x2 - x1)
  return Math.abs(crossProduct) < 1e-10
}

console.log(main(example), 34)
console.log(main(input))
