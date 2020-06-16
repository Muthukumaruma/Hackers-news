import React from 'react';
import logo from './logo.svg';
import Navbar from './components/navbar/navbar'
import Feed from './components/feeds/feeds'
import './sass/styles.scss';

function App() {
  return (
    <div className="App">
      <div className="container">
        {/* <Navbar /> */}
        <Feed />
      </div>
    </div>
  );
}

export default App;
