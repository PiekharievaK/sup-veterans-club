import { useLangStore } from '../../store/langStore'
import s from './LanguageButton.module.scss'

export const LanguageSwitcher = () => {
  const { lang, setLang } = useLangStore()

  return (
    <div className={s.switcher}>
      {lang === 'en' ?
        <button className={s.switcher} onClick={() => setLang('uk')}>
          ua | EN
        </button> :
        <button className={s.switcher} onClick={() => setLang('en')} >
          UA | en
        </button>}
    </div>
  )
}
