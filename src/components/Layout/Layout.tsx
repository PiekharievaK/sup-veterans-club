import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { useIsFetching } from '@tanstack/react-query'
import { Loader } from '../../components/Loader/Loader'
import s from './Layout.module.scss'
import type { ContactsData } from '../../types/contacts'

type Props = {
  contactsData: ContactsData
}


export const Layout: React.FC<Props> = ({ contactsData }) => {
  const isFetching = useIsFetching() > 0;

  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer contactsData={contactsData} />
      {isFetching && <Loader />}
    </div>
  )
}
