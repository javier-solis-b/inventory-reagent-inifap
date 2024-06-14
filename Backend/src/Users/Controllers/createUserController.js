import { User } from '../Models/User.js';
import { PasswordService } from '../../auth/Services/PasswordService.js';

export const createUserController = async (request, response) => {
    const { name, password } = request.body;

    const user = await User.create({
        name: name,
        password: await PasswordService.encrypt(password)
    });

    console.log("¡Usuario creado exitosamente!");

}