import './App.css'
import React, {FC} from 'react'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import CheckoutPage from './components/CheckoutPage/CheckoutPage'

const App: FC = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Header/>
                <Switch>
                    <Route exact path={'/'}><HomePage/></Route>
                    <Route path={'/checkout'} ><CheckoutPage/></Route>
                    <Redirect from={'*'} to={'/'}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
