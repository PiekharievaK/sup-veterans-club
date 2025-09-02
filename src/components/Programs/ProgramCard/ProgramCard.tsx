import type React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import type { LanguageContent } from '../../../types/programs';
import s from './ProgramCard.module.scss';

export const ProgramCard: React.FC<{ isActive: boolean; category: string, icon: string; image: string; text: LanguageContent; onClick: () => void }> = ({
  isActive,
  category,
  icon,
  image,
  text: { title, description, benefits, schedule },
  onClick
}) => {

  const { t } = useTranslation();

  const benefitsIcons = ['heart-plus', 'ok-circle', 'heart-like', 'person-check']

  return (
    <div
      className={`${s.card} ${isActive ? s.active : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className={s.card_inner}>

        <div className={s.card_front}>
          <div className={s.card_header}>
            <h3 className={s.card_title}>{title}</h3>
            <svg className={s.card_icon}><use href={`/sprite.svg#icon-${icon}`}></use></svg>
          </div>
          <p className={s.card_schedule}>{schedule}</p>
          <ul className={s.card_benefits}>
            {benefits.map((item, idx) => (
              <li className={s.benefits_item} key={idx}>
                <svg className={s.benefits_marker}>
                  <use href={`/sprite.svg#icon-${benefitsIcons[Math.floor(Math.random() * benefitsIcons.length)]}`} />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <Link to={category} className={s.card_botton}>{t("programs.moreButton")}</Link>
        </div>

        <div className={s.card_back}>
          <div className={s.card_image}>
            <img src={image} alt={`program ${title} illustration`} />
          </div>
          <p className={s.card_description}>{description}</p>
        </div>
      </div>
    </div>
  );
};
