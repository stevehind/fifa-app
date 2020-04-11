import React, { Component } from 'react';

class LeaderboardTable extends Component {
  buildHeaders(tableData) {
    const first_entry_in_list = tableData[0];
    const entry_values = Object.values(first_entry_in_list)[0];
    const keys = Object.keys(entry_values); // TODO: check whether starts with alpha char + _, and trim off only if it does

    const formatted_headers = keys.map(key => key.substring(2));
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), formatted_headers.map(header => /*#__PURE__*/React.createElement("th", null, header)));
  }

  buildRows(tableData) {
    return tableData.map(player => {
      // dict
      const player_data = Object.values(player); // list

      const player_data_values = Object.values(player_data)[0];
      const player_data_values_list = Object.values(player_data_values); // list of <td>s

      const formatted_player_data = input => {
        return input.map(data => /*#__PURE__*/React.createElement("td", null, Math.round(data)));
      };

      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, Object.keys(player)[0]), formatted_player_data(player_data_values_list));
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, this.buildHeaders(this.props.tableData)), /*#__PURE__*/React.createElement("tbody", null, this.buildRows(this.props.tableData))));
  }

}

export default LeaderboardTable;