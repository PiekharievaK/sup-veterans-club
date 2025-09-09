import React, { useState } from 'react'
import { ModalWrapper } from '../ModalWrapper/ModalWrapper'
import { ContactForm } from '../ContactForm/ContactForm'
import s from './ContactButton.module.scss'
import { useTranslation } from 'react-i18next'

export const ContactButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { t } = useTranslation();

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div>
            <button className={s.contactButton} onClick={handleOpenModal}>
              {t("aboutUs.contact")}
            </button>

            <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
                <ContactForm onClose={handleCloseModal} />
            </ModalWrapper>
        </div>
    )
}
