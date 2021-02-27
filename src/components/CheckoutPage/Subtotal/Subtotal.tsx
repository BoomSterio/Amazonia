import React from 'react'
import styles from './Subtotal.module.css'

import {useHistory} from 'react-router'
import CurrencyPrice from '../../common/CurrencyPrice/CurrencyPrice'

type Props = {
    total: number,
    count: number
}

const Subtotal: React.FC<Props> = ({total = 0, count}) => {
    const history = useHistory()

    return (
        <div className={styles.subtotal}>
            <CurrencyPrice value={total} text={`Subtotal (${count} items): `}/>
            <small className={styles.gift}>
                <input type={'checkbox'}/>
                This order contains a gift
            </small>
            <button onClick={() => history.push('/payment')}>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal