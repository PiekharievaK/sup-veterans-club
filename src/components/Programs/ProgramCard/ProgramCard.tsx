import type React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import type { Program } from '../../../types/programs';
import s from './ProgramCard.module.scss';
import { useLangStore } from "../../../store/langStore";
import options from '../../../data/scheduleOptions.json'

export const ProgramCard: React.FC<{ isActive: boolean; item: Program; onClick: () => void }> = ({
  isActive,
  item,
  onClick
}) => {

  const { t } = useTranslation();
  const { lang } = useLangStore();
  const text = lang === "uk" ? item.ua : item.en
  const schedule = options.find((option) => option.id === item.schedule)

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
            <h3 className={s.card_title}>{text.title}</h3>
            <svg className={s.card_icon}><use href={`/sprite.svg#icon-${item.icon}`}></use></svg>
          </div>
          <ul className={s.card_benefits}>
            {item.benefits.map((benefit, idx) => (
              <li className={s.benefits_item} key={idx}>
                <svg className={s.benefits_marker}>
                  <use href={`/sprite.svg#icon-${benefit.icon}`} />
                </svg>
                {lang === "uk" ? benefit.ua : benefit.en}
              </li>
            ))}
          </ul>
          {schedule && <p>
            {lang === "uk" ? schedule.ua : schedule.en}
          </p>}
          <Link to={`/training/${item.category}`} className={s.card_button}>{t("programs.moreButton")}</Link>
        </div>

        <div className={s.card_back}>
          <div className={s.card_image}>
            <img src={item.image} alt={`program ${item.category} illustration`} />
          </div>
          <p className={s.card_description}>{text.description}</p>
        </div>
      </div>
    </div>
  );
};
