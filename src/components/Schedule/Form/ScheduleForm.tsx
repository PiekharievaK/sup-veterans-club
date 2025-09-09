import React from 'react'
import { useForm } from 'react-hook-form'
import { Notify } from 'notiflix'
import { useTranslation } from 'react-i18next'
import { createSignInMessage } from '../../../helpers/messagesBuilder'
import { sendTelegramMessage } from '../../../helpers/connect'
import s from './ScheduleForm.module.scss'

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

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormFields>({
    mode: 'onBlur',
  })

  const formattedDate = date.split('-').reverse().join('.')
  const timeString = `${timeStart} – ${timeEnd}`

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9+]/g, '');
    setValue('phone', value);
  };

  const emailOrPhoneRequired = watch('email') || watch('phone');

  const onSubmit = async (data: FormFields) => {
    if (!emailOrPhoneRequired) {
      Notify.failure(t('ScheduleForm.validation.emailOrPhoneRequired'))
      return
    }

    const message = createSignInMessage({
      owner: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      date: formattedDate,
      time: timeString,
      type: eventType || '-',
    })

    try {
      await sendTelegramMessage(message, 'registration')
      Notify.success(t('ScheduleForm.success'))
      onClose()
    } catch (err) {
      console.error('Telegram error:', err)
      Notify.failure(t('ScheduleForm.error'))
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

      <form className={s.formInner} onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          {...register('name', { required: t('ScheduleForm.validation.required') })}
          placeholder={t('ScheduleForm.name')}
          className={`${s.formInput} ${errors.name ? s.formInputError : ''}`}
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
        />
        {errors.name && <div id="name-error" className={s.errorMessage}>{errors.name.message}</div>}

        <input
          type="email"
          {...register('email', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('ScheduleForm.validation.invalidEmail'),
            },
          })}
          placeholder={t('ScheduleForm.email')}
          className={`${s.formInput} ${errors.email ? s.formInputError : ''}`}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && <div id="email-error" className={s.errorMessage}>{errors.email.message}</div>}

        <input
          type="tel"
          id="phone"
          autoComplete="tel"
          placeholder="+1234567890"
          {...register('phone', {
            minLength: {
              value: 10,
              message: t('contactForm.phoneMinLength')
            }
          })}
          onChange={handlePhoneChange}
          className={`${s.formInput} ${errors.phone ? s.formInputError : ''}`}
        />
        {errors.phone && <span className={s.errorMessage}>{errors.phone.message}</span>}

        <button type="submit" className={s.formSubmitBtn} disabled={!emailOrPhoneRequired || !watch('name').length}>
          {t('ScheduleForm.submit')}
        </button>
      </form>
    </div>
  )
}
