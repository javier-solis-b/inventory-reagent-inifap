import express from 'express';
import { indexUserController } from './Users/Controllers/indexUserController.js';
import { createUserController } from './Users/Controllers/createUserController.js';
import { loginController } from './auth/Controllers/loginController.js';
import { deleteController } from './auth/Controllers/deleteController.js';
import { verifyTokenController  } from './auth/Controllers/verifyTokenController.js';
import { tokenMiddleware } from './auth/Middlewares/tokenMiddleware.js';

const router = express.Router()

router.post('/api/v1/login', loginController );
router.get('/api/v1/token/verify', verifyTokenController );
router.get('/api/v1/usuarios', tokenMiddleware,indexUserController );
router.post('/api/v1/usuarios', createUserController );
router.delete('/api/v1/usuarios/:id', deleteController );

export { router };