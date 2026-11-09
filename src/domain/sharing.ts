/**
 * 大会アプリの公開先。
 * アプリ版は端末内のファイルから動くため、本部が配るリンクの行き先をここに持つ
 */
export const PUBLIC_WEB_URL = 'https://asaitoshiki.github.io/molmemo-taikai/'

/** 普段の試合を記録するモルメモ本体。観戦の画面もこちらにある */
export const CASUAL_APP_URL = 'https://asaitoshiki.github.io/molkkyscore/'

/** 観戦できる場所。鍵は推測できないランダム値で、知っている人だけが見られる */
export const watchUrl = (shareId: string) => `${CASUAL_APP_URL}#/watch/${shareId}`

/** 大会のコートが参加する場所。本部が QR で配る */
export const eventCourtUrl = (eventId: string) => `${PUBLIC_WEB_URL}#/e/${eventId}`

/** 本部の画面。別の端末（パソコンなど）で開き直すときに使う */
export const eventHqUrl = (eventId: string) => `${PUBLIC_WEB_URL}#/e/${eventId}/hq`
