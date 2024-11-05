import express from 'express';
//PARA USUARIOS
import { indexUserController } from './Users/Controllers/indexUserController.js';
import { createUserController } from './Users/Controllers/createUserController.js';
import { showController } from './auth/Controllers/showController.js';
import { deleteController } from './auth/Controllers/deleteController.js';
import { updateController } from './auth/Controllers/updateController.js';

//PARA RECURSOS
import { indexRecursoController } from './Users/Controllers/indexRecursoController.js';
import { createRecursoController } from './Users/Controllers/CreateRecursoController.js';
import { showControllerRecurso } from './auth/Controllers/RecursosControllers/showControllerRecurso.js';
import { recursoDeleteController } from './auth/Controllers/RecursosControllers/recursoDeleteController.js';
import { recursoUpdateController } from './auth/Controllers/RecursosControllers/recursoUpdateController.js';
//PARA ALMACENES
import { indexAlmacenController } from './Users/Controllers/indexAlmacenController.js';

//GENERALES
import { loginController } from './auth/Controllers/loginController.js';
import { verifyTokenController } from './auth/Controllers/verifyTokenController.js';
import { tokenMiddleware } from './auth/Middlewares/tokenMiddleware.js';

const router = express.Router();
router.post('/api/v1/login', loginController);
//CREAR
router.post('/api/v1/usuarios', createUserController);
router.post('/api/v1/recursos', createRecursoController);
//BORRAR
router.delete('/api/v1/usuarios/:id', tokenMiddleware, deleteController);
router.delete('/api/v1/recursos/:id', recursoDeleteController);
//EDITAR
router.patch('/api/v1/usuarios/:id', tokenMiddleware, updateController);
router.patch('/api/v1/recursos/:id', tokenMiddleware, recursoUpdateController);
//CONSULTAR
router.get('/api/v1/usuarios/:id', tokenMiddleware, showController);
router.get('/api/v1/usuarios', tokenMiddleware, indexUserController);
router.get('/api/v1/recursos/:id', tokenMiddleware, showControllerRecurso);
router.get('/api/v1/recursos', indexRecursoController);
//OTROS
router.get('/api/v1/token/verify', verifyTokenController);
router.get('/api/v1/almacenes', indexAlmacenController);

export { router };
