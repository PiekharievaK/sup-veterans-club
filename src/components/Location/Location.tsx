import { Container } from '../Container/Container'
import { useTranslation } from 'react-i18next'
import s from './Location.module.scss'

export const Location = () => {
    const { t } = useTranslation()

    const links = [
        {
            title: "instagram",
            url: "https://www.instagram.com/supkayakclub_4storony/"
        },
        {
            title: "facebook",
            url: "https://www.facebook.com/supkayakclub/"
        },
        {
            title: "telegram",
            url: "https://t.me/skc4storony"
        },
        {
            title: "website",
            url: "https://supkayakclub.kiev.ua/",
            // description: "supkayakclub.kiev.ua"
        },
        {
            title: "mobile",
            url: "tel:+380503556641",
            description: "+38 (050) 355 66 41"
        }
    ]


    return (
        <div className={s.location}>
            <Container>
                <h2>{t('location.title')}</h2>
                <section className={s.location_section}>
                    <div className={s.location_info}>
                        <h2 className={s.title}>{t('location.clubName')}</h2>
                        <p className={s.address}>{t('location.address')}</p>
                        <p className={s.schedule}>{t('location.schedule')}</p>
                        <ul className={s.location_contacts}>
                            {links.map(({ title, url, description }, index) => (
                                <li className={description ? s.contacts_itemWithDescription : s.contacts_item} key={index}>

                                    {description ? (
                                        <a className={s.link}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={title}>
                                            <svg className={s.icon}>
                                                <use href={`/sprite.svg#icon-${title}`} />
                                            </svg>
                                            <span className={s.link_description}>{description}</span>
                                        </a>
                                    ) : (
                                        <a className={s.link}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={title}>
                                            <svg className={s.icon}>
                                                <use href={`/sprite.svg#icon-${title}`} />
                                            </svg>
                                        </a>

                                    )}
                                </li>
                            ))}
                        </ul>

                        <a
                            href="https://www.google.com/maps/dir/?api=1&destination=50.495611,30.547139"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.button}
                        >
                            <svg className={s.button_icon}>
                                <use href={`/sprite.svg#icon-map`} />
                            </svg>
                            <span className={s.button_text}>
                                {t('location.route')}
                            </span>
                        </a>

                    </div>

                    <div className={s.map}>
                        <div className={s.map_wrapper}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10152.289442632324!2d30.547139!3d50.495611!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x171d58368f0ad5f7!2sSUP%20Kayak%20Club%204%20Storony!5e0!3m2!1sen!2sua!4v1616590849719!5m2!1sen!2sua"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className={s.iframe}
                            ></iframe>
                        </div>


                    </div>
                </section>
            </Container>
        </div>
    )
}