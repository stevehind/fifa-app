// @flow

import React, { Component } from 'react';
import api from './api';
import type { AxiosError, AxiosResponse, AuthPayload } from './api';

type LoginStates = "Unsubmitted" | "Submitting" | "Succeeded" | "Failed"
type AuthWithCookieStates = "Unsubmitted" | "Submitting" | "Succeeded" | "Failed"

type State = {
    name: string,
    password: string,
    login_state: LoginStates,
    cookie_check_state: AuthWithCookieStates
}

type CookieObject = {
    [string]: string 
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
        if (state.login_state === "Unsubmitted" && state.cookie_check_state === "Unsubmitted")
        {
            return true
        } else {
            return false
        }
    }

    // check whether to render the login form
    readyForLoginForm = (state: State) => {
        if (state.cookie_check_state === "Failed" && (state.login_state === "Unsubmitted" || state.login_state === "Failed" || state.login_state === "Submitting"))
            return true
            else return false
    }

    // check whether login has succeeded
    authenticationFinished = (state: State) => {
        if (this.state.login_state === "Succeeded" || this.state.cookie_check_state === "Succeeded")
            return true
            else return false
    }

    handleTypedChange = (event: SyntheticEvent<>) => {
        // TODO validate that even.target fields are what you expect them to be, otherwise error
        this.setState({ [event.target.name]: event.target.value });
    }

    // handle the cookie authenticate button being pressed
    async handleCookieAuthenticate(event: SyntheticEvent<>) {
        event.preventDefault();

        this.setState({ cookie_check_state: "Submitting" });

        api.validateCookie((result: AxiosResponse<String> | AxiosError<AxiosResponse<string>>) => {
            console.log("Result: %o", result);
            if (result.status === 400) {
                console.log("Result status: %o", result.status);
                this.setState({ cookie_check_state: "Failed" });
            } else if (result.status === 200) {
                this.setState({ cookie_check_state: "Succeeded" });
            } else {
                this.setState({ cookie_check_state: "Failed" });
            }
        });
    }
    
    async attemptLogin(event: SyntheticEvent<>) {
        event.preventDefault();

        this.setState({ login_state: "Submitting"});
        let auth_payload: AuthPayload = {
            name: this.state.name,
            password: this.state.password
        }

        api.validateLogin(auth_payload)
        .then((result: AxiosResponse<CookieObject> | AxiosError<AxiosResponse<string>>) => {
            if (result.status === 401 || result.status === 500) {
                this.setState({ login_state: "Failed" });
            } else if (result.status === 200) {
                // $FlowFixMe
                let cookie_string: string = Object.values(result.data)[0];
                let cookie_value: string = cookie_string.substring(11); 
                localStorage.setItem('fifa_stats', cookie_value);
                this.setState({ login_state: "Succeeded"});
            }            
        })
    } 

    render() {
        return (
            <div className="small-container alternate-background padding-top padding-bottom left-right-padding">
                <h3 className="text-center">This is the auth component.</h3>
                {/* Button asking someone to auth. Look for a cookie, if there is one, auth it via the server. If it works, say there's no need to auth further. */}
                {
                    this.readyForInitialCheck(this.state) ?
                    <button onClick={this.handleCookieAuthenticate}>Authenticate...</button> :
                    null
                }
                {/* If cookie auth fails, show a login form */}
                {
                    this.readyForLoginForm(this.state) ?
                    <div className="App-body">
                        <p>Sorry but you need to sign in!</p>
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
                            this.state.login_state === "Failed" ?
                            <p>Login failed. Please try again.</p> :
                            null
                        }
                    </div>
                    :
                    null
                }
                {
                    this.authenticationFinished(this.state) ?
                    <p>You are logged in.</p> :
                    null
                }
            </div>
        )
    } 
}

export default Login;