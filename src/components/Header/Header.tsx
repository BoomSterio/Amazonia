import styles from './Header.module.css'
import React from 'react'
import Search from './Search/Search'
import Nav from './Nav/Nav'

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <img className={styles.logo} src={'http://pngimg.com/uploads/amazon/amazon_PNG11.png'} alt={'logo'}/>
            <Search/>
            <Nav/>
        </div>
    )
}

export default Header
