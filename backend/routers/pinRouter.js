import {Router} from "express"
import PinController from "../controllers/pinController.js"

// Маршрутизатор для получение пинов
const pinRouter = new Router()

// Маршрутизатор для создания нового пина
pinRouter.post("/pins", PinController.createPin)

// Запрос на получение всех пинов
pinRouter.get("/pins", PinController.getAllPins)

// Запрос нп получение всех пинов данного пина
pinRouter.get("/users/:userId/pins", PinController.getAllUserPins)

// Запрос на удаление пина пользователя
pinRouter.delete("/pins/:id", PinController.deletePin)

export default pinRouter
