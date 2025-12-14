import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import readline from 'node:readline'

const runStep = (label, command, args, options = {}) => {
  console.log(`\n> ${label}`)
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    ...options,
  })
  if (result.status !== 0) {
    console.error(`\n✖ ${label} failed (exit code ${result.status ?? 1})`)
    process.exit(result.status ?? 1)
  }
}

const semverParts = (version) =>
  String(version)
    .split('-')[0]
    .split('.')
    .map((part) => Number.parseInt(part, 10) || 0)

const bumpSemver = (current, bumpType) => {
  const [major, minor, patch] = semverParts(current)
  if (bumpType === 'patch') return `${major}.${minor}.${patch + 1}`
  if (bumpType === 'minor') return `${major}.${minor + 1}.0`
  if (bumpType === 'major') return `${major + 1}.0.0`
  return current
}

const prompt = (question, defaultValue = '') =>
  new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    const suffix = defaultValue ? ` [${defaultValue}]` : ''
    rl.question(`${question}${suffix} `, (answer) => {
      rl.close()
      const normalized = answer.trim()
      resolve(normalized || defaultValue)
    })
  })

const readPackageVersion = () => {
  const raw = readFileSync('package.json', 'utf8')
  const pkg = JSON.parse(raw)
  return pkg.version
}

const ensureNpmLogin = () => {
  const result = spawnSync('npm', ['whoami'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
  })

  if (result.status !== 0) {
    console.error(
      '\n✖ Unable to determine npm user (`npm whoami` failed). ' +
        'You are likely not logged in or your auth token has expired.\n' +
        '  Run `npm login` to authenticate, then re-run this release script.',
    )
    process.exit(result.status ?? 1)
  }
}

const main = async () => {
  const isDryRun = process.argv.slice(2).includes('--dry-run')

  // 1) Root checks: types, tests, build
  runStep('Type-checking library (npm run ts)', 'npm', ['run', 'ts'])
  runStep('Running library tests (npm test)', 'npm', ['test'])
  runStep('Building library (npm run build)', 'npm', ['run', 'build'])

  // 2) Docs build
  runStep('Building docs (cd docs && npm run build)', 'npm', ['run', 'build'], {
    cwd: 'docs',
  })

  // 3) Version bump
  const currentVersion = readPackageVersion()
  console.log(`\nCurrent version: ${currentVersion}`)

  let bumpType = ''
  while (!bumpType) {
    const choice = await prompt(
      'Select version bump: (p)atch / (m)inor / (M)ajor',
      'p',
    )
    const normalized = choice.toLowerCase()
    if (normalized === 'p' || normalized === 'patch') {
      bumpType = 'patch'
    } else if (normalized === 'm' || normalized === 'minor') {
      bumpType = 'minor'
    } else if (normalized === 'major') {
      bumpType = 'major'
    } else {
      console.log(
        'Unrecognized choice. Please enter "p", "m", "major", or press Enter for patch.',
      )
    }
  }

  const simulatedNewVersion = bumpSemver(currentVersion, bumpType)

  if (isDryRun) {
    console.log(
      `\nDry run: would bump version ${currentVersion} -> ${simulatedNewVersion} (${bumpType}).`,
    )
    console.log('No changes were made.')
    process.exit(0)
  }

  const confirm = await prompt(
    `Bump version ${currentVersion} -> ${simulatedNewVersion}? (y/N)`,
    'n',
  )
  if (!/^y(es)?$/i.test(confirm)) {
    console.log('Aborting version bump.')
    process.exit(0)
  }

  runStep(`Bumping version (${bumpType})`, 'npm', ['version', bumpType])

  const newVersion = readPackageVersion()
  console.log(`\n✓ Version updated: ${currentVersion} -> ${newVersion}`)

  // Ensure the user is logged in before attempting npm publish
  ensureNpmLogin()

  const publishConfirm = await prompt(
    `Publish version ${newVersion} to npm now? (y/N)`,
    'n',
  )
  if (!/^y(es)?$/i.test(publishConfirm)) {
    console.log(
      `Skipping npm publish for ${newVersion}. You can run "npm publish" manually later if desired.`,
    )
    process.exit(0)
  }

  runStep(`Publishing ${newVersion} to npm`, 'npm', ['publish'])
  console.log(`\n✓ Published ${newVersion} to npm.`)
}

main().catch((error) => {
  console.error('Unexpected release script error:', error)
  process.exit(1)
})
