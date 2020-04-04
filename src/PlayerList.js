import React, { Component } from 'react';

import api from './api';

import ResultsTable from './ResultsTable';

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
            }
        )
    }

    render(){

        const player_list = this.state.players
            .map(player => 
                <li>{player.name}: {player.ps_handle}</li>
            );

        const arb_data = [
            {
                Sven: {
                a_Elo: 1324.650054363156,
                b_Played: 24,
                c_Wins: 15,
                d_Draws: 5,
                e_Losses: 4,
                f_Pts: 50,
                g_GoalDiff: 26
                }
            }]

        return(
                <div className='small-container'>
                    <h3>Players and their PS4 handles:</h3>
                    <div>
                        <ul className='text-left'>
                            {player_list}
                        </ul>
                    </div>
                    <div>
                        <ResultsTable tableData={arb_data}/>
                    </div>
                </div>
        )}

}

export default PlayerList;