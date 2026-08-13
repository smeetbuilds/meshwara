import type { CSSProperties } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { AssetCard } from '../components/AssetCard'
import { ArrowDown, ArrowUpRight } from '../components/Icons'
import { assets, categoryGroups } from '../data/assets'
import { brand } from '../data/brand'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const featured = assets.filter((asset) => asset.featured).slice(-6).reverse()
  const heroAsset = assets.find((asset) => asset.slug === 'precision-chrono') ?? featured[0]
  return (
    <>
      <section className="hero page-pad">
        <div className="hero-kicker">
          <span>{brand.name} / {brand.descriptor.toUpperCase()}</span>
          <span>AN AAHAV LABS PROJECT</span>
        </div>
        <div className="hero-copy">
          <h1>
            <span>The open archive</span>
            <span>for the <em>spatial</em> web.</span>
          </h1>
          <div className="hero-sidecopy">
            <p>Meshvara is a growing archive of production-grade 3D assets, systems, materials and scenes for ambitious web experiences. Free to download. No account. No filler.</p>
            <Link to="/assets" className="primary-link">Enter Meshvara · {assets.length} assets <ArrowUpRight /></Link>
          </div>
        </div>
        <div className="hero-stage" style={{ '--asset-accent': heroAsset.accent } as CSSProperties}>
          <AssetCard asset={heroAsset} priority />
          <div className="stage-note"><span>FEATURED OBJECT / {heroAsset.index}</span><span>MOVE POINTER</span></div>
        </div>
        <a className="scroll-cue" href="#categories"><ArrowDown /> ENTER THE MESHVARA ARCHIVE</a>
      </section>

      <section className="category-index page-pad" id="categories">
        <div className="section-head">
          <div>
            <p className="section-label">01 / CATEGORIES</p>
            <h2>The Meshvara archive.<br />Five worlds.</h2>
          </div>
          <p className="category-index-intro">The catalog is grouped by how assets are actually used, then split into precise categories and subcategories inside the library.</p>
        </div>
        <div className="world-grid">
          {categoryGroups.map((group, index) => {
            const count = assets.filter((asset) => group.categories.includes(asset.category)).length
            return (
              <Link key={group.name} to="/assets" className="world-card">
                <div className="world-card-top"><span>0{index + 1}</span><strong>{String(count).padStart(3, '0')}</strong></div>
                <h3>{group.name}</h3>
                <p>{group.categories.join(' · ')}</p>
                <ArrowUpRight />
              </Link>
            )
          })}
        </div>
      </section>

      <section className="manifesto page-pad" id="principles">
        <p className="section-label">02 / STANDARD</p>
        <div className="manifesto-grid">
          <h2>Not a model dump.<br />The Meshvara standard.</h2>
          <div className="manifesto-copy">
            <p>Every Meshvara asset is designed to survive outside the demo: responsive composition, intentional materials, controlled motion, clean source and sensible GPU cost. The archive can scale in quantity; the publication threshold does not scale down.</p>
            <div className="principle-list">
              <span><b>01</b> Art-directed</span>
              <span><b>02</b> Responsive</span>
              <span><b>03</b> Production-ready</span>
              <span><b>04</b> Free forever</span>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section page-pad" id="featured">
        <div className="section-head">
          <div>
            <p className="section-label">03 / SELECTED OBJECTS</p>
            <h2>Latest drops.</h2>
          </div>
          <Link to="/assets" className="text-link">View all {assets.length} assets ↗</Link>
        </div>
        <div className="asset-grid home-grid">
          {featured.map((asset, index) => <AssetCard key={asset.slug} asset={asset} priority={index < 2} />)}
        </div>
      </section>

      <section className="free-statement page-pad">
        <p className="section-label">04 / LICENSE</p>
        <div>
          <h2>Meshvara stays<br /><em>open.</em></h2>
          <p>No signup form. No email gate. No pricing tier. Every published Meshvara asset ships with source and a clear license so you can actually use it.</p>
          <Link to="/assets" className="primary-link inverse">Browse everything <ArrowUpRight /></Link>
        </div>
      </section>
    </>
  )
}
