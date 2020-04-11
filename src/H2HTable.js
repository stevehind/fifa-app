// @flow

import * as React from 'react';

type Props = any;

type TableObjectValues = {
    "a_Elo": number,
    "b_Played": number,
    "c_Wins": number,
    "d_Draws": number,
    "e_Losses": number,
    "f_Pts": number,
    "g_GoalDiff": number
}

type TableObject = {
    [player_name: string] : TableObjectValues
};

type TableObjectList = Array<TableObject>;

class H2HTable extends React.Component<Props> {

    buildHeaders (tableData: TableObjectList) {

        const first_entry_in_list: TableObject = tableData[0];
        const first_entry_values: TableObjectValues = Object.values(first_entry_in_list)[0];
        const keys: Array<string> = Object.keys(first_entry_values);
        // TODO: check whether starts with alpha char + _, and trim off only if it does
        const formatted_headers: Array<string> = keys.map((key: string) => key.substring(2));

        return (
            <tr>
                <th>Name</th>
                {formatted_headers.map((header: string) => <th>{header}</th>)}
            </tr>
        )
    }

    buildRows (tableData: TableObjectList) {
        const rows: Array<any> = tableData.map((player: TableObject) => {
            const player_name: string = Object.keys(player)[0];
            const player_data_values: TableObjectValues = Object.values(player)[0];
            const player_data_values_list: Array<number> = Object.values(player_data_values);
            const formatted_player_data = (input: Array<number>) => {
                return input.map((data: number) => <td>{Math.round(data)}</td>);
            }

            return <tr>
                <td>{player_name}</td>
                {formatted_player_data(player_data_values_list)}
            </tr>
        })    

        return rows;
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

export default H2HTable;