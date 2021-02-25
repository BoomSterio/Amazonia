import './App.css'
import React from 'react'
import Header from '../Header/Header'
import HomePage from '../HomePage/HomePage'
import {BrowserRouter, Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom'
import CheckoutPage from '../CheckoutPage/CheckoutPage'
import {Provider} from 'react-redux'
import store from '../../redux/redux-store'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import LoginPage from '../LoginPage/LoginPage'

const App = withRouter((props: RouteComponentProps) => {
    return (
        <div className="app">
            {
                props.location.pathname !== '/login' && <Header/>
            }
            <Switch>
                <Route exact path={'/'}><HomePage/></Route>
                <Route path={'/checkout'}><CheckoutPage/></Route>
                <Route path={'/login'}><LoginPage/></Route>
                <Redirect from={'*'} to={'/'}/>
            </Switch>
            <ToastContainer limit={4}/>
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
