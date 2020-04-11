function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import api from './api';
import ResultsTable from './ResultsTable';

class ResultsPage extends Component {
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
      table_data: undefined,
      clicked: false
    };
  }

  componentDidMount() {
    api.getResultsListData(result => {
      this.setState({
        table_data: result.data
      });
    });
  }

  render() {
    if (this.state.clicked) {
      return /*#__PURE__*/React.createElement("div", {
        className: "small-container padding-top"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this.handleHide
      }, "Hide Results"), /*#__PURE__*/React.createElement("h2", null, "All Results"), this.state.table_data === undefined ? /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "Loading results...")) : /*#__PURE__*/React.createElement(ResultsTable, {
        tableData: this.state.table_data
      }), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleHide
      }, "Hide Results"));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "small-container padding-top"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this.handleReveal
      }, "View all Results"));
    }
  }

}

export default ResultsPage;