import express from 'express';
import { indexUserController } from './Users/Controllers/IndexUserController.js';
import { createUserController } from './Users/Controllers/CreateUserController.js';
import { loginController } from './auth/Controllers/loginController.js';

const router = express.Router()

router.post('/api/v1/login', loginController )
router.get('/api/v1/usuarios', indexUserController );
router.post('/api/v1/usuarios', createUserController );

export { router };