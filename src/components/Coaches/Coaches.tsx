import { useTranslation } from 'react-i18next';
import { useLangStore } from '../../store/langStore';
import data from '../../data/coaches.json';
import s from './Coaches.module.scss';

export const Coaches = () => {
    const { lang } = useLangStore();
    const { t } = useTranslation();

    return (
        <div className={s.coaches}>
            <h2 className={s.benefits_title}>{t('coaches.title')}</h2>

            <ul className={s.coaches_list}>
                {data.map(coach => {
                    const text = lang === 'uk' ? coach.ua : coach.en;

                    return (
                        <li className={s.coaches_item} key={coach.id}>
                            <div className={s.coaches_image}>
                                <img src={coach.photo[0]} alt={text.name} />
                            </div>

                            <div className={s.coaches_description}>
                                <h3>{text.name}</h3>
                                <p>{text.role}</p>
                                <p>{text.description}</p>

                                {coach.socials?.length > 0 && (
                                    <div className={s.coaches_contacts}>
                                        {coach.socials.map(({ platform, url }) => (
                                            <a
                                                key={platform}
                                                href={url}
                                                className={s.coaches_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <svg className={s.coaches_icon}>
                                                    <use href={`/sprite.svg#icon-${platform}`} />
                                                </svg>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
