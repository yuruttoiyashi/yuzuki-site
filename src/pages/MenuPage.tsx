import { PageHero } from '../components/ui/PageHero'
import { MenuList } from '../components/menu/MenuList'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Link } from 'react-router-dom'

export function MenuPage() {
  return <>
    <PageHero eyebrow="MENU" title="メニュー" lead="その日の疲れに合わせて選べる、3つの休息時間。すべて税込価格です。" />
    <section className="section menu-page"><SectionHeading eyebrow="COURSES" title="今のあなたに、ちょうどよい休み方を。" /><MenuList /><Link className="button" to="/reserve">メニューを選んで予約する</Link></section>
    <section className="course-guide section-dark"><div className="section-inner"><SectionHeading eyebrow="HOW TO CHOOSE" title="コース選びに迷ったら" light /><div className="guide-grid"><div><h3>初めて・定期ケア</h3><p>まずは60分のベーシックから。頭と首を中心に、結月の施術をゆっくり体験できます。</p></div><div><h3>PC・スマホ疲れ</h3><p>目元と首肩まで触れる75分の「巡り」がおすすめです。迷った場合はこちらをお選びください。</p></div><div><h3>疲れが重なった日</h3><p>デコルテまで含む90分の「深眠」で、予定を詰め込まない休息時間を。</p></div></div></div></section>
    <section className="menu-notes section"><SectionHeading eyebrow="BEFORE YOUR VISIT" title="ご予約の前に" /><ul><li>施術時間とは別に、初回はカウンセリングとお会計で約20分いただきます。</li><li>医療行為ではありません。発熱や強い痛みがある場合はご利用をお控えください。</li><li>妊娠中、通院中の方は事前に主治医へご相談ください。</li></ul></section>
  </>
}
