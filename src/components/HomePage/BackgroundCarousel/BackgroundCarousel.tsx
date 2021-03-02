import React from 'react'
import {ButtonBack, ButtonNext, CarouselProvider, DotGroup, Image, Slide, Slider} from 'pure-react-carousel'
import styles from './BackgroundCarousel.module.css'
import toysBG from '../../../assets/images/Fuji_TallHero_Toys_en_US_1x._CB431858161_.jpg'
import computersBG from '../../../assets/images/Fuji_TallHero_Computers_1x._CB432469755_.jpg'
import mBG from '../../../assets/images/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg'
import homeBG from '../../../assets/images/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg'
import {ArrowLeftRounded} from '@material-ui/icons'
import 'pure-react-carousel/dist/react-carousel.es.css'

const BackgroundCarousel: React.FC = () => {
    return (
        <div className={styles.carousel}>
            <CarouselProvider
                isPlaying
                infinite
                interval={5000}
                naturalSlideWidth={100}
                naturalSlideHeight={40}
                totalSlides={4}
            >
                <Slider>
                    <Slide index={0}>
                        <Image hasMasterSpinner className={styles.image} src={mBG} alt={'m'}/>
                    </Slide>
                    <Slide index={1}>
                        <Image hasMasterSpinner className={styles.image} src={toysBG} alt={'toys'}/>
                    </Slide>
                    <Slide index={2}>
                        <Image hasMasterSpinner className={styles.image} src={computersBG} alt={'computers'}/>
                    </Slide>
                    <Slide index={3}>
                        <Image hasMasterSpinner className={styles.image} src={homeBG} alt={'home'}/>
                    </Slide>
                </Slider>
            </CarouselProvider>
        </div>
    )
}

export default BackgroundCarousel