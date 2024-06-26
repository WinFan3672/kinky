import Link from 'next/link'
import { useRouter } from 'next/router'
import GitHub from './GitHub'
import ThemeSwitcher from './ThemeSwitcher'

import * as React from 'react'
import Search from './Search'

type HeaderProps = {
  name: string
  setDarkMode: (state: boolean) => void
}

interface NavLinkProps {
  href: string
  name: string
}

const NavLink: React.FunctionComponent<NavLinkProps> = (props) => {
  const router = useRouter()
  const bg = router.asPath.startsWith(props.href)
    ? 'bg-rose-100 dark:bg-rose-900'
    : ''
  return (
    <Link
      href={props.href}
      className={`m-0.5 p-1 self-end hover:ring-1 ring-black dark:ring-white hover:bg-rose-300 dark:hover:bg-rose-700 ${bg} rounded`}
    >
      {props.name}
    </Link>
  )
}

export default function Header({ name, setDarkMode }: HeaderProps) {
  const router = useRouter()

  return (
    <div className="border-b-1 backdrop-blur-lg bg-white dark:bg-black bg-opacity-20 dark:bg-opacity-20 transition">
      <header className="max-w-3xl mx-auto m-0 py-1 px-2 lg:px-4 grow flex w-full">
        <h1 className="text-3xl dark:text-white self-end mr-1">
          <Link href="/" className="font-bold" data-cy="top-link">
            {name}
          </Link>
        </h1>
        {router.asPath != '/' && (
          <div className="hidden sm:flex text-md items-stretch self-stretch mr-1">
            <NavLink href="/variables" name="Vars" />
            <NavLink href="/config_settings" name="Config" />
            <NavLink href="/lua" name="Lua" />
          </div>
        )}
        <div className="flex-grow" />
        <Search />
        <div className="flex">
          <div className="flex items-center border-r mx-1 px-1 border-slate-700">
            <a href="https://github.com/brndnmtthws/conky">
              <GitHub />
            </a>
          </div>
          <div className="ml-1 pl-1 flex place-content-center place-items-center">
            <ThemeSwitcher setDarkMode={setDarkMode} />
          </div>
        </div>
      </header>
      {router.asPath != '/' && (
        <div className="flex sm:hidden text-md items-stretch self-stretch px-1 pb-1">
          <NavLink href="/variables" name="Vars" />
          <NavLink href="/config_settings" name="Config" />
          <NavLink href="/lua" name="Lua" />
        </div>
      )}
    </div>
  )
}
