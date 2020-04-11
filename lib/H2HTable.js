import * as React from 'react';

class H2HTable extends React.Component {
  buildHeaders(tableData) {
    const first_entry_in_list = tableData[0]; // $FlowFixMe

    const first_entry_values = Object.values(first_entry_in_list)[0];
    const keys = Object.keys(first_entry_values); // TODO: check whether starts with alpha char + _, and trim off only if it does

    const formatted_headers = keys.map(key => key.substring(2));
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), formatted_headers.map(header => /*#__PURE__*/React.createElement("th", null, header)));
  }

  buildRows(tableData) {
    const rows = tableData.map(player => {
      const player_name = Object.keys(player)[0]; // $FlowFixMe

      const player_data_values = Object.values(player)[0]; // $FlowFixMe

      const player_data_values_list = Object.values(player_data_values);

      const formatted_player_data = input => {
        return input.map(data => /*#__PURE__*/React.createElement("td", null, Math.round(data)));
      };

      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, player_name), formatted_player_data(player_data_values_list));
    });
    return rows;
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, this.buildHeaders(this.props.tableData)), /*#__PURE__*/React.createElement("tbody", null, this.buildRows(this.props.tableData))));
  }

}

export default H2HTable;