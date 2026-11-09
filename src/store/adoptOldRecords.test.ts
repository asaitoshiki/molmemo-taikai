import { beforeEach, describe, expect, it } from 'vitest'
import { STORE_KEY, adoptOldRecords } from './adoptOldRecords'

const OLD_KEY = 'molkky-note-v1'

const saved = (key: string) => JSON.parse(localStorage.getItem(key)!)

beforeEach(() => localStorage.clear())

describe('adoptOldRecords', () => {
  it('モルメモ本体から大会の試合だけを引き取り、版はそのまま残す', () => {
    localStorage.setItem(
      OLD_KEY,
      JSON.stringify({
        version: 8,
        state: {
          members: [{ id: 'm1' }],
          games: [
            { id: 'casual', seriesId: 's1', tournamentId: null },
            { id: 'bracket', seriesId: 's2', tournamentId: 't1' },
            { id: 'court', seriesId: 's3', tournamentId: null },
          ],
          tournaments: [{ id: 't1' }],
          hostedEvents: [{ eventId: 'ev1' }],
          eventSeries: { s3: { eventId: 'ev1' } },
          practices: [{ id: 'p1' }],
          shares: { s1: 'share1' },
        },
      }),
    )

    adoptOldRecords()

    const adopted = saved(STORE_KEY)
    expect(adopted.version).toBe(8)
    expect(adopted.state.games.map((game: { id: string }) => game.id)).toEqual(['bracket', 'court'])
    expect(adopted.state.tournaments).toEqual([{ id: 't1' }])
    expect(adopted.state.hostedEvents).toEqual([{ eventId: 'ev1' }])
    expect(adopted.state.members).toEqual([{ id: 'm1' }])
    // 練習や観戦の共有はモルメモ本体のもの
    expect(adopted.state.practices).toBeUndefined()
    expect(adopted.state.shares).toBeUndefined()
  })

  it('大会アプリの記録が既にあれば上書きしない', () => {
    localStorage.setItem(STORE_KEY, JSON.stringify({ version: 9, state: { games: [] } }))
    localStorage.setItem(OLD_KEY, JSON.stringify({ version: 9, state: { games: [{ id: 'x', seriesId: 's', tournamentId: 't' }] } }))

    adoptOldRecords()

    expect(saved(STORE_KEY).state.games).toEqual([])
  })

  it('モルメモ本体の記録がなければ何もしない', () => {
    adoptOldRecords()
    expect(localStorage.getItem(STORE_KEY)).toBeNull()
  })
})
