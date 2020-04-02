import React, { Component } from 'react';

import api from './api';

class AddResults extends Component {

    constructor(props){
        super(props)

        this.state = {
            clicked: false,
            players: [],
            submitted: null,
            error: null,
            result: null,
            clubs: null
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
        )
    }

    handleTypedChange = event => {
        const {name,value} = event.target;

        this.setState({
            [name] : value
        });
    }

    handleSelectChange = event => {
        const {name,value} = event.target;

        this.setState({
            [name] : value
        });
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
            comment: this.state.comment
        }

        api.addResult(body)
        .then(response => {
            if (response.error) {
                this.setState({
                    submitted: false,
                    error: response.error.message
                });
                console.log(response);
            } else {
                this.setState({
                    submitted: true,
                    result: response.body
                })
                console.log(response);
            }
        })
        .catch(err => console.log(err))
    }

    handleReveal = (event) => {
        event.preventDefault();
        this.setState({
            clicked: true,
            submitted: null,
            home: null,
            home_score: null,
            away: null,
            away_score: null,
            comment: null
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

        console.log(this.state.players);
        console.log(player_list);
        console.log(this.state.clubs);

        // const clubs_list = this.state.clubs
        // .map(club => 
        //      <option>{club.name}</option>
        // );   
            
        // console.log(clubs_list);

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
                                <option>Chose a player...</option>
                                {player_list}    
                        </select>
                        <label>Team</label>
                        <select
                            name="home_team"
                            value={home_team}
                            onChange={this.handleSelectChange}>
                                <option>Chose a team...</option>
                                
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
                                <option>Chose a player...</option>
                                {player_list}    
                        </select>
                        <label>Team</label>
                        <select
                            name="away_team"
                            value={away_team}
                            onChange={this.handleSelectChange}>
                                <option>Chose a team...</option>
                            
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
                <button onClick={this.submit}>Add!</button>
                {this.state.submitted === false && 
                    <p style={{ color: 'red' }}>{error}</p>
                }
            </div>
        )

        else if(this.state.submitted) return (
            <div className="small-container">
                <p>There was a result</p>
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