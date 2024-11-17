import {Schema, model} from "mongoose"

const PinSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    picture: {type: String, required: true}
})

const Pin = new model("Pin", PinSchema)
export default Pin