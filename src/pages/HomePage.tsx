import { Link } from 'react-router-dom'
import { FaqAccordion } from '../components/content/FaqAccordion'
import { FlowSteps } from '../components/content/FlowSteps'
import { SalonInfo } from '../components/content/SalonInfo'
import { MenuList } from '../components/menu/MenuList'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { therapist } from '../data/site'
import heroImage from '../assets/images/yuzuki-hero.webp'
import therapistImage from '../assets/images/yuzuki-therapist.webp'

const worries = ['夕方になると、目の奥が重い', '首や肩にいつも力が入っている', '眠っても、休んだ気がしない', '頭の中で考えごとが止まらない']
const features = [
  ['01', '一人ずつの、完全予約制', 'ほかのお客様と顔を合わせない静かな個室。音や会話に気をつかわず、自分のためだけの時間を過ごせます。'],
  ['02', '首・肩・目元まで丁寧に', '頭だけではなく、デスクワークでこわばりやすい首肩や目元まで。その日の状態に合わせて触れ方を調整します。'],
  ['03', '休息のために整えた空間', '明るさ、音、香りを控えめに。木・石・リネンの自然素材に包まれ、深く息をつける環境を整えています。'],
]

export function HomePage() {
  return <>
    <section className="home-hero"><div className="hero-copy"><p className="eyebrow">YUZUKI DRY HEAD SPA</p><p className="hero-brand">癒し処 結月</p><h1 aria-label="がんばる毎日に、深い休息を。">がんばる毎日に、<br />深い休息を。</h1><p className="hero-lead">頭と心を静かにほどく、二子玉川の<span className="keep-together">女性専用ドライヘッドスパ。</span></p><Link className="button" to="/reserve">予約する</Link></div><img className="hero-visual" src={heroImage} width="1586" height="992" alt="木と石、やわらかな間接照明で整えた結月の施術室" fetchPriority="high" /></section>

    <Reveal><section className="concept section"><p className="vertical-copy">何もしない時間を、あなたの予定に。</p><div><SectionHeading eyebrow="CONCEPT" title={<>休むことも、毎日を<span className="keep-together">整えるひとつの習慣。</span></>} /><p>仕事のこと、家のこと、誰かのこと。気づけば、自分の疲れだけを後回しにしていませんか。</p><p>結月は、忙しさの外へそっと離れ、思考と身体の力を抜くための小さな場所です。眠らなければとがんばる必要も、会話を続ける必要もありません。ただ目を閉じて、ゆっくり呼吸をする。そのための時間をご用意しています。</p></div></section></Reveal>

    <section className="worries section-dark"><div className="section-inner"><SectionHeading eyebrow="FOR YOUR DAILY FATIGUE" title={<><span className="keep-together">こんなお疲れは</span><span className="keep-together">ありませんか？</span></>} light /><ul>{worries.map((item) => <li key={item}>{item}</li>)}</ul><p>ひとつでも思い当たるなら、頭を休ませる時間が必要なのかもしれません。</p></div></section>

    <section className="features section"><SectionHeading eyebrow="WHY YUZUKI" title={<><span className="keep-together">深く休むための、</span><span className="keep-together">3つのこだわり</span></>} /><div className="feature-lines">{features.map(([num, title, text]) => <Reveal key={num}><article><span>{num}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div></section>

    <section className="popular-menu section"><div className="section-inner"><SectionHeading eyebrow="POPULAR MENU" title={<><span className="keep-together">働く毎日に寄り添う、</span><span className="keep-together">75分。</span></>} description="目・首・肩までゆっくり触れる、結月で最も選ばれているコースです。" /><MenuList featuredOnly /><Link className="text-link" to="/menu">すべてのメニューを見る <span aria-hidden="true">→</span></Link></div></section>

    <section className="flow section"><SectionHeading eyebrow="FIRST VISIT" title={<><span className="keep-together">初めての方にも、安心して</span><span className="keep-together">休んでいただくために。</span></>} /><FlowSteps /></section>

    <section className="therapist section-dark"><img className="therapist-visual" src={therapistImage} width="1122" height="1402" loading="lazy" alt="結月のオーナーセラピスト、水城紗月" /><div><SectionHeading eyebrow="THERAPIST" title={therapist.name} light /><p className="therapist-role">{therapist.role} / {therapist.nameKana}</p><blockquote>「{therapist.message}」</blockquote><p>{therapist.profile}</p><Link className="text-link light" to="/salon">セラピストとサロンについて <span aria-hidden="true">→</span></Link></div></section>

    <section className="space section"><img className="space-visual" src={heroImage} width="1586" height="992" loading="lazy" alt="木と石の自然素材を取り入れた静かなサロン空間" /><div><SectionHeading eyebrow="SALON SPACE" title={<><span className="keep-together">日常の音から</span><span className="keep-together">離れる、</span><span className="keep-together">静かな一室。</span></>} /><p>照明を少し落とし、耳に届く音も、香りも控えめに。完全予約制だからこそ、一人ひとりが落ち着いて過ごせる余白を大切にしています。</p><Link className="text-link" to="/salon">サロン空間を見る <span aria-hidden="true">→</span></Link></div></section>

    <section className="faq section"><SectionHeading eyebrow="FAQ" title="よくあるご質問" /><FaqAccordion limit={5} /><Link className="text-link" to="/salon">そのほかのご質問を見る <span aria-hidden="true">→</span></Link></section>

    <section className="access section"><div><SectionHeading eyebrow="ACCESS" title="店舗情報" /><SalonInfo /></div><div className="map-placeholder"><p>二子玉川駅<br /><strong>徒歩5分</strong></p><small>詳細住所はご予約確定後にご案内します</small></div></section>

    <section className="closing-cta"><p className="eyebrow">RESERVATION</p><h2>今日までがんばった自分へ、<br />静かな休息を。</h2><p>ご予約は24時間、Webフォームから受け付けています。</p><Link className="button button-light" to="/reserve">予約する</Link></section>
  </>
}
