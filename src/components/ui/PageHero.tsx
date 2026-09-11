type Props = { eyebrow: string; title: string; lead: string }
export function PageHero({ eyebrow, title, lead }: Props) {
  return <header className="page-hero">
    <span className="page-hero-line" aria-hidden="true" />
    <p className="eyebrow">{eyebrow}</p>
    <h1>{title}</h1>
    <p>{lead}</p>
  </header>
}
