import knex from 'knex';

export async function seed(Knex: knex){
 await Knex('team').insert([

    {name: 'TimeA', score: 0, victories: 0, defeats: 0, ties: 0, goals_difference: 0, goals_for: 0, goals_against: 0},
    {name: 'TimeB', score: 0, victories: 0, defeats: 0, ties: 0, goals_difference: 0, goals_for: 0, goals_against: 0},
    {name: 'TimeC', score: 0, victories: 0, defeats: 0, ties: 0, goals_difference: 0, goals_for: 0, goals_against: 0},
    {name: 'TimeD', score: 0, victories: 0, defeats: 0, ties: 0, goals_difference: 0, goals_for: 0, goals_against: 0},

 ]);
}