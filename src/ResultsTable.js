import React, { Component } from 'react';

class ResultsTable extends Component {

    buildHeaders (tableData) {
        const first_entry_in_list = tableData[0];

        const keys = Object.keys(first_entry_in_list);

        return (
            <tr>
                {keys.map(header => <th>{header}</th>)}
            </tr>
        )

        // {
        //     away: "Woolgar",
        //     away_score: 2,
        //     comment: "Silly red for Griezmann",
        //     goal_diff: 1,
        //     home: "Art",
        //     home_score: 3,
        //     report_time: "2020-04-04T14:11:19Z",
        //     winner: "Art"
        //     }

    }

    buildRows (tableData) {
        return tableData.map(player => {

            // dict
            const player_data = Object.values(player);

            // list
            const player_data_values = Object.values(player_data)[0];
            const player_data_values_list = Object.values(player_data_values);

            // list of <td>s
            const formatted_player_data = (input) => {
                return input.map(data => <td>{Math.round(data)}</td>);
            }

            return <tr>
                {formatted_player_data(player_data_values_list)}
            </tr>
        })    
    }

    render() {

        return(
            <div>
                <table>
                    <thead>{this.buildHeaders(this.props.tableData)}</thead>
                    <tbody>{this.buildRows(this.props.tableData)}</tbody>
                </table>
            </div>
        );
    }  

}

export default ResultsTable;