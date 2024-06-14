import express, { response } from 'express';
import { indexUserController } from './Users/Controllers/IndexUserController.js';
import { createUserController } from './Users/Controllers/CreateUserController.js';

const router = express.Router()

router.get('/api/v1/usuarios', indexUserController );

router.post('/api/v1/usuarios', createUserController );

export { router };