import React, {FormEvent, useEffect, useState} from 'react'
import styles from './PaymentSection.module.css'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import CurrencyPrice from '../../common/CurrencyPrice/CurrencyPrice'
import {CircularProgress} from '@material-ui/core'
import {checkoutActions} from '../../../redux/actions/checkout-actions'
import {StripeCardElementChangeEvent} from "@stripe/stripe-js"
import {useHistory} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import {getCart, getCartTotal} from '../../../redux/selectors/checkout-selectors'
import {instance} from '../../../api/stripe-api'
import {db} from '../../../api/firebase'
import {getAuthUser, getIsAuth} from '../../../redux/selectors/auth-selectors'

const PaymentSection: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const stripe = useStripe()
    const elements = useElements()

    const [clientSecret, setClientSecret] = useState(null)
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [succeeded, setSucceeded] = useState(false)

    const cart = useSelector(getCart)
    const total = useSelector(getCartTotal)
    const user = useSelector(getAuthUser)

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

        if(total > 0){
            getClientSecret()
        }
    }, [cart])

    console.log('SECRET => ', clientSecret)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setProcessing(true)

        // @ts-ignore
        const payload = await stripe?.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements?.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            db
                .collection('users')
                .doc(user.id as string)
                .collection('orders')
                .doc(paymentIntent?.id)
                .set({
                    cart: cart,
                    amount: paymentIntent?.amount,
                    created: paymentIntent?.created
                })

            setSucceeded(true)
            setError('')
            setProcessing(false)

            dispatch(checkoutActions.emptyCart())

            history.replace('/orders')
        })
    }

    const handleChange = (e: StripeCardElementChangeEvent) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : '')
    }

    return (
        <>
            <div className={styles.title}>
                <h4>Payment Method</h4>
            </div>
            <div className={styles.details}>
                <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange}/>
                    <div className={styles.price}>
                        <CurrencyPrice value={total} text={'Order total: '}/>
                    </div>
                    <button className={styles.button} disabled={processing || disabled || succeeded}>
                        {processing ? <CircularProgress size={15}/> : 'Buy Now'}
                    </button>
                    {error && <div>{error}</div>}
                </form>
            </div>
        </>
    )
}

export default PaymentSection