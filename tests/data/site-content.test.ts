import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { createElement } from 'react'
import { App } from '../../src/app/App'
import { faqs } from '../../src/data/faqs'
import { formatPrice, menuCourses } from '../../src/data/menus'
import { siteInfo, therapist } from '../../src/data/site'

afterEach(cleanup)

describe('商用サイトの共通コンテンツ', () => {
  it('承認済みの3コースと料金を保持する', () => {
    expect(menuCourses.map(({ duration, price }) => [duration, price])).toEqual([
      [60, 7700],
      [75, 9500],
      [90, 11800],
    ])
  })

  it('店舗・セラピスト・FAQの必須情報を保持する', () => {
    expect(siteInfo.nearestStation).toContain('二子玉川駅')
    expect(siteInfo.nearestStation).toContain('徒歩5分')
    expect(siteInfo.hours).toContain('10:00〜20:00')
    expect(siteInfo.closed).toBe('火曜日・不定休')
    expect(siteInfo.reservationPolicy).toBe('完全予約制')
    expect(siteInfo.audience).toBe('女性専用')
    expect(therapist.name).toBe('水城 紗月')
    expect(faqs.length).toBeGreaterThanOrEqual(6)
  })

  it('料金の税込表記とFAQの必須テーマを保護する', () => {
    expect(formatPrice(7700)).toBe('7,700円（税込）')
    const questions = faqs.map(({ question }) => question).join(' ')
    for (const topic of ['服装', 'メイク', '整髪料', '妊娠', '男性', '変更', '支払い', '住所']) {
      expect(questions).toContain(topic)
    }
  })
})

describe('メニューとサロンの詳細ページ', () => {
  it('3コースの料金と時間を表示する', () => {
    window.history.pushState({}, '', '/menu')
    render(createElement(App))
    expect(screen.getByText('60分')).toBeInTheDocument()
    expect(screen.getByText('7,700円（税込）')).toBeInTheDocument()
    expect(screen.getByText('90分')).toBeInTheDocument()
    expect(screen.getByText('目の重さが気になる方')).toBeInTheDocument()
    const menuSection = document.querySelector('.menu-page')
    expect(menuSection).not.toBeNull()
    expect(within(menuSection as HTMLElement).getByRole('link', { name: /メニューを選んで予約する/ })).toBeInTheDocument()
  })

  it('初来店に必要な利用・住所情報を表示する', () => {
    window.history.pushState({}, '', '/salon')
    render(createElement(App))
    expect(screen.getAllByText(/女性専用・完全予約制/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/予約確定後に/).length).toBeGreaterThan(0)
  })
})
