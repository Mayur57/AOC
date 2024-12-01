const fs = require("fs")

const example = fs.readFileSync("./eg.dat", { encoding: "utf8" }).trim()
const input = fs.readFileSync("./in.dat", { encoding: "utf8" }).trim()

function isCharNum(char) {
    return char.charCodeAt(0) > 47 && char.charCodeAt(0) < 58
}

function main(str) {
    let ans = 0
    str.split('\n').forEach(line => {
        // console.log(line)
        let begin = ''
        let end = ''
        for(let i=0; i<line.length; i++) {
            if(isCharNum(line[i])) {
                // console.log(line[i])
                begin = line[i]
                break
            }
        }
        for(let i=0; i<line.length; i++) {
            if(isCharNum(line[line.length - i - 1])) {
                // console.log(line[line.length - i - 1])
                end = line[line.length - i - 1]
                break
            }
        }
        ans += parseInt(begin.concat(end))
    })
    console.log(ans)
}

main(example)
main(input)