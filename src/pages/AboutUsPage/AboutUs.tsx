import React from 'react'
import { useTranslation } from 'react-i18next'
import s from './AboutUs.module.scss'
import { ContactButton } from '../../components/ContactButton/ContactButton'
import { Container } from '../../components/Container/Container'

export const AboutUsPage: React.FC = () => {
    const { t } = useTranslation()



    const generateDescription = (count: number, translationPrefix: string) => {
        return Array.from({ length: count }, (_, index) =>
            t(`${translationPrefix}${index + 1}`)
        );
    };
    const whatWeDoList = generateDescription(3, 'aboutUs.whatWeDoDescription');
    const ourGoalList = generateDescription(3, 'aboutUs.ourGoalDescription');
    const whyItsImportantList = generateDescription(3, 'aboutUs.whyItsImportantDescription');
    const whyJoinUsList = generateDescription(3, 'aboutUs.whyJoinUsDescription');

    return (
        <div className={s.aboutUs}>
            <div className={s.aboutUs__header}>
                <h1 className={s.aboutUs__title}>{t('aboutUs.title')}</h1>
            </div>

            <section className={s.aboutUs__content}>
                <Container>
                    <p className={s.aboutUs__intro}>{t('aboutUs.intro')}</p>
                </Container>
                <div className={s.aboutUs__section}>
                    <Container>
                        <h2 className={s.aboutUs__sectionTitle}>{t('aboutUs.howItBeganTitle')}</h2>
                        <p className={s.aboutUs__sectionDescription}>{t('aboutUs.howItBeganDescription')}</p>
                    </Container> </div>

                <div className={s.aboutUs__section}>
                    <Container>
                        <h2 className={s.aboutUs__sectionTitle}>{t('aboutUs.whatWeDoTitle')}</h2>
                        {whatWeDoList.map((desc, index) => (
                            <p key={index} className={s.aboutUs__sectionDescription}>{desc}</p>
                        ))}
                    </Container>
                </div>

                <div className={s.aboutUs__section}>
                    <Container>
                        <h2 className={s.aboutUs__sectionTitle}>{t('aboutUs.ourGoalTitle')}</h2>
                        {ourGoalList.map((desc, index) => (
                            <p key={index} className={s.aboutUs__sectionDescription}>{desc}</p>
                        ))}
                    </Container>  </div>

                <div className={s.aboutUs__section}>
                    <Container>
                        <h2 className={s.aboutUs__sectionTitle}>{t('aboutUs.whyItsImportantTitle')}</h2>
                        {whyItsImportantList.map((desc, index) => (
                            <p key={index} className={s.aboutUs__sectionDescription}>{desc}</p>
                        ))}
                    </Container> </div>

                <div className={s.aboutUs__section}>
                    <Container>
                        <h2 className={s.aboutUs__sectionTitle}>{t('aboutUs.whyJoinUsTitle')}</h2>
                        {whyJoinUsList.map((desc, index) => (
                            <p key={index} className={s.aboutUs__sectionDescription}>{desc}</p>
                        ))}
                    </Container></div>

                <div className={s.aboutUs__section}>
                    <h3 className={s.aboutUs__finalTitle}>{t('aboutUs.finalTitle')}</h3>
                    <ContactButton />
                </div>
            </section>
        </div>
    )
}
