import React, { useState } from 'react'
import { Notify } from 'notiflix'
import s from './ScheduleForm.module.scss'
import { useTranslation } from 'react-i18next'
import { createSignInMessage } from '../../../helpers/messagesBuilder'
import { sendTelegramMessage } from '../../../helpers/connect'

type Props = {
  date?: string
  eventType?: string
  timeStart?: string
  timeEnd?: string
  onClose: () => void
}

type FormFields = {
  name: string
  email: string
  phone: string
}

export const ScheduleForm: React.FC<Props> = ({
  date = '-',
  timeStart = '-',
  timeEnd = '-',
  eventType = '-',
  onClose
}) => {
  const { t } = useTranslation()

  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    phone: '',
  })

  const [errors, setErrors] = useState<Partial<FormFields>>({})

  const formattedDate = date.split('-').reverse().join('.')
  const timeString = `${timeStart} – ${timeEnd}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const validateForm = () => {
    const { name, email, phone } = formData
    const newErrors: Partial<FormFields> = {}
    let valid = true

    if (!name.trim()) {
      newErrors.name = t('ScheduleForm.validation.required')
      valid = false
    }

    if (!email.trim()) {
      newErrors.email = t('ScheduleForm.validation.required')
      valid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        newErrors.email = t('ScheduleForm.validation.invalidEmail')
        valid = false
      }
    }

    const phoneDigits = phone.replace(/\D/g, '')
    if (!phone.trim()) {
      newErrors.phone = t('ScheduleForm.validation.required')
      valid = false
    } else if (phoneDigits.length < 10) {
      newErrors.phone = t('ScheduleForm.validation.invalidPhone')
      valid = false
    }

    setErrors(newErrors)

    if (!valid) {
      Notify.failure(t('ScheduleForm.validation.required'))
    }

    return valid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    const message = createSignInMessage({
      owner: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      date: formattedDate,
      time: timeString,
      type: eventType || '-',
    })

    try {
      await sendTelegramMessage(message);
      Notify.success(t('ScheduleForm.success'));
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
      onClose();
    } catch (err) {
      console.error('Telegram error:', err);
      Notify.failure(t('ScheduleForm.error'));
    }
  }

  return (
    <div className={s.form}>
      <h2 className={s.formTitle}>{t('ScheduleForm.title')}</h2>
      <p className={s.formDescription}>
        <strong>{t('ScheduleForm.date')}:</strong> {formattedDate}
      </p>
      <p className={s.formDescription}>
        <strong>{t('ScheduleForm.time')}:</strong> {timeStart} – {timeEnd}
      </p>
      <p className={s.formDescription}>
        <strong>{t('ScheduleForm.type')}:</strong> {t(`trainingTypes.${eventType}`)}
      </p>

      <form className={s.formInner} onSubmit={handleSubmit} noValidate>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t('ScheduleForm.name')}
          className={`${s.formInput} ${errors.name ? s.formInputError : ''}`}
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
        />
        {errors.name && <div id="name-error" className={s.errorMessage}>{errors.name}</div>}

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('ScheduleForm.email')}
          className={`${s.formInput} ${errors.email ? s.formInputError : ''}`}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && <div id="email-error" className={s.errorMessage}>{errors.email}</div>}

        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t('ScheduleForm.phone')}
          className={`${s.formInput} ${errors.phone ? s.formInputError : ''}`}
          aria-invalid={!!errors.phone}
          aria-describedby="phone-error"
        />
        {errors.phone && <div id="phone-error" className={s.errorMessage}>{errors.phone}</div>}

        <button type="submit" className={s.formSubmitBtn}>
          {t('ScheduleForm.submit')}
        </button>
      </form>
    </div>
  )
}
