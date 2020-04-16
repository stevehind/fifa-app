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

var ResultsTable = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ResultsTable, _Component);

  var _super = _createSuper(ResultsTable);

  function ResultsTable() {
    (0, _classCallCheck2.default)(this, ResultsTable);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(ResultsTable, [{
    key: "buildHeaders",
    value: function buildHeaders(tableData) {
      var first_entry_in_list = tableData[0];
      var keys = Object.keys(first_entry_in_list);
      return /*#__PURE__*/_react.default.createElement("tr", null, keys.map(function (header) {
        return /*#__PURE__*/_react.default.createElement("th", null, header);
      }));
    }
  }, {
    key: "buildRows",
    value: function buildRows(tableData) {
      return tableData.map(function (result) {
        // dict
        var result_data = Object.values(result); // list of <td>s

        var formatted_player_data = function formatted_player_data(input) {
          return input.map(function (data) {
            return /*#__PURE__*/_react.default.createElement("td", null, data);
          });
        };

        return /*#__PURE__*/_react.default.createElement("tr", null, formatted_player_data(result_data));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "small-container"
      }, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("thead", null, this.buildHeaders(this.props.tableData)), /*#__PURE__*/_react.default.createElement("tbody", null, this.buildRows(this.props.tableData))));
    }
  }]);
  return ResultsTable;
}(_react.Component);

var _default = ResultsTable;
exports.default = _default;