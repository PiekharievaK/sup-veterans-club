import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/Homepage';
// import { AboutPage } from '../pages/About/About'
// import { EventsPage } from '../pages/Events/Events'
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { Layout } from '../../components/Layout/Layout';
import { SchedulePage } from '../../pages/Schedule/Schedule';
import { AboutUsPage } from '../../pages/AboutUsPage/AboutUs';
import { ContactsPage } from '../../pages/ContactsPage/ContactsPage';
import { TrainingPage } from '../../pages/TrainingsPage/TrainingsPage';
import { DonationsPage } from '../../pages/DonationsPage/DonationPage';
import { PartnersPage } from '../../pages/PartnersPage/PartnersPage';

export const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="/training/:type" element={<TrainingPage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        {/* <Route path="events" element={<EventsPage />} /> */}
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
