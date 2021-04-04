import React from 'react'
import styles from './Cart.module.css'
import CartProduct from './CartProduct/CartProduct'
import { useSelector } from 'react-redux'
import { getCart } from '../../../redux/selectors/checkout-selectors'
import Empty from './Empty/Empty'
import CurrencyPrice from '../../common/CurrencyPrice/CurrencyPrice'

type Props = {
  itemsCount: number
  total: number
}

const Cart: React.FC<Props> = ({ itemsCount, total }) => {
  const cart = useSelector(getCart)

  const cartItems = cart.map(item => (
    <CartProduct
      key={item.id}
      id={item.id}
      price={item.price}
      title={item.title}
      image={item.image}
      rating={item.rating}
      quantity={item.quantity}
      inStock={item.inStock}
    />
  ))

  return (
    <div className={styles.cart}>
      {cart.length ? (
        <>
          <h2 className={styles.title}>Shopping Cart</h2>
          <p>Price</p>
          {cartItems}
          <div className={styles.total}>
            <CurrencyPrice value={total} text={`Subtotal (${itemsCount} items): `} />
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}

export default Cart
