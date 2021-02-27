import React from 'react'
import styles from './HomePage.module.css'
import ProductCard from '../common/ProductCard/ProductCard'
import 'pure-react-carousel/dist/react-carousel.es.css'
import BackgroundCarousel from './BackgroundCarousel/BackgroundCarousel'
import {ToastContainer} from 'react-toastify'

const HomePage: React.FC = () => {
    return (
        <div className={styles.home}>
            <ToastContainer limit={4} style={{marginTop: '50px'}}/>
            <div className={styles.container}>
                <BackgroundCarousel/>
                <div className={styles.row}>
                    <ProductCard title={'Guitar Fender CD-60SCE Black'}
                                 id={27834678} price={349.99} rating={4.6}
                                 image={'https://images-na.ssl-images-amazon.com/images/I/61Uqh9quU5L._AC_SL1500_.jpg'}/>
                    <ProductCard
                        title={'The Bose SoundLink Revolve, the Portable Bluetooth Speaker with 360 Wireless Surround Sound, Triple Black'}
                        id={7824878} price={89.99} rating={1.3}
                        image={'https://images-na.ssl-images-amazon.com/images/I/81ipKYwWZBL._AC_SL1500_.jpg'}/>
                </div>
                <div className={styles.row}>
                    <ProductCard
                        title={'Victrola Vintage 3-Speed Bluetooth Portable Suitcase Record Player with Built-in Speakers | Upgraded Turntable Audio Sound| Includes Extra Stylus | Turquoise, Model Number: VSC-550BT-TQ'}
                        id={12573020} price={145.59} rating={4.2}
                        image={'https://m.media-amazon.com/images/I/71nhlV3s1gL._AC_SL1500_.jpg'}/>
                    <ProductCard title={'2020 Apple iPad Pro (11-inch, Wi-Fi, 1TB) - Space Gray (4th Generation)'}
                                 id={2359956} price={1394} rating={3.9}
                                 image={'https://images-na.ssl-images-amazon.com/images/I/815ztYEEwYL._AC_SL1500_.jpg'}/>
                    <ProductCard id={9294328} title={'Monopoly Classic Game'}
                                 price={19.99} rating={4.9}
                                 image={'https://images-na.ssl-images-amazon.com/images/I/81qy%2BMXuxDL._AC_SL1392_.jpg'}/>
                </div>
                <div className={styles.row}>
                    <ProductCard title={'Mirage Vision Diamond 4K QLED (1000NITS) (MV82DQ) Outdoor TV'}
                                 id={363634} price={8950} rating={4.5}
                                 image={'https://images-na.ssl-images-amazon.com/images/I/61S8dTuTZmL._AC_SL1250_.jpg'}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage