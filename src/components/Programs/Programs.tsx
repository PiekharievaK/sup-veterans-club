import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProgramCard } from './ProgramCard/ProgramCard';
import { Container } from '../Container/Container';
import type { Program } from '../../types/programs';
import data from '../../data/programs.json';
import s from './Programs.module.scss';


export const Programs = () => {
    const { t } = useTranslation();
    const [activeCardKey, setActiveCardKey] = useState<string[]>([]);

    const handleCardClick = (key: string) => {
        setActiveCardKey(prev => {
            if (prev?.includes(key)) {
                return prev.filter(k => k !== key);
            } else {
                return [...(prev || []), key];
            }
        });
    };

    return (
        <div className={s.programs}>
            <Container>
                <h2 className={s.programs_title}>{t("programs.title")}</h2>

                {data && (
                    <ul className={s.programs_list}>
                        {data.slice(0,3).map((item: Program) => {

                            const cardKey = item.en.title;

                            return (
                                <li className={s.programs_item} key={cardKey}>

                                    <ProgramCard
                                        isActive={activeCardKey.includes(cardKey)}
                                        item={item}
                                         onClick={() => handleCardClick(cardKey)}
                                    />

                                </li>
                            );
                        })}
                    </ul>
                )}
            </Container>
        </div>
    );
};
