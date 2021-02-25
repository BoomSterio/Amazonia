import React, {ChangeEvent, useState} from 'react'
import styles from './CartProduct.module.css'
import {CartProductType} from '../../../../types/types'
// @ts-ignore
import {default as CurrencyFormat} from 'react-currency-format'
import {Rating} from '@material-ui/lab'
import {Input, Slide} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {checkoutActions} from '../../../../redux/actions/checkout-actions'

const CartProduct: React.FC<CartProductType> = ({id, title, image, price, rating, quantity=1}) => {
    const [remove, setRemove] = useState(false)

    const dispatch = useDispatch()

    const changeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        if(Number(e.target.value) <= 100)
            dispatch(checkoutActions.changeProductQuantity(id, Number(e.target.value)))
    }

    const handleDelete = () => {
        setRemove(true)
        setTimeout(() => dispatch(checkoutActions.deleteFromCart(id)), 300)
    }

    return (
        <Slide direction={'right'} in={!remove} timeout={{enter: 300, exit: 300}}>
        <div className={styles.product}>
            <img className={styles.image} src={image} alt={'cart item'}/>
            <div className={styles.info}>
                <div className={styles.title}>{title}</div>
                <span className={styles.availability}>In Stock</span>
                <Rating size={'small'} defaultValue={rating} precision={0.5} readOnly />
                <div className={styles.options}>
                    <Input className={styles.quantity} onChange={changeQuantity} inputProps={{min: 1, max: 100}} type={'number'} value={quantity}/>
                    <span className={styles.option} onClick={handleDelete}>Delete</span>
                    <span className={styles.option}>Save for later</span>
                </div>
            </div>
            <CurrencyFormat
                renderText={(value: number) => (
                    <strong className={styles.price}>
                        {value}
                    </strong>
                )}
                decimalScale={2}
                value={price}
                displayType={'text'}
                prefix={'$'}
                thousandSeparator
            />
        </div>
        </Slide>
    )
}

export default CartProduct