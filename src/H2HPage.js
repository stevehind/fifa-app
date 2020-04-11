// @flow

import * as React from 'react';
import { Component } from 'react';
import api from './api';
import H2HTable from './H2HTable';
import type { TableObjectList, TableObject } from './H2HTable';

type Elo = {
    name: string,
    elo: number
};

type Elos = Array<Elo>;

type PlayerObject = {
    name: string,
    ps_handle: string
};

type PlayerObjectList = Array<PlayerObject>;

type AxiosResponse<DataType> = {
    data: DataType,
    status: number,
    statusText: string,
    headers: any,
    config: any,
    request: any
};

type PairOfRatings = [number, number];

type PairOfNames = [string, string];

type PairOfR = [number, number];

type PairOfE = [number, number];

type PairOfEStrings = [string, string];

type PairOfNameAndWinPct = [string, string];

type PairOfWinPctTDs = [React.Element<'td'>, React.Element<'td'>]

type State = {
    players: PlayerObjectList,
    table_data: TableObjectList,
    e_values: Array<number>,
    elos: Elos,
    submitted: boolean,
    player_1?: ?string,
    player_2?: ?string
};

type Props = {};

const CHOSE_A_PLAYER_DEFAULT: string = "Chose a player..."

class H2HPage extends Component<Props, State> {

    constructor(props: Props){
        super(props)

        // how to declare a type for this.state?
        this.state = {
            players: [],
            table_data: [],
            e_values: [],
            elos: [],
            submitted: false
        };

        // https://github.com/facebook/flow/issues/5874
        // $FlowFixMe
        this.submit = this.submit.bind(this);
    }

    extractElos(data: TableObjectList) {
        let elos: Elos = data.map((entry: TableObject) => {
            let elo: Elo = {
                name: Object.keys(entry)[0],
                // $FlowFixMe
                elo: Object.values(entry)[0].a_Elo
            };
            return elo;
        })
        return elos
    }

    componentDidMount() {
        api.getPlayers(
            (result: AxiosResponse<PlayerObjectList>) => {
                this.setState({players: result.data});
            }
        );
    }

    handleSelectChange = (event: SyntheticEvent<HTMLSelectElement>) => {
        // $FlowFixMe
        const {name,value} = event.target;

        if (value === CHOSE_A_PLAYER_DEFAULT) {
            this.setState({
                [name] : undefined
            })
        } else {
            this.setState({
                [name] : value
            });
        }
    }

    computeWinChance(names: PairOfNames, data: PairOfRatings): PairOfWinPctTDs{
        console.log("Data are: %o", data);
        console.log("names are: %o", names);

        // $FlowFixMe
        const list_of_r: PairOfR = data.map((rating: number) => Math.pow(10, (rating / 400)))

        const sum_of_r: number = list_of_r.reduce((a: number, b: number) => a + b, 0);

        // $FlowFixMe
        const list_of_e: PairOfE = list_of_r.map((r: number) => r / sum_of_r);

        // $FlowFixMe
        const rounded_e: PairOfE = list_of_e.map((e: number) => Math.round((e * 100)));

        // $FlowFixMe
        const formatted_e: PairOfEStrings = rounded_e.map((e: number) => String(e).concat("%"));

        const dummy_list: Array<number> = [0,1];

        // $FlowFixMe   
        const e_and_names: PairOfNameAndWinPct = dummy_list.map((i: number) => {
            return names[i].concat(": ").concat(formatted_e[i]);
        });

        // $FlowFixMe
        return e_and_names.map(item => <td className="text-center">{item}</td>);
    }

    notReadyToLoadResult (elos: ?Elos, table_data: ?TableObjectList, player_1: ?string, player_2: ?string): boolean {
        // $FlowFixMe
        if (elos === undefined || table_data === undefined || player_1 === undefined || player_2 === undefined || elos.length === 0 ) {
            return true
        } else {
            return false
        }
    }

    async submit(ev: SyntheticEvent<>) {
        ev.preventDefault();

        this.setState({submitted: true});
        
        if (this.state.player_1 && this.state.player_2) {
            let names: PairOfNames = [this.state.player_1, this.state.player_2]

            api.getH2HData(names)
            .then((result: AxiosResponse<TableObjectList>) => {
                this.setState({table_data: result.data});
                let elos = this.extractElos(result.data);
                this.setState({elos: elos});
            })
        } 
    }

    render() {

        const player_list = this.state.players
        .map(player => 
            <option>{player.name}</option>
        );

        return <div className='small-container'>
            <h2>Head to Head Stats</h2>
            <form onSubmit={this.submit}>
                <table>
                    <tr>
                        <td>
                            <label className="text-center">First player</label>
                            <select
                                name="player_1"
                                value={this.state.player_1}
                                onChange={this.handleSelectChange}>
                                <option>{CHOSE_A_PLAYER_DEFAULT}</option>
                                {player_list}    
                            </select>
                        </td>    
                        <td>
                            <label className="text-center">Second player</label>
                            <select
                                name="player_2"
                                value={this.state.player_2}
                                onChange={this.handleSelectChange}>
                                <option>{CHOSE_A_PLAYER_DEFAULT}</option>
                                {player_list}    
                            </select>
                        </td>
                    </tr>
                </table>
            </form>
            {
                ((this.state.player_1 === undefined) || (this.state.player_2 === undefined)) ?
                    <button
                        className="muted-button"
                        onClick={this.submit}
                        disabled={((this.state.player_1 === undefined) || (this.state.player_2 === undefined))}
                    >Choose two players</button>
                :
                    <button
                        className="button"
                        onClick={this.submit}
                        disabled={((this.state.player_1 === undefined) || (this.state.player_2 === undefined))}
                    >Calculate!</button>
            }
            {
                this.state.submitted === true ?
                    <div>
                        <div>
                            <h4>Elo-Implied Win Probabilities in Next Game</h4>
                            {
                                this.notReadyToLoadResult(this.state.elos, this.state.table_data, this.state.player_1, this.state.player_2) ?
                                    <p><em>Loading win probabilities...</em></p>
                                :
                                    <table>
                                        <tr>
                                            {this.computeWinChance(
                                                // $FlowFixMe
                                                Object.values(this.state.elos).map((value: Elo) => value.name),
                                                // $FlowFixMe
                                                Object.values(this.state.elos).map((value: Elo) => value.elo)
                                            )}
                                        </tr>
                                    </table>
                            } 
                            <h4>Head to Head Leaderboard</h4>
                            {
                                this.notReadyToLoadResult(this.state.elos, this.state.table_data, this.state.player_1, this.state.player_2) ? 
                                    <p><em>Loading leaderboard...</em></p>
                                :
                                    <H2HTable tableData={this.state.table_data} className="alternate-background"/>    
                            }
                            <p>Players are ranked by their <a href='https://en.wikipedia.org/wiki/Elo_rating_system'>Elo rating</a>.</p>
                        </div>
                    </div>
                :
                <p>Choose two players and then click "Calculate!" to see stats.</p>
            }
        </div>
    }


}

export default H2HPage;