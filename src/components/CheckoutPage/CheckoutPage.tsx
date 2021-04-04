import React from 'react'
import styles from './CheckoutPage.module.css'
import Subtotal from './Subtotal/Subtotal'
import { useSelector } from 'react-redux'
import { getCartCount, getCartTotal } from '../../redux/selectors/checkout-selectors'
import Cart from './Cart/Cart'
import { Helmet } from 'react-helmet'

const CheckoutPage: React.FC = () => {
  const itemsInCart = useSelector(getCartCount)
  const total = useSelector(getCartTotal)

  return (
    <div className={styles.checkout}>
      <Helmet>
        <title>Your Cart</title>
      </Helmet>
      <div className={styles.left}>
        <img className={styles.ad} src={'https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'} alt={'ad'} />
        <Cart itemsCount={itemsInCart} total={total} />
      </div>
      <div className={styles.right}>{itemsInCart ? <Subtotal total={total} count={itemsInCart} /> : null}</div>
    </div>
  )
}

export default CheckoutPage
