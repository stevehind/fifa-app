import React, { Component } from 'react';

import api from './api';

class PlayerList extends Component {

    constructor(props){
        super(props)

        this.state = {
            players: [],
            clicked: false
        }
    }

    componentDidMount(){
        api.getPlayers(
            (result) => {
                this.setState({players: result.data});
            }
        )
    }

    handleReveal = (event) => {
        event.preventDefault();
        this.setState({clicked: true})
    }

    handleHide = (event) => {
        event.preventDefault();
        this.setState({clicked: false})
    }

    render(){

        const player_list = this.state.players
            .map(player => {
                return <tr>
                    <td>{player.name}</td>
                    <td>{player.ps_handle}</td>
                </tr>
            });

        if (this.state.clicked) {
            return(
                <div className='small-container'>
                    <button onClick={this.handleHide}>Hide Players</button>
                    <h3>Players and their PS4 handles:</h3>
                    <tr>
                        <th>Player</th>
                        <th>PS4 Handle</th>
                    </tr>
                    {player_list}
                </div>
            )
        }   else 
        {
            return <div className="small-container padding-bottom">
            <button onClick={this.handleReveal}>View Players</button>
            </div> 
        } 

    }
}

export default PlayerList;