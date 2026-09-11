import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { App } from '../src/app/App'

it('TOPに必須コンテンツと操作可能なFAQを表示する', async () => {
  window.history.pushState({}, '', '/')
  render(<App />)
  expect(screen.getByText('こんなお疲れはありませんか？')).toBeInTheDocument()
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
