import React from 'react'
import styles from './Subtotal.module.css'
// @ts-ignore
import {default as CurrencyFormat} from 'react-currency-format'

type Props = {
    value?: number
}

const Subtotal: React.FC<Props> = ({value}) => {
    return (
        <div className={styles.subtotal}>
            <CurrencyFormat
                renderText={(value: number) => (
                    <>
                        <p>
                            Subtotal (0 items): <strong>{value}</strong>
                        </p>
                        <small className={styles.gift}>
                            <input type={'checkbox'}/>
                            This order contains a gift
                        </small>
                        <button>Proceed to checkout</button>
                    </>
                )}
                decimalScale={2}
                value={0}
                displayType={'text'}
                prefix={'$'}
                thousandSeparator
                />
        </div>
    )
}

export default Subtotal