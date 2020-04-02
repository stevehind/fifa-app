import React from 'react';
import logo from './android-chrome-512x512.png';
import './App.css';
import PlayerList from './PlayerList';
import AddResult from './AddResult';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-text">It's <em>FIFA20</em> in the time of <em>COVID19</em></h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <div className="alternate-background">
          <AddResult/>
        </div>
        <div>
          <PlayerList/>
        </div>
      </div>
    </div>
  );
}

export default App;
