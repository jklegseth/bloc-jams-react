import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Header from './components/Header';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
