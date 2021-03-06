import React, {useEffect, useState} from 'react'
import styles from './ProductReview.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {getProductById} from '../../redux/selectors/products-selectors'
import {useParams} from 'react-router'
import {fetchProductById} from '../../redux/thunks/products-thunks'
import {Magnifier, MOUSE_ACTIVATION, SideBySideMagnifier, TOUCH_ACTIVATION} from 'react-image-magnifiers'
import {Rating} from '@material-ui/lab'
import Preloader from '../common/Preloader/Preloader'
import CurrencyPrice from '../common/CurrencyPrice/CurrencyPrice'
import {TextField, useMediaQuery} from '@material-ui/core'
import Button from '../common/Button/Button'

const ProductReview: React.FC = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const media = useMediaQuery('(max-width:1300px)')
    // @ts-ignore
    const id = params.id
    const product = useSelector(getProductById(Number(id)))

    useEffect(() => {
        dispatch(fetchProductById(Number(id)))
    }, [])

    useEffect(() => {
        setPreview(product?.images[0] ? product?.images[0] : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png')
    }, [product])

    const [preview, setPreview] = useState(product?.images[0] as string)

    const handleImgItemHover = (i: number) => () => {
        setPreview(product?.images[i] as string)
    }

    if (!product)
        return <Preloader/>

    return (
        <div className={styles.productPage}>
            <div className={styles.info}>
                <div className={styles.images}>
                    <div className={styles.imgNav}>{product?.images.map((img: string, i: number) =>
                        <img onMouseOver={handleImgItemHover(i)} className={styles.imgItem} src={img} alt={'item'}/>)}
                    </div>
                    <div className={styles.preview}>
                        {media ?
                            <Magnifier
                                imageSrc={preview}
                                imageAlt={preview}
                                mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK}
                                touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP}
                            />
                            :
                            <SideBySideMagnifier
                                className={styles.previewImg}
                                fillGapTop={59}
                                cursorStyle={'none'}
                                imageSrc={preview}
                                imageAlt={preview}/>}
                    </div>
                </div>
                <div className={styles.details}>
                    <h2>{product?.title}</h2>
                    <div className={styles.rating}>
                        <Rating value={product?.rating ? product.rating : 0} precision={0.5} readOnly/>
                        <p>{product?.rating}</p>
                    </div>
                    <div className={styles.price}>
                        <span>Price: </span>
                        <CurrencyPrice value={product?.price}/>
                    </div>
                </div>
            </div>
            <div className={styles.actions}>
                <div className={styles.price}>
                    <CurrencyPrice value={product?.price}/>
                </div>
                <p className={product?.inStock >= 50 ? styles.inStockGreen : styles.inStockRed}>
                    {product?.inStock >= 50 ? 'In Stock.' : `${product?.inStock} items available.`}
                </p>
                <TextField className={styles.qty} size={'small'} type={'number'} variant={'outlined'} defaultValue={1}
                           label={'Qty:'}/>
                <div className={styles.purchase}>
                    <Button style={{margin: '10px 0', maxWidth: '320px'}} color={'primary'}>Add to Cart</Button>
                    <Button style={{marginBottom: '10px', maxWidth: '320px'}} color={'secondary'}>Buy Now</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductReview