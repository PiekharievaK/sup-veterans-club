import { useTranslation } from 'react-i18next'
import s from './About.module.scss'
import { Container } from '../Container/Container'


export const About = () => {
    const { t } = useTranslation()

    return (
        <div className={s.about}>
            <Container>
                <h2 className={s.about_title}>{t("about.title")}</h2>
                <div><p>{t("about.description")}</p></div>
            </Container>
        </div >
    )
}