import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import request from '../config/request';


class Post extends Component {

	_setChildCurrent = (titleId, lastTitleId, postId) => {
		// console.log('\nready to change current post')
    	this.props.changeCurrent(titleId, lastTitleId, postId)
    }

	render() {
			const subData = this.props.subData;
			const titleId = this.props.titleId;
			const currentPost = this.props.currentPost;
			const isCurPost = currentPost.tId === titleId && (currentPost.pId === subData._id)

			// console.log('\n当前POST：{ title: ' + currentPost.tId + ', post: ' + currentPost.pId + ' }')

			return (
				<li className={"collapse-item"} >
	    			<Link className={"collapse-link " + (isCurPost ? 'focus-style' : '')} 
	    				to={subData.path} 
	    				onClick={() => this._setChildCurrent(titleId, titleId, subData._id)}>
	    				<span className={"left-mark " + (isCurPost ? '' : 'd-none' )}></span>
	    				{subData.title}
	    				</Link>
	    		</li>
			);
	}
}


class Title extends  Component {

    _setCurrent = (titleId, lastTitleId, postId) => {

    	// console.log('\nready to change current title and last title')
    	if (this.props.currentTitle === titleId) {
    		titleId = '-1';
    	}
    	this.props.changeCurrent(titleId, lastTitleId, postId);
    }

    render() {
    	const currentPost = this.props.currentPost;
    	const data = this.props.data;
    	const titleId = data._id;
    	const isCurTitle = this.props.currentTitle === titleId;

    	// console.log(data.docs + '\n')

    	return (

    		<div className="my-2 collapse-box">
                <button className={"btn d-block px-0 " + (isCurTitle ? "btnOn" : "")} type="button" 
                  onClick={() => this._setCurrent(titleId, currentPost.tId, currentPost.pId)}>
                  {data.name}
                  <svg viewBox="0 0 926.23699 573.74994" version="1.1" x="0px" y="0px" width="10" height="10" 
                        className={isCurTitle ? "icon-up" : "icon-down"} 
                        >
                    <g transform="translate(904.92214,-879.1482)">
                      <path d="m -673.67664,1221.6502 -231.2455,-231.24803 55.6165,
                        -55.627 c 30.5891,-30.59485 56.1806,-55.627 56.8701,-55.627 0.6894,
                        0 79.8637,78.60862 175.9427,174.68583 l 174.6892,174.6858 174.6892,
                        -174.6858 c 96.079,-96.07721 175.253196,-174.68583 175.942696,
                        -174.68583 0.6895,0 26.281,25.03215 56.8701,
                        55.627 l 55.6165,55.627 -231.245496,231.24803 c -127.185,127.1864
                        -231.5279,231.248 -231.873,231.248 -0.3451,0 -104.688,
                        -104.0616 -231.873,-231.248 z
                      " fill="currentColor">
                      </path>
                    </g>
                  </svg>
                </button>
                {
                	isCurTitle
                	? <ul className="multi-collapse px-0">
							{data.docs.map(subData => 
								<Post titleId={titleId} key={subData._id} subData={subData} currentTitle={this.props.currentTitle} currentPost={this.props.currentPost}
									changeCurrent={this.props.changeCurrent}/>
							)}
					  </ul>
				    : null
                }
            </div>
		);
    }
}

export default class Sidebar extends Component {
	state = {
		titles: [],

		currentTitle: '-1',
		currentPost: {
			tId: '-1',
			pId: '-1'
		}
	}

	componentDidMount() {
		this.fetchCategories();
			
	}

	fetchCategories = async () => {
		let that = this;
		await	request.get('/getCategories')
					   .then(res => {
					   		console.log(res.success);
					   		console.log(res.data);
					   		if (res.success && res.data) {
					   			that.setState({titles: res.data})
					   		}
					   })
					   .catch(err => console.log(err));
	}

	_changeCurrent = (titleId, lastTitleId, postId) => {
		this.setState(prev => {
			return {
				currentTitle: titleId,
				currentPost: {
					tId: lastTitleId || '-1',
					pId: postId || '-1'
				}
			}
		})
	}

	render() {
		const titles = this.state.titles;
		// console.log('当前Title: title: ' + this.state.currentTitle + ', 当前POST：{ title: ' + this.state.currentPost.tId + ', post: ' + this.state.currentPost.pId + ' }')
		return (
			<div id="sidebar" className='col-4 py-5 pl-5 sidebar'>
				{titles.map(title => 
					<Title key={title._id} data={title} currentTitle={this.state.currentTitle} 
						currentPost={this.state.currentPost} changeCurrent={this._changeCurrent}/>
				)}
			</div>
		);
	}
}