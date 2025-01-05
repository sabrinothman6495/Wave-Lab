import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        virtuals: true, // Include virtual properties in JSON output
    },
    id: false, // Disable the default `id` virtual property
});
const Category = model('Category', categorySchema);
export default Category;
