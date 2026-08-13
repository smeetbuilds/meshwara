import type { SVGProps } from 'react'

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path {...base} d="M7 17 17 7M8 7h9v9" /></svg>
}
export function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path {...base} d="M12 4v16m-6-6 6 6 6-6" /></svg>
}
export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><circle {...base} cx="11" cy="11" r="6"/><path {...base} d="m16 16 4 4" /></svg>
}
export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path {...base} d="m6 6 12 12M18 6 6 18" /></svg>
}
export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path {...base} d="M4 8h16M4 16h16" /></svg>
}
