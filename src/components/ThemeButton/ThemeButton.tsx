import { useThemeStore } from '../../store/themeStore'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  )
}
