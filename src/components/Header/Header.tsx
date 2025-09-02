import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import s from './Header.module.scss'
import { ThemeToggle } from '../ThemeButton/ThemeButton'
import { LanguageSwitcher } from '../LanguageButton/LanguageButton'
import { Container } from '../Container/Container'

export const Header = () => {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)

  useEffect(
    () => {
      if (menuOpen) {
        document.body.classList.add('modal-open')
      }
      else {
        document.body.classList.remove('modal-open')
      }
    }, [menuOpen]
  )

  return (
    <header className={s.header}>
      <Container className={s.header_content}>
        <NavLink to="/" className={s.link}>
          <img src="/public/logo.png" alt="logo of organisation" width={75} height={75} />
        </NavLink>
        <nav className={`${s.nav} ${menuOpen ? s.open : ''}`}>
          <NavLink to="/about" className={s.link}>{t('menu.about')}</NavLink>
          <NavLink to="/events" className={s.link}>{t('menu.events')}</NavLink>
          <NavLink to="/contact" className={s.link}>{t('menu.contact')}</NavLink>
        </nav>

        <div className={s.controls}>
          <ThemeToggle />
          <LanguageSwitcher />

        </div>
        <button className={`${s.burger}`} onClick={toggleMenu}>
          <svg className={`${s.icon} ${!menuOpen ? s.visible : s.hidden}`}>
            <use href={`/sprite.svg#icon-canoe-gondola`} />
          </svg>
          <svg className={`${s.icon} ${menuOpen ? s.visible : s.hidden}`}>
            <use href={`/sprite.svg#icon-double-paddle`} />
          </svg>
        </button>

      </Container>
    </header>
  )
}
