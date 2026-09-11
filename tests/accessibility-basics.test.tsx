import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { App } from '../src/app/App'

it('TOPに必須コンテンツと操作可能なFAQを表示する', async () => {
  window.history.pushState({}, '', '/')
  render(<App />)
  expect(screen.getByRole('heading', { name: /こんなお疲れは\s*ありませんか？/ })).toBeInTheDocument()
  expect(screen.getByText('巡り − 首肩・眼精疲労ケア')).toBeInTheDocument()
  expect(screen.getByText('水城 紗月')).toBeInTheDocument()
  const user = userEvent.setup()
  const clothing = screen.getByRole('button', { name: /服装/ })
  const makeup = screen.getByRole('button', { name: /メイク/ })
  expect(clothing).toHaveAttribute('aria-expanded', 'false')
  await user.click(clothing)
  expect(clothing).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText(/首元がゆったりした服装/)).toBeVisible()
  await user.click(makeup)
  expect(clothing).toHaveAttribute('aria-expanded', 'false')
  expect(makeup).toHaveAttribute('aria-expanded', 'true')
})

it('PC表示で日本語の意味のまとまりを途中改行させない', () => {
  window.history.pushState({}, '', '/')
  const { container } = render(<App />)
  const page = within(container)

  for (const phrase of ['ドライヘッドスパ。', '整えるひとつの習慣。', 'ありませんか？', '3つのこだわり']) {
    expect(page.getByText(phrase)).toHaveClass('keep-together')
  }
})
