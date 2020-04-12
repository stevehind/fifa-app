import axios from 'axios';
const HOST = 'https://stevehind-fifa-stats.builtwithdark.com/api/v1';

const getPlayers = (callback, error) => {
  axios.get(`${HOST}/players`).then(callback).catch(error);
};

const getClubs = (callback, error) => {
  axios.get(`${HOST}/clubs`).then(callback).catch(error);
}; // post to the /add-result api


const addResult = data => {
  return axios.post(`${HOST}/add-result`, data).then(res => {
    if (res.status === 200) {
      return res.data;
    } else if (res.status === 400) {
      return {
        error: res.data
      };
    } else {
      return res.data;
    }
  }).then(data => {
    if (!data || data.error) {
      throw Error("API Error");
    } else {
      return data;
    }
  });
}; // GET from the /table endpoint


const getLeaderboardTableData = (callback, error) => {
  axios.get(`${HOST}/table`).then(callback).catch(error);
}; // GET from the /results endpoint


const getResultsListData = (callback, error) => {
  axios.get(`${HOST}/results`).then(callback).then(error);
}; // Get from the /kotl endpoint


const getKOTLData = (callback, error) => {
  axios.get(`${HOST}/kotl`).then(callback).then(error);
}; // Get from the /h2h endpoint, with player names in URL


const getH2HData = names => {
  return axios.get(`${HOST}/h2h/${names[0]}/${names[1]}`).then(callback => callback).then(error => error);
};

const api = {
  getPlayers: getPlayers,
  getClubs: getClubs,
  addResult: addResult,
  getLeaderboardTableData: getLeaderboardTableData,
  getResultsListData: getResultsListData,
  getKOTLData: getKOTLData,
  getH2HData: getH2HData
};
export default api;