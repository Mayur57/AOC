const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function parse(str) {
  const allGames = []
  const games = str.split('\n')
  games.forEach(game => {
    const gameId = parseInt(game.split(':')[0].split(' ')[1])
    const pulls = game.split(':')[1].split(';')
    let colors = {
      red: [],
      green: [],
      blue: [],
    }
    pulls.forEach(pull => {
      pull.split(',').forEach(col => {
        if (col.includes('red')) colors.red.push(parseInt(col.split(' ').filter(c => c !== '')[0]))
        if (col.includes('blue'))
          colors.blue.push(parseInt(col.split(' ').filter(c => c !== '')[0]))
        if (col.includes('green'))
          colors.green.push(parseInt(col.split(' ').filter(c => c !== '')[0]))
      })
    })

    allGames.push({ gameId, colors })
  })
  return allGames
}

function main(str) {
  const parsed = parse(str)
  let ans = 0
  parsed.forEach(obj => {
    const { red, green, blue } = obj.colors
    const val = Math.max(...red) * Math.max(...green) * Math.max(...blue)
    ans += val
  })
  console.log({ ans })
}

main(example)
main(input) // 2476
