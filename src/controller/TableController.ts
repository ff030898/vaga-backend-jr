
import Knex from '../database/connection';
import { Request, Response } from 'express';

class TableController{
async index (request: Request, response: Response) {

        const team = await Knex('team')
        .select('*')
        .orderBy('score', 'desc')
        .orderBy('victories', 'desc')
        .orderBy('goals_against', 'desc')
        .orderBy('goals_for', 'desc')
        .orderBy('name');
        
        return response.status(200).json(team);
    

    }

} 
export default TableController;
