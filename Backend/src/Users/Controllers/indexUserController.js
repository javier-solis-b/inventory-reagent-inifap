import { User } from '../Models/User.js';
import { TokenService } from '../../auth/Services/TokenService.js';
export const indexUserController = async (request, response) => {

    const token = request.headers.authorization;
     
    if(!TokenService.isValid(token)){
        return response.status(403).json({
            message: ' Datos incorrectos :('
        })
    }

    response.json(await User.findAll());
}
