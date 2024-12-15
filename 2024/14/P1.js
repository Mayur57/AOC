const fs = require('fs')

const example = fs.readFileSync('eg.dat', 'utf8').trim()
const input = fs.readFileSync('in.dat', 'utf8').trim()

function extractVectors(line) {
  const regex = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/
  const match = line.match(regex)

  const px = parseInt(match[1], 10)
  const py = parseInt(match[2], 10)
  const vx = parseInt(match[3], 10)
  const vy = parseInt(match[4], 10)

  return { px, py, vx, vy }
}

// px = vx * t
// py = vy * t

function transformRobots(robotSpecs) {
  const TIME = 100
  const { px, py, vx, vy } = robotSpecs

  const x = (((px + vx * TIME) % 101) + 101) % 101
  const y = (((py + vy * TIME) % 103) + 103) % 103

  return { x, y }
}

function quadrantRobot(transformations) {
  const midX = 50
  const midY = 51
  let Q1 = 0,
    Q2 = 0,
    Q3 = 0,
    Q4 = 0

  for (const { x, y } of transformations) {
    if (x === midX || y === midY) {
      continue
    }

    if (x > midX && y > midY) {
      Q1++ // Top-right
    } else if (x < midX && y > midY) {
      Q2++ // Top-left
    } else if (x < midX && y < midY) {
      Q3++ // Bottom-left
    } else if (x > midX && y < midY) {
      Q4++ // Bottom-right
    }
  }

  return Q1 * Q2 * Q3 * Q4
}

function main(str) {
  return quadrantRobot(str.split('\n').map(line => transformRobots(extractVectors(line))))
}

console.log(main(example)) // Wrong answer for example due to hard coded values. However, works for input
console.log(main(input))
