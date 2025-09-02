import { useThemeStore } from '../../store/themeStore'
import s from './ThemeButton.module.scss'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div className={s.themeBox} onClick={toggleTheme}>
      <button
        className={`${s.switcher} ${theme === 'light' ? s.light : s.dark}`}
        aria-label="Toggle theme"
      >
        <svg className={s.icon} width={30} height={30}>
          <use href={`/sprite.svg#${theme === 'light' ? 'icon-sea-light-2' : 'icon-sea-svgrepo'}`} />
        </svg>
        <svg className={`${s.icon}  ${s.icon_dark}`} width={30} height={30}>
          <use href={`/sprite.svg#${theme === 'light' ? 'icon-sea-dark' : 'icon-sea-dark-2'}`} />
        </svg>
      </button>
    </div>
  )
}

