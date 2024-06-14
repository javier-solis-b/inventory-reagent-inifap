import backend from '@/backend'

export class UserService{

    static all(){
       return  backend.get('usuarios');
    }

}