export type SiteInfo = {
  name: string
  nameKana: string
  englishName: string
  tagline: string
  address: string
  nearestStation: string
  hours: string
  lastReception: string
  closed: string
  payments: string
  parking: string
  reservationPolicy: '完全予約制'
  audience: '女性専用'
}

export type Therapist = {
  name: string
  nameKana: string
  role: string
  message: string
  profile: string
}

export const siteInfo: SiteInfo = {
  name: '癒し処 結月',
  nameKana: 'ゆづき',
  englishName: 'YUZUKI DRY HEAD SPA',
  tagline: 'がんばる毎日に、深い休息を。',
  address: '東京都世田谷区玉川2丁目（建物名・部屋番号は予約確定後にご案内します）',
  nearestStation: '東急田園都市線・大井町線 二子玉川駅より徒歩5分',
  hours: '10:00〜20:00',
  lastReception: '最終受付 18:30',
  closed: '火曜日・不定休',
  payments: '現金、主要クレジットカード、交通系電子マネー',
  parking: '専用駐車場はありません。近隣のコインパーキングをご利用ください。',
  reservationPolicy: '完全予約制',
  audience: '女性専用',
}

export const therapist: Therapist = {
  name: '水城 紗月',
  nameKana: 'みずき さつき',
  role: 'オーナーセラピスト',
  message: 'ここでは、がんばらなくて大丈夫です。',
  profile: '忙しい毎日の中で、自分の疲れに気づくことさえ後回しになってしまう女性を多く見てきました。結月では、その日の状態や過ごし方を丁寧に伺い、静かに力を抜ける時間を整えます。会話を控えて休みたい方も、どうぞ気兼ねなくお知らせください。',
}

export const navigation = [
  { path: '/', label: 'トップ' },
  { path: '/menu', label: 'メニュー' },
  { path: '/salon', label: '結月について' },
  { path: '/reserve', label: 'ご予約' },
] as const
