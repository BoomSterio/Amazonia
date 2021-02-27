import React from 'react'
import styles from './MenuDrop.module.css'
import {Link, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getIsAuth} from '../../../../redux/selectors/auth-selectors'
import {authAPI} from '../../../../api/auth-api'

const MenuDrop = () => {
    const history = useHistory()

    const isAuth = useSelector(getIsAuth)

    const signOut = () => {
        authAPI.signOut()
            .then(() => {
                history.push('/login')
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className={styles.menuDrop}>
            {!isAuth &&
            <div className={styles.signIn}>
                <Link to={'/login'}>
                    <button className={styles.signInBtn}>Sign In</button>
                </Link>
                <span>
                    New customer here? <Link to={'/login'} className={styles.register}>Start Here</Link>
                </span>
            </div>}
            <div className={styles.columns}>
                <div className={styles.optionsFirst}>
                    <h4>Your Lists</h4>
                    <div className={styles.option}>Create a list</div>
                    <div className={styles.option}>Find a list of Registry</div>
                </div>
                <div className={styles.optionsSecond}>
                    <h4>Your Account</h4>
                    <div className={styles.option}>Account</div>
                    <div className={styles.option} onClick={() => history.push('/orders')}>Orders</div>
                    <div className={styles.option}>Recommendations</div>
                    {isAuth &&
                    <div className={styles.option} onClick={signOut}>Sign Out</div>}
                </div>
            </div>
        </div>
    )
}

export default MenuDrop