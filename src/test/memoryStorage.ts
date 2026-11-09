// テストは node で動くため、ブラウザの localStorage の代わりをメモリ上に置く
const items = new Map<string, string>()

globalThis.localStorage = {
  get length() {
    return items.size
  },
  clear: () => items.clear(),
  getItem: (key) => items.get(key) ?? null,
  key: (index) => [...items.keys()][index] ?? null,
  removeItem: (key) => void items.delete(key),
  setItem: (key, value) => void items.set(key, value),
}
