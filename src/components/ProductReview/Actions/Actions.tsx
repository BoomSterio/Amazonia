import React, { useState } from 'react'
import styles from './Actions.module.css'
import CurrencyPrice from '../../common/CurrencyPrice/CurrencyPrice'
import { TextField } from '@material-ui/core'
import Button from '../../common/Button/Button'
import { checkoutActions } from '../../../redux/actions/checkout-actions'
import { createToast } from '../../common/Toast/Toast'
import { FullProductType } from '../../../types/types'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

type Props = {
  product: FullProductType
}

const Actions: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [quantity, setQuantity] = useState(1)
  let submitType = ''

  const handleQuantityChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (Number(e.target.value) <= 100 && Number(e.target.value) > 0) setQuantity(Number(e.target.value))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const dispatchProductToCart = () => {
      dispatch(
        checkoutActions.addToCart({
          id: product?.id as number,
          title: product?.title as string,
          image: product?.images[0] as string,
          price: product?.price as number,
          rating: product?.rating as number,
          quantity: quantity,
          inStock: product?.inStock as number,
        })
      )
    }
    if (submitType === 'toCart') {
      dispatchProductToCart()
      createToast(product?.title as string, product?.images[0] as string, quantity)
    } else {
      dispatchProductToCart()
      history.push('/checkout')
    }
  }

  return (
    <div className={styles.actions}>
      <div className={styles.price}>
        <CurrencyPrice value={product?.price} />
      </div>
      <p className={product?.inStock >= 50 ? styles.inStockGreen : styles.inStockRed}>
        {product?.inStock >= 50 ? 'In Stock.' : `${product?.inStock} items available.`}
      </p>
      <form onSubmit={handleSubmit}>
        <TextField
          className={styles.qty}
          size={'small'}
          type={'number'}
          variant={'outlined'}
          defaultValue={1}
          value={quantity}
          onChange={handleQuantityChange}
          label={'Qty:'}
          inputProps={{ min: 1, max: product?.inStock }}
        />
        <div className={styles.purchase}>
          <Button onClick={() => (submitType = 'toCart')} style={{ margin: '10px 0', maxWidth: '320px' }} name={'toCart'} color={'primary'}>
            Add to Cart
          </Button>
          <Button onClick={() => (submitType = 'buy')} style={{ marginBottom: '10px', maxWidth: '320px' }} name={'buy'} color={'secondary'}>
            Buy Now
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Actions
