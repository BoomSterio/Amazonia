import React, {useState} from 'react'
import styles from './PaymentPage.module.css'
import {useSelector} from 'react-redux'
import {getAuthUser, getIsAuth} from '../../redux/selectors/auth-selectors'
import {getCart} from '../../redux/selectors/checkout-selectors'
import {useHistory} from 'react-router'
import CartProduct from '../CheckoutPage/Cart/CartProduct/CartProduct'
import PaymentSection from './PaymentSection/PaymentSection'
import DeliverySection from './DeliverySection/DeliverySection'
import {DeliveryMethodType, DeliveryType} from '../../types/types'
import {Helmet} from 'react-helmet'

const PaymentPage: React.FC = () => {
    const history = useHistory()

    const cart = useSelector(getCart)
    const isAuth = useSelector(getIsAuth)
    const user = useSelector(getAuthUser)

    const [delivery, setDelivery] = useState({
        country: '',
        city: '',
        addressLine: '',
        fullName: user.name,
        phone: user.phoneNumber ? user.phoneNumber : '',
        email: user.email,
        index: 0,
        details: '',
        method: 'EMS Economy',
        isValid: false
    } as DeliveryType)

    const handleDeliveryChange = (prop: keyof DeliveryType) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
        | DeliveryMethodType| string | boolean) => {
        if(e)
            setDelivery({...delivery, [prop]: typeof(e) !== 'string' ? typeof(e) !=='boolean' ? e.target.value : Boolean(e) : String(e)})
    }

    const cartItems = cart.map(item =>
        <CartProduct
            key={item.id}
            id={item.id}
            price={item.price}
            title={item.title}
            image={item.image}
            rating={item.rating}
            quantity={item.quantity}
            inStock={item.inStock}
            direction={'left'}
        />
    )

    if (!cart.length)
        history.replace('/cart')

    if(!isAuth)
        history.replace('/login')

    return (
        <div className={styles.payment}>
            <Helmet><title>Delivery & Payment</title></Helmet>
            <div className={styles.container}>
                <div className={styles.section}>
                    <DeliverySection delivery={delivery} handleChange={handleDeliveryChange}/>
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
                    <PaymentSection delivery={delivery}/>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage