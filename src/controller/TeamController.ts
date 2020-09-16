import Knex from '../database/connection';
import { Request, Response } from 'express';

class TeamController{

    async index (request: Request, response: Response) {

        const team = await Knex('team').select('*');
    
        const serializedTeam = team.map((team) => {
            return {
                id: team.id,
                name: team.name,
            };
        });
    
        return response.json(serializedTeam);
    }

}

export default TeamController;