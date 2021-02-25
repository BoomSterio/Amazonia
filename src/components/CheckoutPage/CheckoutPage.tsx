import React from 'react'
import styles from './CheckoutPage.module.css'
import Subtotal from './Subtotal/Subtotal'
import {useSelector} from 'react-redux'
import {getCartCount, getCartTotal} from '../../redux/selectors/checkout-selectors'
import Cart from './Cart/Cart'

const CheckoutPage: React.FC = () => {
    const itemsInCart = useSelector(getCartCount)
    const total = useSelector(getCartTotal)

    return (
        <div className={styles.checkout}>
            <div className={styles.left}>
                <img className={styles.ad}
                     src={'https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'}
                     alt={'ad'}/>
                <Cart/>
            </div>
            <div className={styles.right}>
                <Subtotal total={total} count={itemsInCart}/>
            </div>
        </div>
    )
}

export default CheckoutPage