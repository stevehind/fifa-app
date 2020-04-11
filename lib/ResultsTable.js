import React, { Component } from 'react';

class ResultsTable extends Component {
  buildHeaders(tableData) {
    const first_entry_in_list = tableData[0];
    const keys = Object.keys(first_entry_in_list);
    return /*#__PURE__*/React.createElement("tr", null, keys.map(header => {
      return /*#__PURE__*/React.createElement("th", null, header);
    }));
  }

  buildRows(tableData) {
    return tableData.map(result => {
      // dict
      const result_data = Object.values(result); // list of <td>s

      const formatted_player_data = input => {
        return input.map(data => /*#__PURE__*/React.createElement("td", null, data));
      };

      return /*#__PURE__*/React.createElement("tr", null, formatted_player_data(result_data));
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "small-container"
    }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, this.buildHeaders(this.props.tableData)), /*#__PURE__*/React.createElement("tbody", null, this.buildRows(this.props.tableData))));
  }

}

export default ResultsTable;