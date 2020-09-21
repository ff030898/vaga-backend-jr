import Knex from 'knex';

//CRIAR A TABELA
export async function up(knex: Knex){

    return knex.schema.createTable('matches', table => {
    table.increments('id').primary();

    table.integer('team1_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('team');

    table.integer('goals_team1').notNullable();

    table.integer('team2_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('team');

    table.integer('goals_team2').notNullable();
    table.integer('round').notNullable();
    table.integer('winner').notNullable();

    });
}

//DELETAR A TABELA OU VOLTAR ATRÁS
export async function down(knex: Knex){
    return knex.schema.dropTableIfExists('matches');
}