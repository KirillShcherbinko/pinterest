import {hashSync, compareSync} from "bcrypt"
import secretKey from "../config.js"
import jwt from "jsonwebtoken"
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

        console.log(password)
        // Хэширование пароля
        const hashPassword = hashSync(password, 8)

        // Создание нового пользователя
        const user = new User({username, password: hashPassword})

        // Добавление данных о пользователе в базу данных
        await user.save()
    } 


    // Метод для осуществления входа в аккаунт
    static async login(username, password) {
        // Поиск пользователя с такими данными в базе
        const user = await User.findOne({username})
        if (!user) {
            throw new Error(`User ${username} not found`)
        }

        // Проверка на корректность пароля
        const validPassword = compareSync(password, user.password)
        if (!validPassword) {
            throw new Error("Incorrect Password")
        }

        // Сохраняем токен
        const token = generateAccessToken(user._id)
        return token
    }
}

export default AuthService