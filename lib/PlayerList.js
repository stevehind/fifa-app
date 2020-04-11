function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import api from './api';

class PlayerList extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleReveal", event => {
      event.preventDefault();
      this.setState({
        clicked: true
      });
    });

    _defineProperty(this, "handleHide", event => {
      event.preventDefault();
      this.setState({
        clicked: false
      });
    });

    this.state = {
      players: [],
      clicked: false
    };
  }

  componentDidMount() {
    api.getPlayers(result => {
      this.setState({
        players: result.data
      });
    });
  }

  render() {
    const player_list = this.state.players.map(player => {
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, player.name), /*#__PURE__*/React.createElement("td", null, player.ps_handle));
    });

    if (this.state.clicked) {
      return /*#__PURE__*/React.createElement("div", {
        className: "small-container padding-bottom"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this.handleHide
      }, "Hide Players"), /*#__PURE__*/React.createElement("h3", null, "Players and their PS4 handles:"), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Player"), /*#__PURE__*/React.createElement("th", null, "PS4 Handle")), player_list);
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "small-container padding-bottom"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this.handleReveal
      }, "View Players"));
    }
  }

}

export default PlayerList;