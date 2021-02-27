import React, {FormEvent, useEffect, useState} from 'react'
import styles from './PaymentPage.module.css'
import {useSelector} from 'react-redux'
import {getAuthUser} from '../../redux/selectors/auth-selectors'
import {getCart, getCartTotal} from '../../redux/selectors/checkout-selectors'
import {Redirect, useHistory} from 'react-router'
import CartProduct from '../CheckoutPage/Cart/CartProduct/CartProduct'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import {StripeCardElement, StripeCardElementChangeEvent} from '@stripe/stripe-js'
import CurrencyPrice from '../common/CurrencyPrice/CurrencyPrice'
import {CircularProgress} from '@material-ui/core'
import {instance} from '../../api/stripe-api'

const PaymentPage: React.FC = () => {
    const history = useHistory()

    const stripe = useStripe()
    const elements = useElements()

    const [clientSecret, setClientSecret] = useState(null)
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [succeeded, setSucceeded] = useState(false)

    const user = useSelector(getAuthUser)
    const cart = useSelector(getCart)
    const total = useSelector(getCartTotal)

    useEffect(() => {
        const getClientSecret = async () => {
            setProcessing(true)
            const response = await instance({
                method: 'post',
                url: `/payments/create?total=${(total) * 100}`
            })
            setClientSecret(response.data.clientSecret)
            setProcessing(false)
        }

        getClientSecret()
    }, [cart])

    console.log('SECRET => ', clientSecret)

    const cartItems = cart.map(item =>
        <CartProduct
            key={item.id}
            id={item.id}
            price={item.price}
            title={item.title}
            image={item.image}
            rating={item.rating}
            quantity={item.quantity}
            direction={'left'}
        />
    )

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setProcessing(true)

        // @ts-ignore
        const payload = await stripe?.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements?.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            setSucceeded(true)
            setError('')
            setProcessing(false)

            history.replace('/orders')
        })
    }

    const handleChange = (e: StripeCardElementChangeEvent) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : '')
    }

    if (!cart.length)
        return <Redirect to={'/checkout'}/>

    return (
        <div className={styles.payment}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.title}>
                        <h4>Delivery Address</h4>
                    </div>
                    <div className={styles.address}>
                        <p>{user.name && user.name}</p>
                        <p>{user.email && user.email}</p>
                        <p>Yaroslava Horobrogo 123</p>
                        <p>San Jose, California</p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>
                        <h4>Review Items</h4>
                    </div>
                    <div className={styles.items}>
                        {cartItems}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>
                        <h4>Payment Method</h4>
                    </div>
                    <div className={styles.details}>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className={styles.price}>
                                <CurrencyPrice value={total} text={'Order total: '}/>
                            </div>
                            <button disabled={processing || disabled || succeeded}>
                                {processing ? <CircularProgress size={15}/> : 'Buy Now'}
                            </button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage