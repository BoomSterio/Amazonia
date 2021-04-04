import React, { FormEvent, useEffect, useState } from 'react'
import styles from './PaymentSection.module.css'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyPrice from '../../common/CurrencyPrice/CurrencyPrice'
import { CircularProgress, Snackbar } from '@material-ui/core'
import { checkoutActions } from '../../../redux/actions/checkout-actions'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, getCartTotal } from '../../../redux/selectors/checkout-selectors'
import { instance } from '../../../api/stripe-api'
import { getAuthUser } from '../../../redux/selectors/auth-selectors'
import { DeliveryType } from '../../../types/types'
import { dbAPI } from '../../../api/db-api'
import { Alert } from '@material-ui/lab'

type Props = {
  delivery: DeliveryType
}

const PaymentSection: React.FC<Props> = ({ delivery }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const stripe = useStripe()
  const elements = useElements()

  const [clientSecret, setClientSecret] = useState(null)
  const [error, setError] = useState(null as string | null)
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
        url: `/payments/create?total=${Math.trunc(total * 100)}`,
      })
      setClientSecret(response.data.clientSecret)
      setProcessing(false)
    }

    if (total > 0) {
      getClientSecret()
    }
  }, [cart])
  //console.log('SECRET => ', clientSecret)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (delivery.isValid && !error) {
      setProcessing(true)
      // @ts-ignore
      const payload = await stripe?.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements?.getElement(CardElement),
          },
        })
        .then(({ paymentIntent }) => {
          dbAPI.submitOrder(user.id, paymentIntent, cart, delivery)

          setSucceeded(true)
          setError(null)
          setProcessing(false)

          dispatch(checkoutActions.emptyCart())

          history.replace('/orders')
        })
        .catch(error => setError(error.message))
    } else {
      setError('Delivery address is not valid or was not saved')
    }
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
          <CardElement onChange={handleChange} />
          <div className={styles.price}>
            <CurrencyPrice value={total} text={'Order total: '} />
          </div>
          <button className={styles.button} disabled={processing || disabled || succeeded}>
            {processing ? (
              <>
                <CircularProgress style={{ marginRight: '5px' }} size={12} />
                Loading...
              </>
            ) : (
              'Buy Now'
            )}
          </button>
        </form>
      </div>
      <Snackbar open={error !== null} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={5000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  )
}

export default PaymentSection
