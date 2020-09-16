import express, { request, response } from 'express';
import UserController from './controller/UsersController';


const routes = express.Router();
const userController = new UserController();


routes.get('/user', userController.index);
//routes.post('/user', userController.create);
//routes.get('/user/:id', userController.show);


export default routes;