import React from 'react';
import logo from './android-chrome-512x512.png';
import './App.css';
import PlayerList from './PlayerList';
import AddResult from './AddResult';
import LeaderboardPage from './LeaderboardPage';
import ResultsPage from './ResultsPage';
import H2HPage from './H2HPage';

function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("header", {
    className: "App-header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "header-text"
  }, "It's ", /*#__PURE__*/React.createElement("em", null, "FIFA20"), " in the time of ", /*#__PURE__*/React.createElement("em", null, "COVID19")), /*#__PURE__*/React.createElement("img", {
    src: logo,
    className: "App-logo",
    alt: "logo"
  })), /*#__PURE__*/React.createElement("div", {
    className: "App-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "padding-bottom"
  }, /*#__PURE__*/React.createElement(AddResult, null)), /*#__PURE__*/React.createElement("div", {
    className: "padding-bottom"
  }, /*#__PURE__*/React.createElement(LeaderboardPage, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(H2HPage, null)), /*#__PURE__*/React.createElement("div", {
    className: "padding-bottom"
  }, /*#__PURE__*/React.createElement(ResultsPage, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlayerList, null))), /*#__PURE__*/React.createElement("footer", {
    className: "App-footer"
  }, /*#__PURE__*/React.createElement("p", null, "\xA9Steve Hind, 2020.")));
}

export default App;