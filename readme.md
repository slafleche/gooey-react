<p align="center">
  <img alt="Preview" src="docs/static/preview.gif" height="260" width="260">
</p>
<p align="center">
<h1 align="center">The gooey effect for React</h1>
</p>
The 'gooey effect' has been made popular by various (amazing) blogposts over the years. This tiny component makes it easy to use within React, and has improved the implementation. It's optimized to be as sharp/crisp as possible, since existing implementations can be a bit blurry. Safari support (which can be notorious, and is usually missing) has been added as well.

> This fork is based on the original
> [`gooey-react` by Luuk de Vlieger](https://github.com/luukdv/gooey-react).
> It keeps the same API and effect, but updates the library, build, tests, and
> docs to work cleanly with React 18 and modern tooling. The new docs are
> simpler visually than the original Gatsby site, but are meant to be a
> straightforward, up‑to‑date reference.

## Installation (~0.5 KB)
```sh
npm install @slafleche/gooey-react
```

## Usage
```jsx
import Goo from '@slafleche/gooey-react'

<Goo> … </Goo>
```
You can put regular HTML elements inside `Goo`, but using an SVG is recommended for better browser support. Shape blobbing will be applied to everything within the component.

Original documentation for the upstream project is still available at  
[https://gooey-react.netlify.app/](https://gooey-react.netlify.app/) (for historical reference).  
This fork includes its own up-to-date docs under `docs/`:

- `cd docs && npm install && npm run dev` – local docs
- `cd docs && npm run build` – production build for deployment
