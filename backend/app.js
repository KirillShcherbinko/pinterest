import cors from "cors"
import express from "express"
import fileUpload from "express-fileupload"
import mongoose from "mongoose"
import authRouter from "./routers/authRouter.js"
import pinRouter from "./routers/pinRouter.js"

const DB_URL = "mongodb://root:root_password@mongodb:27017/mydatabase?authSource=admin"
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({origin: "http://frontend"})) // Настройка cors
app.use(express.json()) // Запросы представлены в формате json
app.use(express.static("static")) // Добавление возможности загружать статические файлы
app.use(fileUpload({})) // Загрузка файлов
app.use("/", pinRouter)
app.use("/auth", authRouter)

// Функция для запуска проекта
async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log("SEVER STARTED ON PORT " + PORT))
    } catch(e) {
        console.log(e)
    }
}

startApp()