import React, { Component } from 'react';

import api from './api';

const CHOSE_A_PLAYER_DEFAULT = "Chose a player..."

class AddResults extends Component {

    constructor(props){
        super(props)

        this.state = {
            clicked: false,
            players: [],
            server_success: null,
            submitted_to_server: false,
            clubs: []
        }

        this.submitFormToServer = this.submitFormToServer.bind(this);
    }

    componentDidMount(){
        api.getPlayers(
            (result) => {
                this.setState({players: result.data});
            }
        );

        api.getClubs(
            (result) => {
                this.setState({clubs: result.data});
            }
        );
    }

    handleTypedChange = event => {
        const {name,value} = event.target;

        this.setState({
            [name] : value
        });
    }

    handleSelectChange = event => {
        const {name,value} = event.target;

        if (value === CHOSE_A_PLAYER_DEFAULT) {
            this.setState({
                [name] : undefined
            })
        } else {
            this.setState({
                [name] : value
            });
        }
    }

    getFormData = object => Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
    }, new FormData());

    validateForm = state => {
        if (
            state.home === undefined ||
            state.away === undefined ||
            state.home_score === undefined ||
            state.away_score === undefined
        ) {
            return false
        } else {
            return true
        }
    }

    previewForm = (event) => {
        event.preventDefault();

        this.setState({ result_ready_for_preview: true });
    }

    async submitFormToServer(ev) {
        ev.preventDefault();

        this.setState({ submitted_to_server : true });

        let body = {
            home : this.state.home,
            home_score: this.state.home_score,
            away: this.state.away,
            away_score: this.state.away_score,
            // uncomment below for development
            //comment: "dev-test"
            comment: this.state.comment
        };

        let error_message = "Error: didn't post to server. Make sure you've provided two different players' names, and two scores.";

        api.addResult(body)
        .then(response => {
            if (response.error) {
                this.setState({
                    submitted_to_server: true,
                    server_success: false,
                    error: error_message
                });
            } else {
                this.setState({
                    submitted_to_server: true,
                    server_success : true,    
                    result: response
                })
            }
        })
        .catch(err => {
            this.setState({
                submitted_to_server: true,
                server_success : false,
                error: error_message
            })
        });
    }

    handleFormReset = (event) => {
        event.preventDefault();
        this.setState({
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
        })
    }

    handleHide = (event) => {
        event.preventDefault();
        this.setState({clicked: false})
    }

    render(){
        const {home, home_team, home_score, away, away_team, away_score, comment, result, error} = this.state;

        const player_list = this.state.players
        .map(player => 
            <option>{player.name}</option>
        );

        const clubs_list = this.state.clubs
        .map(club => 
            <option>{club.name}</option>
        );

        if(this.state.clicked && !this.state.server_success && !this.state.submitted_to_server && !this.state.result_ready_for_preview) return (
            
            <div className="small-container padding-top">
                <form>
                    <h3>Enter the results, get the rewards.</h3>
                    <div className="left-right-padding text-left">
                        <h4>Home</h4>
                        <label>Player</label>
                        <select
                            name="home"
                            value={home}
                            onChange={this.handleSelectChange}>
                                <option>{CHOSE_A_PLAYER_DEFAULT}</option>
                                {player_list}    
                        </select>
                        <label>Team</label>
                        <select
                            name="home_team"
                            value={home_team}
                            onChange={this.handleSelectChange}>
                                <option>Chose a team...</option>
                                {clubs_list}
                        </select>
                        <label>Score</label>
                        <input
                            type="number"
                            name="home_score"
                            value={home_score}
                            onChange={this.handleTypedChange}/>
                        <h4>Away</h4>
                        <label>Player</label>
                        <select
                            name="away"
                            value={away}
                            onChange={this.handleSelectChange}>
                                <option>{CHOSE_A_PLAYER_DEFAULT}</option>
                                {player_list}    
                        </select>
                        <label>Team</label>
                        <select
                            name="away_team"
                            value={away_team}
                            onChange={this.handleSelectChange}>
                                <option>Chose a team...</option>
                                {clubs_list}
                        </select>
                        <label>Score</label>
                        <input
                            type="number"
                            name="away_score"
                            value={away_score}
                            onChange={this.handleTypedChange}/>
                        <h4>Comment</h4>
                        <input
                            type="text"
                            name="comment"
                            value={comment}
                            onChange={this.handleTypedChange}/>
                    </div>
                </form>
                {
                    this.validateForm(this.state) ?
                    <button onClick={this.previewForm}>Preview result...</button>
                    :
                    <button className="muted-button" disabled={true}>Fill out the form!</button>
                }
            </div>
        )

        else if (this.state.result_ready_for_preview && !this.state.submitted_to_server) return (
            <div className="small-container left-right-padding padding-top padding-bottom">
                <h4>Please preview result before submitting.</h4>
                <table>
                    <tr>
                        <th>Side</th>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                    <tr>
                        <td>Home</td>
                        <td>{home}</td>
                        <td>{home_score}</td>
                    </tr>
                    <tr>
                        <td>Away</td>
                        <td>{away}</td>
                        <td>{away_score}</td>
                    </tr>
                </table>
                <div className="left-right-padding">
                    <button onClick={this.submitFormToServer}>Submit to server</button>
                </div>
                <div className="left-right-padding">
                    <button onClick={this.handleFormReset}>Re-fill form</button>
                </div>
            </div>
        )       

        else if(!this.state.server_success && this.state.submitted_to_server && this.state.error === undefined) return (
            <div className="small-container padding-top padding-bottom">
                <p><em>Sending result to server...</em></p>
                <p><em>Please wait...</em></p>
            </div>
        )

        else if (!this.state.server_success && this.state.submitted_to_server && this.state.error) return (
            <div className="small-container padding-top padding-bottom">
                <h2 style={{ color: 'red' }}>{error}</h2>
                <button onClick={this.handleFormReset}>Try again</button>
            </div>
        )


        else if(this.state.server_success && this.state.submitted_to_server) return (
            <div className="small-container padding-top padding-bottom">
                <p>Success! Result saved to the sever.</p>
                {
                    result.winner === "Draw" ?
                    <p>The result was a {result.winner}.</p>
                    :
                    <p>Winner was: {result.winner} by {result.goal_diff}.</p>   
                }
                <button onClick={this.handleFormReset}>Add another</button>
            </div>
        )

        else return(
            <div className="small-container padding-top padding-bottom">
                <button onClick={this.handleFormReset}>Add Result</button>
            </div>        
        )
    }

}

export default AddResults;