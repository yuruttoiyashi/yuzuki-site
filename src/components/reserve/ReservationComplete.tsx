import { Link } from 'react-router-dom'

export function ReservationComplete() {
  return <section className="reservation-complete" aria-labelledby="complete-title">
    <p className="complete-mark" aria-hidden="true">✓</p>
    <p className="eyebrow">THANK YOU</p>
    <h2 id="complete-title" data-step-heading tabIndex={-1}>送信ありがとうございました。</h2>
    <p className="demo-alert"><strong>これはデモ送信です。実際の予約は確定していません。</strong></p>
    <p>実店舗では、内容を確認後にサロンから予約確定のご連絡を差し上げます。</p>
    <Link className="button" to="/">トップページへ戻る</Link>
  </section>
}
