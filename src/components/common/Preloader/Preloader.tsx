import React from 'react'
import styles from './Preloader.module.css'
import logo from '../../../assets/images/white-a.png'

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <img className={styles.image} src={logo} alt={'preloader'} />
    </div>
  )
}

export default Preloader
