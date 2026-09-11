import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { App } from './App'

it('結月のサイト名を表示する', () => {
  render(<App />)
  expect(screen.getAllByText('癒し処 結月').length).toBeGreaterThan(0)
})
