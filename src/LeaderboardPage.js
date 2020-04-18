import React, { Component } from 'react';

import api from './api';

import LeaderboardTable from './LeaderboardTable';

class LeaderboardPage extends Component {

    constructor(props){
        super(props)

        this.state = {
            table_data: undefined
        }
    }

    componentDidMount(){
        api.getLeaderboardTableData(
            (result) => {
                this.setState({table_data: result.data});
            }
        );

        api.getKOTLData(
            (result) => {
                this.setState({kotl_data: result.data})
            }
        )
    }

    generate_kotl_div (kotlData) {
        return (
            <div className="kotl-section">
                <h4><b>{kotlData.kotl_is}</b> is the The King of the Lounge.</h4>
                <p>They have defended their title for {kotlData.title_defended_for_games} games and {kotlData.on_top_for_hrs} hours.</p>
            </div>
        )
    }


    render() {

        return <div className='small-container'>
            <h2>Leaderboard</h2>
            {this.state.kotl_data === undefined ?
                <p><em>Loading King of the Lounge...</em></p>
                :
                this.generate_kotl_div(this.state.kotl_data)
            } 
            {this.state.table_data === undefined ? 
                <p><em>Loading leaderboard...</em></p>
                :
                <LeaderboardTable tableData={this.state.table_data} className="leaderboardtable"/>    
            }
            <p>Players are ranked by their <a href='https://en.wikipedia.org/wiki/Elo_rating_system'>Elo rating</a>.</p>
        </div>
    }
}

export default LeaderboardPage;