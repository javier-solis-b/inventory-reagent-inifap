import { TokenService } from "../services/TokenService";

export const verifyTokenInterceptor = (to, from, next) => {

    console.log('🟣Ejecutando autenticación');
    
    if (!to.meta.requireAuth) {
      return next();
    }
  
    const token = TokenService.get();
  
    if (!token) {
      next({ name: 'login' });
    }
  
    next();
  
  }