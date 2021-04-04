import React from 'react'
import styles from './Subtotal.module.css'

import { useHistory } from 'react-router'
import CurrencyPrice from '../../common/CurrencyPrice/CurrencyPrice'
import Button from '../../common/Button/Button'

type Props = {
  total: number
  count: number
}

const Subtotal: React.FC<Props> = ({ total = 0, count }) => {
  console.log('Subtotal')
  const history = useHistory()

  return (
    <div className={styles.subtotal}>
      <CurrencyPrice value={total} text={`Subtotal (${count} items): `} />
      <small className={styles.gift}>
        <input type={'checkbox'} />
        This order contains a gift
      </small>
      <Button style={{ width: '258px', marginTop: '20px' }} onClick={() => history.push('/payment')}>
        Proceed to checkout
      </Button>
    </div>
  )
}

export default Subtotal
