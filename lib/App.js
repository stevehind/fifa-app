"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _androidChrome512x = _interopRequireDefault(require("./android-chrome-512x512.png"));

require("./App.css");

var _PlayerList = _interopRequireDefault(require("./PlayerList"));

var _AddResult = _interopRequireDefault(require("./AddResult"));

var _LeaderboardPage = _interopRequireDefault(require("./LeaderboardPage"));

var _ResultsPage = _interopRequireDefault(require("./ResultsPage"));

var _H2HPage = _interopRequireDefault(require("./H2HPage"));

function App() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement("header", {
    className: "App-header"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "header-text"
  }, "It's ", /*#__PURE__*/_react.default.createElement("em", null, "FIFA20"), " in the time of ", /*#__PURE__*/_react.default.createElement("em", null, "COVID19")), /*#__PURE__*/_react.default.createElement("img", {
    src: _androidChrome512x.default,
    className: "App-logo",
    alt: "logo"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "App-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "padding-bottom"
  }, /*#__PURE__*/_react.default.createElement(_AddResult.default, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "padding-bottom"
  }, /*#__PURE__*/_react.default.createElement(_LeaderboardPage.default, null)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_H2HPage.default, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "padding-bottom"
  }, /*#__PURE__*/_react.default.createElement(_ResultsPage.default, null)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_PlayerList.default, null))), /*#__PURE__*/_react.default.createElement("footer", {
    className: "App-footer"
  }, /*#__PURE__*/_react.default.createElement("p", null, "\xA9Steve Hind, 2020.")));
}

var _default = App;
exports.default = _default;