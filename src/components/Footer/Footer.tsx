import { useTranslation } from 'react-i18next'
import s from './Footer.module.scss'
import { Container } from '../Container/Container'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={s.footer}>
      <Container className={s.footer_content}>
        <p>© {new Date().getFullYear()} {t('footer.rights')}</p>
        <div className={s.links}>
          <a href="/privacy">{t('footer.privacyPolicy')}</a>
          <a href="/terms">{t('footer.terms')}</a>
        </div>
      </Container>

    </footer>
  )
}
