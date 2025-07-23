import s from './HomePage.module.scss'
import { useTranslation } from 'react-i18next'

export const HomePage = () => {
  const { t } = useTranslation()

  return (
    <section className={s.home}>
      <div className={s.hero}>
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
        <button>{t('home.learnMore')}</button>
      </div>
    </section>
  )
}
