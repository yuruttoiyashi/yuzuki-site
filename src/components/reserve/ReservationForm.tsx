import { useRef, useState, type FormEvent } from 'react'
import { menuCourses } from '../../data/menus'
import { faqs } from '../../data/faqs'
import type { ReservationData, ReservationErrors } from '../../features/reservation/types'
import { validateReservation } from '../../features/reservation/validation'

type Props = {
  data: ReservationData
  onChange: (data: ReservationData) => void
  onConfirm: () => void
}

const timeOptions = Array.from({ length: 18 }, (_, index) => {
  const totalMinutes = 10 * 60 + index * 30
  return `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`
})

const ErrorMessage = ({ id, message }: { id: string; message?: string }) => message
  ? <p className="field-error" id={id} role="alert">{message}</p>
  : null

const cancellationNotice = faqs.find(({ question }) => question.includes('変更やキャンセル'))?.answer

export function ReservationForm({ data, onChange, onConfirm }: Props) {
  const [errors, setErrors] = useState<ReservationErrors>({})
  const formRef = useRef<HTMLFormElement>(null)

  const update = <K extends keyof ReservationData>(key: K, value: ReservationData[K]) => {
    onChange({ ...data, [key]: value })
    if (errors[key]) setErrors({ ...errors, [key]: undefined })
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateReservation(data, new Date())
    setErrors(nextErrors)
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus()
      return
    }
    onConfirm()
  }

  const describedBy = (field: keyof ReservationData) => `${field}-help${errors[field] ? ` ${field}-error` : ''}`

  return <form className="reservation-form" ref={formRef} onSubmit={submit} noValidate>
    <h2 className="reservation-step-title" data-step-heading tabIndex={-1}>ご予約内容の入力</h2>
    <p className="form-intro"><span className="required-mark">必須</span>の項目をご入力ください。確認画面へ進んでも、予約はまだ確定しません。</p>

    <div className="form-field">
      <label htmlFor="courseId">ご希望のコース <span className="required-mark">必須</span></label>
      <p className="field-help" id="courseId-help">疲れ方に合うコースをお選びください。迷う場合は「巡り」がおすすめです。</p>
      <select id="courseId" name="courseId" value={data.courseId} onChange={(event) => update('courseId', event.target.value as ReservationData['courseId'])} aria-invalid={Boolean(errors.courseId)} aria-describedby={describedBy('courseId')}>
        <option value="">選択してください</option>
        {menuCourses.map((course) => <option key={course.id} value={course.id}>{course.name}（{course.duration}分）</option>)}
      </select>
      <ErrorMessage id="courseId-error" message={errors.courseId} />
    </div>

    <div className="form-row">
      <div className="form-field">
        <label htmlFor="preferredDate">ご希望日 <span className="required-mark">必須</span></label>
        <p className="field-help" id="preferredDate-help">本日以降の日付をお選びください。</p>
        <input id="preferredDate" name="preferredDate" type="date" value={data.preferredDate} onChange={(event) => update('preferredDate', event.target.value)} aria-invalid={Boolean(errors.preferredDate)} aria-describedby={describedBy('preferredDate')} />
        <ErrorMessage id="preferredDate-error" message={errors.preferredDate} />
      </div>
      <div className="form-field">
        <label htmlFor="preferredTime">ご希望時間 <span className="required-mark">必須</span></label>
        <p className="field-help" id="preferredTime-help">10:00〜18:30の間でお選びください。</p>
        <select id="preferredTime" name="preferredTime" value={data.preferredTime} onChange={(event) => update('preferredTime', event.target.value)} aria-invalid={Boolean(errors.preferredTime)} aria-describedby={describedBy('preferredTime')}>
          <option value="">選択してください</option>
          {timeOptions.map((time) => <option key={time} value={time}>{time}</option>)}
        </select>
        <ErrorMessage id="preferredTime-error" message={errors.preferredTime} />
      </div>
    </div>

    <div className="form-field">
      <label htmlFor="name">お名前 <span className="required-mark">必須</span></label>
      <p className="field-help" id="name-help">ご来店される方のお名前をご入力ください。</p>
      <input id="name" name="name" autoComplete="name" value={data.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} />
      <ErrorMessage id="name-error" message={errors.name} />
    </div>

    <div className="form-row">
      <div className="form-field">
        <label htmlFor="email">メールアドレス <span className="required-mark">必須</span></label>
        <p className="field-help" id="email-help">予約内容を受け取れるアドレスをご入力ください。</p>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" value={data.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} />
        <ErrorMessage id="email-error" message={errors.email} />
      </div>
      <div className="form-field">
        <label htmlFor="phone">電話番号 <span className="required-mark">必須</span></label>
        <p className="field-help" id="phone-help">当日に連絡の取れる番号をご入力ください。</p>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="090-1234-5678" value={data.phone} onChange={(event) => update('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy('phone')} />
        <ErrorMessage id="phone-error" message={errors.phone} />
      </div>
    </div>

    <div className="form-field">
      <label htmlFor="concerns">気になること・ご要望 <span className="optional-mark">任意</span></label>
      <p className="field-help" id="concerns-help">疲れを感じる場所、会話を控えたいなどのご希望があればお書きください。</p>
      <textarea id="concerns" name="concerns" rows={5} value={data.concerns} onChange={(event) => update('concerns', event.target.value)} aria-describedby="concerns-help" />
    </div>

    <div className="reservation-notice">
      <h3>ご予約前の注意事項</h3>
      <p id="agreed-help">体調不良・発熱・強い痛みがある場合は施術をお控えください。妊娠中・通院中の方は、事前に主治医へご相談ください。</p>
      {cancellationNotice && <p>{cancellationNotice}</p>}
      <label className="checkbox-label"><input name="agreed" type="checkbox" checked={data.agreed} onChange={(event) => update('agreed', event.target.checked)} aria-invalid={Boolean(errors.agreed)} aria-describedby={describedBy('agreed')} /> 注意事項に同意する <span className="required-mark">必須</span></label>
      <ErrorMessage id="agreed-error" message={errors.agreed} />
    </div>

    <button className="button form-submit" type="submit">入力内容を確認する</button>
  </form>
}
