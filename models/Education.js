const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    institute: { type: String, required: true },
    cgpa: { type: String, required: true },
    year: { type: String, required: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
