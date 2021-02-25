import React, {useState} from 'react'
import styles from './Nav.module.css'
import {ArrowDropDown, MenuRounded, ShoppingCartOutlined} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCartCount} from '../../../redux/selectors/checkout-selectors'
import {Backdrop, createStyles, makeStyles, Popover, Theme} from '@material-ui/core'
import MenuDrop from './MenuDrop/MenuDrop'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
)

const Nav: React.FC = () => {
    const itemsInCart = useSelector(getCartCount)
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <div className={styles.nav}>
            <div className={styles.option} id={'#menuDrop'} onClick={handleClick}>
                <span className={styles.optionLineOne}>Hello, Sally</span>
                <span className={styles.optionLineTwo}>Account & Lists<ArrowDropDown
                    className={styles.dropDownIcon}/></span>
            </div>
            <Backdrop className={classes.backdrop} open={open}>
                <Popover
                    id={id} open={open} anchorEl={anchorEl} onClose={handleClose} onClick={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <MenuDrop />
                </Popover>
            </Backdrop>
            <div className={styles.option}>
                <span className={styles.optionLineOne}>Returns</span>
                <span className={styles.optionLineTwo}>& Orders</span>
            </div>
            <div className={styles.menuBurger}>
                <MenuRounded onClick={handleClick}/>
            </div>
            <Link to={'/checkout'} className={`${styles.option} ${styles.optionCart}`}
                  style={{color: 'inherit', textDecoration: 'inherit'}}>
                <ShoppingCartOutlined/>
                <span className={styles.basketCount}>{itemsInCart}</span>
            </Link>
        </div>
    )
}

export default Nav