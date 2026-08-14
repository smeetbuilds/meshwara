import { useState } from 'react'
import '../styles/distribution.css'

async function copyText(value: string) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(value)
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()
  if (!copied) throw new Error('Clipboard unavailable')
}

export function AssetInstallPanel({ slug, name }: { slug: string; name: string }) {
  const [copied, setCopied] = useState<string | null>(null)
  const githubCommand = `npx github:smeetbuilds/meshwara#main add ${slug}`
  const repoCommand = `node scripts/meshvara.mjs add ${slug}`

  const copy = async (label: string, value: string) => {
    try {
      await copyText(value)
      setCopied(label)
      window.setTimeout(() => setCopied((current) => current === label ? null : current), 1600)
    } catch {
      setCopied(null)
    }
  }

  return (
    <section className="asset-install page-pad" aria-labelledby="asset-install-title">
      <div className="asset-install-copy">
        <p className="section-label">INSTALL / VERIFIED ARCHIVE</p>
        <h2 id="asset-install-title">Add {name} without an account.</h2>
        <p>
          Meshvara's dependency-free Node CLI verifies the public archive SHA-256 and ZIP CRCs before writing files,
          rejects unsafe paths, and never overwrites an existing component unless you explicitly use <code>--force</code>.
        </p>
        <div className="asset-install-badges" aria-label="Install guarantees">
          <span>FREE</span><span>NO LOGIN</span><span>SHA-256</span><span>DRY RUN</span><span>NO RUNTIME API</span>
        </div>
      </div>
      <div className="asset-install-terminal">
        <div className="asset-install-command">
          <div><span>DIRECT FROM GITHUB</span><code>{githubCommand}</code></div>
          <button type="button" onClick={() => void copy('github', githubCommand)}>{copied === 'github' ? 'COPIED' : 'COPY'}</button>
        </div>
        <div className="asset-install-command">
          <div><span>FROM A CLONED MESHVARA REPO</span><code>{repoCommand}</code></div>
          <button type="button" onClick={() => void copy('repo', repoCommand)}>{copied === 'repo' ? 'COPIED' : 'COPY'}</button>
        </div>
        <p>Use <code>--dry-run</code> to inspect writes first, or <code>--dir ./your/path</code> to choose the component root.</p>
      </div>
    </section>
  )
}
