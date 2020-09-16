import knex from 'knex';

export async function seed(Knex: knex){
 await Knex('users').insert([

    {name: 'Administrador', email: 'admin@gmail.com', password: '12345678'}

 ]);
}