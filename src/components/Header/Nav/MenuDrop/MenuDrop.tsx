import React from 'react'
import styles from './MenuDrop.module.css'
import {Link} from 'react-router-dom'

const MenuDrop = () => {
    return (
        <div className={styles.menuDrop}>
            <div className={styles.signIn}>
                <Link to={'/login'}>
                    <button className={styles.signInBtn}>Sign In</button>
                </Link>
                <span>
                    New customer here? <Link to={'/signup'} className={styles.register}>Start Here</Link>
                </span>
            </div>
            <div className={styles.columns}>
                <div className={styles.optionsFirst}>
                    <h4>Your Lists</h4>
                    <div className={styles.option}>Create a list</div>
                    <div className={styles.option}>Find a list of Registry</div>
                </div>
                <div className={styles.optionsSecond}>
                    <h4>Your Account</h4>
                    <div className={styles.option}>Account</div>
                    <div className={styles.option}>Orders</div>
                    <div className={styles.option}>Recommendations</div>
                </div>
            </div>
        </div>
    )
}

export default MenuDrop