import { useRef, useState, useEffect } from 'react'
import s from './Schedule.module.scss'
import { useTranslation } from 'react-i18next'
import {
    format,
    addMonths,
    subMonths,
} from 'date-fns'
import { Container } from '../../components/Container/Container'
import type { EventType } from '../../types/events'
import { EventDetails } from '../../components/Schedule/EventDetails/EventDetails'
import { Calendar } from '../../components/Schedule/CalendarCell/Calrndar'
import { useFetchJson } from '../../helpers/getData'
import { docNames } from '../../data/documentsNames'
import type { Program } from '../../types/programs'
import reservProgramData from "../../data/programs.json"
import reservCoachesData from "../../data/coaches.json"
import { useLangStore } from '../../store/langStore'
import type { Coach } from '../../types/coach'

export const SchedulePage = () => {
    const { t } = useTranslation()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
    const detailsRef = useRef<HTMLDivElement | null>(null)
    const { lang } = useLangStore();

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))



    const { data: schedule } = useFetchJson<EventType[]>(docNames.schedule);
    const sampleEvents = schedule ?? []
    const { data: programs } = useFetchJson<Program[]>(docNames.programs);
    const trainingTypes = programs ?? reservProgramData
    const { data: coaches } = useFetchJson<Coach[]>(docNames.coaches);
    const coachesList = coaches ?? reservCoachesData

    const eventsByDate = sampleEvents.reduce<Record<string, EventType[]>>((acc, ev) => {
        acc[ev.date] = acc[ev.date] || []
        acc[ev.date].push(ev)
        return acc
    }, {})

    const daysOfWeek = t('daysOfWeek', { returnObjects: true }) as string[]

    useEffect(() => {
        if (selectedEvent) {
            setTimeout(() => {
                detailsRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }, 100)
        }
    }, [selectedEvent])

    return (
        <section className={s.schedule}>
            <div className={s.header}>
                <button onClick={handlePrevMonth}>←</button>
                <h2>{t(`months.${format(currentDate, 'MMMM')}`)} {format(currentDate, 'yyyy')}</h2>
                <button onClick={handleNextMonth}>→</button>
            </div>

            <Container>
                <div className={s.trainingType_Box}>
                    {trainingTypes.map((program) => (
                        <div key={program.category} className={s.trainingType_Label}>
                            <span className={s.trainingType_Name}>{lang === "uk" ? program.ua.title : program.en.title}</span>
                            <span className={s.dash}>-</span>
                            <span className={`${s.trainingType_colorBox} ${s[program.category]}`} />
                        </div>
                    ))}
                </div>

                <div className={`${s.layoutWrapper} ${selectedEvent ? s.detailsOpen : ''}`}>
                    <div className={s.calendarContainer}>
                        <div className={s.daysOfWeek}>
                            {daysOfWeek.map((day, idx) => (
                                <div key={idx} className={s.dayLabel}>{day}</div>
                            ))}
                        </div>
                        <div className={s.calendar}>
                            <Calendar
                                currentDate={currentDate}
                                eventsByDate={eventsByDate}
                                onSelectEvent={setSelectedEvent}
                                t={t}
                            />
                        </div>
                    </div>

                    <div ref={detailsRef} className={s.detailsBox}>
                        {selectedEvent && (
                            <EventDetails
                                coachesList={coachesList}
                                event={selectedEvent}
                                onClose={() => setSelectedEvent(null)}
                            />
                        )}
                    </div>
                </div>
            </Container>
        </section>
    )
}