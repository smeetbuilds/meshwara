import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { brand } from '../data/brand'
import { CloseIcon, MenuIcon } from './Icons'

function MeshvaraMark() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" className="meshvara-mark">
      <path d="M4 28V8l14 12L32 8v20" />
      <path d="M4 8l14 20L32 8M4 28l14-8 14 8" />
      <circle cx="4" cy="8" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <circle cx="32" cy="8" r="1.5" />
      <circle cx="4" cy="28" r="1.5" />
      <circle cx="18" cy="28" r="1.5" />
      <circle cx="32" cy="28" r="1.5" />
    </svg>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label={`${brand.name} home`}>
        <span className="brand-mark"><MeshvaraMark /></span>
        <span className="brand-lockup">
          <strong>{brand.name}</strong>
          <small>{brand.descriptor}</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary">
        <Link to="/assets" activeProps={{ className: 'is-active' }}>Archive</Link>
        <a href="/#categories">Categories</a>
        <a href="/#principles">Standard</a>
        <span className="free-badge">OPEN / FREE</span>
      </nav>
      <button className="menu-button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      {open && (
        <div className="mobile-menu">
          <Link to="/assets" onClick={() => setOpen(false)}>Archive</Link>
          <a href="/#categories" onClick={() => setOpen(false)}>Categories</a>
          <a href="/#principles" onClick={() => setOpen(false)}>Quality standard</a>
          <span>MESHVARA · Free downloads · No account · Source included</span>
        </div>
      )}
    </header>
  )
}
