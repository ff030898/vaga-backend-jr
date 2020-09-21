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


    async create(request: Request, response: Response) {

        const {
            name,
        } = request.body

        const team = {

            name,
            score: 0,
            victories: 0,
            defeats: 0,
            ties: 0,
            goals_difference: 0,
            goals_for: 0,
            goals_against: 0
          
        }

        const teamExist = await Knex('team').where("name", name);
        const allTeams = await Knex('team').select('*');

        if(teamExist.length > 0){
            return response.status(401).json({ error: 'This team already exists!' });
        }

        if(allTeams.length == 4){
            return response.status(401).json({ error: 'All 4 teams have already been registered!' });
        }


        await Knex('team').insert(team);

        return response.status(201).json({ message: 'Team create successful' });
    }


}

export default TeamController;