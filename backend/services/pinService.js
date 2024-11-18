import Pin from "../models/Pin.js"
import FileService from "./fileService.js"

class PinService {
    static async createPin(userId, title, description, picture) {
        const fileName = FileService.saveFile(picture)
        const createdPin = Pin.create({
            ownerId: userId, 
            title: title,
            description: description || "",
            picture: fileName
        })
        return createdPin
    }

    static async getAllPins() {
        try {
            const pins = await Pin.find();
            return pins
        } catch(e) {
            throw new Error("Failed to get pins")
        }      
    }
}

export default PinService