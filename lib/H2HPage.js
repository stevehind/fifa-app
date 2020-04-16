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

var React = _interopRequireWildcard(require("react"));

var _api = _interopRequireDefault(require("./api"));

var _H2HTable = _interopRequireDefault(require("./H2HTable"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var CHOSE_A_PLAYER_DEFAULT = "Chose a player...";

var H2HPage = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(H2HPage, _Component);

  var _super = _createSuper(H2HPage);

  function H2HPage(props) {
    var _this;

    (0, _classCallCheck2.default)(this, H2HPage);
    _this = _super.call(this, props); // how to declare a type for this.state?

    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleSelectChange", function (event) {
      // $FlowFixMe
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      if (value === CHOSE_A_PLAYER_DEFAULT) {
        _this.setState((0, _defineProperty2.default)({}, name, undefined));
      } else {
        _this.setState((0, _defineProperty2.default)({}, name, value));
      }
    });
    _this.state = {
      players: [],
      table_data: [],
      e_values: [],
      elos: [],
      submitted: false
    }; // https://github.com/facebook/flow/issues/5874
    // $FlowFixMe

    _this.submit = _this.submit.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(H2HPage, [{
    key: "extractElos",
    value: function extractElos(data) {
      var elos = data.map(function (entry) {
        var elo = {
          name: Object.keys(entry)[0],
          // $FlowFixMe
          elo: Object.values(entry)[0].a_Elo
        };
        return elo;
      });
      return elos;
    }
  }, {
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
    key: "computeWinChance",
    value: function computeWinChance(names, data) {
      // $FlowFixMe
      var list_of_r = data.map(function (rating) {
        return Math.pow(10, rating / 400);
      });
      var sum_of_r = list_of_r.reduce(function (a, b) {
        return a + b;
      }, 0); // $FlowFixMe

      var list_of_e = list_of_r.map(function (r) {
        return r / sum_of_r;
      }); // $FlowFixMe

      var rounded_e = list_of_e.map(function (e) {
        return Math.round(e * 100);
      }); // $FlowFixMe

      var formatted_e = rounded_e.map(function (e) {
        return String(e).concat("%");
      });
      var dummy_list = [0, 1]; // $FlowFixMe   

      var e_and_names = dummy_list.map(function (i) {
        return names[i].concat(": ").concat(formatted_e[i]);
      }); // $FlowFixMe

      return e_and_names.map(function (item) {
        return /*#__PURE__*/React.createElement("td", {
          className: "text-center"
        }, item);
      });
    }
  }, {
    key: "notReadyToLoadResult",
    value: function notReadyToLoadResult(elos, table_data, player_1, player_2) {
      // $FlowFixMe
      if (elos === undefined || table_data === undefined || player_1 === undefined || player_2 === undefined || elos.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "submit",
    value: function () {
      var _submit = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(ev) {
        var _this3 = this;

        var names;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ev.preventDefault();
                this.setState({
                  submitted: true
                });

                if (this.state.player_1 && this.state.player_2) {
                  names = [this.state.player_1, this.state.player_2];

                  _api.default.getH2HData(names).then(function (result) {
                    _this3.setState({
                      table_data: result.data
                    });

                    var elos = _this3.extractElos(result.data);

                    _this3.setState({
                      elos: elos
                    });
                  });
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function submit(_x) {
        return _submit.apply(this, arguments);
      }

      return submit;
    }()
  }, {
    key: "render",
    value: function render() {
      var player_list = this.state.players.map(function (player) {
        return /*#__PURE__*/React.createElement("option", null, player.name);
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "small-container"
      }, /*#__PURE__*/React.createElement("h2", null, "Head to Head Stats"), /*#__PURE__*/React.createElement("form", {
        onSubmit: this.submit
      }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("label", {
        className: "text-center"
      }, "First player"), /*#__PURE__*/React.createElement("select", {
        name: "player_1",
        value: this.state.player_1,
        onChange: this.handleSelectChange
      }, /*#__PURE__*/React.createElement("option", null, CHOSE_A_PLAYER_DEFAULT), player_list)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("label", {
        className: "text-center"
      }, "Second player"), /*#__PURE__*/React.createElement("select", {
        name: "player_2",
        value: this.state.player_2,
        onChange: this.handleSelectChange
      }, /*#__PURE__*/React.createElement("option", null, CHOSE_A_PLAYER_DEFAULT), player_list))))), this.state.player_1 === undefined || this.state.player_2 === undefined ? /*#__PURE__*/React.createElement("button", {
        className: "muted-button",
        onClick: this.submit,
        disabled: this.state.player_1 === undefined || this.state.player_2 === undefined
      }, "Choose two players") : /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: this.submit,
        disabled: this.state.player_1 === undefined || this.state.player_2 === undefined
      }, "Calculate!"), this.state.submitted === true ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Elo-Implied Win Probabilities in Next Game"), this.notReadyToLoadResult(this.state.elos, this.state.table_data, this.state.player_1, this.state.player_2) ? /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "Loading win probabilities...")) : /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tr", null, this.computeWinChance( // $FlowFixMe
      Object.values(this.state.elos).map(function (value) {
        return value.name;
      }), // $FlowFixMe
      Object.values(this.state.elos).map(function (value) {
        return value.elo;
      })))), /*#__PURE__*/React.createElement("h4", null, "Head to Head Leaderboard"), this.notReadyToLoadResult(this.state.elos, this.state.table_data, this.state.player_1, this.state.player_2) ? /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "Loading leaderboard...")) : /*#__PURE__*/React.createElement(_H2HTable.default, {
        tableData: this.state.table_data,
        className: "alternate-background"
      }), /*#__PURE__*/React.createElement("p", null, "Players are ranked by their ", /*#__PURE__*/React.createElement("a", {
        href: "https://en.wikipedia.org/wiki/Elo_rating_system"
      }, "Elo rating"), "."))) : /*#__PURE__*/React.createElement("p", null, "Choose two players and then click \"Calculate!\" to see stats."));
    }
  }]);
  return H2HPage;
}(React.Component);

var _default = H2HPage;
exports.default = _default;