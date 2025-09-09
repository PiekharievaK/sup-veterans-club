import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage/Homepage'
// import { AboutPage } from '../pages/About/About'
// import { EventsPage } from '../pages/Events/Events'
// import { ContactPage } from '../pages/Contact/Contact'
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage'
import { Layout } from '../../components/Layout/Layout'
import { SchedulePage } from '../../pages/Schedule/Schedule'
import { AboutUsPage } from '../../pages/AboutUsPage/AboutUs'
import { ContactsPage } from '../../pages/ContactsPage/ContactsPage'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="about" element={<AboutUsPage />} />
        {/* <Route path="events" element={<EventsPage />} /> */}
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
