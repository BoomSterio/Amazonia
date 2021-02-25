import React, {ChangeEvent, useState} from 'react'
import styles from './ProductCard.module.css'
import {Rating} from '@material-ui/lab'
import {useDispatch} from 'react-redux'
import {checkoutActions} from '../../../redux/actions/checkout-actions'
import {createToast} from '../Toast/Toast'
// @ts-ignore
import {default as CurrencyFormat} from 'react-currency-format'
import {ProductType} from '../../../types/types'
import {Input} from '@material-ui/core'

const ProductCard: React.FC<ProductType> = ({id, title, image, price, rating}) => {
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()

    const addToBasket = () => {
        dispatch(checkoutActions.addToCart(
            {
                id,
                title,
                image,
                price,
                rating,
                quantity: quantity
            }))

        createToast(title, image, quantity)
    }

    const changeQuality = (e: ChangeEvent<HTMLInputElement>) => {
        if(Number(e.target.value) <= 100 && Number(e.target.value) > 0)
            setQuantity(Number(e.target.value))
    }

    return (
        <div className={styles.product}>
            <img className={styles.image} src={image} alt={'product'}/>
            <div className={styles.info}>
                <h3>{title}</h3>
                <div className={styles.rating}>
                    <Rating size={'small'} defaultValue={rating} precision={0.5} readOnly />
                    <p>{rating}</p>
                </div>
                <CurrencyFormat
                    renderText={(value: number) => (
                        <p className={styles.price}>
                            <small>$</small>
                            <strong>{value}</strong>
                        </p>
                    )}
                    decimalScale={2}
                    value={price}
                    displayType={'text'}
                    thousandSeparator
                />
            </div>
            <div className={styles.toCart}>
                <small>Qty: </small>
                <Input className={styles.quantity} onChange={changeQuality} inputProps={{min: 1, max: 100}} disableUnderline type={'number'} value={quantity}/>
                <button className={styles.toCartBtn} onClick={addToBasket}>
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard