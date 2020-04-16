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

var _react = _interopRequireWildcard(require("react"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var LeaderboardTable = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(LeaderboardTable, _Component);

  var _super = _createSuper(LeaderboardTable);

  function LeaderboardTable() {
    (0, _classCallCheck2.default)(this, LeaderboardTable);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(LeaderboardTable, [{
    key: "buildHeaders",
    value: function buildHeaders(tableData) {
      var first_entry_in_list = tableData[0];
      var entry_values = Object.values(first_entry_in_list)[0];
      var keys = Object.keys(entry_values); // TODO: check whether starts with alpha char + _, and trim off only if it does

      var formatted_headers = keys.map(function (key) {
        return key.substring(2);
      });
      return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Name"), formatted_headers.map(function (header) {
        return /*#__PURE__*/_react.default.createElement("th", null, header);
      }));
    }
  }, {
    key: "buildRows",
    value: function buildRows(tableData) {
      return tableData.map(function (player) {
        // dict
        var player_data = Object.values(player); // list

        var player_data_values = Object.values(player_data)[0];
        var player_data_values_list = Object.values(player_data_values); // list of <td>s

        var formatted_player_data = function formatted_player_data(input) {
          return input.map(function (data) {
            return /*#__PURE__*/_react.default.createElement("td", null, Math.round(data));
          });
        };

        return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, Object.keys(player)[0]), formatted_player_data(player_data_values_list));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("thead", null, this.buildHeaders(this.props.tableData)), /*#__PURE__*/_react.default.createElement("tbody", null, this.buildRows(this.props.tableData))));
    }
  }]);
  return LeaderboardTable;
}(_react.Component);

var _default = LeaderboardTable;
exports.default = _default;