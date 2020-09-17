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

      /*const points = await Knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        return response.json(points);*/

        /*static async store(request: Request, response: Response, next: NextFunction) {

            try {
    
                io.emit('status', 'update')
    
                const { id } = request.params
    
                const {
                    name,
                    email,
                    tel,
                    coffee,
                    qtd,
                    status
    
                } = request.body
    
                const item = {
    
                    name,
                    email,
                    tel,
                    coffee,
                    qtd,
                    status
                }
    
                const update = await Knex('requests')
                    .update(item)
                    .where({ id })
    
                if (!update) {
    
                    return response.status(400).json({ message: 'Bad Request' })
    
                }
    
                return response.status(201).json({ message: 'request update successful' })
    
            } catch (err) {
                next(err)
            }
        }
    
        /*static async destroy(request: Request, response: Response, next: NextFunction) {
    
            try {
    
                io.emit('status', 'delete')
    
                const { id } = request.params
    
                const del = await Knex('requests')
                    .del()
                    .where({ id })
    
                if (!del) {
                    return response.status(404).json({ message: 'Not found' })
                }
    
                return response.status(200).json({ message: 'request delete successful' })
    
            } catch (err) {
                next(err)
            }
        }
    
        return response.json(serializedMatch);
    }*/


}

export default UsersController;