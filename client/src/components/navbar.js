import React, { Component } from 'react';
import SearchBox from './searchbox';
import request from '../config/request';

export default class Navbar extends Component {
    state = {
        logined: false,
        user: {}
    }

    componentDidMount() {
        this._fetchUser();
    }

    _fetchUser = () => {
        var that = this;
        var url = config.api.base + config.api.verify;
        request.get(url)
               .then(res => {
                    if (res.success && res.data) {
                        that.setState({
                            user: res.data
                        })
                    }
               })
    }

    render() {
        const logined = this.state.logined;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top w-60  mx-auto">
                <a className="navbar-brand mr-3" href="/">Edns</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="nav navbar-nav ">
                        <li className="nav-item "><a className="nav-link"  href="/">帮助文档</a></li>
                        <li className="nav-item "><a className="nav-link" href="/c">产品介绍</a></li>
                        <li className="nav-item "><a className="nav-link" href="/p">其他</a></li>
                    </ul>

                    <form className="form-inline my-2 my-lg-0 ml-auto mr-5">
                        <SearchBox />
                    </form>

                    <ul className="nav navbar-nav mr-3 ml-5">
                        {
                            logined
                                
                            ?   <li className="nav-item text-muted py-2">您好，{user.name}</li>
                                <li className="nav-item "><a className="nav-link"  href="http://localhost:5000/admin/dashboard">控制台</a></li>

                            :   <li className="nav-item "><a className="nav-link"  href="http://localhost:5000/signin">登录</a></li>
                                <li className="nav-item text-muted py-2">或</li>
                                <li className="nav-item "><a className="nav-link" href="http://localhost:5000/signup">注册</a></li>
                        }
                    </ul>

                </div>
            </nav>
        );
    }
}

        