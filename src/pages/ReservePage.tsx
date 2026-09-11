import { useEffect, useRef, useState } from 'react'
import { ReservationComplete } from '../components/reserve/ReservationComplete'
import { ReservationConfirm } from '../components/reserve/ReservationConfirm'
import { ReservationForm } from '../components/reserve/ReservationForm'
import { PageHero } from '../components/ui/PageHero'
import type { ReservationData } from '../features/reservation/types'

const initialData: ReservationData = { courseId: '', preferredDate: '', preferredTime: '', name: '', email: '', phone: '', concerns: '', agreed: false }

export function ReservePage() {
  const [step, setStep] = useState<'input' | 'confirm' | 'complete'>('input')
  const [data, setData] = useState(initialData)
  const contentRef = useRef<HTMLElement>(null)
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    const heading = contentRef.current?.querySelector<HTMLElement>('[data-step-heading]')
    heading?.focus()
    heading?.scrollIntoView?.({ block: 'start' })
  }, [step])

  return <>
    <PageHero eyebrow="RESERVATION" title="ご予約" lead="ご希望のコースと日時をお知らせください。入力内容を確認してから送信できます。" />
    <section className="reserve-page section" ref={contentRef}>
      <ol className="reservation-progress" aria-label="予約の進行状況">
        {['入力', '確認', '完了'].map((label, index) => {
          const currentIndex = step === 'input' ? 0 : step === 'confirm' ? 1 : 2
          return <li key={label} className={index <= currentIndex ? 'active' : ''} aria-current={index === currentIndex ? 'step' : undefined}><span>0{index + 1}</span>{label}</li>
        })}
      </ol>
      {step === 'input' && <ReservationForm data={data} onChange={setData} onConfirm={() => setStep('confirm')} />}
      {step === 'confirm' && <ReservationConfirm data={data} onBack={() => setStep('input')} onSubmit={() => setStep('complete')} />}
      {step === 'complete' && <ReservationComplete />}
    </section>
    {step === 'input' && <section className="line-reservation section-dark"><div className="section-inner"><p className="eyebrow">LINE RESERVATION</p><h2>コース選びの相談も、LINEで気軽に。</h2><p>実店舗ではLINE予約へ接続します。このデモサイトでは外部ページへ移動しません。</p><button className="button button-light" type="button">LINEで相談する</button></div></section>}
  </>
}
