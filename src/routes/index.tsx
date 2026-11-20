import { useState, type CSSProperties } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { AssetCard } from '../components/AssetCard'
import { ArrowDown, ArrowUpRight } from '../components/Icons'
import { assets, categoryGroups } from '../data/assets'
import { brand } from '../data/brand'
import { isGeometryV2Asset } from '../data/geometryV2'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const featured = assets.filter((asset) => asset.featured && isGeometryV2Asset(asset)).slice(-6).reverse()
  const [featuredPreview, setFeaturedPreview] = useState<string | null>(featured[0]?.slug ?? null)
  const heroAsset = assets.find((asset) => asset.slug === 'precision-chrono') ?? featured[0]

  return (
    <>
      <section className="hero page-pad" aria-labelledby="home-title">
        <div className="hero-kicker">
          <span>{brand.name} / {brand.descriptor}</span>
          <span>An Aahav Labs project</span>
        </div>
        <div className="hero-copy">
          <div className="hero-heading">
            <p className="eyebrow">The open library for the spatial web</p>
            <h1 id="home-title">A better starting point for everything 3D.</h1>
          </div>
          <div className="hero-sidecopy">
            <p>Explore {assets.length} free Three.js assets, materials and scenes. Preview real objects, download editable source, and bring your ideas to life—without signing up.</p>
            <div className="hero-actions">
              <Link to="/assets" className="primary-link">Explore the archive <ArrowUpRight /></Link>
              <Link to="/studio" search={{ asset: undefined }} className="secondary-link">Open Studio <ArrowUpRight /></Link>
            </div>
          </div>
        </div>
        <a className="scroll-cue" href="#featured-object"><ArrowDown /> Meet the library</a>
      </section>

      <section className="hero-feature-wrap page-pad" id="featured-object" aria-labelledby="featured-object-heading">
        <div className="hero-feature">
          <div className="hero-feature-copy">
            <p className="section-label">Live preview / {heroAsset.index}</p>
            <h2 id="featured-object-heading">Made for the web. Ready for your next idea.</h2>
            <p>Every object is more than a static picture. Explore it in 3D, inspect the details and take the source into your own project.</p>
            <Link to="/assets/$slug" params={{ slug: heroAsset.slug }} className="secondary-link on-dark">
              Explore {heroAsset.name} <ArrowUpRight />
            </Link>
          </div>
          <div className="hero-stage" style={{ '--asset-accent': heroAsset.accent } as CSSProperties}>
            <AssetCard asset={heroAsset} priority />
            <div className="stage-note"><span>Featured object / {heroAsset.index}</span><span>Interactive 3D</span></div>
          </div>
        </div>
      </section>

      <section className="category-index page-pad" id="categories" aria-labelledby="categories-heading">
        <div className="section-head">
          <div>
            <p className="section-label">01 / Explore the worlds</p>
            <h2 id="categories-heading">Everything you need to start making.</h2>
          </div>
          <p className="category-index-intro">A considered collection organized by real use cases. Choose a world, then filter by category, type and detail level.</p>
        </div>
        <div className="world-grid">
          {categoryGroups.map((group, index) => {
            const count = assets.filter((asset) => group.categories.includes(asset.category)).length
            return (
              <Link key={group.name} to="/assets" search={{ world: group.name }} className="world-card">
                <div className="world-card-top"><span>World 0{index + 1}</span><strong>{String(count).padStart(3, '0')} objects</strong></div>
                <h3>{group.name}</h3>
                <p>{group.categories.join(' · ')}</p>
                <ArrowUpRight />
              </Link>
            )
          })}
        </div>
      </section>

      <section className="manifesto page-pad" id="principles" aria-labelledby="principles-heading">
        <div className="manifesto-card">
          <p className="section-label">02 / The Meshvara standard</p>
          <div className="manifesto-grid">
            <h2 id="principles-heading">The details make the difference.</h2>
            <div className="manifesto-copy">
              <p>Created to feel considered, not generic. From materials and lighting to motion and source code, each asset is designed to be explored and adapted.</p>
              <div className="principle-list">
                <span><b>01</b> Art-directed</span>
                <span><b>02</b> Responsive</span>
                <span><b>03</b> Editable source</span>
                <span><b>04</b> No account required</span>
              </div>
              <Link to="/studio" search={{ asset: undefined }} className="secondary-link on-dark">Create in Studio <ArrowUpRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section page-pad" id="featured" aria-labelledby="featured-heading">
        <div className="section-head">
          <div>
            <p className="section-label">03 / Selected objects</p>
            <h2 id="featured-heading">Worth a closer look.</h2>
          </div>
          <Link to="/assets" className="text-link">See all {assets.length} assets <ArrowUpRight /></Link>
        </div>
        <div className="asset-grid home-grid">
          {featured.map((asset) => (
            <AssetCard
              key={asset.slug}
              asset={asset}
              previewActive={featuredPreview === asset.slug}
              onPreviewActivate={() => setFeaturedPreview(asset.slug)}
            />
          ))}
        </div>
      </section>

      <section className="free-statement page-pad" aria-labelledby="license-heading">
        <div className="free-statement-inner">
          <p className="section-label">04 / Open by design</p>
          <div>
            <h2 id="license-heading">Your ideas should have room to grow.</h2>
            <p>No signup forms, no hidden tiers, no email gate. Browse what’s available, download published source and start making something of your own.</p>
            <Link to="/assets" className="secondary-link on-dark">Explore free downloads <ArrowUpRight /></Link>
          </div>
        </div>
      </section>

      <section className="closing-cta page-pad" aria-labelledby="closing-heading">
        <div className="closing-cta-inner">
          <div>
            <p className="section-label">Start creating</p>
            <h2 id="closing-heading">A little inspiration goes a long way.</h2>
          </div>
          <Link to="/studio" search={{ asset: undefined }} className="primary-link">Launch Meshvara Studio <ArrowUpRight /></Link>
        </div>
      </section>
    </>
  )
}
