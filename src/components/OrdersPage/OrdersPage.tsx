import React, {useEffect, useState} from 'react'
import styles from './OrdersPage.module.css'
import {db} from '../../api/firebase'
import {useSelector} from 'react-redux'
import {getAuthUser} from '../../redux/selectors/auth-selectors'
import OrderItem from './OrderItem/OrderItem'
import {Helmet} from 'react-helmet'

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState([])

    const user = useSelector(getAuthUser)

    useEffect(() => {
        if(user.id) {
            db
                .collection('users')
                .doc(user.id as string)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    // @ts-ignore
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        } else {
            setOrders([])
        }

    }, [user])

    const ordersItems = orders.map(order => <OrderItem order={order}/>)

    return (
        <div className={styles.orders}>
            <Helmet><title>Your Orders</title></Helmet>
            <h2>Your Orders</h2>
            <div>
                {ordersItems}
            </div>
        </div>
    )
}

export default OrdersPage