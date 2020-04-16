"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var HOST = 'https://stevehind-fifa-stats.builtwithdark.com/api/v1';

var getPlayers = function getPlayers(callback, error) {
  _axios.default.get("".concat(HOST, "/players")).then(callback).catch(error);
};

var getClubs = function getClubs(callback, error) {
  _axios.default.get("".concat(HOST, "/clubs")).then(callback).catch(error);
}; // post to the /add-result api


var addResult = function addResult(data) {
  return _axios.default.post("".concat(HOST, "/add-result"), data).then(function (res) {
    if (res.status === 200) {
      return res.data;
    } else if (res.status === 400) {
      return {
        error: res.data
      };
    } else {
      return res.data;
    }
  }).then(function (data) {
    if (!data || data.error) {
      throw Error("API Error");
    } else {
      return data;
    }
  });
}; // GET from the /table endpoint


var getLeaderboardTableData = function getLeaderboardTableData(callback, error) {
  _axios.default.get("".concat(HOST, "/table")).then(callback).catch(error);
}; // GET from the /results endpoint


var getResultsListData = function getResultsListData(callback, error) {
  _axios.default.get("".concat(HOST, "/results")).then(callback).then(error);
}; // Get from the /kotl endpoint


var getKOTLData = function getKOTLData(callback, error) {
  _axios.default.get("".concat(HOST, "/kotl")).then(callback).then(error);
}; // Get from the /h2h endpoint, with player names in URL


var getH2HData = function getH2HData(names) {
  return _axios.default.get("".concat(HOST, "/h2h/").concat(names[0], "/").concat(names[1])).then(function (callback) {
    return callback;
  }).then(function (error) {
    return error;
  });
};

var api = {
  getPlayers: getPlayers,
  getClubs: getClubs,
  addResult: addResult,
  getLeaderboardTableData: getLeaderboardTableData,
  getResultsListData: getResultsListData,
  getKOTLData: getKOTLData,
  getH2HData: getH2HData
};
var _default = api;
exports.default = _default;