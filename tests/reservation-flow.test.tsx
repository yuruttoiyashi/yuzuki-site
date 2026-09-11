import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../src/app/App'

afterEach(cleanup)

describe('予約デモフロー', () => {
  it('入力エラーを案内し、正しい内容を確認して完了できる', async () => {
    const user = userEvent.setup()
    window.history.pushState({}, '', '/reserve')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'ご予約内容の入力' })).not.toHaveFocus()
    expect(screen.getByText(/前日18時までにご連絡ください/)).toBeInTheDocument()
    expect(screen.getByLabelText(/ご希望のコース/)).toHaveAttribute('aria-describedby', 'courseId-help')
    const timeSelect = screen.getByLabelText(/ご希望時間/)
    expect(timeSelect).toContainElement(screen.getByRole('option', { name: '10:00' }))
    expect(timeSelect).toContainElement(screen.getByRole('option', { name: '18:30' }))
    expect(screen.queryByRole('option', { name: '19:00' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '入力内容を確認する' }))
    expect(screen.getByText('コースを選択してください')).toBeInTheDocument()
    expect(screen.getByLabelText(/ご希望のコース/)).toHaveFocus()
    expect(screen.getByLabelText(/ご希望のコース/)).toHaveAttribute('aria-describedby', 'courseId-help courseId-error')

    await user.selectOptions(screen.getByLabelText(/ご希望のコース/), 'meguri')
    await user.type(screen.getByLabelText(/ご希望日/), '2099-12-31')
    await user.selectOptions(screen.getByLabelText(/ご希望時間/), '14:00')
    await user.type(screen.getByLabelText(/お名前/), '結月 花子')
    await user.type(screen.getByLabelText(/メールアドレス/), 'hanako@example.com')
    await user.type(screen.getByLabelText(/電話番号/), '090-1234-5678')
    await user.type(screen.getByLabelText(/気になること/), '首肩を中心に相談したいです')
    await user.click(screen.getByRole('checkbox', { name: /注意事項に同意/ }))
    await user.click(screen.getByRole('button', { name: '入力内容を確認する' }))

    expect(screen.getByRole('heading', { name: 'ご予約内容の確認' })).toHaveFocus()
    expect(screen.getByText(/巡り − 首肩・眼精疲労ケア/)).toBeInTheDocument()
    expect(screen.getByText('結月 花子')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '修正する' }))
    expect(screen.getByRole('heading', { name: 'ご予約内容の入力' })).toHaveFocus()
    expect(screen.getByLabelText(/お名前/)).toHaveValue('結月 花子')
    await user.click(screen.getByRole('button', { name: '入力内容を確認する' }))
    await user.click(screen.getByRole('button', { name: 'この内容で送信する' }))

    expect(screen.getByRole('heading', { name: '送信ありがとうございました。' })).toHaveFocus()
    expect(screen.getByText(/実際の予約は確定していません/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'トップページへ戻る' })).toHaveAttribute('href', '/')
  })

  it('LINE相談がデモ導線であることを明示する', () => {
    window.history.pushState({}, '', '/reserve')
    render(<App />)
    expect(screen.getByText(/実店舗ではLINE予約へ接続します/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'LINEで相談する' })).toBeInTheDocument()
  })
})
