import React, { Component } from 'react';
import Routers from './routers/route';
import Sidebar from './components/sidebar';
import SearchBox from './components/searchbox';


class App extends Component {
  render() {
    return (
      <div className="App">
       
        <header>
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
                <li className="nav-item "><a className="nav-link"  href="http://localhost:5000/signin">登录</a></li>
                <li className="nav-item "><a className="nav-link" href="http://localhost:5000/signup">注册</a></li>
              </ul>
              
            </div>
          </nav>
        </header>

        <main>
          <div className='row content-wrap w-60 mx-auto'>
            <article className="col-10 my-5 py-5 article-container">
              <Routers />
            </article>
            <Sidebar />
          </div>

        </main>

      </div>
    );
  }
}

export default App;
