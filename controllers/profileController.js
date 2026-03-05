const Profile = require('../models/Profile');
const Education = require('../models/Education');

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne();
        const education = await Education.find().sort({ order: 1 });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found. Please run: npm run seed' });
        }
        res.json({ profile, education });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
