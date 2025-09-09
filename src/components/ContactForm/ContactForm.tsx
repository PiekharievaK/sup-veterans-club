import React from 'react'
import { useForm } from 'react-hook-form'
import { Notify } from 'notiflix'
import { useTranslation } from 'react-i18next'
import { sendTelegramMessage } from '../../helpers/connect'
import { createContactMessage } from '../../helpers/messagesBuilder'
import s from './ContactForm.module.scss'

type FormData = {
    name: string
    email: string
    phone: string
    message: string
}

export const ContactForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t } = useTranslation()
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>()

    const emailOrPhoneRequired = watch('email') || watch('phone')

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9+]/g, '')
        setValue('phone', value)
    }

    const onSubmit = async (data: FormData) => {
        const formattedDate = new Date().toLocaleString().split('-').reverse().join('.')
        const messageToSend = createContactMessage({ ...data, date: formattedDate })

        try {
            await sendTelegramMessage(messageToSend, 'contact')
            Notify.success(t('contactForm.successMessage'))
            onClose()
        } catch (error) {
            console.error('Failed to send message:', error)
            Notify.failure(t('contactForm.errorMessage'))
        }
    }

    return (
        <div className={s.formContainer}>
            <h2 className={s.formTitle}>{t('contactForm.title')}</h2>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={s.formGroup}>
                    <label htmlFor="name" className={s.formLabel}>{t('contactForm.name')}</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: t('contactForm.nameRequired') })}
                        className={s.formInput}
                        placeholder='John Doe'
                    />
                    {errors.name && <span className={s.error}>{errors.name.message}</span>}
                </div>

                <div className={s.formGroup}>
                    <label htmlFor="email" className={s.formLabel}>{t('contactForm.email')}</label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        placeholder='example@gmail.com'
                        {...register('email', {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: t('contactForm.emailInvalid')
                            }
                        })}
                        className={s.formInput}
                    />
                    {errors.email && <span className={s.error}>{errors.email.message}</span>}
                </div>

                <div className={s.formGroup}>
                    <label htmlFor="phone" className={s.formLabel}>{t('contactForm.phone')}</label>
                    <input
                        type="tel"
                        id="phone"
                        autoComplete="tel"
                        placeholder="+1234567890"
                        {...register('phone', {
                            minLength: {
                                value: 10,
                                message: t('contactForm.phoneMinLength')
                            },
                            pattern: {
                                value: /^[+]?[0-9]{1,3}[ .-]?[0-9]{1,4}[ .-]?[0-9]{1,4}[ .-]?[0-9]{1,4}$/i,
                                message: t('contactForm.phoneInvalid')
                            }
                        })}
                        onChange={handlePhoneChange}
                        className={`${s.formInput} ${errors.phone ? s.formInputError : ''}`}
                    />
                    {errors.phone && <span className={s.error}>{errors.phone.message}</span>}
                </div>

                <div className={s.formGroup}>
                    <label htmlFor="message" className={s.formLabel}>{t('contactForm.message')}</label>
                    <textarea
                        id="message"
                        {...register('message', { required: t('contactForm.messageRequired') })}
                        className={s.formInput}
                    />
                    {errors.message && <span className={s.error}>{errors.message.message}</span>}
                </div>

                <button
                    type="submit"
                    className={s.submitButton}
                    disabled={!emailOrPhoneRequired || !watch('name').length}
                >
                    {t('contactForm.submit')}
                </button>
            </form>
        </div>
    )
}
