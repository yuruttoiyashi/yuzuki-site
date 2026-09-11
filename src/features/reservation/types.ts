import type { MenuCourse } from '../../data/menus'

export type CourseId = MenuCourse['id']

export type ReservationData = {
  courseId: CourseId | ''
  preferredDate: string
  preferredTime: string
  name: string
  email: string
  phone: string
  concerns: string
  agreed: boolean
}

export type ReservationErrors = Partial<Record<keyof ReservationData, string>>
