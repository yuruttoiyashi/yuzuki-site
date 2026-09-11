import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { FixedReserveButton } from '../components/layout/FixedReserveButton'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { HomePage } from '../pages/HomePage'
import { MenuPage } from '../pages/MenuPage'
import { ReservePage } from '../pages/ReservePage'
import { SalonPage } from '../pages/SalonPage'

function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
    const metadata: Record<string, { title: string; description: string }> = {
      '/': { title: '癒し処 結月｜二子玉川のドライヘッドスパ', description: '二子玉川駅徒歩5分。働く女性のPC・スマホ疲れ、首肩の疲れ、睡眠不足に寄り添う女性専用ドライヘッドスパです。' },
      '/menu': { title: 'メニュー｜癒し処 結月', description: '60分・75分・90分から選べる、癒し処 結月の3つのドライヘッドスパコースと料金をご案内します。' },
      '/salon': { title: '結月について｜癒し処 結月', description: '二子玉川の女性専用プライベートサロン、癒し処 結月の施術方針、空間、セラピスト、アクセスをご紹介します。' },
      '/reserve': { title: 'ご予約｜癒し処 結月', description: '癒し処 結月のWeb予約デモフォーム。コースと希望日時を選び、入力内容を確認して送信できます。' },
    }
    const current = metadata[pathname] ?? metadata['/']
    document.title = current.title
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.append(description)
    }
    description.content = current.description
  }, [pathname])
  return null
}

function SiteRoutes() {
  return (
    <>
      <ScrollManager />
      <SiteHeader />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/salon" element={<SalonPage />} />
          <Route path="/reserve" element={<ReservePage />} />
        </Routes>
      </main>
      <SiteFooter />
      <FixedReserveButton />
    </>
  )
}

export function App() {
  return <BrowserRouter><SiteRoutes /></BrowserRouter>
}
