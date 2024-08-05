import { User } from '../Models/User.js';
import { PasswordService } from '../../auth/Services/PasswordService.js';

export const createUserController = async (request, response) => {
    const { name, password, isAdmin } = request.body;

    // Convertir isAdmin a un entero. Asumimos que isAdmin viene como '0' o '1'.
    const isAdminInt = parseInt(isAdmin, 10);

    // Verificar si la conversión fue exitosa y si el valor es válido (0 o 1).
    if (isNaN(isAdminInt) || (isAdminInt !== 0 && isAdminInt !== 1)) {
        return response.status(400).send('Valor inválido para isAdmin. Debe ser 0 o 1.');
    }

    const user = await User.create({
        name: name,        password: await PasswordService.encrypt(password),
        isAdmin: isAdminInt
    });

    console.log("¡Usuario creado exitosamente!");

    // Serializar manualmente el usuario para incluir todos los campos necesarios
    const serializedUser = {
        id: user.id,
        name: user.name,
        isAdmin: user.isAdmin,
        // Incluir cualquier otro campo relevante aquí
    };

    response.status(201).json(serializedUser); // Usar .json() en lugar de .send() para enviar objetos directamente
}
