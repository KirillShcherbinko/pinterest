import {Router} from "express"
import {check} from "express-validator"
import PinController from "../controllers/pinController.js"
import authMiddleware from "../middleware/authMiddleware.js"

// Маршрутизатор для получение пинов
const pinRouter = new Router()

// Маршрутизатор для создания нового пина
pinRouter.post("/pins",[
    check("title", "Title field cannot be empty").notEmpty(),
    check("description", "Max length is 200 characters").isLength({max: 200})
], authMiddleware, PinController.createPin)

// Запрос на получение всех пинов
pinRouter.get("/pins", PinController.getAllPins)

// Запрос нп получение всех пинов данного пина
pinRouter.get("/users/:userId/pins", [
    authMiddleware, 
    check("userId", "Invalid user ID").isMongoId()
], PinController.getAllUserPins)

// Запрос на удаление пина пользователя
pinRouter.delete("/pins/:pinId", authMiddleware, PinController.deletePin)

export default pinRouter
