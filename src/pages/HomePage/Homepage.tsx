import { Benefits } from '../../components/Benefits/Benefits'
import { Coaches } from '../../components/Coaches/Coaches'
import { Container } from '../../components/Container/Container'
import { Location } from '../../components/Location/Location'
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
          <h1 className={s.hero_title}>{t("about.title")}</h1>
          <h2 className={s.hero_description + ' ' + s.hero_description1}>{t('hero.subtitle1')}</h2>
          <p className={s.hero_description + ' ' + s.hero_description2}>{t('hero.subtitle2')}</p>
        </Container>
      </div>
      <Benefits></Benefits>
      <Programs></Programs>
      <Coaches></Coaches>
      <Location></Location>
    </section>
  )
}
