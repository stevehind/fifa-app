import React, { Component } from 'react';

import api from './api';

import ResultsTable from './ResultsTable';

class ResultsPage extends Component {

    constructor(props){
        super(props)



    }

    componentDidMount(){
        api.getTable(
            (result) => {
                this.setState({table_data: result.data});
            }
        );
    }

    render() {

        return <div>
            <h2>This is the table</h2> 
            {this.state.table_data === undefined ? 
                <p>Loading table</p>
                :
                <p>State isn't undefined!</p>
                // <ResultsTable tableData={this.state.table_data}/>    
            }
        </div>
    }
}