import React from 'react'
import styles from './ProductCard.module.css'
import {Rating} from '@material-ui/lab'

type Props = {
    id?: number,
    title: string,
    image: string,
    price: number,
    rating: number
}

const ProductCard: React.FC<Props> = ({id, title, image, price, rating}) => {
    return (
        <div className={styles.product}>
            <img className={styles.image} src={image} alt={'product'}/>
            <div className={styles.info}>
                <h3>{title}</h3>
                <div className={styles.rating}>
                    <Rating size={'small'} defaultValue={rating} precision={0.5} readOnly />
                    <p>{rating}</p>
                </div>
                <p className={styles.price}>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
            </div>
            <button className={styles.toCart}>Add to cart</button>
        </div>
    )
}

export default ProductCard