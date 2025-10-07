import React from 'react';
import { useLangStore } from '../../store/langStore';
import { useTranslation } from 'react-i18next';
import s from './DonationPage.module.scss';
import reservData from '../../data/donations.json';
import { Container } from '../../components/Container/Container';
import type { Donation } from '../../types/donates';
import { useFetchJson } from '../../helpers/getData';
import { docNames } from '../../data/documentsNames';



export const DonationsPage: React.FC = () => {
    const { lang } = useLangStore();
    const { t } = useTranslation();
    const documentName = docNames.donations
    const { data } = useFetchJson<Donation[]>(documentName);
    const donations = data ?? reservData


    return (
        <div className={s.donationsPage}>
            <h2 className={s.donationsPageTitle}>{t('donations.title')}</h2>
            <Container><div className={s.donationsList}>
                {donations.map((donation: Donation) => {
                    const text = lang === 'uk' ? donation.ua : donation.en;

                    return (
                        <div className={s.donationCard}>
                            <div className={s.donationCardTitle}>{text.title}</div>
                            <div className={s.donationCardIcon}>
                                <svg className={s.icon}>
                                    <use href={`/sprite.svg#icon-${donation.icon}`} />
                                </svg>
                            </div>
                            <div className={s.donationCardSummary}>{text.summary}</div>
                            <a href={donation.url} className={s.donationCardLink}>{t("donations.go")}</a>
                        </div>

                    );
                })}
            </div>
            </Container>
        </div>
    );
};
