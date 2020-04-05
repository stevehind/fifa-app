import React, { Component } from 'react';

import api from './api';

import H2HTable from './H2HTable';

class H2HPage extends Component {

    constructor(props){
        super(props)

        this.state = {
            players: [],
            table_data: undefined,
            // names: ["Sven", "Doug"],
            e_values: [],
            elos: [],
            submitted: false
        };

        this.submit = this.submit.bind(this);
    }

    extractElos(data) {
        console.log("Data passed to Elo function is: %o", data);

        let elos = data.map(entry => {
            let elo = Object.values(entry)[0].a_Elo;
            return elo;
        })
        
        return elos
    }

    componentDidMount() {
        api.getPlayers(
            (result) => {
                this.setState({players: result.data});
            }
        );
    }

    handleSelectChange = event => {
        const {name,value} = event.target;

        this.setState({
            [name] : value
        });
    }

    calcE(r_list) {
        const arrSum = arr => arr.reduce((a,b) => a + b, 0);
        
        r_list.map(r_value => r_value / arrSum);

    }

    computeWinChance(data, names) {
        const list_of_r = data.map(rating => Math.pow(10, (rating / 400)))

        const sum_of_r = list_of_r.reduce((a,b) => a + b, 0);

        const list_of_e = list_of_r.map(r => r / sum_of_r);

        const rounded_e = list_of_e.map(e => Math.round((e * 100)));

        const formatted_e = rounded_e.map(e => String(e).concat("%"));

        const dummy_list = [0,1];

        const e_and_names = dummy_list.map(i => {
            return names[i].concat(": ").concat(formatted_e[i]);
        });

        const e_and_names_td = e_and_names.map(item => <td className="text-center">{item}</td>);

        return e_and_names_td;
    }

    async submit(ev) {
        ev.preventDefault();

        console.log("Submitted!");

        this.setState({submitted: true});
        let names = [this.state.player_1, this.state.player_2]

        api.getH2HData(names)
        .then(result => {
            console.log("Api call result was: %o",result.data);
            this.setState({table_data: result.data});
            let elos = this.extractElos(result.data);
            this.setState({elos: elos});
        })
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
                        <option>Chose a player...</option>
                        {player_list}    
                    </select>
                        </td>    
                        <td>
                            <label className="text-center">Second player</label>
                        <select
                            name="player_2"
                            value={this.state.player_2}
                            onChange={this.handleSelectChange}>
                            <option>Chose a player...</option>
                            {player_list}    
                        </select>
                        </td>
                    </tr>
                </table>
            </form>
            <button onClick={this.submit}>Calculate!</button>
            {
                this.state.submitted === true ?
                <div>
                <div>
                    <h4>Elo-Implied Win Probabilities in Next Game</h4>
                    {
                        this.state.table_data === undefined || this.state.player_1 === undefined || this.state.player_2 === undefined ? 
                            <p><em>Loading win probabilities...</em></p>
                            :
                            <table>
                            <tr>
                                {this.computeWinChance(this.state.elos, [this.state.player_1, this.state.player_2])}
                            </tr>
                        </table>
                    } 
                </div>
                    <h4>Head to Head Leaderboard</h4>
                    {
                        this.state.table_data === undefined || this.state.player_1 === undefined || this.state.player_2 === undefined ? 
                            <p><em>Loading leaderboard...</em></p>
                            :
                            <H2HTable tableData={this.state.table_data} className="alternate-background"/>    
                    }
                <p>Players are ranked by their <a href='https://en.wikipedia.org/wiki/Elo_rating_system'>Elo rating</a>.</p>
            </div>
                :
                <p>Click "Calculate!" to see stats.</p>
            }
        </div>
    }


}

export default H2HPage;