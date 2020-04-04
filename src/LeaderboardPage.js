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
    }

    render() {

        return <div className='small-container'>
            <h2>Leaderboard</h2> 
            <p>Players are ranked by their <a href='https://en.wikipedia.org/wiki/Elo_rating_system'>Elo rating</a>.</p>
            {this.state.table_data === undefined ? 
                <p><em>Loading leaderboard...</em></p>
                :
                <LeaderboardTable tableData={this.state.table_data}/>    
            }
        </div>
    }
}

export default LeaderboardPage;