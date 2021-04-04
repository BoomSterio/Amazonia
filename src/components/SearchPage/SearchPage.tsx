import React, { useEffect, useState } from 'react'
import styles from './SearchPage.module.css'
import { useParams } from 'react-router'
import ProductCard from '../common/ProductCard/ProductCard'
import { db } from '../../api/firebase'
import { FullProductType } from '../../types/types'
import Preloader from '../common/Preloader/Preloader'
import { Rating } from '@material-ui/lab'

const SearchPage: React.FC = () => {
  const [products, setProducts] = useState(null as null | FullProductType[])
  const [isFetching, setIsFetching] = useState(false as boolean)
  const { query } = useParams<Record<string, string | undefined>>()

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true)
      setProducts(null)
      let newProducts: any = []

      await db
        .collection("products")
        .where('title', '>=', query)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            newProducts.push(doc.data())
          })
          setProducts(newProducts)
        })
        .catch(err => console.log(err))
      setIsFetching(false)
    }
    fetchData()
  }, [query])

  let ratings = []
  for(let i = 4; i >= 1; i--) {
    ratings.push(
      <div className={styles.rating + ' option-small'}>
        <small>{' >='}</small><Rating size={'small'} value={i} readOnly/>
      </div>
    )
  }

  if(isFetching) return <Preloader/>

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <p>
          Search results for
          <strong style={{ color: '#f19102' }}> "{query}"</strong>
        </p>
      </div>
      <div className={styles.content}>
        <div className={styles.filters}>
          <h4>Department</h4>
          {departments.map(d => <p className={'option-small'}>{d}</p>)}
          <h4>Avg. Customer Review</h4>
          {ratings}
        </div>
          {products?.length !== 0 ?
            <div className={styles.items}>
              {products?.map(p => <ProductCard {...p} image={p.images[0]} />)}
            </div>
          : <h1 style={{width: '400px'}}>No results for "{query}"</h1>}
      </div>
    </div>
  )
}

const departments = [
  'Electronics',
  'Musical Instruments',
  'Combo guitar electronics',
  'Furniture',
  'For Garden',
  'Novelty Clothing'
]

export default SearchPage
