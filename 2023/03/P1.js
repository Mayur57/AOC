const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function isDigit(char) {
  return !isNaN(parseInt(char)) && isFinite(char)
}

function indexInput(str) {
  const lines = str.split('\n').filter(l => l !== '')
  const parsed = []
  lines.forEach((line, idx) => {
    let obj = {}
    let i = 0
    obj.lineNumber = idx
    obj.numbers = []
    while (i < line.length) {
      if (isDigit(line[i])) {
        let j = i
        let number = ''
        while (isDigit(line[j])) {
          number += line[j]
          j++
        }
        obj.numbers.push({
          number: parseInt(number),
          start: i,
          end: j - 1,
        })
        i = j
      }
      i++
    }
    parsed.push(obj)
  })
  return parsed
}

function lineCheck(lineset, lineIdx, start, end) {
  const prevLineIdx = lineIdx - 1
  const nextLineIdx = lineIdx + 1
  let isPresentTop = false
  let isPresentBottom = false
  let isPresentSameLine = false
  const startIdx = start - 1 < 0 ? start : start - 1
  const endIdx = end + 1 > lineset[lineIdx].length ? end : end + 1

  if (prevLineIdx >= 0) {
    const checkSubstring = lineset[prevLineIdx].substring(startIdx, endIdx + 1)
    isPresentTop = !/^[0-9.]+$/.test(checkSubstring)
  }

  if (nextLineIdx < lineset.length) {
    const checkSubstring = lineset[nextLineIdx].substring(startIdx, endIdx + 1)
    isPresentBottom = !/^[0-9.]+$/.test(checkSubstring)
  }

  const checkSubstring = lineset[lineIdx].substring(startIdx, endIdx + 1)
  isPresentSameLine = !/^[0-9.]+$/.test(checkSubstring)

  return isPresentBottom || isPresentTop || isPresentSameLine
}

function main(str) {
  const parsed = indexInput(str)
  let ans = 0
  const lineSet = str.split('\n').filter(f => f !== '')
  parsed.forEach(obj => {
    const { lineNumber, numbers } = obj
    numbers.forEach(nobj => {
      const { start, end, number } = nobj
      if (lineCheck(lineSet, lineNumber, start, end)) {
        ans += number
      }
    })
  })
  console.log({ ans })
}

main(input)
