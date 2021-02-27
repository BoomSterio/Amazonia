import React from 'react'
import styles from './OrderItem.module.css'
import {CartProductType} from '../../../types/types'
import moment from 'moment'
import CartProduct from '../../CheckoutPage/Cart/CartProduct/CartProduct'
import CurrencyPrice from '../../common/CurrencyPrice/CurrencyPrice'
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core'
import {ExpandMore} from '@material-ui/icons'

type Props = {
    order: {
        id: string,
        data: {
            amount: number,
            cart: CartProductType[],
            created: number
        }
    }
}

const OrderItem: React.FC<Props> = ({order}) => {
    const orderItems = order.data.cart.map(item => <CartProduct
        editable={false}
        animationDuration={0}
        key={item.id}
        id={item.id}
        price={item.price}
        title={item.title}
        image={item.image}
        rating={item.rating}
        quantity={item.quantity}
    />)

    return (
        <div className={styles.order}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className={styles.info}>
                        <h4>Order #<span className={styles.id}>{order.id}</span></h4>
                        <p className={styles.date}>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
                    </div>

                </AccordionSummary>
                <AccordionDetails className={styles.details}>
                    <div className={styles.products}>
                        {orderItems}
                    </div>
                    <div className={styles.price}>
                        <CurrencyPrice value={order.data.amount / 100} text={'Order total: '}/>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default OrderItem