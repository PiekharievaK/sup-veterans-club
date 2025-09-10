import { Container } from '../Container/Container'
import { useTranslation } from 'react-i18next'
import s from './Footer.module.scss'
import contactsData from '../../data/contacts.json'


const navLinks = [
  { key: 'aboutUs', url: '/about' },
  { key: 'partners', url: '/partners' },
  { key: 'donations', url: '/donations' }
]

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={s.footer}>
      <Container className={s.footerContent}>
        <div className={s.socialBlock}>
          <h3 className={s.socialTitle}>{t('footer.followUs')}</h3>
          <div className={s.socialIcons}>
            {contactsData.contacts.map(({ platform, url }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={s.socialLink}
              >
                <svg className={s.socialIcon}>
                  <use href={`/sprite.svg#icon-${platform}`} />
                </svg>
              </a>
            ))}
          </div>
          <div className={s.contactsBlock}>
            <a
              href={`tel:${contactsData.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className={s.contactsLink}
            >
              <svg className={s.contactsIcon}>
                <use href={`/sprite.svg#icon-mobile`} />
              </svg>
            </a>
            <p className={s.phone}>{contactsData.phone}</p>
          </div>
        </div>
        <div className={s.navLinks}>
          {navLinks.map(({ key, url }) => (
            <a key={key} href={url} className={s.navLink}>
              {t(`footer.${key}`)}
            </a>
          ))}
        </div>
      </Container>
      <div className={s.copyright}>
        <p >
          &copy; {new Date().getFullYear()} {t('footer.rights')}
        </p>
      </div>

    </footer>
  )
}
