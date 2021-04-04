import React, { useEffect, useState } from 'react'
import styles from './OrdersPage.module.css'
import { db } from '../../api/firebase'
import { useSelector } from 'react-redux'
import { getAuthUser } from '../../redux/selectors/auth-selectors'
import OrderItem from './OrderItem/OrderItem'
import { Helmet } from 'react-helmet'
import { dbAPI } from '../../api/db-api'

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState({
    id: '',
    data: [],
  })

  const user = useSelector(getAuthUser)

  useEffect(() => {
    if (user.id) {
      db.collection('users')
        .doc(user.id)
        .get()
        .then(snapshot => {
          // @ts-ignore
          if (snapshot.exists) {
            setOrders({
              id: snapshot.id,
              // @ts-ignore
              data: snapshot.data().orders.map((order: any) => order),
            })
          }
        })
    } else {
      setOrders({ id: '', data: [] })
    }
  }, [user])

  // @ts-ignore
  const ordersItems = [...orders.data].reverse().map((order, i) => <OrderItem key={i} order={order} />)

  return (
    <div className={styles.orders}>
      <Helmet>
        <title>Your Orders</title>
      </Helmet>
      <h2>Your Orders</h2>
      <div>{ordersItems}</div>
    </div>
  )
}

export default OrdersPage
