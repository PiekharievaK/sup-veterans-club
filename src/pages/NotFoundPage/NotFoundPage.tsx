import s from './NotFound.module.scss'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className={s.notFound}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">{t('menu.home')}</Link>
    </div>
  )
}
