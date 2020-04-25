// @flow

import React, { Component } from 'react';
import Cookies from 'js-cookie';
import api from './api';
import type { AxiosError, AxiosResponse, AuthPayload } from './api';

type LoginStates = "Unsubmitted" | "Submitting" | "SubmittedSuccessfully" | "SubmittedWithErrors"
type AuthWithCookieStates = "NotChecked" | "Succeeded" | "Failed"

type State = {
    name: string,
    password: string,
    login_state: LoginStates,
    cookie_check_state: AuthWithCookieStates,
    cookie_server_response: string
}

class Login extends Component<Props, State> {

    constructor(props){
        super(props)

        this.state = {
            login_state: "Unsubmitted",
            cookie_check_state: "NotChecked",
            name: "Test Register1",
            password: "password"
        }

        this.handleCookieAuthenticate = this.handleCookieAuthenticate.bind(this);
        this.attemptLogin = this.attemptLogin.bind(this);
    }

    // check whether we're ready to check cookie authentication
    readyForInitialCheck = (state: State) => {
        if (state.login_state === "Unsubmitted" && state.cookie_check_state === "NotChecked")
        {
            return true
        } else {
            return false
        }
    }

    // check whether to render the login form
    readyForLoginForm = (state: State) => {
        if (state.cookie_check_state === "Failed" && (state.login_state === "Unsubmitted" || state.login_state === "SubmittedWithErrors" || state.login_state === "Submitting"))
            return true
            else return false
    }

    // handle the cookie authenticate button being pressed
    handleCookieAuthenticate() {
        let successCallback = (result: AxiosResponse<string>) => {
            this.setState({
                cookie_server_response: result.data,
                cookie_check_state: "Succeeded"
            });
        };
        let errorHandler = (error: AxiosError<AxiosResponse<string>>) => {
            this.setState({ 
                cookie_server_response: error.response.data,
                cookie_check_state: "Failed"
            });
        }
        api.validateCookie(successCallback, errorHandler);
    }

    handleTypedChange = (event: SyntheticEvent<>) => {
        // TODO validate that even.target fields are what you expect them to be, otherwise error
        this.setState({ [event.target.name]: event.target.value });
    }

    async attemptLogin(event: SyntheticEvent<>) {
        event.preventDefault();

        this.setState({ login_state: "Submitting"});
        let auth_payload: AuthPayload = {
            name: this.state.name,
            password: this.state.password
        }

        api.validateLogin(auth_payload)
        .then((result: AxiosResponse<string> | AxiosError<AxiosResponse<string>>) => {
            if (result.status === 401 || result.status === 500) {
                this.setState({ login_state: "SubmittedWithErrors" });
            } else if (result.status === 200) {
                console.log("Result.headers: %o", result.headers);
                console.log("Cookie: %o", document.cookie);
                this.setState({ login_state: "SubmittedSuccessfully"});
            }            
        })

        //Cookies.set(api_result.headers)
    } 

    // async submit(ev: SyntheticEvent<>) {
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

    render() {
        return (
            <div className="small-container App-header">
                <p className="text-center">This is the auth component.</p>
                {/* Button asking someone to auth. Look for a cookie, if there is one, auth it via the server. If it works, say there's no need to auth further. */}
                {
                    this.readyForInitialCheck(this.state) ?
                    <button onClick={this.handleCookieAuthenticate}>Authenticate...</button>
                    :
                    <div>Login to authenticate.👇</div>
                }
                {/* If cookie auth fails, show a login form */}
                {
                    this.readyForLoginForm(this.state) ?
                    <div className="App-body">
                        <form>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleTypedChange}
                            ></input>
                            <label>Password:</label>
                            <input
                                type="text"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleTypedChange}
                            ></input>
                        </form>
                        <button onClick={this.attemptLogin}>Login...</button>
                        {
                            this.state.login_state === "Submitting" ?
                            <p><em>Logging in...</em></p> :
                            null
                        }
                        {
                            this.state.login_state === "SubmittedWithErrors" ?
                            <p>Login failed. Please try again.</p> :
                            null
                        }
                    </div>
                    :
                    null
                }
                {
                    this.state.login_state === "SubmittedSuccessfully" ?
                    <p>You are logged in.</p> :
                    null
                }
            </div>
        )
    } 
}

export default Login;