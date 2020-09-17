import express from 'express';
import AuthMiddleware from './middleware/authMiddleware';
import MatchController from './controller/MatchController';
import TeamController from './controller/TeamController';
import UserController from './controller/UsersController';
import AuthController from './controller/AuthController';


const routes = express.Router();
const userController = new UserController();
const teamController = new TeamController();
const matchController = new MatchController();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();


//Rota de autenticação
routes.get('/auth', authController.authenticate);

//Protegendo as rotas com middlewares
routes.use(authMiddleware.authenticate);

//Rotas dos Usuários
routes.get('/user', userController.index);
routes.post('/user', userController.create);
//routes.get('/user/:id', userController.show);

//Rotas dos Times
routes.get('/team', teamController.index);

//Rotas das partidas
routes.get('/match', matchController.index);


export default routes;