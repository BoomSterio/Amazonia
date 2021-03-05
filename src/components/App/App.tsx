import './App.css'
import React, {useEffect} from 'react'
import Header from '../Header/Header'
import HomePage from '../HomePage/HomePage'
import {BrowserRouter, Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom'
import CheckoutPage from '../CheckoutPage/CheckoutPage'
import {Provider, useDispatch, useSelector} from 'react-redux'
import store, {AppStateType} from '../../redux/redux-store'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from '../LoginPage/LoginPage'
import PaymentPage from '../PaymentPage/PaymentPage'
import AdminPage from '../AdminPage/AdminPage'
import OrdersPage from '../OrdersPage/OrdersPage'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Footer from '../Footer/Footer'
import {initializeApp} from '../../redux/thunks/app-thunks'
import Preloader from '../common/Preloader/Preloader'
import ProductPage from '../ProductPage/ProductPage'

const promise = loadStripe('pk_test_51IPDXrHdKa0qwLLpHqPY1OEV9mbMqBFcpIRn4YQSU0GL1oAh62Ih2kJm3DfqvO0gNV3kcpd5M0SgyRum3oIlaxi400iXlz8Hf1')

const App = withRouter((props: RouteComponentProps) => {
    const initialized = useSelector((state: AppStateType) => state.app.initialized)
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(initializeApp())
    }, [])

    if(!initialized)
        return <Preloader/>

    return (
        <div className="app">
            {props.location.pathname !== '/login' && <Header/>}
            <Switch>
                <Route exact path={'/'}><HomePage/></Route>
                <Route path={'/product/:id?'} render={ProductPage}/>
                <Route path={'/checkout'}><CheckoutPage/></Route>
                <Route path={'/payment'}><Elements stripe={promise}><PaymentPage/></Elements></Route>
                <Route path={'/orders'}><OrdersPage/></Route>
                <Route path={'/login'}><LoginPage/></Route>
                <Route path={'/admin'}><AdminPage/></Route>
                <Redirect from={'*'} to={'/'}/>
            </Switch>
            {props.location.pathname !== '/login' && <Footer/>}
        </div>
    )
})

const AppWrap: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    )
}

export default AppWrap
