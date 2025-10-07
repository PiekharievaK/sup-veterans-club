import React from 'react';
import { useLangStore } from '../../store/langStore';
import { useTranslation } from 'react-i18next';
import s from './PartnersPage.module.scss';
import reservData from '../../data/partners.json';
import type { Partner } from '../../types/partners';
import { useFetchJson } from '../../helpers/getData';
import { docNames } from '../../data/documentsNames';



export const PartnersPage: React.FC = () => {
    const { lang } = useLangStore();
    const { t } = useTranslation();

    const documentName = docNames.partners
    const { data } = useFetchJson<Partner[]>(documentName);
    const partners = data ?? reservData


    return (
        <div className={s.partnersPage}>
            <h2 className={s.partnersPageTitle}>{t('partners.title')}</h2>
            <div className={s.partnersList}>
                {partners.map((partner: Partner) => {
                    const text = lang === 'uk' ? partner.ua : partner.en;

                    return (
                        <div key={partner.id} className={s.partner}>
                            <div className={s.partnerImage}>
                                <img src={partner.image} alt={text.name} />
                            </div>

                            <div className={s.partnerContent}>
                                <h3 className={s.partnerName}>{text.name}</h3>
                                <p className={s.partnerDescription}>{text.description}</p>

                                <div className={s.partnerContacts}>
                                    {partner.contacts.map((contact, index) => (
                                        <a
                                            key={index}
                                            href={contact.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={s.socialLink}
                                        >
                                            <svg className={s.socialIcon}>
                                                <use href={`/sprite.svg#icon-${contact.title}`} />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
