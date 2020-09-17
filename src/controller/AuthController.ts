import Knex from '../database/connection';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
class AuthController {

    async authenticate(request: Request, response: Response, next: NextFunction) {

        try {

            const {email, password} = request.body;


            const user = {
                email,
                password
            }


            const users = await Knex('users').where('email', email).first();

            if(!users){

                return response.status(401).json({ message: 'User already not exists' })
            }

            const isValidPassword = await bcrypt.compare(password, users.password);

            if(!isValidPassword){
                return response.status(401).json({ message: 'Incorrect password' })
            }


            const token = jwt.sign({id: users.id}, 'secret', {expiresIn: '1d'});

            return response.status(201).json({ user, token })

            
        } catch (err) {
            next(err)
        }

    }

}


export default AuthController;