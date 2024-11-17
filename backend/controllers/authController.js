import { validationResult } from "express-validator"
import AuthService from "../services/authService.js"

class AuthController {
    // Метод для обработки регистрации
    static async registration(req, res) {
        try {
            // Обработка возможных ошибок
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Incorrect username or password"})
            }

            // Создаём нового пользователя
            const { username, password } = req.body
            await AuthService.registration(username, password)

            // Сообщаем об успешной регистрации
            res.status(201).json({ message: "Registration successful" })

        } catch(e) {
            // Сообщаем пользователю об ошибке регистрации
            res.status(400).json({message: e.message || "Registration error"})
        }
    }

    // Метод для обработки входа в аккаунт
    static async login(req, res) {
        try {
            // Осуществляем вход в аккаунт
            const {username, password} = req.body
            const token = await AuthService.login(username, password)

            // Сообщаем об успешом входе в аккаунт
            res.status(200).json({
                message: "Login Successful", 
                token: token
            })

        } catch(e) {
            // Сообщаем пользователю об ошибке входа
            res.status(401).json({message: e.message || "Unauthorized"})
        }
    }

}

export default AuthController