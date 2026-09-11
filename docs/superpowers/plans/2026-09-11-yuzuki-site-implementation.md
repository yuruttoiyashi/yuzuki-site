# 癒し処 結月 Webサイト Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ドライヘッドスパ専門店「癒し処 結月」の、スマートフォン最優先で予約体験まで備えた4ページ構成の商用デモサイトを完成させる。

**Architecture:** React Routerによる静的な4ルート構成とし、店舗・メニュー・FAQの内容は型付きデータへ集約する。共通レイアウト、表示部品、予約フォームを責務ごとに分け、予約内容はブラウザ内の画面遷移だけに使用して外部送信・保存を行わない。

**Tech Stack:** React、Vite、TypeScript、Tailwind CSS、React Router、Vitest、Testing Library、AI生成画像

**Spec:** `docs/superpowers/specs/2026-09-11-yuzuki-site-design.md`

## Global Constraints

- ルートは `/`、`/menu`、`/salon`、`/reserve` の4つとする。
- 色は生成り `#F3EEE5` と墨色 `#292725` を中心に、くすみブラウン、石のグレー、控えめな真鍮色を使う。
- 和風テンプレート、旅館風、筆文字の多用、大量のカード、過剰なグラデーションを避ける。
- 本文は原則16px以上、操作ラベルは14px以上とする。
- メニューは60分7,700円、75分9,500円、90分11,800円の3コースで、価格は税込表示とする。
- 女性専用・完全予約制、二子玉川駅徒歩5分、営業時間10:00〜20:00、火曜・不定休という架空設定を全ページで統一する。
- 予約情報をネットワーク送信、LocalStorage保存、Cookie保存しない。
- フッターと予約完了画面にポートフォリオ用デモサイトであることを明記する。
- スマートフォン画面下に固定予約ボタンを表示する。
- `prefers-reduced-motion` を尊重する。

---

## File Structure

```text
src/
  app/
    App.tsx                 # ルーティングと共通レイアウト
    routes.ts               # ナビゲーション定義
  components/
    layout/SiteHeader.tsx   # デスクトップ・スマホ共通ヘッダー
    layout/SiteFooter.tsx   # 店舗情報・デモ表記
    layout/FixedReserveButton.tsx
    ui/SectionHeading.tsx
    ui/PageHero.tsx
    ui/Reveal.tsx
    menu/MenuList.tsx
    menu/MenuItem.tsx
    content/FlowSteps.tsx
    content/FaqAccordion.tsx
    content/SalonInfo.tsx
    reserve/ReservationForm.tsx
    reserve/ReservationConfirm.tsx
    reserve/ReservationComplete.tsx
  data/site.ts              # 店舗・セラピスト・ナビ情報
  data/menus.ts             # 3コース
  data/faqs.ts              # FAQ
  features/reservation/types.ts
  features/reservation/validation.ts
  pages/HomePage.tsx
  pages/MenuPage.tsx
  pages/SalonPage.tsx
  pages/ReservePage.tsx
  styles/index.css          # Tailwind、トークン、共通動作
  test/setup.ts
  assets/images/            # 生成済みWebP画像3点
  main.tsx
tests/
  data/site-content.test.ts
  navigation.test.tsx
  reservation-validation.test.ts
  reservation-flow.test.tsx
  accessibility-basics.test.tsx
```

---

### Task 1: Vite基盤とテスト環境

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/styles/index.css`
- Create: `src/test/setup.ts`
- Create: `.gitignore`

**Interfaces:**
- Produces: `App(): JSX.Element`、`src/test/setup.ts`、`npm run dev|test|build`
- Consumes: なし

- [ ] **Step 1: Vite React TypeScriptプロジェクトと依存関係を設定する**

`package.json` に `dev`、`build`、`preview`、`test` のスクリプトを設け、React、React Router、Tailwind CSS、Vitest、Testing Library、jsdomを導入する。Viteの初期サンプル画面・ロゴ・カウンターは作らない。

- [ ] **Step 2: 最初の失敗テストを書く**

```tsx
import { render, screen } from '@testing-library/react'
import { App } from './App'

it('結月のサイト名を表示する', () => {
  render(<App />)
  expect(screen.getByText('癒し処 結月')).toBeInTheDocument()
})
```

- [ ] **Step 3: テストを実行して失敗を確認する**

Run: `npm test -- --run src/app/App.test.tsx`

Expected: FAIL（`App` または表示文字列が未実装）

- [ ] **Step 4: 最小のAppとデザイントークンを実装する**

`App` は見出し「癒し処 結月」を表示する。`index.css` に生成り、墨色、くすみブラウン、石グレー、真鍮色のCSS変数を定義し、本文16px以上、フォーカスリング、`prefers-reduced-motion` を設定する。

- [ ] **Step 5: テストとビルドを確認する**

Run: `npm test -- --run src/app/App.test.tsx && npm run build`

Expected: PASS、Vite build完了

- [ ] **Step 6: コミットする**

```bash
git add package.json vite.config.ts tsconfig*.json index.html src .gitignore
git commit -m "chore: initialize Yuzuki salon site"
```

---

### Task 2: 型付きコンテンツデータ

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/menus.ts`
- Create: `src/data/faqs.ts`
- Create: `tests/data/site-content.test.ts`

**Interfaces:**
- Produces: `SiteInfo`、`Therapist`、`MenuCourse`、`FaqItem`、`siteInfo`、`therapist`、`menuCourses`、`faqs`
- Consumes: なし

- [ ] **Step 1: コンテンツ整合性の失敗テストを書く**

```ts
expect(menuCourses.map(({ duration, price }) => [duration, price])).toEqual([
  [60, 7700], [75, 9500], [90, 11800],
])
expect(siteInfo.nearestStation).toContain('二子玉川駅')
expect(faqs.length).toBeGreaterThanOrEqual(6)
```

- [ ] **Step 2: テストを実行して失敗を確認する**

Run: `npm test -- --run tests/data/site-content.test.ts`

Expected: FAIL（データモジュール未作成）

- [ ] **Step 3: 型と実データを実装する**

3コースの名称・時間・税込料金・説明・施術範囲・対象の悩みを定義する。FAQには服装、メイク、整髪料、妊娠中、男性利用、予約変更、支払い、住所案内を自然な日本語で収録する。

- [ ] **Step 4: テストを通す**

Run: `npm test -- --run tests/data/site-content.test.ts`

Expected: PASS

- [ ] **Step 5: コミットする**

```bash
git add src/data tests/data/site-content.test.ts
git commit -m "feat: add salon content data"
```

---

### Task 3: 共通レイアウトと4ルート

**Files:**
- Create: `src/app/routes.ts`
- Modify: `src/app/App.tsx`
- Create: `src/components/layout/SiteHeader.tsx`
- Create: `src/components/layout/SiteFooter.tsx`
- Create: `src/components/layout/FixedReserveButton.tsx`
- Create: `src/components/ui/PageHero.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/MenuPage.tsx`
- Create: `src/pages/SalonPage.tsx`
- Create: `src/pages/ReservePage.tsx`
- Create: `tests/navigation.test.tsx`

**Interfaces:**
- Produces: `siteRoutes: Array<{ path: string; label: string }>` と4ページ、共通レイアウト
- Consumes: `siteInfo`、React Router

- [ ] **Step 1: ルーティングの失敗テストを書く**

```tsx
for (const [path, heading] of [
  ['/', 'がんばる毎日に、深い休息を。'],
  ['/menu', 'メニュー'],
  ['/salon', '結月について'],
  ['/reserve', 'ご予約'],
]) {
  window.history.pushState({}, '', path)
  const { unmount } = render(<App />)
  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
  unmount()
}
```

- [ ] **Step 2: テストを実行して失敗を確認する**

Run: `npm test -- --run tests/navigation.test.tsx`

Expected: FAIL（ルート未実装）

- [ ] **Step 3: 共通レイアウトとルートを実装する**

ヘッダーにはロゴ、TOP、メニュー、サロン、予約を配置する。スマホメニューはボタンで開閉し、`aria-expanded` と `aria-controls` を付ける。ページ遷移時はメニューを閉じ、ページ先頭へ移動する。フッターに店舗情報とデモ表記、スマホ下部に固定予約CTAを置く。

- [ ] **Step 4: テストとビルドを通す**

Run: `npm test -- --run tests/navigation.test.tsx && npm run build`

Expected: PASS、4ルート生成成功

- [ ] **Step 5: コミットする**

```bash
git add src/app src/components/layout src/components/ui/PageHero.tsx src/pages tests/navigation.test.tsx
git commit -m "feat: add shared layout and routes"
```

---

### Task 4: TOPページの商用コンテンツ

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/Reveal.tsx`
- Create: `src/components/menu/MenuItem.tsx`
- Create: `src/components/menu/MenuList.tsx`
- Create: `src/components/content/FlowSteps.tsx`
- Create: `src/components/content/FaqAccordion.tsx`
- Create: `src/components/content/SalonInfo.tsx`
- Create: `tests/accessibility-basics.test.tsx`

**Interfaces:**
- Produces: `SectionHeading`、`Reveal`、`MenuList`、`FlowSteps`、`FaqAccordion`、`SalonInfo`
- Consumes: `menuCourses`、`faqs`、`siteInfo`、`therapist`

- [ ] **Step 1: TOPの必須情報に対する失敗テストを書く**

```tsx
expect(screen.getByText('こんなお疲れはありませんか？')).toBeInTheDocument()
expect(screen.getByText('巡り − 首肩・眼精疲労ケア')).toBeInTheDocument()
expect(screen.getByText('水城 紗月')).toBeInTheDocument()
expect(screen.getByRole('button', { name: /服装/ })).toHaveAttribute('aria-expanded', 'false')
```

- [ ] **Step 2: テストを実行して失敗を確認する**

Run: `npm test -- --run tests/accessibility-basics.test.tsx`

Expected: FAIL（各セクション未実装）

- [ ] **Step 3: TOPの全セクションを実装する**

ファーストビュー、コンセプト、悩みへの共感、3つの特徴、人気メニュー、施術の流れ、セラピスト、空間、FAQ、店舗情報、最終CTAを実装する。章ごとに写真・文章・墨色背景を切り替え、同型カードの反復を避ける。

- [ ] **Step 4: FAQと表示アニメーションを実装する**

FAQは一問ずつ開閉でき、ボタンの状態を支援技術へ伝える。`Reveal` はIntersectionObserverを使い、未対応環境と動きを減らす設定では最初から表示する。

- [ ] **Step 5: テストを通す**

Run: `npm test -- --run tests/accessibility-basics.test.tsx`

Expected: PASS

- [ ] **Step 6: コミットする**

```bash
git add src/pages/HomePage.tsx src/components tests/accessibility-basics.test.tsx
git commit -m "feat: build complete home page"
```

---

### Task 5: メニュー・サロン詳細ページ

**Files:**
- Modify: `src/pages/MenuPage.tsx`
- Modify: `src/pages/SalonPage.tsx`
- Modify: `tests/data/site-content.test.ts`

**Interfaces:**
- Produces: 完成版 `MenuPage`、`SalonPage`
- Consumes: Task 2とTask 4のデータ・共通部品

- [ ] **Step 1: 下層ページの失敗テストを追加する**

```tsx
expect(screen.getByText('60分')).toBeInTheDocument()
expect(screen.getByText('7,700円')).toBeInTheDocument()
expect(screen.getByText('完全予約制')).toBeInTheDocument()
expect(screen.getByText(/予約確定後に/)).toBeInTheDocument()
```

- [ ] **Step 2: テストを実行して失敗を確認する**

Run: `npm test -- --run tests/data/site-content.test.ts`

Expected: FAIL（詳細表示未実装）

- [ ] **Step 3: メニューページを実装する**

各コースの時間、税込料金、説明、施術範囲、向いている悩みを表示する。75分コースに「人気」ラベルを付けるが、他コースを弱く見せない。料金表の直後に予約CTAを置く。

- [ ] **Step 4: サロンページを実装する**

施術への考え方、空間、衛生面、水城紗月の紹介、初回来店の流れ、アクセス、住所案内方法を掲載する。医療行為や治療効果をうたう表現は使わない。

- [ ] **Step 5: テストとビルドを通す**

Run: `npm test -- --run tests/data/site-content.test.ts && npm run build`

Expected: PASS、build成功

- [ ] **Step 6: コミットする**

```bash
git add src/pages/MenuPage.tsx src/pages/SalonPage.tsx tests/data/site-content.test.ts
git commit -m "feat: add menu and salon pages"
```

---

### Task 6: 予約フォームの検証ロジック

**Files:**
- Create: `src/features/reservation/types.ts`
- Create: `src/features/reservation/validation.ts`
- Create: `tests/reservation-validation.test.ts`

**Interfaces:**
- Produces: `ReservationData`、`ReservationErrors`、`validateReservation(data, today): ReservationErrors`
- Consumes: `menuCourses` のコースID

- [ ] **Step 1: 検証ロジックの失敗テストを書く**

```ts
const errors = validateReservation({
  courseId: '', preferredDate: '2026-09-10', preferredTime: '',
  name: '', email: 'invalid', phone: 'abc', concerns: '', agreed: false,
}, new Date('2026-09-11T00:00:00Z'))

expect(errors.courseId).toBe('コースを選択してください')
expect(errors.preferredDate).toBe('本日以降の日付を選択してください')
expect(errors.email).toBe('メールアドレスを正しく入力してください')
expect(errors.agreed).toBe('注意事項への同意が必要です')
```

- [ ] **Step 2: テストを実行して失敗を確認する**

Run: `npm test -- --run tests/reservation-validation.test.ts`

Expected: FAIL（関数未実装）

- [ ] **Step 3: 純粋関数として検証を実装する**

氏名、コース、希望日、希望時間、メール、電話、同意を検証する。日付はローカル日付の `YYYY-MM-DD` として比較し、時差で前日判定にならないようにする。

- [ ] **Step 4: テストを通す**

Run: `npm test -- --run tests/reservation-validation.test.ts`

Expected: PASS

- [ ] **Step 5: コミットする**

```bash
git add src/features/reservation tests/reservation-validation.test.ts
git commit -m "feat: add reservation validation"
```

---

### Task 7: 予約の入力・確認・完了フロー

**Files:**
- Create: `src/components/reserve/ReservationForm.tsx`
- Create: `src/components/reserve/ReservationConfirm.tsx`
- Create: `src/components/reserve/ReservationComplete.tsx`
- Modify: `src/pages/ReservePage.tsx`
- Create: `tests/reservation-flow.test.tsx`

**Interfaces:**
- Produces: `ReservationForm`、`ReservationConfirm`、`ReservationComplete` と `ReservePage` の3状態
- Consumes: `ReservationData`、`validateReservation`、`menuCourses`

- [ ] **Step 1: 予約フローの失敗テストを書く**

```tsx
await user.click(screen.getByRole('button', { name: '入力内容を確認する' }))
expect(screen.getByText('コースを選択してください')).toBeInTheDocument()

// 正しい値を入力後
await user.click(screen.getByRole('button', { name: '入力内容を確認する' }))
expect(screen.getByRole('heading', { name: 'ご予約内容の確認' })).toBeInTheDocument()
await user.click(screen.getByRole('button', { name: 'この内容で送信する' }))
expect(screen.getByText(/実際の予約は確定していません/)).toBeInTheDocument()
```

- [ ] **Step 2: テストを実行して失敗を確認する**

Run: `npm test -- --run tests/reservation-flow.test.tsx`

Expected: FAIL（フォーム未実装）

- [ ] **Step 3: 入力画面を実装する**

各入力に可視ラベル、必須表示、説明、エラー用 `aria-describedby` を付ける。送信時に最初のエラーへフォーカスを移す。希望時間は10:00〜18:30の30分刻みとする。

- [ ] **Step 4: 確認・修正・完了を実装する**

確認画面で全項目を表示し、「修正する」で入力状態を保って戻る。「この内容で送信する」はネットワーク通信を行わず完了状態へ切り替える。完了画面にデモ表記とTOPへのリンクを置く。

- [ ] **Step 5: LINE相談導線を実装する**

実在しないURLへ遷移させず、デモ用ボタンとして「実店舗ではLINE予約へ接続します」という説明を表示する。

- [ ] **Step 6: テストを通す**

Run: `npm test -- --run tests/reservation-flow.test.tsx`

Expected: PASS

- [ ] **Step 7: コミットする**

```bash
git add src/components/reserve src/pages/ReservePage.tsx tests/reservation-flow.test.tsx
git commit -m "feat: add reservation demo flow"
```

---

### Task 8: ブランド画像・レスポンシブ仕上げ・メタ情報

**Files:**
- Create: `src/assets/images/yuzuki-hero.webp`
- Create: `src/assets/images/yuzuki-treatment.webp`
- Create: `src/assets/images/yuzuki-therapist.webp`
- Modify: `src/styles/index.css`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/SalonPage.tsx`
- Modify: `src/components/ui/PageHero.tsx`
- Modify: `index.html`

**Interfaces:**
- Produces: 最終画像アセット、レスポンシブ表示、ページ別タイトル更新関数
- Consumes: Task 3〜7の全画面

- [ ] **Step 1: 3枚の結月専用画像を制作して目視確認する**

施術室、施術中の手元、女性セラピストを同じ空間・色調で制作する。画像内に文字、ロゴ、透かし、不自然な手指がないことを確認し、WebPへ最適化する。

- [ ] **Step 2: 画像を実装する**

ファーストビューは人物より空間を主役にし、文字の可読性を保つ。施術画像とセラピスト画像には具体的な日本語の代替テキストを設定し、幅・高さまたはアスペクト比を予約してレイアウト移動を防ぐ。

- [ ] **Step 3: レスポンシブ仕上げを行う**

360px、768px、1280pxを基準に、非対称配置をスマホでは自然な縦並びへ変える。固定予約ボタン分の下余白を確保し、横スクロール、文字切れ、画像の不自然な切り抜きをなくす。

- [ ] **Step 4: ページ別メタ情報を実装する**

各ルートで `document.title` とdescriptionを更新する。TOPは「癒し処 結月｜二子玉川のドライヘッドスパ」、下層は「メニュー｜癒し処 結月」など固有タイトルにする。SNS用OG画像は追加しない。

- [ ] **Step 5: ビルドを確認する**

Run: `npm run build`

Expected: PASS、画像パスを含むエラーなし

- [ ] **Step 6: コミットする**

```bash
git add src/assets src/styles src/pages src/components/ui/PageHero.tsx index.html
git commit -m "feat: complete Yuzuki visual design"
```

---

### Task 9: 最終検証と公開準備

**Files:**
- Modify: 必要な不具合が見つかったファイルのみ
- Create: `README.md`

**Interfaces:**
- Produces: 検証済みの完成サイトと利用手順
- Consumes: Task 1〜8の成果物

- [ ] **Step 1: 全自動テストを実行する**

Run: `npm test -- --run`

Expected: 全テストPASS

- [ ] **Step 2: 本番ビルドを実行する**

Run: `npm run build`

Expected: exit code 0、TypeScriptエラーなし

- [ ] **Step 3: 主要導線を確認する**

TOP、メニュー、サロン、予約へ直接アクセスし、ヘッダー、フッター、固定CTA、スマホメニュー、FAQ、予約の入力・確認・修正・完了を確認する。

- [ ] **Step 4: 表示とアクセシビリティを確認する**

360px、768px、1280pxで横はみ出し、固定CTAの重なり、コントラスト、フォーカス表示を確認する。キーボードだけで全リンク、FAQ、フォーム、スマホメニューを操作する。動きを減らす設定でRevealが内容を隠さないことを確認する。

- [ ] **Step 5: コピーと安全性を確認する**

全ページで料金・営業時間・住所案内が一致すること、治療効果を断定していないこと、Lorem ipsumや未決定表記がないこと、予約時にネットワーク送信とブラウザ保存が発生しないことを確認する。

- [ ] **Step 6: READMEを作成する**

開発開始、テスト、ビルド、プレビューの4コマンドと、デモサイト・予約非送信・架空店舗である注意事項を記載する。

- [ ] **Step 7: 最終コミットを作成する**

```bash
git add README.md src tests
git commit -m "docs: add project usage and demo notes"
```

- [ ] **Step 8: コミット状況を確認する**

Run: `git status --short && git log --oneline -10`

Expected: 作業ツリーに意図しない変更がなく、Task 1〜9のコミットが並んでいる
