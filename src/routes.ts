import express, { request, response } from 'express';
import MatchController from './controller/MatchController';
import TeamController from './controller/TeamController';
import UserController from './controller/UsersController';


const routes = express.Router();
const userController = new UserController();
const teamController = new TeamController();
const matchController = new MatchController();


routes.get('/user', userController.index);
//routes.post('/user', userController.create);
//routes.get('/user/:id', userController.show);

routes.get('/team', teamController.index);

routes.get('/match', matchController.index);


export default routes;