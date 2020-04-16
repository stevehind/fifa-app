"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

var CHOSE_A_PLAYER_DEFAULT = "Chose a player...";

var AddResults = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(AddResults, _Component);

  var _super = _createSuper(AddResults);

  function AddResults(props) {
    var _this;

    (0, _classCallCheck2.default)(this, AddResults);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleTypedChange", function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      _this.setState((0, _defineProperty2.default)({}, name, value));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleSelectChange", function (event) {
      var _event$target2 = event.target,
          name = _event$target2.name,
          value = _event$target2.value;

      if (value === CHOSE_A_PLAYER_DEFAULT) {
        _this.setState((0, _defineProperty2.default)({}, name, undefined));
      } else {
        _this.setState((0, _defineProperty2.default)({}, name, value));
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getFormData", function (object) {
      return Object.keys(object).reduce(function (formData, key) {
        formData.append(key, object[key]);
        return formData;
      }, new FormData());
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "validateForm", function (state) {
      if (state.home === undefined || state.away === undefined || state.home_score === undefined || state.away_score === undefined) {
        return false;
      } else {
        return true;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "previewForm", function (event) {
      event.preventDefault();

      _this.setState({
        result_ready_for_preview: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleFormReset", function (event) {
      event.preventDefault();

      _this.setState({
        clicked: true,
        submitted_to_server: null,
        server_success: null,
        home: undefined,
        home_score: undefined,
        away: undefined,
        away_score: undefined,
        comment: null,
        error: undefined,
        result_ready_for_preview: undefined
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleHide", function (event) {
      event.preventDefault();

      _this.setState({
        clicked: false
      });
    });
    _this.state = {
      clicked: false,
      players: [],
      server_success: null,
      submitted_to_server: false,
      clubs: []
    };
    _this.submitFormToServer = _this.submitFormToServer.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(AddResults, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _api.default.getPlayers(function (result) {
        _this2.setState({
          players: result.data
        });
      });

      _api.default.getClubs(function (result) {
        _this2.setState({
          clubs: result.data
        });
      });
    }
  }, {
    key: "submitFormToServer",
    value: function () {
      var _submitFormToServer = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(ev) {
        var _this3 = this;

        var body, error_message;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ev.preventDefault();
                this.setState({
                  submitted_to_server: true
                });
                body = {
                  home: this.state.home,
                  home_score: this.state.home_score,
                  away: this.state.away,
                  away_score: this.state.away_score,
                  // uncomment below for development
                  //comment: "dev-test"
                  comment: this.state.comment
                };
                error_message = "Error: didn't post to server. Make sure you've provided two different players' names, and two scores.";

                _api.default.addResult(body).then(function (response) {
                  if (response.error) {
                    _this3.setState({
                      submitted_to_server: true,
                      server_success: false,
                      error: error_message
                    });
                  } else {
                    _this3.setState({
                      submitted_to_server: true,
                      server_success: true,
                      result: response
                    });
                  }
                }).catch(function (err) {
                  _this3.setState({
                    submitted_to_server: true,
                    server_success: false,
                    error: error_message
                  });
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function submitFormToServer(_x) {
        return _submitFormToServer.apply(this, arguments);
      }

      return submitFormToServer;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          home = _this$state.home,
          home_team = _this$state.home_team,
          home_score = _this$state.home_score,
          away = _this$state.away,
          away_team = _this$state.away_team,
          away_score = _this$state.away_score,
          comment = _this$state.comment,
          result = _this$state.result,
          error = _this$state.error;
      var player_list = this.state.players.map(function (player) {
        return /*#__PURE__*/_react.default.createElement("option", null, player.name);
      });
      var clubs_list = this.state.clubs.map(function (club) {
        return /*#__PURE__*/_react.default.createElement("option", null, club.name);
      });
      if (this.state.clicked && !this.state.server_success && !this.state.submitted_to_server && !this.state.result_ready_for_preview) return /*#__PURE__*/_react.default.createElement("div", {
        className: "small-container padding-top"
      }, /*#__PURE__*/_react.default.createElement("form", null, /*#__PURE__*/_react.default.createElement("h3", null, "Enter the results, get the rewards."), /*#__PURE__*/_react.default.createElement("div", {
        className: "left-right-padding text-left"
      }, /*#__PURE__*/_react.default.createElement("h4", null, "Home"), /*#__PURE__*/_react.default.createElement("label", null, "Player"), /*#__PURE__*/_react.default.createElement("select", {
        name: "home",
        value: home,
        onChange: this.handleSelectChange
      }, /*#__PURE__*/_react.default.createElement("option", null, CHOSE_A_PLAYER_DEFAULT), player_list), /*#__PURE__*/_react.default.createElement("label", null, "Team"), /*#__PURE__*/_react.default.createElement("select", {
        name: "home_team",
        value: home_team,
        onChange: this.handleSelectChange
      }, /*#__PURE__*/_react.default.createElement("option", null, "Chose a team..."), clubs_list), /*#__PURE__*/_react.default.createElement("label", null, "Score"), /*#__PURE__*/_react.default.createElement("input", {
        type: "number",
        name: "home_score",
        value: home_score,
        onChange: this.handleTypedChange
      }), /*#__PURE__*/_react.default.createElement("h4", null, "Away"), /*#__PURE__*/_react.default.createElement("label", null, "Player"), /*#__PURE__*/_react.default.createElement("select", {
        name: "away",
        value: away,
        onChange: this.handleSelectChange
      }, /*#__PURE__*/_react.default.createElement("option", null, CHOSE_A_PLAYER_DEFAULT), player_list), /*#__PURE__*/_react.default.createElement("label", null, "Team"), /*#__PURE__*/_react.default.createElement("select", {
        name: "away_team",
        value: away_team,
        onChange: this.handleSelectChange
      }, /*#__PURE__*/_react.default.createElement("option", null, "Chose a team..."), clubs_list), /*#__PURE__*/_react.default.createElement("label", null, "Score"), /*#__PURE__*/_react.default.createElement("input", {
        type: "number",
        name: "away_score",
        value: away_score,
        onChange: this.handleTypedChange
      }), /*#__PURE__*/_react.default.createElement("h4", null, "Comment"), /*#__PURE__*/_react.default.createElement("input", {
        type: "text",
        name: "comment",
        value: comment,
        onChange: this.handleTypedChange
      }))), this.validateForm(this.state) ? /*#__PURE__*/_react.default.createElement("button", {
        onClick: this.previewForm
      }, "Preview result...") : /*#__PURE__*/_react.default.createElement("button", {
        className: "muted-button",
        disabled: true
      }, "Fill out the form!"));else if (this.state.result_ready_for_preview && !this.state.submitted_to_server) return /*#__PURE__*/_react.default.createElement("div", {
        className: "small-container left-right-padding padding-top padding-bottom"
      }, /*#__PURE__*/_react.default.createElement("h4", null, "Please preview result before submitting."), /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Side"), /*#__PURE__*/_react.default.createElement("th", null, "Player"), /*#__PURE__*/_react.default.createElement("th", null, "Score")), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "Home"), /*#__PURE__*/_react.default.createElement("td", null, home), /*#__PURE__*/_react.default.createElement("td", null, home_score)), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "Away"), /*#__PURE__*/_react.default.createElement("td", null, away), /*#__PURE__*/_react.default.createElement("td", null, away_score))), /*#__PURE__*/_react.default.createElement("div", {
        className: "left-right-padding"
      }, /*#__PURE__*/_react.default.createElement("button", {
        onClick: this.submitFormToServer
      }, "Submit to server")), /*#__PURE__*/_react.default.createElement("div", {
        className: "left-right-padding"
      }, /*#__PURE__*/_react.default.createElement("button", {
        onClick: this.handleFormReset
      }, "Re-fill form")));else if (!this.state.server_success && this.state.submitted_to_server && this.state.error === undefined) return /*#__PURE__*/_react.default.createElement("div", {
        className: "small-container padding-top padding-bottom"
      }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, "Sending result to server...")), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, "Please wait...")));else if (!this.state.server_success && this.state.submitted_to_server && this.state.error) return /*#__PURE__*/_react.default.createElement("div", {
        className: "small-container padding-top padding-bottom"
      }, /*#__PURE__*/_react.default.createElement("h2", {
        style: {
          color: 'red'
        }
      }, error), /*#__PURE__*/_react.default.createElement("button", {
        onClick: this.handleFormReset
      }, "Try again"));else if (this.state.server_success && this.state.submitted_to_server) return /*#__PURE__*/_react.default.createElement("div", {
        className: "small-container padding-top padding-bottom"
      }, /*#__PURE__*/_react.default.createElement("p", null, "Success! Result saved to the sever."), result.winner === "Draw" ? /*#__PURE__*/_react.default.createElement("p", null, "The result was a ", result.winner, ".") : /*#__PURE__*/_react.default.createElement("p", null, "Winner was: ", result.winner, " by ", result.goal_diff, "."), /*#__PURE__*/_react.default.createElement("button", {
        onClick: this.handleFormReset
      }, "Add another"));else return /*#__PURE__*/_react.default.createElement("div", {
        className: "small-container padding-top padding-bottom"
      }, /*#__PURE__*/_react.default.createElement("button", {
        onClick: this.handleFormReset
      }, "Add Result"));
    }
  }]);
  return AddResults;
}(_react.Component);

var _default = AddResults;
exports.default = _default;