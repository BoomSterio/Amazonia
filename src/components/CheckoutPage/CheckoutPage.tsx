import React from 'react'
import styles from './CheckoutPage.module.css'

const CheckoutPage: React.FC = () => {
    return (
        <div className={styles.checkout}>
            <div className={styles.left}>
                <img className={styles.ad} src={'https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'} alt={'ad'}/>
                <div>
                    <h2 className={styles.title}>Shopping Cart</h2>
                </div>
            </div>
            <div className={styles.right}>
                    Your subtotal here
            </div>
        </div>
    )
}

export default CheckoutPage