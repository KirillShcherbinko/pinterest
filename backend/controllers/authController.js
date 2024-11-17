import { validationResult } from "express-validator"
import AuthService from "../services/authService.js"

class AuthController {
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

            // Перенаправляем пользователя на страницу со входом
            res.status(201).json({ message: "Registration successful" })

        } catch(e) {
            // Сообщаем пользователю об ошибке регистрации
            res.status(400).json({message: e.message || "Registration error"})
        }
    }
}

export default AuthController