import { useState } from 'react'
import { faqs } from '../../data/faqs'

export function FaqAccordion({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(null)

  return <div className="faq-list">
    {faqs.slice(0, limit).map((faq, index) => {
      const expanded = open === index
      const panelId = `faq-${index}`
      return <section className="faq-item" key={faq.question}>
        <h3><button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : index)}><span>{faq.question}</span><i aria-hidden="true">{expanded ? '−' : '＋'}</i></button></h3>
        <div id={panelId} hidden={!expanded}><p>{faq.answer}</p></div>
      </section>
    })}
  </div>
}
