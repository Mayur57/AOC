const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  const [rulesSection, updatesSection] = str.trim().split('\n\n')
  const rules = rulesSection.split('\n').map(rule => rule.split('|').map(Number))
  const updates = updatesSection.split('\n').map(update => update.split(',').map(Number))

  const orderMap = new Map()
  rules.forEach(([before, after]) => {
    if (!orderMap.has(before)) orderMap.set(before, new Set())
    orderMap.get(before).add(after)
  })

  function isValidOrder(update) {
    const indexMap = new Map()
    update.forEach((page, index) => indexMap.set(page, index))

    for (let [before, after] of rules) {
      if (indexMap.has(before) && indexMap.has(after)) {
        if (indexMap.get(before) > indexMap.get(after)) {
          return false
        }
      }
    }
    return true
  }

  let totalSum = 0
  updates.forEach(update => {
    if (isValidOrder(update)) {
      const middleIndex = Math.floor(update.length / 2)
      totalSum += update[middleIndex]
    }
  })

  return totalSum
}

console.log(main(example), 143)
console.log(main(input))
