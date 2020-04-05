import React, { Component } from 'react';

class LeaderboardTable extends Component {

    buildHeaders (tableData) {
        const first_entry_in_list = tableData[0];

        const entry_values = Object.values(first_entry_in_list)[0];

        const keys = Object.keys(entry_values);

        // TODO: check whether starts with alpha char + _, and trim off only if it does
        const formatted_headers = keys.map(key => key.substring(2));

        return (
            <tr>
                <th>Name</th>
                {formatted_headers.map(header => <th>{header}</th>)}
            </tr>
        )
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
                <td>{Object.keys(player)[0]}</td>
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

export default LeaderboardTable;