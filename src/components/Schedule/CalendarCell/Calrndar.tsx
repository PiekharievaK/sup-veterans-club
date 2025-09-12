import React from 'react'
import { format, getDaysInMonth, startOfMonth } from 'date-fns'
import s from './Calendar.module.scss'
import type { EventType } from '../../../types/events'

type CalendarProps = {
  currentDate: Date
  eventsByDate: Record<string, EventType[]>
  onSelectEvent: (event: EventType) => void
  t: (key: string) => string
}

export const Calendar: React.FC<CalendarProps> = ({ currentDate, eventsByDate, onSelectEvent, t }) => {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysCount = getDaysInMonth(currentDate)
  const firstDay = startOfMonth(currentDate).getDay()

  const shift = firstDay === 0 ? 6 : firstDay - 1

  const cells = []
  const now = new Date();
  const nowStr = format(now, 'yyyy-MM-dd');

  for (let i = 0; i < shift; i++) {
    cells.push(
      <div key={`empty-${i}`} className={`${s.calendar_day} ${s.calendar_dayEmpty}`} />
    )
  }

  for (let day = 1; day <= daysCount; day++) {
    const date = new Date(year, month, day);
    const dateStr = format(date, 'yyyy-MM-dd');
    const isToday = dateStr === nowStr;
    const events = eventsByDate[dateStr] || []

    cells.push(
      <div key={dateStr} className={`${s.calendar_day} ${isToday ? s.today : ''}`}>
        <div className={s.dayNumber}>{day}</div>
        {events.map((event) => {
          const eventDateTime = new Date(`${event.date}T${event.timeStart}`)
          const isPast = eventDateTime < now;
          return (<div
            key={event.id}
            className={`${s.eventItem} ${s[event.type]} ${isPast ? s.pastEvent : ''}`}
            onClick={() => onSelectEvent(event)}
          >
            <span>{event.timeStart} – {event.timeEnd}</span>
            <button className={s.eventButton}>
              {t('SchedulePage.details')}
            </button>
          </div>)
        })}
      </div>
    )
  }

  return <>{cells}</>
}
