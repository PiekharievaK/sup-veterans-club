import type React from "react"
import s from './BenefitsCard.module.scss'

export const BenefitCard: React.FC<{ icon: string, title: string, desc: string }> = ({ icon, title, desc }) => {
  return (<div className={s.card}>
    <div className={s.card_icon}> <svg className={s.icon} >
      <use href={`/sprite.svg#icon-${icon}`} />
    </svg></div>
    <div className={s.card_descBox}>
      <p className={s.card_title}>{title}</p>
      <p>{desc}</p>
    </div>

  </div>)
}