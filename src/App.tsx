import './App.css';
import React, {FC} from 'react'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const App: FC = () => {
  return (
    <div className="app">
        <Header/>
        <BrowserRouter>
            <Switch>
                <Route path={'/'} render={() => <HomePage/>}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
