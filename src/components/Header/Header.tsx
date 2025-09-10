import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import s from './Header.module.scss'
import { ThemeToggle } from '../ThemeButton/ThemeButton'
import { LanguageSwitcher } from '../LanguageButton/LanguageButton'
import { Container } from '../Container/Container'

export const Header = () => {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  const getLinkClassName = (isActive: boolean) => {
    return isActive ? `${s.link} ${s.activeLink}` : s.link;
  };


  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [menuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        closeMenu()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [closeMenu])

  return (
    <header className={s.header}>
      <Container className={s.header_content}>
        <NavLink to="/"  onClick={closeMenu}>
          <img src="/logo.png" alt="logo of organisation" width={75} height={75} />
        </NavLink>

        <nav className={`${s.nav} ${menuOpen ? s.open : ''}`}>
          <NavLink
            to="/"
            className={({ isActive }) => getLinkClassName(isActive)}
            onClick={closeMenu}
          >
            {t('menu.home')}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => getLinkClassName(isActive)}
            onClick={closeMenu}
          >
            {t('menu.about')}
          </NavLink>
          <NavLink
            to="/schedule"
            className={({ isActive }) => getLinkClassName(isActive)}
            onClick={closeMenu}
          >
            {t('menu.schedule')}
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) => getLinkClassName(isActive)}
            onClick={closeMenu}
          >
            {t('menu.contact')}
          </NavLink>
        </nav>

        <div className={s.controls}>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <button className={s.burger} onClick={toggleMenu}>
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
