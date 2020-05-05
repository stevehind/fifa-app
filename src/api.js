// @flow

import axios from 'axios';

export type AxiosResponse<DataType> = {
    data: DataType,
    status: number,
    statusText: string,
    headers?: any,
    config?: any,
    request?: any
};

export type AxiosError<DataType> = {
    response: AxiosResponse<DataType>,
    headers: any,
    config?: any,
    data: DataType
}

export type AuthPayload = ?{
    name: string,
    password: string
}

export type CookieDict = { [string]: string }

type GameResult = {
    away: string,
    away_score: number,
    home: string,
    home_score: number,
    comment: null | string
}

type GameResultList = Array<GameResult>;

type GameResponse = {
    away: string,
    away_score: number,
    comment: string,
    goal_diff: number,
    home: string,
    home_score: number,
    report_time: string,
    winner: string
}

type KOTLResponse = {
    kotl_is: string,
    on_top_for_hrs: number,
    title_defended_for_games: number
}

export type PairOfNames = [string, string];

export type TableObjectValues = {
    "a_Elo": number,
    "b_Played": number,
    "c_Wins": number,
    "d_Draws": number,
    "e_Losses": number,
    "f_Pts": number,
    "g_GoalDiff": number
}

export type TableObject = {
    [player_name: string] : TableObjectValues
};

export type TableObjectList = Array<TableObject>;

export type PlayerObject = {
    name: string,
    ps_handle: string
};

export type PlayerObjectList = Array<PlayerObject>;

const HOST: string = 'https://stevehind-fifa-stats.builtwithdark.com/api/v1';

const stored_cookie: ?string = localStorage.getItem('fifa_stats') || '';
const auth_header: string = JSON.stringify({ fifa_stats: stored_cookie}); 

//axios.defaults.withCredentials = true;

const getPlayers = (callback: AxiosResponse<PlayerObjectList>, error) => {
    axios.get(`${HOST}/players`)
    .then(callback)
    .catch(error)
}

const getClubs = (callback, error) => {
    axios.get(`${HOST}/clubs`)
    .then(callback)
    .catch(error)
}

const validateCookie = (callback, error) => {
    axios.get(`${HOST}/cookie`, { withCredentials: false, headers: { authentication: auth_header}})
    .then(callback)
    .catch(error)
}

// post a username and password to the server and receive a respnose back
const validateLogin = (data: AuthPayload) => {
    return axios.post(`${HOST}/login`, data, { withCredentials: false, headers: { authentication: auth_header} })
    .then((res: AxiosResponse<string>) => {
        return res;
    })
    .catch((error: AxiosError<AxiosResponse<string>>) => {
        return error;
    })
}

// post to the /add-result api
const addResult = (data: GameResult) => {
    return axios.post(
        `${HOST}/add-result`, data)
    .then((res: AxiosResponse<GameResponse>) => {
        if (res.status === 200) {
            return res.data;
        } else if (res.status === 400) {
            return { error: res.data };
        } else {
            return res.data;
        }
    })
    .then(data => {
        if (!data || data.error) {
            throw Error ("API Error");
        } else {
            return data;
        }
    });
}

// GET from the /table endpoint
const getLeaderboardTableData = (callback: AxiosResponse<TableObjectList>, error) => {
    axios.get(`${HOST}/table`)
    .then(callback)
    .catch(error)
}

// GET from the /results endpoint
const getResultsListData = (callback: AxiosResponse<GameResultList>, error) => {
    axios.get(`${HOST}/results`)
    .then(callback)
    .then(error)
}

// Get from the /kotl endpoint
const getKOTLData = (callback: AxiosResponse<KOTLResponse>, error) => {
    axios.get(`${HOST}/kotl`)
    .then(callback)
    .then(error)
}

// Get from the /h2h endpoint, with player names in URL
const getH2HData = (names: PairOfNames) => {
    return axios.get(`${HOST}/h2h/${names[0]}/${names[1]}`)
    .then((callback: AxiosResponse<TableObjectList>) => callback)
    .then(error => error)
}

const api = {
    getPlayers : getPlayers,
    getClubs: getClubs,
    addResult : addResult,
    getLeaderboardTableData : getLeaderboardTableData,
    getResultsListData: getResultsListData,
    getKOTLData: getKOTLData,
    getH2HData: getH2HData,
    validateCookie: validateCookie,
    validateLogin: validateLogin
}

export default api;