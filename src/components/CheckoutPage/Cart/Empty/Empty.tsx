import React from 'react'
import styles from './Empty.module.css'

const Empty: React.FC = () => {
    return (
        <div className={styles.empty}>
            <img
                className={styles.image}
                src={'https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg'}
                alt={'empty'}/>
            <div className={styles.info}>
                <h2>Your Amazon Cart is empty</h2>
                <span>Shop today's deals</span>
            </div>
        </div>
    )
}

export default Empty