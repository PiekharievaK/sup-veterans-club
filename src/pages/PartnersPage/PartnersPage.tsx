import React from 'react';
import { useLangStore } from '../../store/langStore';
import { useTranslation } from 'react-i18next';
import s from './PartnersPage.module.scss';
import partnersData from '../../data/partners.json';

interface Contact {
    title: string;
    url: string;
    description?: string;
}

interface PartnerText {
    name: string;
    description: string;
}

interface Partner {
    id: string;
    image: string;
    contacts: Contact[];
    ua: PartnerText;
    en: PartnerText;
}

export const PartnersPage: React.FC = () => {
    const { lang } = useLangStore();
    const { t } = useTranslation();

    const partners = partnersData;

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
