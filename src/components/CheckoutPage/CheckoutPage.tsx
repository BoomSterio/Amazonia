import React from 'react'
import styles from './CheckoutPage.module.css'
import Subtotal from './Subtotal/Subtotal'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'

const CheckoutPage: React.FC = () => {
    const cart = useSelector((store: AppStateType) => store.cart)

    return (
        <div className={styles.checkout}>
            <div className={styles.left}>
                <img className={styles.ad}
                     src={'https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'}
                     alt={'ad'}/>
                <div className={styles.cart}>
                    <h2 className={styles.title}>Shopping Cart</h2>
                </div>
            </div>
            <div className={styles.right}>
                <Subtotal/>
            </div>
        </div>
    )
}

export default CheckoutPage