import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass:String
})

const module = mongoose.model("users", userSchema);
export default module