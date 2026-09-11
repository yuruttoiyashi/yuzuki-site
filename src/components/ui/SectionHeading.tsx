import type { ReactNode } from 'react'

type Props = { eyebrow: string; title: ReactNode; description?: string; light?: boolean }
export function SectionHeading({ eyebrow, title, description, light }: Props) {
  return <header className={`section-heading ${light ? 'light' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</header>
}
