import React, { Component } from 'react';
import api from './api';
import LeaderboardTable from './LeaderboardTable';

class LeaderboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table_data: undefined
    };
  }

  componentDidMount() {
    api.getLeaderboardTableData(result => {
      this.setState({
        table_data: result.data
      });
    });
    api.getKOTLData(result => {
      this.setState({
        kotl_data: result.data
      });
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "small-container"
    }, /*#__PURE__*/React.createElement("h2", null, "Leaderboard"), this.state.kotl_data === undefined ? /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "Loading King of the Lounge...")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement("b", null, this.state.kotl_data.kotl_is), " is the The King of the Lounge."), /*#__PURE__*/React.createElement("p", null, "They have defended their title for ", this.state.kotl_data.title_defended_for_games, " games and ", this.state.kotl_data.on_top_for_hrs, " hours.")), this.state.table_data === undefined ? /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "Loading leaderboard...")) : /*#__PURE__*/React.createElement(LeaderboardTable, {
      tableData: this.state.table_data,
      className: "alternate-background"
    }), /*#__PURE__*/React.createElement("p", null, "Players are ranked by their ", /*#__PURE__*/React.createElement("a", {
      href: "https://en.wikipedia.org/wiki/Elo_rating_system"
    }, "Elo rating"), "."));
  }

}

export default LeaderboardPage;