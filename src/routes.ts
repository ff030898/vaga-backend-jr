import express from 'express';
import AuthMiddleware from './middleware/authMiddleware';
import MatchController from './controller/MatchController';
import TeamController from './controller/TeamController';
import UserController from './controller/UsersController';
import AuthController from './controller/AuthController';
import TableController from './controller/TableController';


const routes = express.Router();
const userController = new UserController();
const teamController = new TeamController();
const matchController = new MatchController();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();
const tableController = new TableController();


//Rota de autenticação
routes.get('/auth', authController.authenticate);

//Protegendo as rotas com middlewares
routes.use(authMiddleware.authenticate);

//Rotas dos Usuários
routes.get('/user', userController.index);
routes.post('/user', userController.create);


//Rotas dos Times
routes.get('/team', teamController.index);
routes.post('/team', teamController.create);

//Rotas das partidas
routes.get('/match', matchController.index);
routes.post('/match', matchController.create);

//Tabela de Classificação
routes.get('/table', tableController.index);


export default routes;