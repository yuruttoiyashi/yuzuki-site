import { menuCourses } from '../../data/menus'
import type { ReservationData, ReservationErrors } from './types'

const localDateString = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const isValidLocalDateString = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return false
  const [, yearText, monthText, dayText] = match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)
  return month >= 1 && month <= 12 && day >= 1 && day <= new Date(year, month, 0).getDate()
}

export function validateReservation(data: ReservationData, today: Date): ReservationErrors {
  const errors: ReservationErrors = {}
  const validCourseIds = new Set<string>(menuCourses.map(({ id }) => id))

  if (!validCourseIds.has(data.courseId)) errors.courseId = 'コースを選択してください'
  if (!isValidLocalDateString(data.preferredDate) || data.preferredDate < localDateString(today)) errors.preferredDate = '本日以降の日付を選択してください'
  if (!data.preferredTime) errors.preferredTime = '希望時間を選択してください'
  if (!data.name.trim()) errors.name = 'お名前を入力してください'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'メールアドレスを正しく入力してください'

  const phoneDigits = data.phone.replace(/[-\s()]/g, '')
  if (!/^\d{10,11}$/.test(phoneDigits)) errors.phone = '電話番号を正しく入力してください'
  if (!data.agreed) errors.agreed = '注意事項への同意が必要です'

  return errors
}
