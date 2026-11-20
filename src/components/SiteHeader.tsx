import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { brand } from '../data/brand'
import { ArrowUpRight, CloseIcon, MenuIcon } from './Icons'

function MeshvaraMark() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" className="meshvara-mark">
      <path d="M4 28V8l14 12L32 8v20" />
      <path d="M4 8l14 20L32 8M4 28l14-8 14 8" />
      <circle cx="4" cy="8" r="1.5" /><circle cx="18" cy="20" r="1.5" /><circle cx="32" cy="8" r="1.5" />
      <circle cx="4" cy="28" r="1.5" /><circle cx="18" cy="28" r="1.5" /><circle cx="32" cy="28" r="1.5" />
    </svg>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const routePath = useRouterState({ select: (state) => state.location.pathname })
  const closeMenu = () => setOpen(false)

  useEffect(() => { setOpen(false) }, [routePath])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer'))
    const previousInert = background.map((element) => element.inert)
    document.body.style.overflow = 'hidden'
    background.forEach((element) => { element.inert = true })

    const focusable = (): HTMLElement[] => [
      ...(menuButton.current ? [menuButton.current] : []),
      ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []),
    ]
    menuRef.current?.querySelector('a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
        return
      }
      if (event.key !== 'Tab') return
      const nodes = focusable()
      const index = nodes.indexOf(document.activeElement as HTMLElement)
      if (event.shiftKey && index <= 0) {
        event.preventDefault()
        nodes[nodes.length - 1]?.focus()
      } else if (!event.shiftKey && (index === nodes.length - 1 || index === -1)) {
        event.preventDefault()
        nodes[0]?.focus()
      }
    }
    const media = window.matchMedia('(min-width: 768px)')
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    media.addEventListener('change', onBreakpoint)
    return () => {
      document.body.style.overflow = previousOverflow
      background.forEach((element, index) => { element.inert = previousInert[index] })
      window.removeEventListener('keydown', onKeyDown)
      media.removeEventListener('change', onBreakpoint)
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand" aria-label={`${brand.name} home`} onClick={closeMenu}>
          <span className="brand-mark"><MeshvaraMark /></span>
          <span className="brand-lockup"><strong>{brand.name}</strong><small>{brand.descriptor}</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link to="/assets" activeProps={{ className: 'is-active' }}>Archive</Link>
          <a href="/#categories">Collections</a>
          <a href="/#principles">Our approach</a>
          <Link to="/studio" search={{ asset: undefined }} activeProps={{ className: 'is-active' }}>Studio</Link>
        </nav>
        <div className="header-actions">
          <span className="header-free-note">Free to explore</span>
          <Link to="/assets" className="header-cta">Explore assets <ArrowUpRight /></Link>
        </div>
        <button
          ref={menuButton}
          type="button"
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="meshvara-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {open && (
        <nav ref={menuRef} className="mobile-menu" id="meshvara-mobile-menu" aria-label="Mobile navigation">
          <p className="mobile-menu-caption">Explore Meshvara</p>
          <Link to="/assets" onClick={closeMenu}>Archive <ArrowUpRight /></Link>
          <Link to="/studio" search={{ asset: undefined }} onClick={closeMenu}>Studio <ArrowUpRight /></Link>
          <a href="/#categories" onClick={closeMenu}>Collections <ArrowUpRight /></a>
          <a href="/#principles" onClick={closeMenu}>Our approach <ArrowUpRight /></a>
          <p className="mobile-menu-foot">Open 3D source for the spatial web.<br />No account required.</p>
        </nav>
      )}
    </header>
  )
}
