import Knex from '../database/connection';
import { Request, Response } from 'express';

class usersController{

    async index (request: Request, response: Response) {

        const users = await Knex('users').select('*');
    
        const serializedUsers = users.map((user) => {
            return {
                id: user.id,
                name: user.name,
            };
        });
    
        return response.json(serializedUsers);
    }

}

export default usersController;