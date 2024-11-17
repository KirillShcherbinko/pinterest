import {Schema, model} from "mongoose"

const PinSchema = new Schema({
    id: {type: Schema.Types.ObjectId, ref: "User", requred: true},
    title: {type: String, required: true},
    description: {type: String, maxlength: 200},
    picture: {type: String, required: true}
})

const Pin = new model("Pin", PinSchema)
export default Pin