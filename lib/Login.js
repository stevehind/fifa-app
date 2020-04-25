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

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _api = _interopRequireDefault(require("./api"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Login = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Login, _Component);

  var _super = _createSuper(Login);

  function Login(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Login);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "readyForInitialCheck", function (state) {
      if (state.login_state === "Unsubmitted" && state.cookie_check_state === "NotChecked") {
        return true;
      } else {
        return false;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "readyForLoginForm", function (state) {
      if (state.cookie_check_state === "Failed" && (state.login_state === "Unsubmitted" || state.login_state === "SubmittedWithErrors" || state.login_state === "Submitting")) return true;else return false;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleTypedChange", function (event) {
      // TODO validate that even.target fields are what you expect them to be, otherwise error
      _this.setState((0, _defineProperty2.default)({}, event.target.name, event.target.value));
    });
    _this.state = {
      login_state: "Unsubmitted",
      cookie_check_state: "NotChecked",
      name: "Test Register1",
      password: "password"
    };
    _this.handleCookieAuthenticate = _this.handleCookieAuthenticate.bind((0, _assertThisInitialized2.default)(_this));
    _this.attemptLogin = _this.attemptLogin.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  } // check whether we're ready to check cookie authentication


  (0, _createClass2.default)(Login, [{
    key: "handleCookieAuthenticate",
    // handle the cookie authenticate button being pressed
    value: function handleCookieAuthenticate() {
      var _this2 = this;

      var successCallback = function successCallback(result) {
        _this2.setState({
          cookie_server_response: result.data,
          cookie_check_state: "Succeeded"
        });
      };

      var errorHandler = function errorHandler(error) {
        _this2.setState({
          cookie_server_response: error.response.data,
          cookie_check_state: "Failed"
        });
      };

      _api.default.validateCookie(successCallback, errorHandler);
    }
  }, {
    key: "attemptLogin",
    value: function () {
      var _attemptLogin = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(event) {
        var _this3 = this;

        var auth_payload;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();
                this.setState({
                  login_state: "Submitting"
                });
                auth_payload = {
                  name: this.state.name,
                  password: this.state.password
                };

                _api.default.validateLogin(auth_payload).then(function (result) {
                  if (result.status === 400 || result.status === 500) {
                    _this3.setState({
                      login_state: "SubmittedWithErrors"
                    });
                  } else if (result.status === 200) {
                    console.log("Result.headers: %o", result.headers);

                    _this3.setState({
                      login_state: "SubmittedSuccessfully"
                    });
                  }
                }); //Cookies.set(api_result.headers)


              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function attemptLogin(_x) {
        return _attemptLogin.apply(this, arguments);
      }

      return attemptLogin;
    }() // async submit(ev: SyntheticEvent<>) {
    //     ev.preventDefault();
    //     this.setState({submitted: true});
    //     if (this.state.player_1 && this.state.player_2) {
    //         let names: PairOfNames = [this.state.player_1, this.state.player_2]
    //         api.getH2HData(names)
    //         .then((result: AxiosResponse<TableObjectList>) => {
    //             this.setState({table_data: result.data});
    //             let elos = this.extractElos(result.data);
    //             this.setState({elos: elos});
    //         })
    //     } 
    // }
    //handle text being entered into the form
    //handle clicking submit on the form
    // send what's in the form to the server
    // return a response from the server

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "small-container App-header"
      }, /*#__PURE__*/_react.default.createElement("p", {
        className: "text-center"
      }, "This is the auth component."), this.readyForInitialCheck(this.state) ? /*#__PURE__*/_react.default.createElement("button", {
        onClick: this.handleCookieAuthenticate
      }, "Authenticate...") : /*#__PURE__*/_react.default.createElement("div", null, "Login to authenticate.\uD83D\uDC47"), this.readyForLoginForm(this.state) ? /*#__PURE__*/_react.default.createElement("div", {
        className: "App-body"
      }, /*#__PURE__*/_react.default.createElement("form", null, /*#__PURE__*/_react.default.createElement("label", null, "Name:"), /*#__PURE__*/_react.default.createElement("input", {
        type: "text",
        name: "name",
        value: this.state.name,
        onChange: this.handleTypedChange
      }), /*#__PURE__*/_react.default.createElement("label", null, "Password:"), /*#__PURE__*/_react.default.createElement("input", {
        type: "text",
        name: "password",
        value: this.state.password,
        onChange: this.handleTypedChange
      })), /*#__PURE__*/_react.default.createElement("button", {
        onClick: this.attemptLogin
      }, "Login..."), this.state.login_state === "Submitting" ? /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, "Logging in...")) : null, this.state.login_state === "SubmittedWithErrors" ? /*#__PURE__*/_react.default.createElement("p", null, "Login failed. Please try again.") : null) : null, this.state.login_state === "SubmittedSuccessfully" ? /*#__PURE__*/_react.default.createElement("p", null, "You are logged in.") : null);
    }
  }]);
  return Login;
}(_react.Component);

var _default = Login;
exports.default = _default;