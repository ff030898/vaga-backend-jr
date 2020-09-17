import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayLoad {
    id: string;
    iat: number;
    exp: number;
}
class authMiddleware {

    async authenticate(request: Request, response: Response, next: NextFunction) {

        try {

            const {authorization} = request.headers;


            if(!authorization){

                return response.status(401).json({ message: 'Not Authorization' })
            }

            const token = authorization.replace('Bearer', '').trim();

            const data = jwt.verify(token, 'secret');

            const { id } = data as TokenPayLoad;

            request.userId = id;

            return next();


        } catch (err) {
            return response.status(401).json({ message: 'Error Not Authorization' })
        }

    }

}


export default authMiddleware;