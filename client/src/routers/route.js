import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';

import Home from './home'
import Category from './category'
import Products from './products'

export default class Routers extends Component {
	render() {
		return (
			<Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/category.html" component={Category}/>
                <Route path="/products.html" component={Products}/>
            </Switch>
		);
	}
}