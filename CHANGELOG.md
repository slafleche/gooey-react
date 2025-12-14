# Changelog

All notable changes to this fork of `gooey-react` will be documented in this file.

This project is based on the original
[`gooey-react` by Luuk de Vlieger](https://github.com/luukdv/gooey-react).

## Unreleased

- Add React 18 support and keep compatibility with React 16.8+ and 17.
- Introduce per-instance filter IDs in `<Goo>` to avoid SVG filter collisions.
- Replace the Babel-based build with a modern `tsup` + `tsc` pipeline that emits:
  - `dist/index.js` (CJS)
  - `dist/index.mjs` (ESM)
  - `dist-types/index.d.ts` (types)
- Remove Babel from tests; switch Jest to use `@swc/jest`.
- Add a small smoke test that imports `Goo` from the built `dist/` bundle.
- Replace the old Gatsby docs with a new React 18 + Vite docs app:
  - Recreate the original docs content (props, tutorial, examples, browser notes).
  - Consolidate example pages into a single Examples view.
  - Remove stale/broken external example links and keep only live, useful references.
  - Add an interactive playground to tweak `intensity` and `composite`.
- Fix and modernize misc. tooling:
  - Update TypeScript and Jest versions.
  - Upgrade Vite in the docs and clear reported vulnerabilities.
