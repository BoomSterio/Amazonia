import React, {useEffect, useState} from 'react'
import styles from './Recommended.module.css'
import ProductCard from '../../common/ProductCard/ProductCard'
import {db} from '../../../api/firebase'
import {FullProductType} from '../../../types/types'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'

const Recommended: React.FC = () => {
    const [recommended, setRecommended] = useState([] as any)

    useEffect(() => {
        db
            .collection('products')
            .limit(6)
            .get()
            .then(p => setRecommended(p.docs.map(doc => (doc.data()))))

    }, [])

    return (
        <>
            <div className={styles.row}>
                {[...recommended].splice(0, 2).map((p: FullProductType) =>
                        <ProductCard {...p}/>)}
            </div>
            <div className={styles.row}>
                {[...recommended].splice(2, 3).map((p: FullProductType) =>
                        <ProductCard {...p}/>)}
            </div>
            <div className={styles.row}>
                {[...recommended].splice(5, 1).map((p: FullProductType) =>
                        <ProductCard {...p}/>)}
            </div>
        </>
    )
}

export default Recommended
