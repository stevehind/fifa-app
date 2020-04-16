"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var React = _interopRequireWildcard(require("react"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var H2HTable = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(H2HTable, _React$Component);

  var _super = _createSuper(H2HTable);

  function H2HTable() {
    (0, _classCallCheck2.default)(this, H2HTable);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(H2HTable, [{
    key: "buildHeaders",
    value: function buildHeaders(tableData) {
      var first_entry_in_list = tableData[0]; // $FlowFixMe

      var first_entry_values = Object.values(first_entry_in_list)[0];
      var keys = Object.keys(first_entry_values); // TODO: check whether starts with alpha char + _, and trim off only if it does

      var formatted_headers = keys.map(function (key) {
        return key.substring(2);
      });
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), formatted_headers.map(function (header) {
        return /*#__PURE__*/React.createElement("th", null, header);
      }));
    }
  }, {
    key: "buildRows",
    value: function buildRows(tableData) {
      var rows = tableData.map(function (player) {
        var player_name = Object.keys(player)[0]; // $FlowFixMe

        var player_data_values = Object.values(player)[0]; // $FlowFixMe

        var player_data_values_list = Object.values(player_data_values);

        var formatted_player_data = function formatted_player_data(input) {
          return input.map(function (data) {
            return /*#__PURE__*/React.createElement("td", null, Math.round(data));
          });
        };

        return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, player_name), formatted_player_data(player_data_values_list));
      });
      return rows;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, this.buildHeaders(this.props.tableData)), /*#__PURE__*/React.createElement("tbody", null, this.buildRows(this.props.tableData))));
    }
  }]);
  return H2HTable;
}(React.Component);

var _default = H2HTable;
exports.default = _default;