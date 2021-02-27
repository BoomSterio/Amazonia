import './App.css'
import React, {useEffect} from 'react'
import Header from '../Header/Header'
import HomePage from '../HomePage/HomePage'
import {BrowserRouter, Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom'
import CheckoutPage from '../CheckoutPage/CheckoutPage'
import {Provider, useDispatch} from 'react-redux'
import store from '../../redux/redux-store'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from '../LoginPage/LoginPage'
import {startAuthStateListening} from '../../redux/thunks/auth-thunks'
import PaymentPage from '../PaymentPage/PaymentPage'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51IPDXrHdKa0qwLLpHqPY1OEV9mbMqBFcpIRn4YQSU0GL1oAh62Ih2kJm3DfqvO0gNV3kcpd5M0SgyRum3oIlaxi400iXlz8Hf1')

const App = withRouter((props: RouteComponentProps) => {
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(startAuthStateListening())
    }, [])

    return (
        <div className="app">
            {
                props.location.pathname !== '/login' && <Header/>
            }
            <Switch>
                <Route exact path={'/'}><HomePage/></Route>
                <Route path={'/checkout'}><CheckoutPage/></Route>
                <Route path={'/payment'}><Elements stripe={promise}><PaymentPage/></Elements></Route>
                <Route path={'/login'}><LoginPage/></Route>
                <Redirect from={'*'} to={'/'}/>
            </Switch>
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
