import { describe, expect, it } from 'vitest'
import type { ReservationData } from '../src/features/reservation/types'
import { validateReservation } from '../src/features/reservation/validation'

const validReservation: ReservationData = {
  courseId: 'meguri',
  preferredDate: '2026-09-12',
  preferredTime: '14:00',
  name: '結月 花子',
  email: 'hanako@example.com',
  phone: '090-1234-5678',
  concerns: '首肩の疲れが気になります',
  agreed: true,
}

describe('validateReservation', () => {
  it('必須項目・過去日・連絡先・同意の誤りを返す', () => {
    const errors = validateReservation({
      courseId: '', preferredDate: '2026-09-10', preferredTime: '',
      name: '', email: 'invalid', phone: 'abc', concerns: '', agreed: false,
    }, new Date('2026-09-11T00:00:00Z'))

    expect(errors).toEqual({
      courseId: 'コースを選択してください',
      preferredDate: '本日以降の日付を選択してください',
      preferredTime: '希望時間を選択してください',
      name: 'お名前を入力してください',
      email: 'メールアドレスを正しく入力してください',
      phone: '電話番号を正しく入力してください',
      agreed: '注意事項への同意が必要です',
    })
  })

  it('有効な入力と本日の日付を受け付ける', () => {
    expect(validateReservation(validReservation, new Date('2026-09-12T23:30:00+09:00'))).toEqual({})
  })

  it('存在しないコースIDを拒否する', () => {
    const untrustedInput = { ...validReservation, courseId: 'unknown' } as unknown as ReservationData
    expect(validateReservation(untrustedInput, new Date('2026-09-11'))).toMatchObject({
      courseId: 'コースを選択してください',
    })
  })

  it.each(['9999-not-a-date', '2026-99-99', '2026-02-30', '2026-9-12'])(
    '不正な日付 %s を拒否する',
    (preferredDate) => {
      expect(validateReservation({ ...validReservation, preferredDate }, new Date('2026-01-01'))).toMatchObject({
        preferredDate: '本日以降の日付を選択してください',
      })
    },
  )
})
