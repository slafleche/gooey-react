# Releasing @slafleche/gooey-react

This document describes how to cut a new version of
`@slafleche/gooey-react` and publish it to npm using the lightweight
local release script.

## Prerequisites

- Your local clone is on the branch you want to release from (typically
  `master`) and is up to date with GitHub.
- You are logged in to npm with an account that has permission to publish
  this package name (`npm whoami` should work).
- If your npm account uses 2FA, be ready to enter your OTP during
  `npm publish`.

## Release flow (local, scripted)

Releases should normally be driven via the `release` script rather than
calling `npm publish` directly, so that both the library and docs builds
are exercised consistently.

From the project root:

1. (Optional) Run a dry run to see what will happen without making changes:

   ```sh
   npm run release:dry
   ```

2. When you are ready for a real release, run:

   ```sh
   npm run release
   ```

3. The script will:

   - Type-check the library (`npm run ts`).
   - Run the Jest test suite (`npm test`), including the dist smoke test.
   - Build the library (`npm run build`) to produce:
     - `dist/index.js` (CJS)
     - `dist/index.mjs` (ESM)
     - `dist-types/index.d.ts` (types)
   - Build the docs (`cd docs && npm run build`) to ensure the docs app
     still compiles for production.
   - Read the current version from `package.json` and show it.
   - Prompt you to choose the version bump:

     - `p` / `patch`
     - `m` / `minor`
     - `M` / `major`

   - In dry-run mode:

     - Print the version it *would* bump to and exit without changing
       anything.

   - In normal mode:

     - Ask for confirmation to bump (e.g. `1.1.0 -> 1.1.1`).
     - If you confirm, run `npm version <type>` to update `package.json`
       (and create a tag if git is configured normally).
     - Print the new version and a reminder of next steps.

4. After the script completes successfully:

   - Review and commit the version bump (and changelog entry, if you
     update `CHANGELOG.md`).
   - Push your changes and tag as you normally would.
   - Publish to npm:

     ```sh
     npm publish
     ```

   - The `prepublishOnly` hook is configured to run tests and build again
     before the publish actually proceeds:

     ```json
     "prepublishOnly": "npm test && npm run build"
     ```

## Notes

- The release script does **not** enforce a specific branch or check remote
  npm versions; it is intentionally lightweight. You remain in control of:

  - Which branch you release from.
  - When to push tags.
  - When to run `npm publish`.

- The docs build is treated as a first-class check. If the docs fail to
  build, the release script will abort, and the version will not be bumped.
