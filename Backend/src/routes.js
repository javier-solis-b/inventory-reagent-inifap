import express, { response } from 'express';
import {User} from './Users/Models/User.js';
import { PasswordService } from './auth/Services/PasswordService.js';

const router = express.Router()

router.get('/api/v1/usuarios', async (request, response) => {
    response.json(await User.findAll());
});

router.post('/api/v1/usuarios', async (request, response) => {
    try {
        const { name, password } = request.body;
        
        if (!name ||!password) {
            return response.status(400).json({ error: 'Name and password must be provided' });
        }

        const user = await User.create({
            name: name,
            password: await PasswordService.encrypt(password)
        });

        console.log(user);
        response.json(user);
    } catch (error) {
        console.error(error);
        response.status(500).send('An error occurred while creating the user.');
    }
});



export {router};