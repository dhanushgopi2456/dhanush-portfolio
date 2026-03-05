const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    issuer: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String },
    link: { type: String },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Certification', certificationSchema);
