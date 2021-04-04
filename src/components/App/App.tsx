import './App.css'
import React, { Suspense, useEffect } from 'react'
import Header from '../Header/Header'
import HomePage from '../HomePage/HomePage'
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import CheckoutPage from '../CheckoutPage/CheckoutPage'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store, { AppStateType } from '../../redux/redux-store'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from '../LoginPage/LoginPage'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Footer from '../Footer/Footer'
import { initializeApp } from '../../redux/thunks/app-thunks'
import Preloader from '../common/Preloader/Preloader'
import ProductReview from '../ProductReview/ProductReview'
import SearchPage from '../SearchPage/SearchPage'

const AdminPage = React.lazy(() => import('../AdminPage/AdminPage'))
const OrdersPage = React.lazy(() => import('../OrdersPage/OrdersPage'))
const PaymentPage = React.lazy(() => import('../PaymentPage/PaymentPage'))

const promise = loadStripe('pk_test_51IPDXrHdKa0qwLLpHqPY1OEV9mbMqBFcpIRn4YQSU0GL1oAh62Ih2kJm3DfqvO0gNV3kcpd5M0SgyRum3oIlaxi400iXlz8Hf1')

const App = withRouter((props: RouteComponentProps) => {
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!initialized) return <Preloader />

  return (
    <div className="app">
      {props.location.pathname !== '/login' && <Header />}
      <Switch>
        <Route exact path={'/'}>
          <HomePage />
        </Route>
        <Route path={'/search/:query'}>
          <SearchPage />
        </Route>
        <Route path={'/product/:id'}>
          <ProductReview />
        </Route>
        <Route path={'/checkout'}>
          <CheckoutPage />
        </Route>
        <Route path={'/payment'}>
          <Suspense fallback={<Preloader />}>
            <Elements stripe={promise}>
              <PaymentPage />
            </Elements>
          </Suspense>
        </Route>
        <Route path={'/orders'}>
          <Suspense fallback={<Preloader />}>
            <OrdersPage />
          </Suspense>
        </Route>
        <Route path={'/login'}>
          <LoginPage />
        </Route>
        <Route path={'/admin'}>
          <Suspense fallback={<Preloader />}>
            <AdminPage />
          </Suspense>
        </Route>
        <Redirect from={'*'} to={'/'} />
      </Switch>
      {props.location.pathname !== '/login' && <Footer />}
    </div>
  )
})

const AppWrap: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}

export default AppWrap
