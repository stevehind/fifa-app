import React, { Component } from 'react';

import api from './api';

import ResultsTable from './LeaderboardTable';

class ResultsPage extends Component {

    constructor(props){
        super(props)

        this.state = {
            table_data: undefined,
            clicked: false
        }
    }

    componentDidMount(){
        api.getResultsListData(
            (result) => {
                this.setState({table_data: result.data});
            }
        );
    }

    handleReveal = (event) => {
        event.preventDefault();
        this.setState({clicked: true})
    }

    handleHide = (event) => {
        event.preventDefault();
        this.setState({clicked: false})
    }

    render() {

        if (this.state.clicked) {
            return <div className='small-container'>
            <button onClick={this.handleHide}>Hide Results</button>
            <h2>All Results</h2>
            {this.state.table_data === undefined ? 
                <p><em>Loading results...</em></p>
                :
                <ResultsTable tableData={this.state.table_data}/>    
            }
            </div>
        } else {
            return <div className="small-container padding-top padding-bottom">
                <button onClick={this.handleReveal}>View all Results</button>
            </div> 
        }
    }
}

export default ResultsPage;