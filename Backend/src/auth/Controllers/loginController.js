import { PasswordService } from "../Services/PasswordService.js";
import { User } from "../../Users/Models/User.js";

export const loginController = async (request, response) => {
    const { name, password } = request.body;

    const user = await User.findOne(
        {
            where: { name: name }
        });

    const userExist = await PasswordService.check(password, user.password);

    console.log(userExist);

    if (!userExist) {
        return "Error";
    }
    return true;

};
