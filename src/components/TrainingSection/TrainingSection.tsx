import React from 'react';
import s from './TrainingSection.module.scss';
import { Container } from '../Container/Container';
import { useTranslation } from 'react-i18next';

interface LocalizedTraining {
    title: string;
    summary?: string;
    description: string;
    benefits: string[];
    schedule: string;
}

interface Props {
    category: string;
    image: string;
    photo: string;
    video?: string[];
    text: LocalizedTraining;
}

export const TrainingSection: React.FC<Props> = ({
    text,
    image,
    video,
    photo
}) => {
    const { t } = useTranslation()
    return (
        <section className={s.trainingSection}>
            <Container>
                {text.summary && (
                    <div className={s.subSection}>
                        <div className={s.textBlock}>
                            <p className={s.summary}>{text.summary}</p>

                            <p className={s.description}>{text.description}</p>
                        </div>
                        <div className={s.mediaWrapper}>
                            <div className={s.mediaContainer}>
                                {video ? <video
                                    src={video[0]}
                                    loop
                                    muted
                                    autoPlay
                                    playsInline
                                    className={s.media}
                                /> : <img
                                    src={image}
                                    alt={text.title}
                                    className={s.media}
                                />}

                            </div>
                        </div>

                    </div>
                )}

                <div className={`${s.subSection}`}>
                    <div className={s.textBlock}>


                        <div className={s.benefitsBlock}>
                            <h3 className={s.subTitle}>{t("trainings.benefits")}</h3>
                            <ul className={s.benefitsList}>
                                {text.benefits.map((benefit, i) => (
                                    <li key={i} className={s.benefitItem}>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div className={s.mediaBlock}>
                        <img
                            src={photo ? photo : image}
                            alt={text.title}
                            className={s.media}
                        />
                    </div>
                </div>
                <p className={s.schedule}>
                    <strong>{t("trainings.schedule")}</strong> {text.schedule}
                </p>
            </Container>
        </section>
    );
};
