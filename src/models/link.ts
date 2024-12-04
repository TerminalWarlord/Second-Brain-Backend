import mongoose from "mongoose";


const Schema = mongoose.Schema;


const linkSchema = new Schema({
    hash: { type: String, required: true, unique: true },
})



export default mongoose.model('Link', linkSchema);