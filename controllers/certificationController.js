const Certification = require('../models/Certification');

exports.getCertifications = async (req, res) => {
    try {
        const certifications = await Certification.find().sort({ order: 1 });
        res.json(certifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
