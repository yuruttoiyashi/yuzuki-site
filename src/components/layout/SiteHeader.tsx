import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { siteRoutes } from '../../app/routes'
import { siteInfo } from '../../data/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <div className="header-inner">
        <Link className="brand" to="/" onClick={() => setOpen(false)}><span className="brand-name">{siteInfo.name}</span><span className="brand-en">{siteInfo.englishName}</span></Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><span>{open ? '閉じる' : 'メニュー'}</span><i aria-hidden="true" /></button>
        <nav id="mobile-menu" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="メインナビゲーション">
          {siteRoutes.map((item) => <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'active' : ''} aria-current={pathname === item.path ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</NavLink>)}
        </nav>
      </div>
    </header>
  )
}
