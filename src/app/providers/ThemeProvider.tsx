import { useEffect } from 'react'
import { useThemeStore } from '../../store/themeStore'

interface Props {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  return <>{children}</>
}
