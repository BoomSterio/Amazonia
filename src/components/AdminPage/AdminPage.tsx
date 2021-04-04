import React from 'react'
import styles from './AdminPage.module.css'
import { useSelector } from 'react-redux'
import { getAuthUser } from '../../redux/selectors/auth-selectors'
import { Redirect } from 'react-router'
import { Accordion, Input } from '@material-ui/core'
import NewProductForm from './NewProductForm/NewProductForm'
import Preloader from '../common/Preloader/Preloader'
import OrdersMonitor from './OrdersMonitor/OrdersMonitor'

const AdminPage: React.FC = () => {
  const user = useSelector(getAuthUser)

  if (user.email !== 'admin@gmail.com') return <Redirect to={'/'} />

  return (
    <div className={styles.admin}>
      <div className={styles.container}>
        <NewProductForm />
        <OrdersMonitor />
      </div>
    </div>
  )
}

export default AdminPage
