# 株式会社増保鉄工 採用サイト（1ページ完結）

<https://www.kensetumap.com/company/684398/profile.php> を元に、採用特化のワンページサイトとして再設計したもの。

## 見る

```
open index.html
```

**ビルド不要。** そのままブラウザで開けます。

```
index.html          全コンテンツ
assets/style.css    デザイントークン + コンポーネント
assets/app.js       モバイルメニュー・地図の遅延読み込み・ヘッダーの状態変化のみ
robots.txt / sitemap.xml / llms.txt / icon.svg / site.webmanifest
```

## Nuxt から静的HTMLへ書き換えました

当初 Nuxt 4 + Tailwind v4 で作っていましたが、静的HTMLに書き換えています。

**デザインは変えていません。** トークン（配色・タイポスケール・余白）、セクション構成、
アートディレクション（鋼材の図面 / 溶接光の青1点）はそのまま踏襲し、
Tailwind のユーティリティを対応する素のCSSに置き換えただけです。

| 項目 | Nuxt版 | 静的HTML版 |
|---|---|---|
| ビルド | `npm install` → `npm run generate` が必要 | **不要** |
| 容量 | 239MB（node_modules含む） | **580KB** |
| 本文の在処 | `useCompanyData.ts`（JSの配列） | **HTML内に実在** |
| JS | Nuxt ランタイム全体 | **約50行**（Vue はCDN） |

JSを切っても全文が読め、全リンクが機能します。

旧版は `.archive/` に残してあります（`useCompanyData.ts` に出典と
「創作しないこと」の判断根拠がコメントで残っているため）。

### 初回のみ必要な設定

```bash
cd masuho-recruit
git init
git add -A
git commit -m "初回コミット: 増保鉄工 採用サイト"
git branch -M main
git remote add origin git@github.com:<ユーザー名>/<リポジトリ名>.git
git push -u origin main
```

push 後、GitHub のリポジトリで **Settings → Pages → Build and deployment → Source** を **「GitHub Actions」** に変更してください（「Deploy from a branch」ではありません）。これで Actions が走り、数分で公開されます。

### 独自ドメインを使う場合

1. `public/CNAME` を作成し、1行目にドメインのみ記述（例: `masuho-tekko.jp`）
2. DNS に以下を設定
   - Apex（`example.jp`）→ A レコードを `185.199.108.153` / `.109.153` / `.110.153` / `.111.153` の4本
   - サブドメイン（`www.example.jp`）→ CNAME を `<ユーザー名>.github.io`
3. Settings → Pages → Custom domain にドメインを入力し、**Enforce HTTPS** にチェック

あわせて以下3箇所のURLを実ドメインに差し替えてください（現在は仮値 `masuho-tekko.example.jp`）。

| ファイル | 箇所 |
|---|---|
| `app/composables/useCompanyData.ts` | `COMPANY.url` |
| `public/robots.txt` | `Sitemap:` 行 |
| `public/sitemap.xml` | `<loc>` |

canonical・OGP・JSON-LD はすべて `COMPANY.url` を参照しているため、この1箇所を直せば連動します。

### 技術的な補足

- **`.nojekyll`** をワークフロー内で生成しています。これがないと GitHub Pages の Jekyll が `_nuxt/` （先頭アンダースコア）を無視し、CSS と JS が全て 404 になります
- **ルート配置前提**です。`https://<user>.github.io/<repo>/` のようなサブパスで公開する場合は `nuxt.config.ts` に `app: { baseURL: '/<repo>/' }` の追加が必要です
- SSG（完全な静的HTML）なのでサーバ不要。GitHub Pages の無料枠で運用できます

## 技術構成

| 項目 | 採用 |
|---|---|
| 構成 | 静的HTML（ビルド工程なし） |
| CSS | 手書きCSS + カスタムプロパティ |
| JS | Vue 3（CDN）を約50行だけ。モバイルメニューと地図の遅延読み込み |
| フォント | Anton（数値・見出し）+ Noto Sans JP（本文） |
| 画像 | **ラスタ画像ゼロ。全てインラインSVG（12点）** |

ランニングコストは静的ホスティング（Netlify / Cloudflare Pages / GitHub Pages の無料枠）のみ。
CMS もビルドサーバも不要です。**更新は `index.html` を直接編集**します。

## アートディレクション

> 鋼材の図面のように——1px罫の直交グリッドと極端なタイポ対比で「9人が鉄を組む会社」の正確さを示し、青は溶接光のように一点だけ差す。

### 色の継承

元ページのCSSを実測し、アクセント色を継承しました。

| 役割 | 元ページ実測値 | 本デザイン（OKLCH） |
|---|---|---|
| アクセント（溶接光の青） | `#0031e6` | `oklch(45% 0.256 264)` |
| 構造色（鋼の黒） | — | `oklch(24% 0.008 250)` |
| 地（図面の紙） | `#fff` | `oklch(97.5% 0.002 250)` |

なお、元ページに多く含まれていたアースカラー（`#637628` `#993300` `#f1eae0` 等）は **kensetumap.com というポータル側の共通デザイン** であり、増保鉄工のブランド色ではありません。そのため継承対象から外し、ページ固有の `#0031e6` のみを引き継いでいます。

## 画像について（重要）

元ページに掲載されていた6枚の画像（`5331_ahm_top_photo.png` 等）は、URLの構造から **ポータルが全社共通で使っている素材** と判断しました。増保鉄工様の実際の現場写真ではありません。

そのため全ビジュアルを**オリジナルSVGで新規作成**しています。

- `app/components/art/HeroArtwork.vue` — 鉄骨トラスの図面（ヒーロー、520×420）
- `app/components/art/WorkIcon.vue` — 6工種のアイコン（鉄骨・橋梁・鉄塔・タンク・看板・水門）

いずれもベクターなので**どれだけ拡大しても粗くなりません**。合計12点のSVGを使って、ページ全体でラスタ画像は0枚です。将来、実際の現場写真が用意できた段階で差し替えられる構造にしています。

## ページ構成（1ページ完結）

上から順に、応募者の疑問が解ける順序で並べています。

| # | セクション | 目的 |
|---|---|---|
| 1 | ヒーロー | 「鉄を組んで、地図に残す。」＋3文で事業内容を提示 |
| 2 | 数字で見る | 9名 / 6種 / 2拠点 を極太タイポで（MetalTec方式） |
| 3 | 仕事内容 | 6工種をSVGアイコン付きグリッドで |
| 4 | 働く環境 | 待遇の前に「誰とどう働くか」（Netflix方式） |
| 5 | 募集要項 | **枠のみ（後述）** ＋ 応募から入社までの4ステップ |
| 6 | 会社概要 | NAP＋地図（クリック読込） |
| 7 | FAQ | 5問。構造化データと完全一致 |
| 8 | 最終CTA | 電話番号を大きく1点だけ |

## 募集要項が空欄である理由

**給与・勤務時間・休日・待遇は、公開情報のどこにも存在しませんでした。**

採用サイトで最も重要な情報ですが、ここを推測で埋めると求職者に誤情報を与え、入社後のトラブルに直結します。したがって項目の枠とプレースホルダのみを用意し、画面上にも「この欄は準備中です」と明示しています。

記入は `app/composables/useCompanyData.ts` の `RECRUIT_FIELDS` を編集してください。

同じ理由で **`JobPosting` 構造化データも意図的に出力していません。** 給与・雇用形態が未確定のまま出すとGoogleしごと検索のポリシー違反になるためです。条件確定後、`baseSalary` / `employmentType` / `validThrough` を揃えて追加してください（`app/pages/index.vue` にコメントで記載）。

## データの出典

| 情報 | 出典 | 確度 |
|---|---|---|
| 会社名・代表者・住所・電話・資本金・許可番号・事業内容 | kensetumap.com 掲載ページ | 高 |
| 従業員数9名・館林事業所 | gBizINFO（法人番号 5070001039407） | 高 |
| 緯度経度 36.23311874 / 139.64977733 | 元ページの地図スクリプトから取得 | 高 |
| 6工種の説明文 | **書き下ろし** | — |
| 選考フロー4ステップ | **一般的な流れとして作成** | 要確認 |

元ページの工種解説文は「鉄骨とは何か」という**業界一般の説明**で、増保鉄工様固有の内容ではありませんでした。そのため自社の語り口に書き直しています。

## SEO / MEO / AIO

- **SEO** — title / description / canonical / hreflang / OGP全項目 / Twitter Card / robots。未記入なし
- **MEO** — `Organization + LocalBusiness` JSON-LD に住所・座標・対応エリア。NAPは `<address>` でクロール可能なテキスト出力（画像化していない）
- **AIO** — `<main>` 冒頭に「何の会社か」を答える3文 / 質問形見出し + 直後に回答 / `FAQPage` JSON-LD は画面文言と**5件完全一致** / `llms.txt` 設置 / `GPTBot` `ClaudeBot` `PerplexityBot` 許可

## 検証結果（Playwright 実測）

- 375 / 768 / 1440px すべて**横スクロールなし**
- コントラスト比 最低 **6.91:1**（WCAG AA 4.5:1 を全項目クリア）— body 16.82 / 数値 15.03 / フッター 15.03
- タッチターゲット44px未満 **0件**
- 見出しレベルの飛びなし、`<h1>` は1つ
- Tabキーで2px青のフォーカスリング表示、skip-linkがタブ順の先頭
- モバイルメニュー: `aria-expanded` 連動・スクロールロック動作
- SSR HTMLに全文出力（50KB、JS注入ではない）
- `prefers-reduced-motion` 対応

## 公開前に差し替えが必要なもの

1. **ドメイン** — `useCompanyData.ts` の `url` が `masuho-tekko.example.jp`（仮）。`public/robots.txt` と `sitemap.xml` も同様
2. **募集要項の各項目** — 上記のとおり空欄
3. **`ogp.jpg`（1200×630）/ `favicon.ico` / `apple-touch-icon.png`** — 未配置（`icon.svg` のみ暫定生成）
4. **選考フロー** — 実際の流れと異なる場合は `FLOW` を修正
5. **実際の現場写真** — 用意でき次第、SVGと併用または差し替え可能
