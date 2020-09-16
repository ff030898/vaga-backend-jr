import Knex from '../database/connection';
import { Request, Response } from 'express';

class MatchController{

    async index (request: Request, response: Response) {

        const match = await Knex('matches').select('*');
    
        const serializedMatch = match.map((match) => {
            return {
                id: match.id,
                name: match.name,
            };
        });
    
        return response.json(serializedMatch);
    }

}

export default MatchController;