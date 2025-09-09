import { useState } from 'react'
import { ModalWrapper } from '../../ModalWrapper/ModalWrapper'
import { ScheduleForm } from '../Form/ScheduleForm'
import s from './EventDetails.module.scss'
import type { EventType } from '../../../types/events'
import { useTranslation } from 'react-i18next'

type Props = {
    event: EventType
    onClose: () => void
}

export const EventDetails: React.FC<Props> = ({ event, onClose }) => {
    const [modalOpen, setModalOpen] = useState(false)

    const { t } = useTranslation();

    const formattedDate = event.date.split("-").slice(1).reverse().join(".");
    return (
        <div className={s.detailsContainer}>
            <button className={s.closeBtn} onClick={onClose}>×</button>
            <div className={s.titleBox}>
                <h3 className={s.detailsTitle}>{t(`trainingTypes.${event.type}`)}</h3>
                <p className={s.detailsText}>{formattedDate}</p>
            </div>
            <p className={s.detailsText}>{t('eventDetails.time')}: {event.timeStart} – {event.timeEnd}</p>
            <p className={s.detailsText}>{t('eventDetails.instructors')}: {event.instructors.map(item => t(`coaches.${item}`)).join(', ')}</p>
            <button className={s.detailsButton} onClick={() => setModalOpen(true)}>{t('eventDetails.signup')}</button>

            {modalOpen && (
                <ModalWrapper isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <ScheduleForm
                        date={event.date}
                        eventType={event.type}
                        timeStart={event.timeStart}
                        timeEnd={event.timeEnd}
                        onClose={() => setModalOpen(false)}
                    />
                </ModalWrapper>
            )}
        </div>
    )
}
