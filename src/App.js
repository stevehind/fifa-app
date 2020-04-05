import React from 'react';
import logo from './android-chrome-512x512.png';
import './App.css';
import PlayerList from './PlayerList';
import AddResult from './AddResult';
import LeaderboardPage from './LeaderboardPage';
import ResultsPage from './ResultsPage';
import H2HPage from './H2HPage';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-text">It's <em>FIFA20</em> in the time of <em>COVID19</em></h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <div>
          <AddResult/>
        </div>
        <div className="padding-top padding-bottom">
          <LeaderboardPage />
        </div>
        <div>
          <H2HPage />
        </div>
        <div className="padding-bottom">
          <ResultsPage />
        </div>
        <div>
          <PlayerList/>
        </div>
      </div>
    </div>
  );
}

export default App;
