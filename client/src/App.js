import React, { Component } from 'react';
import Routers from './routers/route';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';



class App extends Component {
  render() {
    return (
      <div className="App">
       
        <header>
          <Navbar />
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
