import './App.css'
import React, {FC} from 'react'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import CheckoutPage from './components/CheckoutPage/CheckoutPage'
import {Provider} from 'react-redux'
import store from './redux/redux-store'
import 'react-toastify/dist/ReactToastify.css'

const App: FC = () => {
    return (
        <div className="app">
            <Header/>
            <Switch>
                <Route exact path={'/'}><HomePage/></Route>
                <Route path={'/checkout'}><CheckoutPage/></Route>
                <Redirect from={'*'} to={'/'}/>
            </Switch>
        </div>
    )
}

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
