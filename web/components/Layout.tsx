import { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'

function darkModeDefault() {
  if (typeof window === 'undefined') {
    return false
  } else {
    const theme = localStorage.getItem('theme')
    return (
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(darkModeDefault())

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  useEffect(() => {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

    darkQuery.onchange = (e) => {
      if (e.matches) {
        setDarkMode(true)
      } else {
        setDarkMode(false)
      }
    }
  }, [])

  return (
    <div>
      <div className="sticky top-0 z-10">
        <Header name="Conky" setDarkMode={setDarkMode} />
      </div>
      <div className="relative pb-4 md:pt-4">
        <div className="flex flex-col items-center max-w-3xl w-full mx-auto">
          {children}
        </div>
      </div>
      <div className="relative">
        <Footer />
      </div>
    </div>
  )
}
