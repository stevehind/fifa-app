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

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var PlayerList = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(PlayerList, _Component);

  var _super = _createSuper(PlayerList);

  function PlayerList(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PlayerList);
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
      players: [],
      clicked: false
    };
    return _this;
  }

  (0, _createClass2.default)(PlayerList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _api.default.getPlayers(function (result) {
        _this2.setState({
          players: result.data
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var player_list = this.state.players.map(function (player) {
        return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, player.name), /*#__PURE__*/_react.default.createElement("td", null, player.ps_handle));
      });

      if (this.state.clicked) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "small-container padding-bottom"
        }, /*#__PURE__*/_react.default.createElement("button", {
          onClick: this.handleHide
        }, "Hide Players"), /*#__PURE__*/_react.default.createElement("h3", null, "Players and their PS4 handles:"), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Player"), /*#__PURE__*/_react.default.createElement("th", null, "PS4 Handle")), player_list);
      } else {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "small-container padding-bottom"
        }, /*#__PURE__*/_react.default.createElement("button", {
          onClick: this.handleReveal
        }, "View Players"));
      }
    }
  }]);
  return PlayerList;
}(_react.Component);

var _default = PlayerList;
exports.default = _default;