import { BrowserRouter } from 'react-router-dom'
import { I18nProvider } from './providers/LangProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { AppRoutes } from './routes/AppRoutes'
import { ScrollToTopButton } from '../components/ScrollToTopButton/ScrollToTopButton'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

const App = () => (
  <I18nProvider>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
          <ScrollToTopButton />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </I18nProvider>
)

export default App
