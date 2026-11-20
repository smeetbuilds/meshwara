import { Link } from '@tanstack/react-router'
import { brand } from '../data/brand'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-wordmark" aria-label={brand.name}>{brand.name}</div>
      <div className="footer-grid">
        <div className="footer-intro">
          <span className="footer-label">The open 3D archive</span>
          <p>{brand.productLine}. Explore in your browser, download the source and make the next thing your own.</p>
        </div>
        <div className="footer-column">
          <span className="footer-label">Explore</span>
          <Link to="/assets">All assets</Link>
          <a href="/#categories">Collections</a>
          <a href="/#featured">Selected objects</a>
        </div>
        <div className="footer-column">
          <span className="footer-label">Create</span>
          <Link to="/studio" search={{ asset: undefined }}>Open Studio</Link>
          <a href="/#principles">Our approach</a>
          <a href="/#featured-object">Live 3D preview</a>
        </div>
        <div className="footer-column footer-studio">
          <span className="footer-label">Made by</span>
          <p><strong>{brand.studio}</strong></p>
          <a href={brand.studioUrl} target="_blank" rel="noreferrer">{brand.studioDisplayUrl}</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {brand.established} {brand.studio} · {brand.name}</p>
        <div><span>Free to explore</span><span>Direct downloads</span><span>Local-first Studio</span></div>
      </div>
    </footer>
  )
}
