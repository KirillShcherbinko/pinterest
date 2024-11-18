import jwt from "jsonwebtoken"
import secretKey from "../config.js"


// Функция для декодирования jwt токена
const authMiddleware = function(req, res, next) {
    try{
        // Извлекаем токен из заголовка
        const token = req.headers.authorization.split(" ")[1] 

        // Проверка на сущестование токена
        if(!token) {
            return res.status(403).json({message: "Token not found"})
        }

        // Декодируем данные
        const decodedData = jwt.verify(token, secretKey["secret"])
    
        // Добавляем данные в тело запроса
        req.user = decodedData

        // Вызов следующей функции
        next() 

    } catch(e) {
        // Сообщаем об ошибке в токене
        return res.status(403).json({message: "Authorization error"})
    }
}

export default authMiddleware