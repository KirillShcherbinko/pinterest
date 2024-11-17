import {hashSync, compareSync} from "bcrypt"
import secretKey from "../config.js"
import {jwt} from "jsonwebtoken"
import User from "../models/User.js"


// Функция для генерации токена
const generateAccessToken = (id) => {
    //  Полезная нагрузка содержит id пользователя
    const payload = {id}

    // Возвращаем токен, действующий 24 часов
    return jwt.sign(payload, secretKey.secret, { expiresIn: "24h" })
}

class AuthService {
    // Метод для создания нового пользователя
    static async registration(username, password) {
        // Проверка на существования пользователя с таким же именем
        const candidate = await User.findOne({username})
        if (candidate) {
            throw new Error("This name is already taken")
        }

        // Хэширование пароля
        const hashPassword = hashSync(password, 7)

        // Создание нового пользователя
        const user = new User({username, password: hashPassword})

        // Добавление данных о пользователе в базу данных
        await user.save()
    } 
}

export default AuthService