import React from 'react'
import styles from './Nav.module.css'
import {ShoppingCartOutlined} from '@material-ui/icons'

const Nav: React.FC = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.option}>
                <span className={styles.optionLineOne}>Hello, Sally</span>
                <span className={styles.optionLineTwo}>Account & Lists</span>
            </div>
            <div className={styles.option}>
                <span className={styles.optionLineOne}>Returns</span>
                <span className={styles.optionLineTwo}>& Orders</span>
            </div>
            <div className={`${styles.option} ${styles.optionCart}`}>
                <ShoppingCartOutlined/>
                <span className={styles.basketCount}>0</span>
            </div>
        </div>
    )
}

export default Nav