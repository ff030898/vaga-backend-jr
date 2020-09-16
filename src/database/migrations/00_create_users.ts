import Knex from 'knex';

//CRIAR A TABELA
export async function up(knex: Knex){

    return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    });
}

//DELETAR A TABELA OU VOLTAR ATRÁS
export async function down(knex: Knex){
    return knex.schema.dropTableIfExists('users');
}