import { Link } from '@tanstack/react-router'
import { brand } from '../data/brand'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-wordmark" aria-label={brand.name}>{brand.name}</div>
      <div className="footer-grid">
        <div className="footer-intro">
          <span className="footer-label">MESHVARA / OPEN ARCHIVE</span>
          <p>{brand.productLine}. Direct SHA-256-manifested ZIPs, complete source, no account wall.</p>
        </div>
        <div className="footer-column">
          <span className="footer-label">EXPLORE</span>
          <Link to="/assets">Full archive</Link>
          <a href="/#categories">Categories</a>
          <a href="/#principles">Quality standard</a>
          <a href="/downloads/manifest.json">Download integrity</a>
          <a href="/quality/asset-audit.json">Asset quality audit</a>
        </div>
        <div className="footer-column footer-studio">
          <span className="footer-label">CREATED BY</span>
          <p>Developed by <strong>{brand.studio}</strong> with love <span className="footer-heart" aria-label="heart">♥</span></p>
          <a href={brand.studioUrl} target="_blank" rel="noreferrer">{brand.studioDisplayUrl} ↗</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {brand.established} {brand.studio} · {brand.name}</p>
        <div><span>FREE</span><span>NO AUTH</span><span>NO PAYWALL</span><span>DIRECT ZIP</span></div>
      </div>
    </footer>
  )
}
