const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tools: { type: String },
    date: { type: String },
    link: { type: String },
    github: { type: String },
    image: { type: String },
    category: { type: String, enum: ['main', 'practice'], default: 'main' },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
