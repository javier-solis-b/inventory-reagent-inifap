import { TokenService } from "../services/TokenService";
import backend from "@/backend.js";

// Marcar la función como asíncrona para poder usar 'await'
export const verifyTokenMiddleware = async (to, from, next) => {

    console.log('🟣Ejecutando autenticación');
    
    if (!to.meta.requireAuth) {
      return next();
    }
  
    const token = TokenService.get();
  
    if (!token) {
      next({ name: 'login' });
    }

    // Ahora podemos usar 'await' porque la función es asíncrona
    const response = await backend.get('token/verify');

    console.log("🟢 response", response);

    if(!response.data.response){
      next({name: '403'});
    }
  
    next();
  
}
