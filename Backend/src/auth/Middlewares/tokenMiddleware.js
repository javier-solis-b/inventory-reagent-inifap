import { TokenService } from '../../auth/Services/TokenService.js';

export const tokenMiddleware = (request, response, next) => {
    const token = request.headers.authorization;

    if(!TokenService.isValid(token)){
        return response.status(403).json({
            message: ' Datos incorrectos :('
        })
    }
    next();
}