import knex from 'knex';

export async function seed(Knex: knex){
 await Knex('matches').insert([

    //Partidas do time 1
    {team1_id: 1, goals_team1: 3, team2_id: 2, goals_team2: 0, winner: 1},
    {team1_id: 1, goals_team1: 1, team2_id: 3, goals_team2: 1, winner: 0},
    {team1_id: 1, goals_team1: 1, team2_id: 4, goals_team2: 0, winner: 1},

    //Partidas do time 2
    {team1_id: 2, goals_team1: 5, team2_id: 1, goals_team2: 2, winner: 1},
    {team1_id: 2, goals_team1: 2, team2_id: 3, goals_team2: 3, winner: 2},
    {team1_id: 2, goals_team1: 2, team2_id: 4, goals_team2: 2, winner: 0},

    //Partidas do time 3
    {team1_id: 3, goals_team1: 5, team2_id: 1, goals_team2: 2, winner: 1},
    {team1_id: 3, goals_team1: 4, team2_id: 2, goals_team2: 1, winner: 1},
    {team1_id: 3, goals_team1: 3, team2_id: 4, goals_team2: 2, winner: 1},

    //Partidas do time 4
    {team1_id: 4, goals_team1: 2, team2_id: 1, goals_team2: 2, winner: 0},
    {team1_id: 4, goals_team1: 4, team2_id: 2, goals_team2: 4, winner: 0},
    {team1_id: 4, goals_team1: 3, team2_id: 3, goals_team2: 2, winner: 2}


 ]);
}