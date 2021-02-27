import React from 'react'
import styles from './PaymentPage.module.css'
import {useSelector} from 'react-redux'
import {getAuthUser, getIsAuth} from '../../redux/selectors/auth-selectors'
import {getCart} from '../../redux/selectors/checkout-selectors'
import {useHistory} from 'react-router'
import CartProduct from '../CheckoutPage/Cart/CartProduct/CartProduct'
import PaymentSection from './PaymentSection/PaymentSection'

const PaymentPage: React.FC = () => {
    const history = useHistory()

    const user = useSelector(getAuthUser)
    const cart = useSelector(getCart)
    const isAuth = useSelector(getIsAuth)

    const cartItems = cart.map(item =>
        <CartProduct
            key={item.id}
            id={item.id}
            price={item.price}
            title={item.title}
            image={item.image}
            rating={item.rating}
            quantity={item.quantity}
            direction={'left'}
        />
    )

    if (!cart.length)
        history.replace('/cart')

    if(!isAuth)
        history.replace('/login')

    return (
        <div className={styles.payment}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.title}>
                        <h4>Delivery Address</h4>
                    </div>
                    <div className={styles.address}>
                        <p>{user.name && user.name}</p>
                        <p>{user.email && user.email}</p>
                        <p>Yaroslava Horobrogo 123</p>
                        <p>San Jose, California</p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>
                        <h4>Review Items</h4>
                    </div>
                    <div className={styles.items}>
                        {cartItems}
                    </div>
                </div>
                <div className={styles.section}>
                    <PaymentSection/>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage