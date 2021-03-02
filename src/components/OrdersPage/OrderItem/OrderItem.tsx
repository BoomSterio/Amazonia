import React from 'react'
import styles from './OrderItem.module.css'
import {CartProductType, DeliveryStatusType, DeliveryType} from '../../../types/types'
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
            delivery: DeliveryType,
            created: number,
            status: DeliveryStatusType
        }
    }
}

const OrderItem: React.FC<Props> = ({order}) => {
    const boughtItems = order.data.cart.map(item => <CartProduct
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
                        <span className={styles.status} style={{color: `${order.data.status === 'In Processing' ? 'red' : 
                                order.data.status === 'Delivering' ? 'yellow' : 'green'}`}}>{order.data.status}</span>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={styles.details}>
                    <div>
                        {boughtItems}
                    </div>
                    <div className={styles.additional}>
                        <div>
                            <p>{order.data.delivery.fullName} {order.data.delivery.phone}</p>
                            <p>{order.data.delivery.country}, {order.data.delivery.city}. {order.data.delivery.addressLine}</p>
                        </div>
                        <CurrencyPrice value={order.data.amount / 100} text={'Order total: '}/>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default OrderItem