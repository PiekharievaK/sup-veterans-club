import { useLangStore } from '../../store/langStore'

export const LanguageSwitcher = () => {
  const { lang, setLang } = useLangStore()

  return (
    <div>
      <button onClick={() => setLang('en')} disabled={lang === 'en'}>
        EN
      </button>
      <button onClick={() => setLang('uk')} disabled={lang === 'uk'}>
        UA
      </button>
    </div>
  )
}
