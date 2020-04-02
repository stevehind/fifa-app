import React, { Component } from 'react';

import api from './api';

class PlayerList extends Component {

    constructor(props){
        super(props)

        this.state = {
            players: []
        }
    }

    componentDidMount(){
        api.getPlayers(
            (result) => {
                this.setState({players: result.data});
                console.log(result.data);
            }
        )
    }

    render(){

        const player_list = this.state.players
            .map(player => 
                <li>{player.name}: {player.ps_handle}</li>
            );

        return(
                <div className='small-container'>
                    <h3>Players and their PS4 handles:</h3>
                    <div>
                        <ul className='text-left'>
                            {player_list}
                        </ul>
                    </div>
                </div>
        )}

}

export default PlayerList;