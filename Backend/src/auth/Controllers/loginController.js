import { PasswordService } from "../Services/PasswordService.js";
import { User } from "../../Users/Models/User.js";
import jwt from 'jsonwebtoken'; 
import { env } from "../../Shared/env.js";

export const loginController = async (request, response) => {
    const { name, password } = request.body;

    const user = await User.findOne({
        where: { name: name }
    });

    const userExist = await PasswordService.check(password, user.password);

    if (!userExist) {
        return response.status(401).json({ mesage: 'Los datos ingresados son incorrectos' });
    }

    const token = jwt.sign({ userId: user.id }, env('JWT_SECRET_KEY'), { expiresIn: '1m' });

    const jsonResponse = {
        message: "¡Usuario logueado correctamente!",
        data: {
            token
        }
    };  

    return response.json(jsonResponse);
};
