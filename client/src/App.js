import React, { Component } from 'react';
import Routers from './routers/route';
import Sidebar from './components/sidebar';


class App extends Component {
  render() {
    return (
      <div className="App">
       
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
            <a className="navbar-brand" href="/">Document</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="nav navbar-nav mr-auto">
                <li className="nav-item "><a className="nav-link"  href="/">Homes</a></li>
                <li className="nav-item "><a className="nav-link" href="/c">Category</a></li>
                <li className="nav-item "><a className="nav-link" href="/p">Products</a></li>
              </ul>
              <span className="navbar-text">
                Navbar text with an inline element
              </span>
            </div>
          </nav>
        </header>

        <main>
          <div className='row content-wrap'>
            <article className="col-6 offset-2 my-5 py-5 article-container">
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
