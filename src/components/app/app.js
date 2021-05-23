import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import WithRestoService from '../hoc';

import Background from './food-bg.jpg';
import { Route, Switch } from 'react-router-dom';
import {connect} from "react-redux";

const App = ({sumSelectItems}) => {

    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={sumSelectItems}/>
            <Switch>
                <Route path='/' exact component={MainPage}/>
                <Route path='/cart' component={CartPage}/>
                <Route exact component={MainPage}/>
            </Switch>
        </div>
    )
}

const mapStateToProps = ({sumSelectItems}) => {
    return {
        sumSelectItems
    }
}


export default WithRestoService()(connect(mapStateToProps)(App));