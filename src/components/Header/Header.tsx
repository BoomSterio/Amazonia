import styles from './Header.module.css'
import React from 'react'
import Search from './Search/Search'
import Nav from './Nav/Nav'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Link to={'/'}>
        <img className={styles.logo} src={'http://pngimg.com/uploads/amazon/amazon_PNG11.png'} alt={'logo'} />
      </Link>
      <Search />
      <Nav />
    </div>
  )
}

export default Header
