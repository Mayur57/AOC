const fs = require("fs")

const example = fs.readFileSync("eg.txt", { encoding: "utf8" }).trim()
const input = fs.readFileSync("in.txt", { encoding: "utf8" }).trim()

function parser(str) {
    const lines = str.split("\n").filter(f => f !== "")
    const path = lines[0]
    const groups = lines.slice(1)
    const nodes = {}
    groups.forEach(s => {
        const parent = s.split(" = ")[0]
        const temp = s.split(" = ")[1].replace(/[()]/g, "")
        const children = temp.split(", ")
        nodes[parent] = children
    })
    
    return {path, nodes}
}

const dirc = letter => letter === "L" ? 0 : 1 

function walk(walk, nodes) {
    let lookup = 'AAA'
    let inc = 0
    while(1) {
        lookup = nodes[lookup][dirc(walk.charAt(inc % walk.length))]
        if(lookup === "ZZZ"){
            break
        }
        inc++
    }
    return inc + 1
}

function main(str) {
    const {path, nodes} = parser(str)
    return walk(path, nodes)
}

console.log(main(input)) 