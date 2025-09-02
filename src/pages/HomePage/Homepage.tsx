import { Benefits } from '../../components/Benefits/Benefits'
import { Container } from '../../components/Container/Container'
import { Programs } from '../../components/Programs/Programs'
import s from './HomePage.module.scss'
import { useTranslation } from 'react-i18next'

export const HomePage = () => {
  const { t } = useTranslation()

  return (
    <section className={s.home}>
      <div className={s.hero}>
        <video className={s.hero_video} src="/sup-board-on-the-sunset-sky.mp4" autoPlay muted loop></video>
        <Container className={s.hero_content}>
          <h1 className={s.hero_title}>{t('hero.title')}</h1>
          <p className={s.hero_description}>{t('hero.subtitle')}</p>
          <button className={s.hero_button}>{t('home.learnMore')}</button>
        </Container>
      </div>
      <Benefits></Benefits>
      <Programs></Programs>
    </section>
  )
}
