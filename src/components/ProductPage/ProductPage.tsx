import React from 'react'
import styles from './ProductPage.module.css'
import {RouteComponentProps} from 'react-router-dom'
import {FullProductType} from '../../types/types'

const ProductPage: React.FC<RouteComponentProps<any>> = (props) => {
    const product = props.location.state as FullProductType

    return (
        <div className={styles.productPage}>
            <div className={styles.images}>
                <div>{}</div>
                <img src={product.images[0]}/>
            </div>
        </div>
    )
}

export default ProductPage
