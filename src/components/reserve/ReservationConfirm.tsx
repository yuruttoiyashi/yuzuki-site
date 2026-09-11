import { formatPrice, menuCourses } from '../../data/menus'
import type { ReservationData } from '../../features/reservation/types'

type Props = { data: ReservationData; onBack: () => void; onSubmit: () => void }

export function ReservationConfirm({ data, onBack, onSubmit }: Props) {
  const course = menuCourses.find(({ id }) => id === data.courseId)
  const rows = [
    ['コース', course ? `${course.name} / ${course.duration}分 / ${formatPrice(course.price)}` : '—'],
    ['ご希望日時', `${data.preferredDate}　${data.preferredTime}`],
    ['お名前', data.name],
    ['メールアドレス', data.email],
    ['電話番号', data.phone],
    ['気になること・ご要望', data.concerns || '特になし'],
  ]

  return <section className="reservation-confirm" aria-labelledby="confirm-title">
    <h2 id="confirm-title" data-step-heading tabIndex={-1}>ご予約内容の確認</h2>
    <p>以下の内容でよろしければ送信してください。この操作はデモのため、店舗への通信は行いません。</p>
    <dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <div className="form-actions">
      <button className="button button-outline" type="button" onClick={onBack}>修正する</button>
      <button className="button" type="button" onClick={onSubmit}>この内容で送信する</button>
    </div>
  </section>
}
