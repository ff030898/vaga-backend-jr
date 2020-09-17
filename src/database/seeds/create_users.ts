import knex from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(Knex: knex){

 const password = bcrypt.hashSync('12345678', 8);

 await Knex('users').insert([

    {name: 'Administrador', email: 'admin@gmail.com', password: password}

 ]);
}