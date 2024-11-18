import { validationResult } from "express-validator"
import PinService from "../services/pinService.js"

class PinController {
    // Метод для создания пина
    static async createPin(req, res) {
        try {
            // Проверяем ошибки
            const errors = validationResult(req)
            console.log(errors)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Invalid pin data"})
            }

            // Проверка на наличие изобрадения
            if (!req.files || !req.files.picture) {
                return res.status(400).json({ message: "Picture field cannot be empty" });
            }

            // Достаём данные пина
            const userId = req.user.id
            const {title, description} = req.body
            const picture = req.files.picture

            const pin = await PinService.createPin(userId, title, description, picture)
            res.status(201).json({message: "Pin creation successful", pin: pin})
        } catch(e) {
            res.status(500).json({message: e.message || "Failed to create pin"})
        }
    }

    // Метод для получения всех пинов
    static async getAllPins(req, res) {
        try {
            const pins = await PinService.getAllPins()
            return res.status(200).json({message: "Pins successfully got", pins: pins})
        } catch(e) {
            res.status(500).json({message: e.message || "Failed to get all pins"})
        }
    }

    // Метод для получения всех пинов данного пользователя
    static async getAllUserPins(req, res) {return}

    // Метод для удаления пина
    static async deletePin(req, res) {return}
}

export default PinController