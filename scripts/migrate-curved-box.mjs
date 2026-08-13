import { readFile, readdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(process.cwd(), 'src/components/scenes')
const files = (await readdir(root)).filter((name) => name.endsWith('.tsx'))
let changed = 0

for (const file of files) {
  const path = resolve(root, file)
  let source = await readFile(path, 'utf8')
  if (!source.includes('RoundedBox') || !source.includes("@react-three/drei")) continue

  const match = source.match(/import \{([^\n]+)\} from '@react-three\/drei'/)
  if (!match || !match[1].split(',').map((item) => item.trim()).includes('RoundedBox')) continue

  const specifiers = match[1].split(',').map((item) => item.trim()).filter((item) => item && item !== 'RoundedBox')
  const imports = [
    ...(specifiers.length ? [`import { ${specifiers.join(', ')} } from '@react-three/drei'`] : []),
    "import { CurvedBox } from '../geometry/CurvedBox'",
  ].join('\n')

  source = source.slice(0, match.index) + imports + source.slice(match.index + match[0].length)
  source = source.replaceAll('<RoundedBox', '<CurvedBox').replaceAll('</RoundedBox>', '</CurvedBox>')
  await writeFile(path, source)
  changed += 1
}

console.log(`CurvedBox migration complete: ${changed} scene files updated.`)
