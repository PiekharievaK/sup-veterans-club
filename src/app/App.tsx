import { BrowserRouter } from 'react-router-dom'
import { I18nProvider } from './providers/LangProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { AppRoutes } from './routes/AppRoutes'
import { ScrollToTopButton } from '../components/ScrollToTopButton/ScrollToTopButton'


const App = () => (
  <I18nProvider>
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
        <ScrollToTopButton />
      </BrowserRouter>
    </ThemeProvider>
  </I18nProvider>
)

export default App
