const fs = require('fs')
const https = require('https')

function getSession(arg = process.argv[3]) {
  let session

  if (arg) {
    session = arg
    console.info('[INF] Session retrieved from command line argument.')
  } else {
    try {
      const config = JSON.parse(fs.readFileSync('./config.json'))
      session = config.session
      console.info('[INF] Session retrieved from config.json.')
    } catch (e) {
      console.error('[ERR] No config.json found. Create one and add your session cookie.')
      process.exit(1)
    }

    if (!session) {
      console.error('[ERR] Session cookie is missing in config.json.')
      process.exit(1)
    }
  }

  return session
}

function parseDate() {
  const date = process.argv[2]
  let year, day

  if (!date || date === 'today') {
    const now = new Date()
    year = String(now.getFullYear())
    day = String(now.getDate())
    console.info(`[INF] Using current date: ${year}-${day}`)
  } else {
    ;[year, day] = date.split('-')
    console.info(`[INF] Using provided date: ${year}-${day}`)
  }

  return { year, day }
}

function isValidDayAndYear(day, year) {
  const now = new Date()

  const isValid =
    !isNaN(day) &&
    !isNaN(year) &&
    year >= 2015 &&
    year <= now.getFullYear() &&
    day >= 1 &&
    day <= 25 &&
    (year === now.getFullYear() ? day <= now.getDate() : true)

  if (!isValid) {
    console.error('[ERR] Puzzle is yet to unlock or date passed has invalid format.')
  }

  return isValid
}

function fetch(url, headers) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, res => {
        let data = ''
        res.on('data', chunk => (data += chunk))
        res.on('end', () => resolve(data))
      })
      .on('error', reject)
  })
}

async function setupDayDirectory(year, day) {
  const baseDir = `./${year}/${String(day).padStart(2, '0')}`

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true })
    console.info(`[INF] Created directory: ${baseDir}`)
  }

  return baseDir
}

async function fetchAndSaveInput(year, day, baseDir, session) {
  const inputUrl = `https://adventofcode.com/${year}/day/${day}/input`
  console.info(`[INF] Trying to fetch input for ${year} day ${day}...`)
  try {
    const input = await fetch(inputUrl, { Cookie: `session=${session}` })
    fs.writeFileSync(`${baseDir}/in.dat`, input.trim())
    console.info(`[INF] Input fetched and saved: ${baseDir}/in.dat`)
  } catch (err) {
    console.error(`[ERR] Failed to fetch input: ${err.message}`)
    process.exit(1)
  }
}

function createTemplate() {
  return `
const fs = require('fs');

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim();
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim();

function main(str) {
  return str;
}

console.log(main(example));
console.log(main(input));
  `
}

function createJSFiles(baseDir) {
  const formattedTemplate = createTemplate().slice(1)

  if (!fs.existsSync(`${baseDir}/P1.js`)) {
    fs.writeFileSync(`${baseDir}/P1.js`, formattedTemplate)
    console.info(`[INF] Solution template for first part created: ${baseDir}/P1.js`)
  }

  if (!fs.existsSync(`${baseDir}/P2.js`)) {
    fs.writeFileSync(`${baseDir}/P2.js`, formattedTemplate)
    console.info(`[INF] Solution template for second part created: ${baseDir}/P2.js`)
  }
}

async function setup() {
  const session = getSession(process.argv[3])
  const { year, day } = parseDate()

  if (!isValidDayAndYear(day, year)) {
    console.error('[ERR] Invalid year-day format!')
    process.exit(1)
  }

  console.info(`[INF] Setting up ${year} day ${day}...`)

  const baseDir = await setupDayDirectory(year, day)
  await fetchAndSaveInput(year, day, baseDir, session)
  createJSFiles(baseDir)
}

setup()
