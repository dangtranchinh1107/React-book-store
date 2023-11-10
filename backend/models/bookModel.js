import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    publicYear: {
        type: Number,
        required: true
    }
}, {
    timestamps: true, versionKey: false
});

export default mongoose.model('BookModel', bookSchema)