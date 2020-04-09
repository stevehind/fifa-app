import React, { Component } from 'react';

import api from './api';

const CHOSE_A_PLAYER_DEFAULT = "Chose a player..."

class AddResults extends Component {

    constructor(props){
        super(props)

        this.state = {
            clicked: false,
            players: [],
            submitted: null,
            clubs: []
        }

        this.submit = this.submit.bind(this);
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

    resultLoaded = state => {
        if (state.result === undefined && state.error === undefined) {
            return false
        } else
            return true
    }

    getFormData = object => Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
    }, new FormData());


    async submit(ev) {
        ev.preventDefault();

        let body = {
            home : this.state.home,
            home_score: this.state.home_score,
            away: this.state.away,
            away_score: this.state.away_score,
            // uncomment below for development
            //comment: "dev-test"
            comment: this.state.comment
        }

        let error_message = "Error: didn't post to server. Make sure you've provided two different players' names, and two scores."

        api.addResult(body)
        .then(response => {
            if (response.error) {
                this.setState({
                    submitted: false,
                    error: error_message
                });
                console.log(`The error response was: %o`,response);
            } else {
                this.setState({
                    submitted: true,    
                    result: response
                })
                console.log(`Result logged to the server: %o`,response);
            }
        })
        .catch(err => {
            console.log(`The error response was: %o`,err);
            this.setState({
                submitted: false,
                error: error_message
            })
        });
    }

    handleReveal = (event) => {
        event.preventDefault();
        this.setState({
            clicked: true,
            submitted: null,
            home: undefined,
            home_score: undefined,
            away: undefined,
            away_score: undefined,
            comment: undefined
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

        if(this.state.clicked && !this.state.submitted) return (
            
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
                    <button onClick={this.submit}>Add result!</button>
                    :
                    <button onClick={this.submit} className="muted-button" disabled={true}>Fill out the form!</button>
                }
                <div>
                    {this.state.submitted === false && 
                    <h2 style={{ color: 'red' }}>{error}</h2>
                    }
                </div>

            </div>
        )

        else if(this.state.submitted && !this.resultLoaded(this.state)) return (
            <div className="small-container padding-top padding-bottom">
                <p><em>Sending result to server...</em></p>
                <p><em>Please wait...</em></p>
            </div>
        )

        else if(this.state.submitted && this.resultLoaded(this.state)) return (
            <div className="small-container padding-top padding-bottom">
                <p>Success! Result saved to the sever.</p>
                <p>Winner was: {result.winner} by {result.goal_diff}.</p>
                <button onClick={this.handleReveal}>Add another</button>
            </div>
        )

        else return(
            <div className="small-container padding-top padding-bottom">
                <button onClick={this.handleReveal}>Add Result</button>
            </div>        
        )
    }

}

export default AddResults;