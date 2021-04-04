import React, { useEffect } from 'react'
import styles from './Recommended.module.css'
import ProductCard from '../../common/ProductCard/ProductCard'
import { FullProductType } from '../../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../redux/thunks/products-thunks'
import { getAllProducts } from '../../../redux/selectors/products-selectors'

const Recommended: React.FC = () => {
  const recommended = useSelector(getAllProducts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts(6))
  }, [])

  return (
    <>
      <div className={styles.row}>
        {[...recommended].splice(0, 2).map((p: FullProductType) => (
          <ProductCard {...p} image={p.images[0]} />
        ))}
      </div>
      <div className={styles.row}>
        {[...recommended].splice(2, 3).map((p: FullProductType) => (
          <ProductCard {...p} image={p.images[0]}/>
        ))}
      </div>
      <div className={styles.row}>
        {[...recommended].splice(5, 1).map((p: FullProductType) => (
          <ProductCard {...p} image={p.images[0]}/>
        ))}
      </div>
    </>
  )
}

export default Recommended
