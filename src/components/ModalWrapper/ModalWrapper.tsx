import React, { useEffect } from 'react'
import s from './ModalWrapper.module.scss'

type ModalWrapperProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        <button className={s.close} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  )
}
