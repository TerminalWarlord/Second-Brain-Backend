import mongoose from "mongoose";


const Schema = mongoose.Schema;

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new Schema({
    link: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true, enum: contentTypes },
    tags: [
        { type: mongoose.Types.ObjectId, ref: 'Tag' }
    ],
    userId: { type: mongoose.Types.ObjectId, ref: 'User' }
})



export default mongoose.model('Content', contentSchema);