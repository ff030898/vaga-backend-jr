import Knex from 'knex';

//CRIAR A TABELA
export async function up(knex: Knex){

    return knex.schema.createTable('team', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('score').notNullable();
    table.integer('victories').notNullable();
    table.integer('defeats').notNullable();
    table.integer('ties').notNullable();
    table.integer('goals_difference').notNullable();
    table.integer('goals_for').notNullable();
    table.integer('goals_against').notNullable();
    });
}

//DELETAR A TABELA OU VOLTAR ATRÁS
export async function down(knex: Knex){
    return knex.schema.dropTableIfExists('team');
}