import React, {ChangeEvent, useState} from 'react'
import styles from './ProductCard.module.css'
import {Rating} from '@material-ui/lab'
import {useDispatch} from 'react-redux'
import {checkoutActions} from '../../../redux/actions/checkout-actions'
import {createToast} from '../Toast/Toast'
import {useHistory} from 'react-router-dom'
// @ts-ignore
import {default as CurrencyFormat} from 'react-currency-format'
import {FullProductType} from '../../../types/types'
import {Input} from '@material-ui/core'
import Button from '../Button/Button'

const ProductCard: React.FC<FullProductType> = (props) => {
    const {id, title, images, specs, description, price, rating, inStock} = props
    const [quantity, setQuantity] = useState(1)

    const history = useHistory()
    const dispatch = useDispatch()

    const addToBasket = () => {
        dispatch(checkoutActions.addToCart(
            {
                id,
                title,
                image: images[0],
                price,
                rating,
                quantity: quantity,
                inStock
            }))

        createToast(title, images[0], quantity)
    }

    const changeQuality = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) <= 100 && Number(e.target.value) > 0)
            setQuantity(Number(e.target.value))
    }

    const toProductPage = () => {
        history.push(`/product/${id}`)
    }

    return (
        <div className={styles.product}>
            <img className={styles.image} src={images[0]} alt={'product'} onClick={toProductPage}/>
            <div className={styles.info}>
                <h3 onClick={toProductPage}>{title}</h3>
                <div className={styles.rating}>
                    <Rating size={'small'} defaultValue={rating} precision={0.5} readOnly/>
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
                <Input className={styles.quantity} onChange={changeQuality} inputProps={{min: 1, max: inStock}}
                       disableUnderline type={'number'} value={quantity}/>
                <Button color={'primary'} style={{width: '130px', height: 'inherit'}} onClick={addToBasket}>
                    Add to cart
                </Button>
            </div>
        </div>
    )
}

export default ProductCard