export type MenuCourse = {
  id: 'basic' | 'meguri' | 'shinmin'
  name: string
  subtitle: string
  duration: number
  price: number
  description: string
  treatment: string[]
  recommendedFor: string[]
  popular?: boolean
}

export const menuCourses: MenuCourse[] = [
  {
    id: 'basic',
    name: '結月 ベーシック',
    subtitle: 'はじめての方にもおすすめの基本コース',
    duration: 60,
    price: 7700,
    description: '頭・首まわりを中心に、日常の疲れをゆっくりほどく基本コースです。静かな時間の中で、深呼吸できる感覚を取り戻していきます。',
    treatment: ['カウンセリング', '頭部', '首まわり'],
    recommendedFor: ['短時間でもしっかり休みたい方', 'ドライヘッドスパが初めての方'],
  },
  {
    id: 'meguri',
    name: '巡り − 首肩・眼精疲労ケア',
    subtitle: 'デスクワークが続く方へ',
    duration: 75,
    price: 9500,
    description: 'PC・スマートフォンによる疲れを想定し、頭・首・肩・目元を重点的にケア。仕事終わりにも選ばれている結月の人気コースです。',
    treatment: ['カウンセリング', '頭部', '首・肩', '目元'],
    recommendedFor: ['目の重さが気になる方', '首肩のこわばりを感じる方', '頭の切り替えが苦手な方'],
    popular: true,
  },
  {
    id: 'shinmin',
    name: '深眠 − プレミアム',
    subtitle: '何も考えない、深い休息のために',
    duration: 90,
    price: 11800,
    description: '頭・首・肩・デコルテまでじっくり施術する、深い休息のためのプレミアムコースです。忙しさから少し長く離れたい日に。',
    treatment: ['カウンセリング', '頭部', '首・肩', '目元', 'デコルテ'],
    recommendedFor: ['疲れが重なっている方', '眠りが浅いと感じる方', '全身の力を抜く時間が欲しい方'],
  },
]

export const formatPrice = (price: number) => `${price.toLocaleString('ja-JP')}円（税込）`
