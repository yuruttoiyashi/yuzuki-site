import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { App } from '../src/app/App'

afterEach(cleanup)

describe('主要4ページ', () => {
  for (const [path, heading, title, descriptionFragment] of [
    ['/', 'がんばる毎日に、深い休息を。', '癒し処 結月｜二子玉川のドライヘッドスパ', '働く女性'],
    ['/menu', 'メニュー', 'メニュー｜癒し処 結月', '3つのドライヘッドスパコース'],
    ['/salon', '結月について', '結月について｜癒し処 結月', '施術方針'],
    ['/reserve', 'ご予約', 'ご予約｜癒し処 結月', 'Web予約デモフォーム'],
  ]) {
    it(`${path} を直接表示できる`, () => {
      window.history.pushState({}, '', path)
      render(<App />)
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
      expect(screen.getByRole('navigation', { name: 'メインナビゲーション' })).toBeInTheDocument()
      expect(document.title).toBe(title)
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(descriptionFragment)
    })
  }

  it('別の導線でページ移動してもスマホメニューを閉じる', async () => {
    window.history.pushState({}, '', '/')
    render(<App />)
    const user = userEvent.setup()
    const toggle = screen.getByRole('button', { name: 'メニュー' })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(screen.getByRole('link', { name: /WEB予約/ }))
    expect(screen.getByRole('button', { name: 'メニュー' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText(/架空サロンのデモサイト/)).toBeInTheDocument()
  })
})
