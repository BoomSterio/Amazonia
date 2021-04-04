import React, { useEffect, useState } from 'react'
import styles from './ProductReview.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../redux/selectors/products-selectors'
import { useParams } from 'react-router'
import { fetchProductById } from '../../redux/thunks/products-thunks'
import { Rating } from '@material-ui/lab'
import Preloader from '../common/Preloader/Preloader'
import CurrencyPrice from '../common/CurrencyPrice/CurrencyPrice'
import Magnifier from './Magnifier/Magnifier'
import Specifications from './Specifications/Specifications'
import ImageNav from './ImageNav/ImageNav'
import Actions from './Actions/Actions'

const ProductReview: React.FC = () => {
  const dispatch = useDispatch()
  const params = useParams()
  // @ts-ignore
  const id = params.id
  const product = useSelector(getProductById(Number(id)))

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchProductById(Number(id)))
  }, [])

  useEffect(() => {
    setPreviewIndex(0)
  }, [product])

  const [previewIndex, setPreviewIndex] = useState(0)

  const handleImgItemHover = (i: number) => () => {
    setPreviewIndex(i)
  }

  if (!product) return <Preloader />

  return (
    <div className={styles.productPage}>
      <div className={styles.info}>
        <div className={styles.images}>
          <ImageNav images={product?.images} activeIndex={previewIndex} handleImgItemHover={handleImgItemHover} />
          <Magnifier
            image={
              product?.images[previewIndex]
                ? product?.images[previewIndex]
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png'
            }
            product={product}
          />
        </div>
        <div className={styles.details}>
          <h2>{product?.title}</h2>
          <div className={styles.rating}>
            <Rating value={product?.rating ? product.rating : 0} precision={0.5} readOnly />
            <p>{product?.rating}</p>
          </div>
          <div className={styles.price}>
            <span>Price: </span>
            <CurrencyPrice value={product?.price} />
          </div>
          <div>
            <p>{product?.description}</p>
            <Specifications specs={product?.specs} />
          </div>
        </div>
      </div>
      <Actions product={product} />
    </div>
  )
}

export default ProductReview
