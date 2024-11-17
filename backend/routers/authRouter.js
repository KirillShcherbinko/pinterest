import {Router} from "express"
import AuthController from "../controllers/authController.js"
import {check} from "express-validator"


// Маршрутизатор для запросов пользователя
const authRouter = new Router()

// Запрос на регистрацию
authRouter.post("/registration", [
    check("username", "Username field cannot be empty").notEmpty(),
    check("password", "The password must be between 4 and 12 characters long").isLength({min: 4, max: 12})
], AuthController.registration)

// Запрос на вход в аккаунт
authRouter.post("/login", AuthController.login)

// Запрос на отрисовку страницы регистрации
authRouter.get("/registration", AuthController.showRegistration)

// Запрос на отрисовку страницы входа в аккаунт
authRouter.get("/login", AuthController.showLogin)