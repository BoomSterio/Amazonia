import React, {useState} from 'react'
import styles from './OrderItem.module.css'
import {CartProductType, DeliveryStatusType, DeliveryType} from '../../../types/types'
import moment from 'moment'
import CartProduct from '../../CheckoutPage/Cart/CartProduct/CartProduct'
import CurrencyPrice from '../../common/CurrencyPrice/CurrencyPrice'
import {Accordion, AccordionDetails, AccordionSummary, MenuItem, Select} from '@material-ui/core'
import {ExpandMore} from '@material-ui/icons'

type Props = {
    order: {
        amount: number,
        cart: CartProductType[],
        delivery: DeliveryType,
        created: number,
        status: DeliveryStatusType
    },
    editMode?: boolean,
    handleStatusChange?: (created: number) => (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void
}

const OrderItem: React.FC<Props> = ({order, editMode = false, handleStatusChange}) => {
    let statusColor
    switch (order.status) {
        case 'In Processing':
            statusColor = 'red'
            break
        case 'Delivering':
            statusColor = 'orange'
            break
        case 'Completed':
            statusColor = 'green'
            break
        default:
            statusColor = 'black'
    }

        const boughtItems = order.cart.map(item => <CartProduct
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
                        expandIcon={<ExpandMore/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div className={styles.info}>
                            <h4>Order #<span className={styles.id}>{order.created}</span></h4>
                            <p className={styles.date}>{moment.unix(order.created).format('MMMM Do YYYY, h:mma')}</p>
                            {editMode ?
                            <Select className={styles.status} style={{color: `${statusColor}`}} value={order.status} onChange={handleStatusChange ? handleStatusChange(order.created) : () => {}}>
                                <MenuItem value={'In Processing'}>In Processing</MenuItem>
                                <MenuItem value={'Delivering'}>Delivering</MenuItem>
                                <MenuItem value={'Completed'}>Completed</MenuItem>
                                <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
                            </Select>
                            :
                                <span className={styles.status} style={{color: `${statusColor}`}}>
                                    {order.status}
                                </span>}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={styles.details}>
                        <div>
                            {boughtItems}
                        </div>
                        <div className={styles.additional}>
                            <div>
                                <p>{order.delivery.fullName} {order.delivery.phone}</p>
                                <p>{order.delivery.country}, {order.delivery.city}. {order.delivery.addressLine}</p>
                                <p>{order.delivery.method}</p>
                            </div>
                            <CurrencyPrice value={order.amount / 100} text={'Order total: '}/>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
}

export default OrderItem