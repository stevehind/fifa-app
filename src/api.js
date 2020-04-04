import axios from 'axios';

const HOST = 'https://stevehind-fifa-stats.builtwithdark.com/api/v1';

const getPlayers = (callback, error) => {
    axios.get(`${HOST}/players`)
    .then(callback)
    .catch(error)
}

const getClubs = (callback, error) => {
    axios.get(`${HOST}/clubs`)
    .then(callback)
    .catch(error)
}

// post to the /add-result api
const addResult = (data) => {
    return axios.post(`${HOST}/add-result`, data)
    .then(res => {
        if (res.status === 200) {
            console.log(`The server response was: %o`,res.data);
            return res.data;
        } else if (res.status === 400) {
            return { error: res.message};
        } else {
            return res.data;
        }
    })
    .then(data => {
        if (!data || data.error) {
            console.log("API error: %o", {data});
            throw Error ("API Error");
        } else {
            console.log(`The thing the function will return is: %o`,data);
            return data;
        }
    });
}

// GET from the /table endpoint
const getResultsTableData = (callback, error) => {
    axios.get(`${HOST}/table`)
    .then(callback => console.log("Api result was: %o", callback))
    .catch(error)
}


const api = {
    getPlayers : getPlayers,
    getClubs: getClubs,
    addResult : addResult,
    getTable : getResultsTableData
}

export default api;