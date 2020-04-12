function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { Component } from 'react';
import api from './api';
import H2HTable from './H2HTable';
const CHOSE_A_PLAYER_DEFAULT = "Chose a player...";

class H2HPage extends Component {
  constructor(props) {
    super(props); // how to declare a type for this.state?

    _defineProperty(this, "handleSelectChange", event => {
      // $FlowFixMe
      const {
        name,
        value
      } = event.target;

      if (value === CHOSE_A_PLAYER_DEFAULT) {
        this.setState({
          [name]: undefined
        });
      } else {
        this.setState({
          [name]: value
        });
      }
    });

    this.state = {
      players: [],
      table_data: [],
      e_values: [],
      elos: [],
      submitted: false
    }; // https://github.com/facebook/flow/issues/5874
    // $FlowFixMe

    this.submit = this.submit.bind(this);
  }

  extractElos(data) {
    let elos = data.map(entry => {
      let elo = {
        name: Object.keys(entry)[0],
        // $FlowFixMe
        elo: Object.values(entry)[0].a_Elo
      };
      return elo;
    });
    return elos;
  }

  componentDidMount() {
    api.getPlayers(result => {
      this.setState({
        players: result.data
      });
    });
  }

  computeWinChance(names, data) {
    // $FlowFixMe
    const list_of_r = data.map(rating => Math.pow(10, rating / 400));
    const sum_of_r = list_of_r.reduce((a, b) => a + b, 0); // $FlowFixMe

    const list_of_e = list_of_r.map(r => r / sum_of_r); // $FlowFixMe

    const rounded_e = list_of_e.map(e => Math.round(e * 100)); // $FlowFixMe

    const formatted_e = rounded_e.map(e => String(e).concat("%"));
    const dummy_list = [0, 1]; // $FlowFixMe   

    const e_and_names = dummy_list.map(i => {
      return names[i].concat(": ").concat(formatted_e[i]);
    }); // $FlowFixMe

    return e_and_names.map(item => /*#__PURE__*/React.createElement("td", {
      className: "text-center"
    }, item));
  }

  notReadyToLoadResult(elos, table_data, player_1, player_2) {
    // $FlowFixMe
    if (elos === undefined || table_data === undefined || player_1 === undefined || player_2 === undefined || elos.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  async submit(ev) {
    ev.preventDefault();
    this.setState({
      submitted: true
    });

    if (this.state.player_1 && this.state.player_2) {
      let names = [this.state.player_1, this.state.player_2];
      api.getH2HData(names).then(result => {
        this.setState({
          table_data: result.data
        });
        let elos = this.extractElos(result.data);
        this.setState({
          elos: elos
        });
      });
    }
  }

  render() {
    const player_list = this.state.players.map(player => /*#__PURE__*/React.createElement("option", null, player.name));
    return /*#__PURE__*/React.createElement("div", {
      className: "small-container"
    }, /*#__PURE__*/React.createElement("h2", null, "Head to Head Stats"), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.submit
    }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("label", {
      className: "text-center"
    }, "First player"), /*#__PURE__*/React.createElement("select", {
      name: "player_1",
      value: this.state.player_1,
      onChange: this.handleSelectChange
    }, /*#__PURE__*/React.createElement("option", null, CHOSE_A_PLAYER_DEFAULT), player_list)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("label", {
      className: "text-center"
    }, "Second player"), /*#__PURE__*/React.createElement("select", {
      name: "player_2",
      value: this.state.player_2,
      onChange: this.handleSelectChange
    }, /*#__PURE__*/React.createElement("option", null, CHOSE_A_PLAYER_DEFAULT), player_list))))), this.state.player_1 === undefined || this.state.player_2 === undefined ? /*#__PURE__*/React.createElement("button", {
      className: "muted-button",
      onClick: this.submit,
      disabled: this.state.player_1 === undefined || this.state.player_2 === undefined
    }, "Choose two players") : /*#__PURE__*/React.createElement("button", {
      className: "button",
      onClick: this.submit,
      disabled: this.state.player_1 === undefined || this.state.player_2 === undefined
    }, "Calculate!"), this.state.submitted === true ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Elo-Implied Win Probabilities in Next Game"), this.notReadyToLoadResult(this.state.elos, this.state.table_data, this.state.player_1, this.state.player_2) ? /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "Loading win probabilities...")) : /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tr", null, this.computeWinChance( // $FlowFixMe
    Object.values(this.state.elos).map(value => value.name), // $FlowFixMe
    Object.values(this.state.elos).map(value => value.elo)))), /*#__PURE__*/React.createElement("h4", null, "Head to Head Leaderboard"), this.notReadyToLoadResult(this.state.elos, this.state.table_data, this.state.player_1, this.state.player_2) ? /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "Loading leaderboard...")) : /*#__PURE__*/React.createElement(H2HTable, {
      tableData: this.state.table_data,
      className: "alternate-background"
    }), /*#__PURE__*/React.createElement("p", null, "Players are ranked by their ", /*#__PURE__*/React.createElement("a", {
      href: "https://en.wikipedia.org/wiki/Elo_rating_system"
    }, "Elo rating"), "."))) : /*#__PURE__*/React.createElement("p", null, "Choose two players and then click \"Calculate!\" to see stats."));
  }

}

export default H2HPage;