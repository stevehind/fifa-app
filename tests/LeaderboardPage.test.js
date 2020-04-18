// boilerplate from https://reactjs.org/docs/testing-recipes.html

import React from 'react';
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import LeaderboardPage from '../src/LeaderboardPage';
import api from '../src/api';
import { shallow } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-15";

import type { TableObjectList } from '../src/api';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const tableData = {data: [
  {
    "Richard": {
      "a_Elo": 1311.1326181180661,
      "b_Played": 15,
      "c_Wins": 13,
      "d_Draws": 2,
      "e_Losses": 0,
      "f_Pts": 41,
      "g_GoalDiff": 37
    }
  },
  {
    "Steve": {
      "a_Elo": 1225.1922711552636,
      "b_Played": 74,
      "c_Wins": 43,
      "d_Draws": 12,
      "e_Losses": 19,
      "f_Pts": 141,
      "g_GoalDiff": 89
    }
  },
  {
    "Sven": {
      "a_Elo": 1082.6403783090068,
      "b_Played": 62,
      "c_Wins": 32,
      "d_Draws": 10,
      "e_Losses": 20,
      "f_Pts": 106,
      "g_GoalDiff": 36
    }
  },
  {
    "Vince": {
      "a_Elo": 1077.6163474190507,
      "b_Played": 21,
      "c_Wins": 12,
      "d_Draws": 3,
      "e_Losses": 6,
      "f_Pts": 39,
      "g_GoalDiff": 23
    }
  },
  {
    "Ben": {
      "a_Elo": 1034.9086896591327,
      "b_Played": 70,
      "c_Wins": 24,
      "d_Draws": 13,
      "e_Losses": 33,
      "f_Pts": 85,
      "g_GoalDiff": -51
    }
  },
  {
    "Robin": {
      "a_Elo": 979.8158639517893,
      "b_Played": 17,
      "c_Wins": 6,
      "d_Draws": 2,
      "e_Losses": 9,
      "f_Pts": 20,
      "g_GoalDiff": -9
    }
  },
  {
    "Steen": {
      "a_Elo": 955.4961200354534,
      "b_Played": 6,
      "c_Wins": 2,
      "d_Draws": 2,
      "e_Losses": 2,
      "f_Pts": 8,
      "g_GoalDiff": 1
    }
  },
  {
    "Doug": {
      "a_Elo": 944.2866904798475,
      "b_Played": 53,
      "c_Wins": 21,
      "d_Draws": 12,
      "e_Losses": 20,
      "f_Pts": 75,
      "g_GoalDiff": 9
    }
  },
  {
    "Woolgar": {
      "a_Elo": 832.3092129369752,
      "b_Played": 32,
      "c_Wins": 6,
      "d_Draws": 5,
      "e_Losses": 21,
      "f_Pts": 23,
      "g_GoalDiff": -38
    }
  },
  {
    "Art": {
      "a_Elo": 800.1498354991973,
      "b_Played": 38,
      "c_Wins": 13,
      "d_Draws": 5,
      "e_Losses": 20,
      "f_Pts": 44,
      "g_GoalDiff": -30
    }
  },
  {
    "PAUL": {
      "a_Elo": 756.4519724362179,
      "b_Played": 46,
      "c_Wins": 8,
      "d_Draws": 8,
      "e_Losses": 30,
      "f_Pts": 32,
      "g_GoalDiff": -67
    }
  },
  {
    "Mushy": {
      "a_Elo": 0.0,
      "b_Played": 0,
      "c_Wins": 0,
      "d_Draws": 0,
      "e_Losses": 0,
      "f_Pts": 0,
      "g_GoalDiff": 0
    }
  }
]};

const kotlData = {data: {
  kotl_is: "Richard",
  on_top_for_hrs: 108,
  title_defended_for_games: 14
  }};

// describe('rendering', () => {

//   let wrapper, getLeaderboardTableData

//   beforeEach(() => {
//     props = { table_data: []}
//     api.getLeaderboardTableData = sinon.stub(props, tableData);
//   })

//   it('ComponentDidMount', () => {
//     wrapper = shallow(<LeaderboardPage />)

//     expect(api.getLeaderboardTableData.calledOnce).toBe(true);
//   })
// })

// it("is fed KOTL and leaderboardTable data and displays it", () => {

//     // jest.spyOn(api, 'getKOTLData').mockImplementation(() => 
//     //   Promise.resolve({
//     //       kotlData
//     //   })
//     // );

//     // jest.spyOn(api, 'getLeaderboardTableData').mockImplementation(() => 
//     //   Promise.resolve({
//     //     tableData
//     //   })  
//     // );

//     act(() => {
//         render(<LeaderboardPage />, container)
//     });

//     console.log(container?.innerHTML);

//     expect(container?.getElementsByClassName("the-kotl-row")[0]).toBe(kotlData.data.kotl_is);
//     expect(container?.getElementsByClassName("leaderboardtable")[0]).toContain("foo bar");
// });

it("Renders a kotl object, given kotl data", () => {
  // const rendered_div = generate_kotl_div(kotlData);
  const renderedDiv = (new LeaderboardPage()).generate_kotl_div(kotlData.data);
  
  act(() => {
    render(renderedDiv, container)
  })

  expect(container?.getElementsByClassName("kotl-section")[0].innerHTML).toMatch(kotlData.data.kotl_is);
  expect(container?.getElementsByClassName("kotl-section")[0].innerHTML).toMatch("They have defended their title for "+kotlData.data.title_defended_for_games+" games and "+kotlData.data.on_top_for_hrs+" hours.");
})