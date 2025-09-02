import { useLangStore } from '../../store/langStore'
import { useTranslation } from 'react-i18next'
import { BenefitCard } from './BenefitCard/BenefitCard'
import { Container } from '../Container/Container'
import type { Benefit } from '../../types/benefits'
import data from '../../data/benefits.json'
import s from './Benefits.module.scss'

export const Benefits = () => {
    const { t } = useTranslation()
    const { lang } = useLangStore()
    
    return (
        <div className={s.benefits}>
            <Container>
                <h2 className={s.benefits_title}>{t("benefits.title")}</h2>

                {data && <ul className={s.benefits_list}>{data.map((item: Benefit) => (
                    <li className={s.benefits_item} key={item.en.title}>
                        {lang === "uk" ?
                            <BenefitCard icon={item.icon} title={item.ua.title} desc={item.ua.description} />
                            : <BenefitCard icon={item.icon} title={item.en.title} desc={item.en.description} />
                        }
                    </li>))
                }</ul>
                }
            </Container>
        </div>
    )
}