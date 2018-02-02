import React, { Component } from 'react';

export default class SearchBox extends Component {
	state = {
		focus: false
	}

	render() {
		const focus = this.state.focus;
		return (
			<div className="input-group">
				<div className="input-group-prepend">
				  <span className={"input-group-text searchIcon " + (focus ? 'input-focus' : '')}><img width='20' src='image/search.svg'/></span>
				  
				</div>
				<input id="goSearch" type="text" className="form-control" placeholder="Search"
					onFocus={() => this.setState({focus: true})}
					onBlur={() => this.setState({focus: false})} />
			</div>
		);
	}
}