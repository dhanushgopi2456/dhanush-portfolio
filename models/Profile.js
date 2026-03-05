const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
    college: { type: String },
    department: { type: String },
    objective: { type: String },
    profileImage: { type: String },
    aboutImage: { type: String },
    resumeLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
