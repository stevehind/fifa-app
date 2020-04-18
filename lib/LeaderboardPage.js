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

var _api = _interopRequireDefault(require("./api"));

var _LeaderboardTable = _interopRequireDefault(require("./LeaderboardTable"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var LeaderboardPage = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(LeaderboardPage, _Component);

  var _super = _createSuper(LeaderboardPage);

  function LeaderboardPage(props) {
    var _this;

    (0, _classCallCheck2.default)(this, LeaderboardPage);
    _this = _super.call(this, props);
    _this.state = {
      table_data: undefined
    };
    return _this;
  }

  (0, _createClass2.default)(LeaderboardPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _api.default.getLeaderboardTableData(function (result) {
        _this2.setState({
          table_data: result.data
        });
      });

      _api.default.getKOTLData(function (result) {
        _this2.setState({
          kotl_data: result.data
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "small-container"
      }, /*#__PURE__*/_react.default.createElement("h2", null, "Leaderboard"), this.state.kotl_data === undefined ? /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, "Loading King of the Lounge...")) : /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h4", {
        className: "the-kotl-row"
      }, /*#__PURE__*/_react.default.createElement("b", null, this.state.kotl_data.kotl_is), " is the The King of the Lounge."), /*#__PURE__*/_react.default.createElement("p", null, "They have defended their title for ", this.state.kotl_data.title_defended_for_games, " games and ", this.state.kotl_data.on_top_for_hrs, " hours.")), this.state.table_data === undefined ? /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, "Loading leaderboard...")) : /*#__PURE__*/_react.default.createElement(_LeaderboardTable.default, {
        tableData: this.state.table_data,
        className: "alternate-background"
      }), /*#__PURE__*/_react.default.createElement("p", null, "Players are ranked by their ", /*#__PURE__*/_react.default.createElement("a", {
        href: "https://en.wikipedia.org/wiki/Elo_rating_system"
      }, "Elo rating"), "."));
    }
  }]);
  return LeaderboardPage;
}(_react.Component);

var _default = LeaderboardPage;
exports.default = _default;