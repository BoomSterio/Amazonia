import React from 'react'
import styles from './Nav.module.css'
import {ArrowDropDown, MenuRounded, ShoppingCartOutlined} from '@material-ui/icons'
import {Link} from 'react-router-dom'

const Nav: React.FC = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.option}>
                <span className={styles.optionLineOne}>Hello, Sally</span>
                <span className={styles.optionLineTwo}>Account & Lists<ArrowDropDown className={styles.dropDownIcon}/></span>
            </div>
            <div className={styles.option}>
                <span className={styles.optionLineOne}>Returns</span>
                <span className={styles.optionLineTwo}>& Orders</span>
            </div>
            <div className={styles.menuBurger}>
                <MenuRounded />
            </div>

            <Link to={'/checkout'} className={`${styles.option} ${styles.optionCart}`}
                  style={{color: 'inherit', textDecoration: 'inherit'}}>
                <ShoppingCartOutlined/>
                <span className={styles.basketCount}>0</span>
            </Link>
        </div>
    )
}

export default Nav