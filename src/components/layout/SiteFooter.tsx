import { Link } from 'react-router-dom'
import { siteInfo } from '../../data/site'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner"><div><p className="footer-brand">{siteInfo.name}</p><p>{siteInfo.nearestStation}</p><p>{siteInfo.hours}（{siteInfo.lastReception}）</p></div><nav aria-label="フッターナビゲーション"><Link to="/menu">メニュー</Link><Link to="/salon">結月について</Link><Link to="/reserve">ご予約</Link></nav></div>
      <p className="demo-note">このサイトはポートフォリオ用に制作された架空サロンのデモサイトです。</p><p className="copyright">© 2026 YUZUKI DRY HEAD SPA</p>
    </footer>
  )
}
