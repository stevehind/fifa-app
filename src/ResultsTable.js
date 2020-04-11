import React, { Component } from 'react';

class ResultsTable extends Component {

    buildHeaders (tableData) {
        const first_entry_in_list = tableData[0];

        const keys = Object.keys(first_entry_in_list);

        return (
            <tr>
                {keys.map(header => {
                    return <th>{header}</th>
                })}
            </tr>
        )
    }

    buildRows (tableData) {
        return tableData.map(result => {

            // dict
            const result_data = Object.values(result);

            // list of <td>s
            const formatted_player_data = (input) => {
                return input.map(data => <td>{data}</td>);
            }

            return <tr>
                {formatted_player_data(result_data)}
            </tr>
        })    
    }

    render() {

        return(
            <div className="small-container">
                <table>
                    <thead>{this.buildHeaders(this.props.tableData)}</thead>
                    <tbody>{this.buildRows(this.props.tableData)}</tbody>
                </table>
            </div>
        );
    }  

}

export default ResultsTable;