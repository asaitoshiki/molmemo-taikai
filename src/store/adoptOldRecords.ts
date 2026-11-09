/** 大会アプリの保存先 */
export const STORE_KEY = 'molmemo-taikai-v1'

/** 大会の機能がモルメモ本体に入っていた頃の保存先 */
const OLD_KEY = 'molkky-note-v1'

type OldGame = { seriesId: string; tournamentId?: string | null }

type OldSaved = {
  version: number
  state: {
    members?: unknown[]
    games?: OldGame[]
    tournaments?: unknown[]
    hostedEvents?: unknown[]
    eventGroups?: Record<string, string>
    eventSeries?: Record<string, unknown>
    soundOn?: boolean
  }
}

/**
 * 初めて開いたときに、モルメモ本体に残っている大会の記録を引き取る。
 * Web 版はどちらも同じ場所（asaitoshiki.github.io）に保存しているので読める。
 * 普段の試合は持ってこず、大会の対戦表と本部につないだ試合だけを移す。
 * 版（version）はそのまま残し、古い形ならストアの migrate に今の形へ直させる
 */
export const adoptOldRecords = () => {
  if (localStorage.getItem(STORE_KEY) !== null) return
  const raw = localStorage.getItem(OLD_KEY)
  if (raw === null) return

  const { version, state } = JSON.parse(raw) as OldSaved
  const eventSeriesIds = Object.keys(state.eventSeries ?? {})
  const games = (state.games ?? []).filter(
    (game) => (game.tournamentId ?? null) !== null || eventSeriesIds.includes(game.seriesId),
  )
  const adopted: OldSaved = {
    version,
    state: {
      members: state.members,
      games,
      tournaments: state.tournaments,
      hostedEvents: state.hostedEvents,
      eventGroups: state.eventGroups,
      eventSeries: state.eventSeries,
      soundOn: state.soundOn,
    },
  }
  localStorage.setItem(STORE_KEY, JSON.stringify(adopted))
}
