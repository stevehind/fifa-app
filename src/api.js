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

const addResult = (data) => {

    return window
    .fetch(`${HOST}/add-result`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(
        res => {
            if (res.status === 200) {
                console.log(res.json());
                return res.json();
            } else if (res.status === 400) {
                return { error: res.json.message};
            } else {
                return res.json();
            }
    })
    .then(data => {
        if (!data || data.error) {
            console.log("API error: ", {data});
            throw Error ("API Error");
        } else {
            return data;
        }
    });
        
}

const api = {
    getPlayers : getPlayers,
    getClubs: getClubs,
    addResult : addResult
}

export default api;