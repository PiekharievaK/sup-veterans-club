import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useThemeStore } from '../../store/themeStore'
import s from './Header.module.scss'

export const Header = () => {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useThemeStore()

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
  }

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <NavLink to="/" className={s.link}>{t('menu.home')}</NavLink>
        <NavLink to="/about" className={s.link}>{t('menu.about')}</NavLink>
        <NavLink to="/events" className={s.link}>{t('menu.events')}</NavLink>
        <NavLink to="/contact" className={s.link}>{t('menu.contact')}</NavLink>
      </nav>

      <div className={s.controls}>
        <button onClick={() => handleLanguageChange('en')}>EN</button>
        <button onClick={() => handleLanguageChange('uk')}>UA</button>
        <button onClick={toggleTheme}>
          {theme === 'light' ? t('themeToggle.dark') : t('themeToggle.light')}
        </button>
      </div>
    </header>
  )
}
