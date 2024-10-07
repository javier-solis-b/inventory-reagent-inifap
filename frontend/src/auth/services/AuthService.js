import backend from '@/backend.js';
import {TokenService} from './TokenService.js';

export class AuthService{
    
    static async login(name, password){
        const response = await backend.post("login", {
            name,
            password
        });

        const token = response.data.data.token;
        TokenService.set(token);
        localStorage.setItem('username', name); // Guarda el nombre del usuario en localStorage
        
        return response.data.data;
    
    }
}
