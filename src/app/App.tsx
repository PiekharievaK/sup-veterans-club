import { BrowserRouter } from 'react-router-dom'
import { I18nProvider } from './providers/LangProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { AppRoutes } from './routes/AppRoutes'

const App = () => (
  <I18nProvider>
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </I18nProvider>
)

export default App