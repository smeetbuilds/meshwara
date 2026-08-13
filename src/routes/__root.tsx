import type { ReactNode } from 'react'
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles/app.css?url'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { brand } from '../data/brand'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { title: `${brand.name} — ${brand.descriptor}` },
      { name: 'description', content: `${brand.name} is an open archive of production-grade Three.js objects, characters, shaders, generative systems and scenes, developed by ${brand.studio}.` },
      { name: 'application-name', content: brand.name },
      { name: 'apple-mobile-web-app-title', content: brand.name },
      { property: 'og:site_name', content: brand.name },
      { property: 'og:title', content: `${brand.name} — ${brand.descriptor}` },
      { property: 'og:description', content: brand.productLine },
      { name: 'theme-color', content: '#0b0b0b' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <SiteHeader />
      <main><Outlet /></main>
      <SiteFooter />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <section className="not-found page-pad">
      <p className="eyebrow">{brand.name} / 404 / OBJECT NOT FOUND</p>
      <h1>This object left the scene.</h1>
      <Link to="/assets" className="text-link">Return to library ↗</Link>
    </section>
  )
}
