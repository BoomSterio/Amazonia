import React from 'react'
import styles from './HomePage.module.css'
import BackgroundCarousel from './BackgroundCarousel/BackgroundCarousel'
import {ToastContainer} from 'react-toastify'
import {Helmet} from 'react-helmet'
import Recommended from './Recommended/Recommended'

const HomePage: React.FC = () => {
    return (
        <div className={styles.home}>
            <Helmet><title>Amazon.com: Online Shopping for Electronics, Apparel, Computers, ...</title></Helmet>
            <ToastContainer limit={4} style={{marginTop: '50px'}}/>
            <div className={styles.container}>
                <BackgroundCarousel/>
                <Recommended/>
            </div>
        </div>
    )
}

export default HomePage