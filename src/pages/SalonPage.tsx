import { PageHero } from '../components/ui/PageHero'
import { FaqAccordion } from '../components/content/FaqAccordion'
import { FlowSteps } from '../components/content/FlowSteps'
import { SalonInfo } from '../components/content/SalonInfo'
import { SectionHeading } from '../components/ui/SectionHeading'
import { siteInfo, therapist } from '../data/site'
import treatmentImage from '../assets/images/yuzuki-treatment.webp'
import therapistImage from '../assets/images/yuzuki-therapist.webp'

export function SalonPage() {
  return <>
    <PageHero eyebrow="ABOUT YUZUKI" title="結月について" lead="一人ずつの時間を大切にする、静かなプライベートサロンです。" />
    <section className="salon-philosophy section"><div><SectionHeading eyebrow="OUR PHILOSOPHY" title="ふっと力を抜ける場所でありたい。" /><p>疲れているときほど、「きちんと休む」ことさえ難しくなるものです。結月では、決まった手順を一方的に進めるのではなく、その日の呼吸や身体のこわばりを感じながら、触れる強さとリズムを整えます。</p><p>強い刺激で変化を求めるのではなく、安心して身を預けられる穏やかな施術を大切にしています。</p></div><img className="salon-detail-visual" src={treatmentImage} width="1448" height="1086" loading="lazy" alt="照明を落とした個室で頭をゆっくりほぐすドライヘッドスパ施術" /></section>
    <section className="environment section-dark"><div className="section-inner"><SectionHeading eyebrow="PRIVATE SPACE" title="一人のために整える、静かな空間。" light /><div className="environment-grid"><article><span>LIGHT</span><h3>目を休める明るさ</h3><p>眩しさを抑えた間接照明で、お迎えから施術後まで落ち着ける環境に。</p></article><article><span>SOUND</span><h3>余白のある音</h3><p>大きな音や過度な演出を避け、眠りを妨げない静けさを保ちます。</p></article><article><span>CLEAN</span><h3>清潔なリネン</h3><p>お客様ごとに交換し、触れる場所と道具の衛生管理を徹底します。</p></article></div></div></section>
    <section className="profile section"><img className="profile-visual" src={therapistImage} width="1122" height="1402" loading="lazy" alt="結月のオーナーセラピスト、水城紗月" /><div><SectionHeading eyebrow="THERAPIST" title={therapist.name} /><p className="therapist-role">{therapist.role} / {therapist.nameKana}</p><blockquote>「{therapist.message}」</blockquote><p>{therapist.profile}</p><p>施術前に、触れてほしくない場所や苦手な香り、会話の希望も伺います。初めての方も、自分のペースでお過ごしください。</p></div></section>
    <section className="flow section"><SectionHeading eyebrow="FIRST VISIT" title="初めてのご来店の流れ" /><FlowSteps /></section>
    <section className="salon-access section"><div><SectionHeading eyebrow="ACCESS" title="店舗・アクセス" /><p className="access-policy">{siteInfo.audience}・{siteInfo.reservationPolicy}</p><SalonInfo /><p className="parking-note">{siteInfo.parking}</p></div><div className="map-placeholder"><p>二子玉川駅<br /><strong>徒歩5分</strong></p><small>建物名・部屋番号は予約確定後にご案内します</small></div></section>
    <section className="faq section"><SectionHeading eyebrow="FAQ" title="よくあるご質問" /><FaqAccordion /></section>
  </>
}
