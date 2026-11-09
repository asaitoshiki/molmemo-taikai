import { Outlet } from 'react-router-dom'

/** 大会アプリの共通レイアウト。画面が少ないので下タブは置かず、ホームから辿る */
export const Layout = () => (
  <div className="mx-auto flex min-h-full max-w-md flex-col">
    <main className="safe-top flex-1 px-5 pt-6 pb-16">
      <Outlet />
    </main>
  </div>
)
