import React from 'react'
import styles from './MenuDrop.module.css'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAuthUser, getIsAuth } from '../../../../redux/selectors/auth-selectors'
import { authAPI } from '../../../../api/auth-api'

const MenuDrop = () => {
  const history = useHistory()

  const isAuth = useSelector(getIsAuth)
  const user = useSelector(getAuthUser)

  const signOut = () => {
    authAPI
      .signOut()
      .then(() => {
        history.push('/login')
      })
      .catch(error => alert(error.message))
  }

  return (
    <div className={styles.menuDrop}>
      {!isAuth && (
        <div className={styles.signIn}>
          <Link to={'/login'}>
            <button className={styles.signInBtn}>Sign In</button>
          </Link>
          <span>
            New customer here?{' '}
            <Link to={'/login'} className={styles.register}>
              Start Here
            </Link>
          </span>
        </div>
      )}
      <div className={styles.columns}>
        <div className={styles.optionsFirst}>
          <h4>Your Lists</h4>
          <div className={'option-small'}>Create a list</div>
          <div className={'option-small'}>Find a list of Registry</div>
        </div>
        <div className={styles.optionsSecond}>
          <h4>Your Account</h4>
          {user.email === 'admin@gmail.com' && (
            <div className={'option-small'} onClick={() => history.push('/admin')} style={{ color: 'red' }}>
              Admin page
            </div>
          )}
          <div className={styles.option}>Account</div>
          <div className={'option-small'} onClick={() => history.push('/orders')}>
            Orders
          </div>
          <div className={'option-small'}>Recommendations</div>
          {isAuth && (
            <div className={'option-small'} onClick={signOut}>
              Sign Out
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MenuDrop
