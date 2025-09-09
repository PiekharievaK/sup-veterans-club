import React from 'react';
import { useLangStore } from '../../store/langStore';
import { useTranslation } from 'react-i18next';
import s from './ContactsPage.module.scss';
import contactData from '../../data/contacts.json'
import { ContactButton } from '../../components/ContactButton/ContactButton';
import { Container } from '../../components/Container/Container';

export const ContactsPage: React.FC = () => {
    const { lang } = useLangStore();
    const { t } = useTranslation();

    const text = lang === 'uk' ? contactData.ua : contactData.en;

    return (
        <div className={s.contactPage}>
            <Container>
                <div className={s.organization}>
                    <h2 className={s.organizationName}>{text.officialName}</h2>
                    <h3 className={s.organizationName}>{text.shortName}</h3>
                </div>



                <div className={s.details}>
                    <p className={s.detailItem}><strong>{t('contactsPage.phoneLabel')}: </strong>{contactData.phone}</p>
                    <p className={s.detailItem}><strong>{t('contactsPage.emailLabel')}: </strong>{contactData.email}</p>
                    <p className={s.detailItem}><strong>{t('contactsPage.address')}: </strong>{text.address}</p>
                </div>

                <div className={s.representatives}>
                    <h3 className={s.representativeTitle}>{t('contactsPage.representative')}:</h3>
                    {text.representatives.map((rep, index) => (
                        <div key={index} className={s.representative}>
                            <a href={rep.instagram} target="_blank" rel="noopener noreferrer" className={s.instagramLink}>
                                <p className={s.representativeName}>{rep.name}</p>
                            </a>
                            <p className={s.representativeRole}>{rep.role}</p>
                        </div>
                    ))}
                </div>

                <div className={s.contacts}>
                    <h2 className={s.contactsTitle}>{t('contactsPage.socialMediaLabel')}</h2>
                    <ul className={s.socialsList}>
                        {contactData.contacts.map((contact, index) => (
                            <li key={index} className={s.socialItem}>
                                <a href={contact.url} target="_blank" rel="noopener noreferrer" className={s.socialLink}>
                                    <svg className={s.socialIcon}>
                                        <use href={`/sprite.svg#icon-${contact.platform}`} />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ContactButton />
                </div>
            </Container>
        </div>
    );
};

