import React, { useEffect, useState } from 'react'
import Goo from '@lafleche/gooey-react'

type PageId =
  | 'home'
  | 'props'
  | 'prop-intensity'
  | 'prop-composite'
  | 'prop-id'
  | 'prop-classname-style'
  | 'tutorial'
  | 'examples'
  | 'browser-support'
  | 'considerations'

type Intensity = 'weak' | 'medium' | 'strong'

const pageToSlug: Record<PageId, string> = {
  home: '',
  props: 'properties',
  'prop-intensity': 'properties/intensity',
  'prop-composite': 'properties/composite',
  'prop-id': 'properties/id',
  'prop-classname-style': 'properties/classname-style',
  tutorial: 'tutorial',
  examples: 'examples',
  'browser-support': 'browser-support',
  considerations: 'considerations',
}

function getPageFromLocation(): PageId {
  if (typeof window === 'undefined') return 'home'

  const raw = window.location.hash.replace(/^#\/?/, '')

  switch (raw) {
    case '':
    case 'home':
      return 'home'
    case 'properties':
      return 'props'
    case 'properties/intensity':
      return 'prop-intensity'
    case 'properties/composite':
      return 'prop-composite'
    case 'properties/id':
      return 'prop-id'
    case 'properties/classname-style':
      return 'prop-classname-style'
    case 'tutorial':
      return 'tutorial'
    case 'examples':
      return 'examples'
    case 'browser-support':
      return 'browser-support'
    case 'considerations':
      return 'considerations'
    default:
      return 'home'
  }
}

export default function App() {
  const [page, setPage] = useState<PageId>(() => getPageFromLocation())

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromLocation())
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (nextPage: PageId) => {
    setPage(nextPage)

    const slug = pageToSlug[nextPage]
    window.location.hash = slug ? `#/${slug}` : '#/'
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        backgroundColor: '#020617',
        color: '#e5e7eb',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(148,163,184,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>gooey-react</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            The gooey effect for React
          </div>
        </div>
        <nav style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem' }}>
          <NavLink label="Home" active={page === 'home'} onClick={() => navigate('home')} />
          <NavLink
            label="Props"
            active={
              page === 'props' ||
              page === 'prop-intensity' ||
              page === 'prop-composite' ||
              page === 'prop-id' ||
              page === 'prop-classname-style'
            }
            onClick={() => navigate('props')}
          />
          <NavLink
            label="Tutorial"
            active={page === 'tutorial'}
            onClick={() => navigate('tutorial')}
          />
          <NavLink
            label="Examples"
            active={page === 'examples'}
            onClick={() => navigate('examples')}
          />
          <NavLink
            label="Browser support"
            active={page === 'browser-support'}
            onClick={() => navigate('browser-support')}
          />
          <NavLink
            label="Considerations"
            active={page === 'considerations'}
            onClick={() => navigate('considerations')}
          />
        </nav>
      </header>

      <main
        style={{
          padding: '2rem 1.5rem 3rem',
          maxWidth: 960,
          width: '100%',
          margin: '0 auto',
          flex: 1,
        }}
      >
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'props' && <PropsOverview onNavigate={navigate} />}
        {page === 'prop-intensity' && <PropIntensity onNavigate={navigate} />}
        {page === 'prop-composite' && <PropComposite onNavigate={navigate} />}
        {page === 'prop-id' && <PropId onNavigate={navigate} />}
        {page === 'prop-classname-style' && <PropClassNameStyle onNavigate={navigate} />}
        {page === 'tutorial' && <TutorialPage onNavigate={navigate} />}
        {page === 'examples' && <ExamplesPage onNavigate={navigate} />}
        {page === 'browser-support' && <BrowserSupportPage onNavigate={navigate} />}
        {page === 'considerations' && <ConsiderationsPage onNavigate={navigate} />}
      </main>
    </div>
  )
}

function NavLink({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '0.25rem 0.5rem',
        borderRadius: 4,
        color: active ? '#e5e7eb' : 'rgba(148,163,184,0.9)',
        fontWeight: active ? 600 : 400,
      }}
    >
      {label}
    </button>
  )
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre
      style={{
        backgroundColor: '#020617',
        borderRadius: 6,
        padding: '0.75rem 1rem',
        fontSize: '0.85rem',
        overflowX: 'auto',
        border: '1px solid rgba(51,65,85,0.9)',
      }}
    >
      <code>{children}</code>
    </pre>
  )
}

function HomePage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <HeroExample />
      </div>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
        The gooey effect for React
      </h1>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        The &quot;gooey effect&quot; has been made popular by various (amazing) blog
        posts over the years. This tiny component makes it easy to use within
        React, and has improved the implementation. It&apos;s optimized to be as
        sharp/crisp as possible, since existing implementations can be a bit
        blurry. Safari support (which can be notorious, and is usually missing)
        has been added as well.
      </p>

      <h2 style={{ fontSize: '1.125rem', margin: '1.5rem 0 0.5rem' }}>
        Installation (±0.5 KB)
      </h2>
      <CodeBlock>npm install @lafleche/gooey-react</CodeBlock>

      <h2 style={{ fontSize: '1.125rem', margin: '1.5rem 0 0.5rem' }}>Usage</h2>
      <CodeBlock>
        <span>import Goo from &apos;@lafleche/gooey-react&apos;</span>
        {'\n'}
        {'\n'}
        {'<'}Goo{`>\n  <svg>\n    <circle />\n    <circle />\n  </svg>\n</`}Goo{'>'}
      </CodeBlock>

      <p style={{ marginTop: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        You can put regular HTML elements inside <code>Goo</code>, but using an
        SVG is recommended for better browser support. Shape blobbing will be
        applied to everything within the component.
      </p>

      <Pagination
        onNavigate={onNavigate}
        next={{ page: 'prop-intensity', label: 'Prop: intensity' }}
      />
    </>
  )
}

function PropsOverview({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Properties</h1>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        The <code>Goo</code> component has a few simple props available for
        fine-tuning the visual outcome of the filter.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <SmallButton onClick={() => onNavigate('prop-intensity')}>intensity</SmallButton>
        <SmallButton onClick={() => onNavigate('prop-composite')}>composite</SmallButton>
        <SmallButton onClick={() => onNavigate('prop-id')}>id</SmallButton>
        <SmallButton onClick={() => onNavigate('prop-classname-style')}>
          className
        </SmallButton>
        <SmallButton onClick={() => onNavigate('prop-classname-style')}>style</SmallButton>
      </div>

      <Pagination
        onNavigate={onNavigate}
        prev={{ page: 'home', label: 'Home' }}
        next={{ page: 'prop-intensity', label: 'Prop: intensity' }}
      />
    </>
  )
}

function SmallButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '0.35rem 0.7rem',
        borderRadius: 999,
        border: '1px solid rgba(148,163,184,0.6)',
        background: 'transparent',
        color: '#e5e7eb',
        fontSize: '0.85rem',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

function PropIntensity({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Prop: intensity</h1>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        You can use <code>intensity</code> to control how strong the gooey effect
        is applied. It has three possible values: <code>weak</code>,{' '}
        <code>medium</code> (which is the default) and <code>strong</code>.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <IntensityPreview intensity="weak" label="weak" />
        <IntensityPreview intensity="strong" label="strong" />
      </div>

      <Pagination
        onNavigate={onNavigate}
        prev={{ page: 'home', label: 'Home' }}
        next={{ page: 'prop-composite', label: 'Prop: composite' }}
      />
    </>
  )
}

function IntensityPreview({ intensity, label }: { intensity: Intensity; label: string }) {
  return (
    <div>
      <CodeBlock>
        {'<'}Goo intensity=&quot;{label}&quot;{`>\n  ...\n</`}Goo{'>'}
      </CodeBlock>
      <div style={{ marginTop: '0.75rem' }}>
        <Goo intensity={intensity} id={label}>
          <svg
            role="img"
            aria-label="Example of a gooey effect"
            width="220"
            height="220"
          >
            <g style={{ animation: 'sway 3s ease-in-out infinite alternate' as any }}>
              <circle
                cx="45%"
                cy="30%"
                r="30"
                fill="lightcoral"
                style={{
                  animation: 'drop 1.5s ease-in -0.75s infinite alternate',
                }}
              />
              <circle cx="65%" cy="52.5%" r="24" fill="salmon" />
              <circle cx="45%" cy="30%" r="48" fill="lightsalmon" />
            </g>
          </svg>
        </Goo>
      </div>
    </div>
  )
}

function PropComposite({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Prop: composite</h1>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        By default, the effect is applied to everything within the component.
        With this approach, the goo is at its most effective: both shapes and
        colors will merge together. However, certain things (like sharp edges)
        will end up being morphed or invisible.
      </p>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        There are two ways to solve this problem. The recommended way is to
        simply move those elements outside of the component and place them on
        top. In some cases, this isn&apos;t practical. The <code>composite</code>{' '}
        property can be used as an alternative. It will essentially duplicate
        everything inside the component, and place it on top without
        alterations.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '1rem',
        }}
      >
        <CompositeCirclesPreview composite={false} label="composite={false}" />
        <CompositeCirclesPreview composite={true} label="composite" />
      </div>
      <p style={{ maxWidth: 640, lineHeight: 1.6 }}>
        As you can see, colors will not blend when you apply a composite.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          margin: '1.5rem 0 1rem',
        }}
      >
        <CompositeRectanglePreview composite={false} label="composite={false}" />
        <CompositeRectanglePreview composite={true} label="composite" />
      </div>
      <p style={{ maxWidth: 640, lineHeight: 1.6 }}>
        On the other hand, a rectangle will still render as expected. As noted,
        this can also be achieved by moving the rectangle outside of the
        component and placing it on top manually.
      </p>
      <Pagination
        onNavigate={onNavigate}
        prev={{ page: 'prop-intensity', label: 'Prop: intensity' }}
        next={{ page: 'prop-id', label: 'Prop: id' }}
      />
    </>
  )
}

function CompositeCirclesPreview({
  composite,
  label,
}: {
  composite: boolean
  label: string
}) {
  return (
    <div>
      <CodeBlock>
        {'<'}Goo {label}
        {`>\n  ...\n</`}Goo{'>'}
      </CodeBlock>
      <div style={{ marginTop: '0.75rem' }}>
        <Goo composite={composite} intensity="strong">
          <svg width="220" height="220">
            <circle cx="34.3%" cy="50%" r="40" fill="lightcoral" />
            <circle cx="65.7%" cy="50%" r="40" fill="lightskyblue" />
          </svg>
        </Goo>
      </div>
    </div>
  )
}

function CompositeRectanglePreview({
  composite,
  label,
}: {
  composite: boolean
  label: string
}) {
  return (
    <div>
      <CodeBlock>
        {'<'}Goo {label}
        {`>\n  ...\n</`}Goo{'>'}
      </CodeBlock>
      <div style={{ marginTop: '0.75rem' }}>
        <Goo composite={composite}>
          <svg
            role="img"
            aria-label="Example of a gooey effect"
            width="220"
            height="220"
          >
            <g>
              <circle
                cx="50%"
                cy="60%"
                r="24"
                fill="mediumturquoise"
                style={{
                  animation: 'rise 1.5s ease-in-out infinite alternate',
                }}
              />
              <rect
                x="20%"
                y="47.5%"
                width="60%"
                height="25%"
                fill="mediumturquoise"
              />
            </g>
          </svg>
        </Goo>
      </div>
    </div>
  )
}

function PropId({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Prop: id</h1>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        If you want to render multiple <code>Goo</code> components with different
        values for <code>intensity</code> and/or <code>composite</code>, a unique
        identifier should be supplied to every additional instance.
      </p>

      <CodeBlock>
        {`<Goo intensity="weak">
  ...
</Goo>

<Goo id="second" intensity="strong">
  ...
</Goo>`}
      </CodeBlock>
      <p style={{ margin: '1rem 0', maxWidth: 640, lineHeight: 1.6 }}>
        A different <code>id</code> is passed to the second instance.
      </p>

      <CodeBlock>
        {`<Goo intensity="strong">
  ...
</Goo>

<Goo intensity="strong">
  ...
</Goo>`}
      </CodeBlock>
      <CodeBlock>
        {`<Goo>
  ...
</Goo>

<Goo>
  ...
</Goo>`}
      </CodeBlock>
      <p style={{ marginTop: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        In the two examples above, passing an <code>id</code> is not necessary
        since the underlying filter will be the same.
      </p>

      <Pagination
        onNavigate={onNavigate}
        prev={{ page: 'prop-composite', label: 'Prop: composite' }}
        next={{ page: 'prop-classname-style', label: 'Props: className & style' }}
      />
    </>
  )
}

function PropClassNameStyle({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>
        Props: className &amp; style
      </h1>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        You can forward a <code>className</code> and/or <code>style</code>{' '}
        property to the component, which will be applied to the top-level
        element.
      </p>

      <CodeBlock>
        {`<Goo className="mt-8">
  ...
</Goo>

<Goo style={{ marginTop: '2rem' }}>
  ...
</Goo>`}
      </CodeBlock>

      <Pagination
        onNavigate={onNavigate}
        prev={{ page: 'prop-id', label: 'Prop: id' }}
        next={{ page: 'tutorial', label: 'Tutorial' }}
      />
    </>
  )
}

function TutorialPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Tutorial</h1>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        Let&apos;s create something simple to show how this library can be used.
        First, install the dependency with NPM or Yarn.
      </p>

      <CodeBlock>npm install @lafleche/gooey-react</CodeBlock>

      <p style={{ margin: '1rem 0', maxWidth: 640, lineHeight: 1.6 }}>
        Next, we&apos;ll add some elements inside the component. You can use
        regular HTML elements (like a <code>div</code>), but an SVG is used here
        for optimal browser support.
      </p>

      <CodeBlock>
        <span>import Goo from &apos;@lafleche/gooey-react&apos;</span>
        {'\n'}
        {'\n'}
        {'<'}Goo{`>\n  <svg>\n    <circle />\n    <circle />\n  </svg>\n</`}Goo{'>'}
      </CodeBlock>

      <p style={{ margin: '1rem 0', maxWidth: 640, lineHeight: 1.6 }}>
        We&apos;ll want to add some dimensions and color to these elements so
        they&apos;re visible:
      </p>

      <CodeBlock>
        {'<'}svg width=&quot;192&quot; height=&quot;192&quot;{`>\n`}
        {'  <'}circle cx=&quot;34%&quot; cy=&quot;34%&quot; fill=&quot;orchid&quot; r=&quot;32&quot; /{`>\n`}
        {'  <'}circle cx=&quot;66%&quot; cy=&quot;66%&quot; fill=&quot;mediumorchid&quot; r=&quot;32&quot; /{`>\n`}
        {'</'}svg{'>'}
      </CodeBlock>

      <p style={{ marginTop: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        Which will look like the following:
      </p>

      <div style={{ margin: '1rem 0' }}>
        <Goo>
          <svg width="192" height="192">
            <circle cx="34%" cy="34%" fill="orchid" r="32" />
            <circle cx="66%" cy="66%" fill="mediumorchid" r="32" />
          </svg>
        </Goo>
      </div>

      <p style={{ margin: '1rem 0', maxWidth: 640, lineHeight: 1.6 }}>
        If we move the elements closer together, the effect becomes apparent.
        You can use the <code>intensity</code> prop to control how strong the
        goo is applied.
      </p>

      <CodeBlock>
        {'<'}svg width=&quot;192&quot; height=&quot;192&quot;{`>\n`}
        {'  <'}circle cx=&quot;37%&quot; cy=&quot;37%&quot; fill=&quot;orchid&quot; r=&quot;32&quot; /{`>\n`}
        {'  <'}circle cx=&quot;63%&quot; cy=&quot;63%&quot; fill=&quot;mediumorchid&quot; r=&quot;32&quot; /{`>\n`}
        {'</'}svg{'>'}
      </CodeBlock>

      <div style={{ margin: '1rem 0' }}>
        <Goo>
          <svg width="192" height="192">
            <circle cx="37%" cy="37%" fill="orchid" r="32" />
            <circle cx="63%" cy="63%" fill="mediumorchid" r="32" />
          </svg>
        </Goo>
      </div>

      <p style={{ margin: '1rem 0', maxWidth: 640, lineHeight: 1.6 }}>
        We can add animations and transitions with some simple CSS transforms.
        For more complex and engaging movement, an animation library is
        recommended.
      </p>

      <CodeBlock>
        {`<Goo>
  <svg width="192" height="192">
    <g style={{ animation: 'rotate_back 4s linear infinite' }}>
      <circle
        style={{ animation: 'rotate 1s linear infinite' }}
        cx="37%"
        cy="37%"
        fill="orchid"
        r="32"
      />
      <circle cx="63%" cy="63%" fill="mediumorchid" r="32" />
    </g>
  </svg>
</Goo>`}
      </CodeBlock>

      <CodeBlock>
        {`svg * {
  transform-origin: 50%;
}

@keyframes rotate_back {
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}`}
      </CodeBlock>

      <p style={{ margin: '1rem 0', maxWidth: 640, lineHeight: 1.6 }}>
        Which will result in the following:
      </p>

      <div style={{ margin: '1rem 0' }}>
        <Goo>
          <svg width="192" height="192">
            <g style={{ animation: 'rotate_back 4s linear infinite' as any }}>
              <circle
                style={{ animation: 'rotate 1s linear infinite' }}
                cx="37%"
                cy="37%"
                fill="orchid"
                r="32"
              />
              <circle cx="63%" cy="63%" fill="mediumorchid" r="32" />
            </g>
          </svg>
        </Goo>
      </div>

      <p style={{ margin: '1rem 0', maxWidth: 640, lineHeight: 1.6 }}>
        Below is a similar example using regular HTML elements, without
        animation.
      </p>

      <CodeBlock>
        {`<Goo
  style={{
    height: '12rem',
    position: 'relative',
    width: '12rem',
  }}
>
  <div
    style={{
      background: 'sandybrown',
      borderRadius: '50%',
      height: '4rem',
      left: '2.5rem',
      position: 'absolute',
      top: '5.5rem',
      width: '4rem',
    }}
  />
  <div
    style={{
      background: 'palevioletred',
      borderRadius: '50%',
      height: '4rem',
      left: '5.5rem',
      position: 'absolute',
      top: '2.5rem',
      width: '4rem',
    }}
  />
</Goo>`}
      </CodeBlock>

      <div style={{ margin: '1rem 0' }}>
        <Goo
          style={{
            height: '12rem',
            position: 'relative',
            width: '12rem',
          }}
        >
          <div
            style={{
              background: 'sandybrown',
              borderRadius: '50%',
              height: '4rem',
              left: '2.5rem',
              position: 'absolute',
              top: '5.5rem',
              width: '4rem',
            }}
          />
          <div
            style={{
              background: 'palevioletred',
              borderRadius: '50%',
              height: '4rem',
              left: '5.5rem',
              position: 'absolute',
              top: '2.5rem',
              width: '4rem',
            }}
          />
        </Goo>
      </div>

      <Pagination
        onNavigate={onNavigate}
        prev={{ page: 'prop-classname-style', label: 'Props: className & style' }}
        next={{ page: 'examples', label: 'Examples' }}
      />
    </>
  )
}

function ExamplesPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const [playIntensity, setPlayIntensity] = useState<Intensity>('medium')
  const [playComposite, setPlayComposite] = useState(false)

  return (
    <>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Examples</h1>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        The gooey effect might not be the most useful thing on the planet, but
        it can be used to create some interesting interactions and metaballs.
      </p>
      <h2 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.5rem' }}>
        Example: dotted loader
      </h2>
      <p style={{ marginBottom: '0.75rem', maxWidth: 640, lineHeight: 1.6 }}>
        A simple three-dot loader, where the blobs drift horizontally to create
        a liquid loading indicator.
      </p>
      <div style={{ margin: '0 0 1.75rem' }}>
        <Goo>
          <svg
            role="img"
            aria-label="Example of a gooey effect"
            width="256"
            height="256"
          >
            <g>
              <circle
                cx="25%"
                cy="50%"
                r="20"
                fill="darkorchid"
                style={{ animation: 'sway 0.4s ease-out infinite alternate' as any }}
              />
              <circle
                cx="45%"
                cy="50%"
                r="20"
                fill="blueviolet"
                style={{
                  animation: 'sway 0.4s -0.4s ease-out infinite alternate' as any,
                }}
              />
              <circle
                cx="65%"
                cy="50%"
                r="20"
                fill="rebeccapurple"
                style={{ animation: 'sway 0.4s ease-out infinite alternate' as any }}
              />
            </g>
          </svg>
        </Goo>
      </div>

      <h2 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.5rem' }}>
        Example: rotating loader
      </h2>
      <p style={{ marginBottom: '0.75rem', maxWidth: 640, lineHeight: 1.6 }}>
        A circular loader with overlapping blobs orbiting around the center.
      </p>
      <div style={{ margin: '0 0 1.75rem' }}>
        <Goo intensity="strong">
          <svg
            role="img"
            aria-label="Example of a gooey effect"
            width="256"
            height="256"
          >
            <g style={{ animation: 'rotate 5s linear infinite' as any }}>
              <circle cx="50%" cy="30%" r="24" fill="blueviolet" />
              <circle cx="70%" cy="50%" r="24" fill="darkorchid" />
              <circle cx="50%" cy="70%" r="24" fill="darkmagenta" />
              <circle cx="30%" cy="50%" r="24" fill="rebeccapurple" />
              <circle
                cx="50%"
                cy="30%"
                r="24"
                fill="hotpink"
                style={{ animation: 'rotate 2.5s linear infinite' as any }}
              />
              <circle
                cx="50%"
                cy="70%"
                r="24"
                fill="hotpink"
                style={{ animation: 'rotate 2.5s linear infinite' as any }}
              />
            </g>
          </svg>
        </Goo>
      </div>

      <h2 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.5rem' }}>
        Example: random blob
      </h2>
      <p style={{ marginBottom: '0.75rem', maxWidth: 640, lineHeight: 1.6 }}>
        A pulsing blob made from several circles with different radii and
        timings, creating an organic shape.
      </p>
      <div style={{ margin: '0 0 1.75rem' }}>
        <Goo intensity="strong">
          <svg
            role="img"
            aria-label="Example of a gooey effect"
            width="256"
            height="256"
          >
            <g style={{ animation: 'rotate_back 9s linear infinite' as any }}>
              <circle
                cx="50%"
                cy="50%"
                r="42"
                fill="lightseagreen"
                style={{
                  animation:
                    'blob_four 12s ease-in-out -3s infinite alternate' as any,
                }}
              />
              <circle
                cx="50%"
                cy="50%"
                r="36"
                fill="mediumaquamarine"
                style={{
                  animation:
                    'blob_three 9s ease-in-out -3s infinite alternate' as any,
                }}
              />
              <circle
                cx="50%"
                cy="50%"
                r="30"
                fill="palegreen"
                style={{
                  animation:
                    'blob_two 6s ease-in-out -3s infinite alternate' as any,
                }}
              />
              <circle
                cx="50%"
                cy="50%"
                r="24"
                fill="mediumspringgreen"
                style={{
                  animation:
                    'blob_one 3s ease-in-out -3s infinite alternate' as any,
                }}
              />
            </g>
          </svg>
        </Goo>
      </div>

      <h2 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.5rem' }}>
        Interactive playground
      </h2>
      <p style={{ marginBottom: '0.75rem', maxWidth: 640, lineHeight: 1.6 }}>
        Use the controls below to tweak <code>intensity</code> and{' '}
        <code>composite</code> on a simple example. This is how different
        values affect the same set of shapes.
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <label style={{ fontSize: '0.9rem' }}>
          <span style={{ marginRight: '0.35rem' }}>Intensity:</span>
          <select
            value={playIntensity}
            onChange={(event) =>
              setPlayIntensity(event.target.value as Intensity)
            }
            style={{
              backgroundColor: '#020617',
              color: '#e5e7eb',
              borderRadius: 4,
              border: '1px solid rgba(148,163,184,0.7)',
              padding: '0.1rem 0.35rem',
              fontSize: '0.9rem',
            }}
          >
            <option value="weak">weak</option>
            <option value="medium">medium</option>
            <option value="strong">strong</option>
          </select>
        </label>
        <label style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={playComposite}
            onChange={(event) => setPlayComposite(event.target.checked)}
            style={{ marginRight: '0.35rem' }}
          />
          composite
        </label>
      </div>
      <div style={{ margin: '0 0 1.75rem' }}>
        <Goo intensity={playIntensity} composite={playComposite}>
          <svg
            role="img"
            aria-label="Interactive gooey playground"
            width="256"
            height="256"
          >
            <g style={{ animation: 'sway 3s ease-in-out infinite alternate' as any }}>
              <circle
                cx="42%"
                cy="42%"
                r="28"
                fill="lightcoral"
                style={{ animation: 'drop 1.8s ease-in-out infinite alternate' }}
              />
              <circle cx="60%" cy="52%" r="26" fill="lightskyblue" />
              <circle cx="48%" cy="64%" r="22" fill="plum" />
            </g>
          </svg>
        </Goo>
      </div>

      <h2 style={{ fontSize: '1.15rem', margin: '1.5rem 0 0.5rem' }}>
        Examples: around the web
      </h2>
      <p style={{ marginBottom: '0.75rem', maxWidth: 640, lineHeight: 1.6 }}>
        A few links with some inspiring shape blobbing action.
      </p>
      <div style={{ lineHeight: 1.7 }}>
        <ExternalExampleLink
          title="Button bubble by Adrien Grsmto"
          href="https://codepen.io/Grsmto/full/RPQPPB"
        />
        <ExternalExampleLink
          title="Creative gooey effects by Lucas Bebber"
          href="https://tympanus.net/Development/CreativeGooeyEffects/"
        />
        <ExternalExampleLink
          title="Gooey buttons by Garet McKinley"
          href="https://codepen.io/garetmckinley/full/KJooOq"
        />
        <ExternalExampleLink
          title="Gooey effect by Mikael Ainalem"
          href="https://codepen.io/ainalem/full/mLqvee/"
        />
        <ExternalExampleLink
          title="Gooey loader by Kaitlyn Stahl"
          href="https://codepen.io/kaista/full/WPNBRg"
        />
        <ExternalExampleLink
          title="Gooey menu by Lucas Bebber"
          href="https://codepen.io/lbebber/full/LELBEo"
        />
        <ExternalExampleLink
          title="Hover menu by Michael Leonard"
          href="https://codepen.io/mikel301292/full/dMYRYZ"
        />
        <ExternalExampleLink
          title="Liquid loader by Mikael Ainalem"
          href="https://codepen.io/ainalem/full/eYmGLyp"
        />
      </div>

      <Pagination
        onNavigate={onNavigate}
        prev={{ page: 'tutorial', label: 'Tutorial' }}
        next={{ page: 'browser-support', label: 'Browser support' }}
      />
    </>
  )
}

function BrowserSupportPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>
        Browser support
      </h1>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        This package is not supported in Internet Explorer. If you experience
        problems in other browsers, make sure you&apos;re using an SVG instead
        of regular HTML elements inside the component.
      </p>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        iOS has a few bugs regarding SVG filters. If you&apos;re having
        problems on iOS, you can apply the following changes:
      </p>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7, fontWeight: 500 }}>
        <li>Use an SVG instead of regular HTML elements</li>
        <li>Put elements inside the SVG in a group</li>
        <li>Make sure there is enough extra space on all sides inside the SVG</li>
        <li>
          Animate all elements (instead of just a selection) to reduce artifacts
        </li>
      </ul>
      <Pagination
        onNavigate={onNavigate}
        prev={{ page: 'examples', label: 'Examples' }}
        next={{ page: 'considerations', label: 'Considerations' }}
      />
    </>
  )
}

function ConsiderationsPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>
        Considerations
      </h1>

      <h2 style={{ fontSize: '1.15rem', margin: '1rem 0 0.5rem' }}>Animations</h2>
      <p style={{ marginBottom: '1rem', maxWidth: 640, lineHeight: 1.6 }}>
        The various examples in the documentation use simple CSS keyframes.
        It&apos;s worth checking out libraries like{' '}
        <a
          href="https://github.com/juliangarnier/anime"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#a855f7', textDecoration: 'underline' }}
        >
          anime.js
        </a>{' '}
        or{' '}
        <a
          href="https://github.com/react-spring/react-spring"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#a855f7', textDecoration: 'underline' }}
        >
          react-spring
        </a>{' '}
        for more interesting animations and interactions.
      </p>

      <h2 style={{ fontSize: '1.15rem', margin: '1rem 0 0.5rem' }}>
        Performance
      </h2>
      <p style={{ maxWidth: 640, lineHeight: 1.6 }}>
        Shape blobbing can be resource intensive, so it&apos;s recommended to
        keep the paint area as small as possible.
      </p>

      <Pagination
        onNavigate={onNavigate}
        prev={{ page: 'browser-support', label: 'Browser support' }}
      />
    </>
  )
}

type PaginationLink = {
  page: PageId
  label: string
}

function ExternalExampleLink({ href, title }: { href: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.35rem' }}>
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '0.9rem',
          height: '0.8rem',
          marginRight: '0.4rem',
          borderRadius: '50% 40% 55% 45% / 60% 45% 55% 40%',
          background:
            'radial-gradient(circle at 30% 30%, #fb923c, #ec4899 45%, #8b5cf6 85%)',
          boxShadow: '0 0 0 1px rgba(15,23,42,0.9), 0 1px 4px rgba(15,23,42,0.7)',
        }}
      />
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        style={{ color: '#a855f7', textDecoration: 'underline' }}
      >
        {title}
      </a>
    </div>
  )
}

function Pagination({
  onNavigate,
  prev,
  next,
}: {
  onNavigate: (page: PageId) => void
  prev?: PaginationLink
  next?: PaginationLink
}) {
  if (!prev && !next) return null

  const hasPrev = Boolean(prev)
  const hasNext = Boolean(next)

  return (
    <div
      style={{
        marginTop: '2rem',
        border: '1px solid rgba(148,163,184,0.5)',
        borderRadius: 8,
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {prev && (
        <button
          type="button"
          onClick={() => onNavigate(prev.page)}
          style={{
            flex: 1,
            textAlign: 'left',
            padding: '0.9rem 1rem',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderRight: hasNext ? '1px solid rgba(148,163,184,0.4)' : undefined,
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.25rem',
            }}
          >
            Previous
          </div>
          <div style={{ color: '#a855f7', textDecoration: 'underline' }}>
            {prev.label}
          </div>
        </button>
      )}
      {next && (
        <button
          type="button"
          onClick={() => onNavigate(next.page)}
          style={{
            flex: hasPrev ? 1 : undefined,
            textAlign: 'right',
            padding: '0.9rem 1rem',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            marginLeft: hasPrev ? undefined : 'auto',
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.25rem',
            }}
          >
            Next
          </div>
          <div style={{ color: '#a855f7', textDecoration: 'underline' }}>
            {next.label}
          </div>
        </button>
      )}
    </div>
  )
}

function HeroExample() {
  return (
    <Goo intensity="strong">
      <svg
        role="img"
        aria-label="Example of a gooey effect"
        width="260"
        height="260"
      >
        <defs>
          <linearGradient id="gradient">
            <stop offset="0" stopColor="darkviolet" />
            <stop offset="1" stopColor="darkturquoise" />
          </linearGradient>
        </defs>
        <g style={{ animation: 'rotate 8s linear infinite' as any }}>
          <rect
            x={`${50 - 17.5 / 2}%`}
            y={`${50 - 17.5 / 2}%`}
            rx={`${17.5 * 0.45}%`}
            width={`${17.5}%`}
            height={`${17.5}%`}
            fill="url(#gradient)"
            style={{
              animation: 'hero_one 4s ease-in-out -5s infinite alternate',
            }}
          />
          <rect
            x={`${50 - 20 / 2}%`}
            y={`${50 - 20 / 2}%`}
            rx={`${20 * 0.45}%`}
            width={`${20}%`}
            height={`${20}%`}
            fill="url(#gradient)"
            style={{
              animation: 'hero_three 12s ease-in-out -5s infinite alternate',
            }}
          />
          <rect
            x={`${50 - 25 / 2}%`}
            y={`${50 - 25 / 2}%`}
            rx={`${25 * 0.45}%`}
            width={`${25}%`}
            height={`${25}%`}
            fill="url(#gradient)"
            style={{
              animation: 'hero_two 8s ease-in-out -5s infinite alternate',
            }}
          />
          <rect
            x={`${50 - 30 / 2}%`}
            y={`${50 - 30 / 2}%`}
            rx={`${30 * 0.45}%`}
            width={`${30}%`}
            height={`${30}%`}
            fill="url(#gradient)"
            style={{
              animation: 'hero_four 16s ease-in-out -5s infinite alternate',
            }}
          />
        </g>
      </svg>
    </Goo>
  )
}
