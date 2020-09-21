import Knex from '../database/connection';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

class UsersController {

    async index(request: Request, response: Response, next: NextFunction) {

        try {

            const users = await Knex('users').select('*');

            const serializedUsers = users.map((user) => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
            });

            if (serializedUsers.length == 0) {
                return response.status(404).json({ message: 'Not found' })
            }

            return response.status(200).json(serializedUsers)


        } catch (err) {
            next(err)
        }

    }


    async create(request: Request, response: Response, next: NextFunction) {

        try {

            const {name, email, password} = request.body;

            const password2 = bcrypt.hashSync(password, 8);

            const user = {

                name,
                email,
                password: password2
            }


            const users = await Knex('users').where('email', email).first();

            if(users){
                return response.status(401).json({ message: 'User already exists' })
            }

            await Knex('users').insert(user)

            return response.status(201).json({ message: 'User create successful' })

        } catch (err) {
            next(err)
        }

    }

}

export default UsersController;