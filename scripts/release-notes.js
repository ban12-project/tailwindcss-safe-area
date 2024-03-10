// Given a version, figure out what the release notes are so that we can use this to pre-fill the
// relase notes on a GitHub release for the current version.

import path from 'path'
import fs from 'fs'

const version =
  process.argv[2] || process.env.npm_package_version || require('../package.json').version

const dirname = path.dirname(new URL(import.meta.url).pathname);
const changelog = fs.readFileSync(path.resolve(dirname, '..', 'CHANGELOG.md'), 'utf8')
const match = new RegExp(
  `## \\[${version}\\] - (.*)\\n\\n([\\s\\S]*?)\\n(?:(?:##\\s)|(?:\\[))`,
  'g'
).exec(changelog)

if (match) {
  const [, date, notes] = match
  console.log(notes.trim())
} else {
  console.log(`Placeholder release notes for version: v${version}`)
}
