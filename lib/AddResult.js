function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import api from './api';
const CHOSE_A_PLAYER_DEFAULT = "Chose a player...";

class AddResults extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleTypedChange", event => {
      const {
        name,
        value
      } = event.target;
      this.setState({
        [name]: value
      });
    });

    _defineProperty(this, "handleSelectChange", event => {
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

    _defineProperty(this, "getFormData", object => Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData()));

    _defineProperty(this, "validateForm", state => {
      if (state.home === undefined || state.away === undefined || state.home_score === undefined || state.away_score === undefined) {
        return false;
      } else {
        return true;
      }
    });

    _defineProperty(this, "previewForm", event => {
      event.preventDefault();
      this.setState({
        result_ready_for_preview: true
      });
    });

    _defineProperty(this, "handleFormReset", event => {
      event.preventDefault();
      this.setState({
        clicked: true,
        submitted_to_server: null,
        server_success: null,
        home: undefined,
        home_score: undefined,
        away: undefined,
        away_score: undefined,
        comment: null,
        error: undefined,
        result_ready_for_preview: undefined
      });
    });

    _defineProperty(this, "handleHide", event => {
      event.preventDefault();
      this.setState({
        clicked: false
      });
    });

    this.state = {
      clicked: false,
      players: [],
      server_success: null,
      submitted_to_server: false,
      clubs: []
    };
    this.submitFormToServer = this.submitFormToServer.bind(this);
  }

  componentDidMount() {
    api.getPlayers(result => {
      this.setState({
        players: result.data
      });
    });
    api.getClubs(result => {
      this.setState({
        clubs: result.data
      });
    });
  }

  async submitFormToServer(ev) {
    ev.preventDefault();
    this.setState({
      submitted_to_server: true
    });
    let body = {
      home: this.state.home,
      home_score: this.state.home_score,
      away: this.state.away,
      away_score: this.state.away_score,
      // uncomment below for development
      //comment: "dev-test"
      comment: this.state.comment
    };
    let error_message = "Error: didn't post to server. Make sure you've provided two different players' names, and two scores.";
    api.addResult(body).then(response => {
      if (response.error) {
        this.setState({
          submitted_to_server: true,
          server_success: false,
          error: error_message
        });
      } else {
        this.setState({
          submitted_to_server: true,
          server_success: true,
          result: response
        });
      }
    }).catch(err => {
      this.setState({
        submitted_to_server: true,
        server_success: false,
        error: error_message
      });
    });
  }

  render() {
    const {
      home,
      home_team,
      home_score,
      away,
      away_team,
      away_score,
      comment,
      result,
      error
    } = this.state;
    const player_list = this.state.players.map(player => /*#__PURE__*/React.createElement("option", null, player.name));
    const clubs_list = this.state.clubs.map(club => /*#__PURE__*/React.createElement("option", null, club.name));
    if (this.state.clicked && !this.state.server_success && !this.state.submitted_to_server && !this.state.result_ready_for_preview) return /*#__PURE__*/React.createElement("div", {
      className: "small-container padding-top"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("h3", null, "Enter the results, get the rewards."), /*#__PURE__*/React.createElement("div", {
      className: "left-right-padding text-left"
    }, /*#__PURE__*/React.createElement("h4", null, "Home"), /*#__PURE__*/React.createElement("label", null, "Player"), /*#__PURE__*/React.createElement("select", {
      name: "home",
      value: home,
      onChange: this.handleSelectChange
    }, /*#__PURE__*/React.createElement("option", null, CHOSE_A_PLAYER_DEFAULT), player_list), /*#__PURE__*/React.createElement("label", null, "Team"), /*#__PURE__*/React.createElement("select", {
      name: "home_team",
      value: home_team,
      onChange: this.handleSelectChange
    }, /*#__PURE__*/React.createElement("option", null, "Chose a team..."), clubs_list), /*#__PURE__*/React.createElement("label", null, "Score"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "home_score",
      value: home_score,
      onChange: this.handleTypedChange
    }), /*#__PURE__*/React.createElement("h4", null, "Away"), /*#__PURE__*/React.createElement("label", null, "Player"), /*#__PURE__*/React.createElement("select", {
      name: "away",
      value: away,
      onChange: this.handleSelectChange
    }, /*#__PURE__*/React.createElement("option", null, CHOSE_A_PLAYER_DEFAULT), player_list), /*#__PURE__*/React.createElement("label", null, "Team"), /*#__PURE__*/React.createElement("select", {
      name: "away_team",
      value: away_team,
      onChange: this.handleSelectChange
    }, /*#__PURE__*/React.createElement("option", null, "Chose a team..."), clubs_list), /*#__PURE__*/React.createElement("label", null, "Score"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "away_score",
      value: away_score,
      onChange: this.handleTypedChange
    }), /*#__PURE__*/React.createElement("h4", null, "Comment"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "comment",
      value: comment,
      onChange: this.handleTypedChange
    }))), this.validateForm(this.state) ? /*#__PURE__*/React.createElement("button", {
      onClick: this.previewForm
    }, "Preview result...") : /*#__PURE__*/React.createElement("button", {
      className: "muted-button",
      disabled: true
    }, "Fill out the form!"));else if (this.state.result_ready_for_preview && !this.state.submitted_to_server) return /*#__PURE__*/React.createElement("div", {
      className: "small-container left-right-padding padding-top padding-bottom"
    }, /*#__PURE__*/React.createElement("h4", null, "Please preview result before submitting."), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Side"), /*#__PURE__*/React.createElement("th", null, "Player"), /*#__PURE__*/React.createElement("th", null, "Score")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Home"), /*#__PURE__*/React.createElement("td", null, home), /*#__PURE__*/React.createElement("td", null, home_score)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Away"), /*#__PURE__*/React.createElement("td", null, away), /*#__PURE__*/React.createElement("td", null, away_score))), /*#__PURE__*/React.createElement("div", {
      className: "left-right-padding"
    }, /*#__PURE__*/React.createElement("button", {
      className: "float-left",
      onClick: this.submitFormToServer
    }, "Submit to server"), /*#__PURE__*/React.createElement("button", {
      className: "float-right",
      onClick: this.handleFormReset
    }, "Re-fill form")));else if (!this.state.server_success && this.state.submitted_to_server && this.state.error === undefined) return /*#__PURE__*/React.createElement("div", {
      className: "small-container padding-top padding-bottom"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "Sending result to server...")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "Please wait...")));else if (!this.state.server_success && this.state.submitted_to_server && this.state.error) return /*#__PURE__*/React.createElement("div", {
      className: "small-container padding-top padding-bottom"
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        color: 'red'
      }
    }, error), /*#__PURE__*/React.createElement("button", {
      onClick: this.handleFormReset
    }, "Try again"));else if (this.state.server_success && this.state.submitted_to_server) return /*#__PURE__*/React.createElement("div", {
      className: "small-container padding-top padding-bottom"
    }, /*#__PURE__*/React.createElement("p", null, "Success! Result saved to the sever."), result.winner === "Draw" ? /*#__PURE__*/React.createElement("p", null, "The result was a ", result.winner, ".") : /*#__PURE__*/React.createElement("p", null, "Winner was: ", result.winner, " by ", result.goal_diff, "."), /*#__PURE__*/React.createElement("button", {
      onClick: this.handleFormReset
    }, "Add another"));else return /*#__PURE__*/React.createElement("div", {
      className: "small-container padding-top padding-bottom"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: this.handleFormReset
    }, "Add Result"));
  }

}

export default AddResults;