"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _api = _interopRequireDefault(require("./api"));

var _ResultsTable = _interopRequireDefault(require("./ResultsTable"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ResultsPage = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ResultsPage, _Component);

  var _super = _createSuper(ResultsPage);

  function ResultsPage(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ResultsPage);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleReveal", function (event) {
      event.preventDefault();

      _this.setState({
        clicked: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleHide", function (event) {
      event.preventDefault();

      _this.setState({
        clicked: false
      });
    });
    _this.state = {
      table_data: undefined,
      clicked: false
    };
    return _this;
  }

  (0, _createClass2.default)(ResultsPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _api.default.getResultsListData(function (result) {
        _this2.setState({
          table_data: result.data
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.clicked) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "small-container padding-top"
        }, /*#__PURE__*/_react.default.createElement("button", {
          onClick: this.handleHide
        }, "Hide Results"), /*#__PURE__*/_react.default.createElement("h2", null, "All Results"), this.state.table_data === undefined ? /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, "Loading results...")) : /*#__PURE__*/_react.default.createElement(_ResultsTable.default, {
          tableData: this.state.table_data
        }), /*#__PURE__*/_react.default.createElement("button", {
          onClick: this.handleHide
        }, "Hide Results"));
      } else {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "small-container padding-top"
        }, /*#__PURE__*/_react.default.createElement("button", {
          onClick: this.handleReveal
        }, "View all Results"));
      }
    }
  }]);
  return ResultsPage;
}(_react.Component);

var _default = ResultsPage;
exports.default = _default;