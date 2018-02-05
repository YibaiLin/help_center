import React, { Component } from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import request from '../config/request';

export default class Routers extends Component {
	state = {
		docs: []
	}

	componentDidMount() {
		this.fetchDocs();
			
	}

	fetchDocs = async () => {
		let that = this;
		await	request.get('/getDocs')
					   .then(res => {
					   		console.log(res.success);
					   		if (res.success && res.data) {
					   			that.setState({docs: res.data})
					   		}
					   })
					   .catch(err => console.log(err));
	}

	render() {
		const datas = this.state.docs;
		const firstPage = datas.length > 0 ? datas[0].path : ''

		return (
			<Switch>
				
				
                {datas.map(data => {

                	let comp = () => (<div><ReactMarkdown source={data.content}/></div>);

                	return <Route key={data._id} path={'/' + data.path} component={comp} />
                })}

                {
					datas.length > 0
					? <Redirect from='/' to={'/' + firstPage}/>
					: null
				}
            </Switch>
		);
	}
}