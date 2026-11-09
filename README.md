# モルメモ 大会

モルックの大会運営アプリ。普段の試合を記録する「モルメモ」から、大会の機能だけを独立させたもの。

- Web 版: https://asaitoshiki.github.io/molmemo-taikai/
- 普段の試合（モルメモ本体）: https://asaitoshiki.github.io/molkkyscore/

## できること

| 機能 | 内容 |
| --- | --- |
| この端末だけで回す大会 | チームとメンバーを登録して、総当たり・トーナメントの対戦表を自動で作る。1 台で記録する |
| 本部で運営する大会 | 予選リーグから決勝まで、ブロック分け・順位・勝ち上がりを本部で管理する。ポイント制や 100 点ゲーム、ターン制限などの大会ルールに合わせられる |
| コートの記録 | 本部が配る QR / リンクから各コートが参加し、記録したスコアシートを本部へ送る。Web 版ならインストール不要 |
| スコア入力 | 倒したスキットルをタップするだけで得点を計算。50 点超過・3 回連続ミス・時間切れ・モルックアウトまで判定する |
| 画像で共有 | 試合結果カードとスコアシートを画像にして共有・保存 |

記録は端末の localStorage に保存する。本部で運営する大会だけ Firebase Realtime Database を使う（[docs/event-firebase.md](docs/event-firebase.md)）。

Web 版はモルメモ本体と同じ場所（asaitoshiki.github.io）で動くため、初めて開いたときにモルメモ本体に残っている大会の記録を引き取る（`src/store/adoptOldRecords.ts`）。

## 開発

```bash
npm install
npm run dev        # 開発サーバー
npm test           # ルール計算のテスト
npm run typecheck  # 型チェック
npm run build      # 本番ビルド（dist/）
```

## 構成

```
src/
  domain/     ルール計算（純粋関数のみ。UI にもストアにも依存しない）
    game.ts         投球記録から試合状態を導出する
    series.ts       連戦のゲームごとの得点と合計、決着の判定
    tournament.ts   1 台で回す大会の対戦表・勝ち上がり・順位表
    eventPlan.ts    本部で運営する大会のステージ・ブロック・順位・勝ち上がり
    points.ts       ポイント制の配点
  store/      zustand + localStorage による永続化
  sync/       Firebase（本部とコートのやり取り、観戦）
  share/      スコアを画像に描き出す
  components/ 画面をまたいで使う部品
  pages/      画面
```

試合の状態（得点・連続ミス・手番）は保存せず、投球記録の配列から毎回導出している。

## 公開

- Web: `main` への push で `.github/workflows/deploy.yml` が GitHub Pages に公開する。はじめてだけ Settings → Pages → Source を「GitHub Actions」にする
- Android: Actions の「Android APK」を手動で実行すると、デバッグ用の APK ができる
